#include "secrets.h"
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "WiFi.h"

// ---- I2C + Accelerometer ----
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_ADXL345_U.h>

// ---- MAX30102 (HR) via SparkFun MAX3010x ----
#include "MAX30105.h"
#include "heartRate.h"

// ---- DS18B20 Temperature ----
#include <OneWire.h>
#include <DallasTemperature.h>

// ---------- AWS IoT Topics ----------
#define AWS_IOT_PUBLISH_TOPIC   "esp32/pub"
#define AWS_IOT_SUBSCRIBE_TOPIC "esp32/sub"

// ---------- ADXL345 setup ----------
Adafruit_ADXL345_Unified accel = Adafruit_ADXL345_Unified(12345);
bool accelOk = true;  // NEW: track whether ADXL345 is available

// Movement window config (5 seconds for testing)
const unsigned long WINDOW_MS = 5000;   // 5 seconds window
unsigned long lastWindowTime = 0;

// Movement calculation state
float prevMag = 0.0;
bool hasPrevMag = false;

float windowMovement = 0.0;   // sum of deltas
int sampleCount = 0;

// Last movement window result (used for publishing)
float lastMovementScore = 0.0;
String lastMovementLevel = "unknown";
int lastSampleCount = 0;

// -------- MAX30102 (HR using SparkFun MAX3010x) --------
MAX30105 particleSensor;

const byte RATE_SIZE = 4;   // number of samples for average BPM
byte rates[RATE_SIZE];      // array of heart rate measurements
byte rateSpot = 0;
long lastBeat = 0;          // time of last beat
float beatsPerMinute = -1;
float beatAvg = -1;

// Last valid biosensor values
float lastHeartRateBpm = -1.0f;   // -1 = error / not available
float lastSpO2Percent = -1.0f;    // -1 for now (SpO2 algo not implemented)

// -------- DS18B20 Temperature --------
#define ONE_WIRE_BUS 4   // DS18B20 data pin
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature tempSensors(&oneWire);
float lastTempCelsius = -1.0f;    // -1 = error / not available

WiFiClientSecure net = WiFiClientSecure();
PubSubClient client(net);

// ---------- Handle incoming messages ----------
void messageHandler(char* topic, byte* payload, unsigned int length)
{
  Serial.print("incoming: ");
  Serial.println(topic);

  StaticJsonDocument<200> doc;
  DeserializationError error = deserializeJson(doc, payload, length);
  if (error)
  {
    Serial.print("deserializeJson() failed: ");
    Serial.println(error.f_str());
    return;
  }

  const char* message = doc["message"];
  Serial.print("Message: ");
  Serial.println(message);
}

// ---------- AWS Connection ----------
void connectAWS()
{
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);   // from secrets.h

  Serial.println("Connecting to Wi-Fi");

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWi-Fi connected");

  // Configure WiFiClientSecure to use the AWS IoT device credentials
  net.setCACert(AWS_CERT_CA);
  net.setCertificate(AWS_CERT_CRT);
  net.setPrivateKey(AWS_CERT_PRIVATE);

  // Connect to the MQTT broker on the AWS endpoint we defined earlier
  client.setServer(AWS_IOT_ENDPOINT, 8883);

  // Create a message handler
  client.setCallback(messageHandler);

  Serial.println("Connecting to AWS IoT");

  while (!client.connect(THINGNAME))
  {
    Serial.print(".");
    delay(100);
  }

  if (!client.connected())
  {
    Serial.println("AWS IoT Timeout!");
    return;
  }

  // Subscribe to a topic
  client.subscribe(AWS_IOT_SUBSCRIBE_TOPIC);

  Serial.println("\nAWS IoT Connected!");
}

// ---------- Publish movement + vitals data to AWS ----------
void publishMessage()
{
  StaticJsonDocument<256> doc;

  // Movement fields
  doc["movement_score"] = lastMovementScore;
  doc["movement_level"] = lastMovementLevel;
  doc["window_sec"] = WINDOW_MS / 1000;
  doc["samples"] = lastSampleCount;

  // Heart rate, SpO2, temperature
  doc["heart_rate_bpm"] = lastHeartRateBpm;
  doc["spo2_pct"] = lastSpO2Percent;   // currently -1 (not implemented)
  doc["temp_c"] = lastTempCelsius;

  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer);

  client.publish(AWS_IOT_PUBLISH_TOPIC, jsonBuffer);
  Serial.print("Published: ");
  Serial.println(jsonBuffer);
}

// ---------- Update movement window from ADXL345 ----------
void updateMovementWindow()
{
  if (!accelOk)
  {
    // If accelerometer isn't available, do nothing here.
    // We'll handle the "no samples" case when the window ends.
    return;
  }

  sensors_event_t event;
  accel.getEvent(&event);  // reads acceleration in m/s^2

  float ax = event.acceleration.x;
  float ay = event.acceleration.y;
  float az = event.acceleration.z;

  // magnitude of acceleration vector
  float mag = sqrt(ax * ax + ay * ay + az * az);

  if (hasPrevMag)
  {
    float delta = fabs(mag - prevMag);
    windowMovement += delta;
    sampleCount++;
  }
  else
  {
    // first valid sample
    hasPrevMag = true;
  }

  prevMag = mag;
}

