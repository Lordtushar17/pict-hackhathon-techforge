#include "secrets.h"
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "WiFi.h"

// ---- NEW: Accelerometer libraries ----
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_ADXL345_U.h>

// ---------- AWS IoT Topics ----------
#define AWS_IOT_PUBLISH_TOPIC   "esp32/pub"
#define AWS_IOT_SUBSCRIBE_TOPIC "esp32/sub"

// ---------- ADXL345 setup ----------
Adafruit_ADXL345_Unified accel = Adafruit_ADXL345_Unified(12345);

// Movement window config (5 seconds for testing)
const unsigned long WINDOW_MS = 5000;   // 5 seconds window
unsigned long lastWindowTime = 0;

// Movement calculation state
float prevMag = 0.0;
bool hasPrevMag = false;

float windowMovement = 0.0;   // sum of deltas
int sampleCount = 0;

// Last window result (used for publishing)
float lastMovementScore = 0.0;
String lastMovementLevel = "unknown";
int lastSampleCount = 0;

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

// ---------- Publish movement data to AWS ----------
void publishMessage()
{
  StaticJsonDocument<256> doc;
  doc["movement_score"] = lastMovementScore;
  doc["movement_level"] = lastMovementLevel;
  doc["window_sec"] = WINDOW_MS / 1000;
  doc["samples"] = lastSampleCount;

  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer);

  client.publish(AWS_IOT_PUBLISH_TOPIC, jsonBuffer);
  Serial.print("Published: ");
  Serial.println(jsonBuffer);
}

// ---------- Update movement window from ADXL345 ----------
void updateMovementWindow()
{
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

void setup()
{
  Serial.begin(115200);
  delay(1000);

  // I2C and ADXL345 init
  Wire.begin(21, 22);  // SDA, SCL on ESP32
  if (!accel.begin())
  {
    Serial.println("No ADXL345 detected... check wiring!");
    while (1)
    {
      delay(10);
    }
  }
  Serial.println("ADXL345 detected");

  // Optional: set range to reduce noise (±4g is enough for sleep)
  accel.setRange(ADXL345_RANGE_4_G);

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

  // Read accelerometer and update current 5s window
  updateMovementWindow();

  unsigned long now = millis();
  if ((now - lastWindowTime) >= WINDOW_MS && sampleCount > 0)
  {
    // Compute movement score for this 5s window
    float movementScore = windowMovement / sampleCount;
    String movementLevel = classifyMovement(movementScore);

    // Save for publishing
    lastMovementScore = movementScore;
    lastMovementLevel = movementLevel;
    lastSampleCount = sampleCount;

    // Debug output
    Serial.print("Window (");
    Serial.print(WINDOW_MS / 1000);
    Serial.print("s) -> score: ");
    Serial.print(movementScore, 4);
    Serial.print(" | level: ");
    Serial.print(movementLevel);
    Serial.print(" | samples: ");
    Serial.println(sampleCount);

    // Publish JSON to AWS IoT
    publishMessage();

    // Reset window
    windowMovement = 0.0;
    sampleCount = 0;
    hasPrevMag = false;
    lastWindowTime = now;
  }

  // Sampling rate ~20 Hz (50 ms)
  delay(50);
}
