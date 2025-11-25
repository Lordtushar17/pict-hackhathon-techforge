#include "secrets.h"
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "WiFi.h"

// ---------- Ultrasonic sensor pins ----------
#define TRIG_PIN 5   // change if you are using a different pin
#define ECHO_PIN 18  // change if you are using a different pin

#define AWS_IOT_PUBLISH_TOPIC   "esp32/pub"
#define AWS_IOT_SUBSCRIBE_TOPIC "esp32/sub"

float distance_cm = 0;

WiFiClientSecure net = WiFiClientSecure();
PubSubClient client(net);

// ---------- AWS Connection ----------
void connectAWS()
{
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);   // make sure these are in secrets.h

  Serial.println("Connecting to Wi-Fi");

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  // Configure WiFiClientSecure to use the AWS IoT device credentials
  net.setCACert(AWS_CERT_CA);
  net.setCertificate(AWS_CERT_CRT);
  net.setPrivateKey(AWS_CERT_PRIVATE);

  // Connect to the MQTT broker on the AWS endpoint we defined earlier
  client.setServer(AWS_IOT_ENDPOINT, 8883);

  // Create a message handler
  client.setCallback(messageHandler);

  Serial.println("Connecting to AWS IOT");

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

  Serial.println("AWS IoT Connected!");
}

// ---------- Publish distance to AWS ----------
void publishMessage()
{
  StaticJsonDocument<200> doc;
  doc["distance_cm"] = distance_cm;
  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer);

  client.publish(AWS_IOT_PUBLISH_TOPIC, jsonBuffer);
}

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

// ---------- Measure distance with ultrasonic sensor ----------
float readDistance()
{
  // Clear trigger
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);

  // Send 10 µs pulse
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  // Read echo pulse duration in microseconds
  long duration = pulseIn(ECHO_PIN, HIGH, 30000); // 30 ms timeout (~5m)

  if (duration == 0)
  {
    // Timeout / no echo
    return -1; // indicate invalid
  }

  // Speed of sound ~ 0.034 cm/µs
  float distance = duration * 0.034 / 2.0;

  return distance;
}

void setup()
{
  Serial.begin(115200);

  // Ultrasonic pins
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  connectAWS();
}

void loop()
{
  if (!client.connected())
  {
    connectAWS();
  }
  client.loop();

  distance_cm = readDistance();

  if (distance_cm < 0)
  {
    Serial.println("Failed to read from ultrasonic sensor (timeout)");
  }
  else
  {
    Serial.print("Distance: ");
    Serial.print(distance_cm);
    Serial.println(" cm");
  }

  publishMessage();
  delay(3000);
}