// ---------- Classify movement level based on score ----------
String classifyMovement(float score)
{
  // You will tune these thresholds experimentally
  if (score < 0.05)
    return "still";     // almost no movement
  else if (score < 0.2)
    return "light";     // small movements
  else
    return "active";    // big movements / awake
}

// ---------- Read HR (MAX30102) + Temp (DS18B20) ----------
void updateBioSensors()
{
  unsigned long now = millis();

  // ---- MAX30102: Heart Rate using SparkFun checkForBeat() ----
  long irValue = particleSensor.getIR();

  if (irValue > 50000)  // simple threshold to detect finger present
  {
    if (checkForBeat(irValue))
    {
      long delta = now - lastBeat;
      lastBeat = now;

      if (delta > 0)
      {
        beatsPerMinute = 60.0 / (delta / 1000.0);

        if (beatsPerMinute > 30 && beatsPerMinute < 220)
        {
          rates[rateSpot++] = (byte)beatsPerMinute;
          rateSpot %= RATE_SIZE;

          int sum = 0;
          for (byte x = 0; x < RATE_SIZE; x++)
          {
            sum += rates[x];
          }
          beatAvg = (float)sum / RATE_SIZE;
          lastHeartRateBpm = beatAvg;
        }
        else
        {
          lastHeartRateBpm = -1.0f;
        }
      }
    }
    // SpO2 algorithm not implemented yet -> keep -1
    lastSpO2Percent = -1.0f;
  }
  else
  {
    // No finger / poor signal
    lastHeartRateBpm = -1.0f;
    lastSpO2Percent = -1.0f;
  }

  // ---- DS18B20: Temperature ----
  static unsigned long lastTempRead = 0;
  const unsigned long TEMP_INTERVAL_MS = 1000;  // 1s is enough

  if (now - lastTempRead >= TEMP_INTERVAL_MS)
  {
    lastTempRead = now;

    tempSensors.requestTemperatures();
    float tC = tempSensors.getTempCByIndex(0);

    if (tC == DEVICE_DISCONNECTED_C)
    {
      lastTempCelsius = -1.0f;
    }
    else
    {
      lastTempCelsius = tC;
    }
  }
}

void setup()
{
  Serial.begin(115200);
  delay(1000);

  // I2C init (shared by ADXL345 + MAX30102)
  Wire.begin(21, 22);  // SDA, SCL on ESP32

  // ADXL345 init
  if (!accel.begin())
  {
    Serial.println("No ADXL345 detected... check wiring!");
    accelOk = false;  // NEW: mark as unavailable but DO NOT block
  }
  else
  {
    Serial.println("ADXL345 detected");
    accel.setRange(ADXL345_RANGE_4_G);  // ±4g is enough for sleep
  }

  // MAX30102 init (generic blue/black module, I2C address 0x57)
  Serial.println("Initializing MAX30102...");
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST))
  {
    Serial.println("MAX30102 not found. Check wiring. HR will be -1.");
  }
  else
  {
    Serial.println("MAX30102 found, setting up...");
    // Default configuration suitable for HR
    particleSensor.setup();                  // configure with default settings
    particleSensor.setPulseAmplitudeRed(0x0A);    // turn Red LED on low
    particleSensor.setPulseAmplitudeIR(0x0A);     // IR LED low
    particleSensor.setPulseAmplitudeGreen(0);     // Green LED off
  }

  // DS18B20 init
  tempSensors.begin();
  Serial.println("DS18B20 temperature sensor initialized (if Temp stays -1, check wiring).");

  // Connect to AWS IoT
  connectAWS();

  lastWindowTime = millis();
}

void loop()
{
  if (!client.connected())
  {
    connectAWS();
  }
  client.loop();

  // Update biosensors continuously (HR, Temp)
  updateBioSensors();

  // Read accelerometer and update current 5s window
  updateMovementWindow();

  unsigned long now = millis();
  if ((now - lastWindowTime) >= WINDOW_MS)
  {
    if (accelOk && sampleCount > 0)
    {
      // Compute movement score for this 5s window
      float movementScore = windowMovement / sampleCount;
      String movementLevel = classifyMovement(movementScore);

      lastMovementScore = movementScore;
      lastMovementLevel = movementLevel;
      lastSampleCount = sampleCount;
    }
    else
    {
      // ADXL missing OR no samples -> mark movement as sensor error
      lastMovementScore = -1.0f;
      lastMovementLevel = "sensor_error";
      lastSampleCount = 0;
    }

    // Debug output
    Serial.print("Window (");
    Serial.print(WINDOW_MS / 1000);
    Serial.print("s) -> score: ");
    Serial.print(lastMovementScore, 4);
    Serial.print(" | level: ");
    Serial.print(lastMovementLevel);
    Serial.print(" | samples: ");
    Serial.println(lastSampleCount);

    Serial.print("HR(bpm): ");
    Serial.print(lastHeartRateBpm);
    Serial.print(" | SpO2(%): ");
    Serial.print(lastSpO2Percent);
    Serial.print(" | Temp(C): ");
    Serial.println(lastTempCelsius);

    // Publish JSON to AWS IoT
    publishMessage();

    // Reset movement window
    windowMovement = 0.0;
    sampleCount = 0;
    hasPrevMag = false;
    lastWindowTime = now;
  }

  // Loop speed ~20 Hz
  delay(50);
}
