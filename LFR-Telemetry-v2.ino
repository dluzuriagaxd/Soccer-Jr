#include <QTRSensors.h>

// --- Estructura de Datos (Telemetría) ---
struct Telemetria {
 uint16_t posicion;
 int16_t p_term;
 int16_t i_term;
 int16_t d_term;
 uint8_t pwm_izq;
 uint8_t pwm_der;
 uint32_t timestamp;
 uint8_t checksum;
} __attribute__((packed));
Telemetria dataPacket;

// --- Pines Puente H y Control ---
#define PWMA 3
#define AIN1 5
#define AIN2 4
#define PWMB 9
#define BIN1 8
#define BIN2 7
#define PIN_ESTRATEGIA 11

// --- Constantes PID ---
float Kp = 0.14549; 
float Kd = 0.008328;

int setPoint = 3500;
int VelMax = 150; // Bajado temporalmente para pruebas seguras con llantas grandes
int lastError = 0;

// --- Control de Tiempo (dt fijo a 500Hz) ---
unsigned long previousMicros = 0;
const unsigned long intervaloDT = 2000;
uint8_t contadorTelemetria = 0;

// --- Sensores QTR Analógicos ---
QTRSensors qtr;
const uint8_t SensorCount = 8;
uint16_t sensorValues[SensorCount];

void blink() {
 for (int i = 0; i < 5; i++) {
   digitalWrite(LED_BUILTIN, HIGH);
   delay(100);
   digitalWrite(LED_BUILTIN, LOW);
   delay(100);
 }
}

void setup() {
 pinMode(LED_BUILTIN, OUTPUT);
 pinMode(PWMA, OUTPUT);
 pinMode(AIN1, OUTPUT);
 pinMode(AIN2, OUTPUT);
 pinMode(PWMB, OUTPUT);
 pinMode(BIN1, OUTPUT);
 pinMode(BIN2, OUTPUT);
 pinMode(PIN_ESTRATEGIA, INPUT_PULLUP);

 Serial.begin(115200);

 // 1. Configuración Analógica Robusta
 qtr.setTypeAnalog();
 qtr.setSensorPins((const uint8_t[]){A0, A1, A2, A3, A4, A5, A6, A7}, SensorCount);
 // qtr.setEmitterPin(2); // Descomentar solo si soldaste el pin CTRL/ODD al D2

 delay(500);
  // 2. Calibración Visual
 digitalWrite(LED_BUILTIN, HIGH);
 for (uint16_t i = 0; i < 400; i++) {
   qtr.calibrate();
 }
 digitalWrite(LED_BUILTIN, LOW);

 // 3. Imprimir Valores de Calibración para Depuración (Opcional)
 Serial.println("Calibracion Minima:");
 for (uint8_t i = 0; i < SensorCount; i++) {
   Serial.print(qtr.calibrationOn.minimum[i]); Serial.print(' ');
 }
 Serial.println("\nCalibracion Maxima:");
 for (uint8_t i = 0; i < SensorCount; i++) {
   Serial.print(qtr.calibrationOn.maximum[i]); Serial.print(' ');
 }
 Serial.println("\nIniciando en 2 segundos...");
 delay(2000); // Tiempo para quitar la mano
}

void MotorDerecho(int velocidad, bool frenadoActivo) {
 int velLimitada = frenadoActivo ? constrain(velocidad, -255, 255) : constrain(velocidad, 0, 255);
 if (velLimitada >= 0) {
   digitalWrite(AIN1, LOW); digitalWrite(AIN2, HIGH); analogWrite(PWMA, velLimitada);
 } else {
   digitalWrite(AIN1, HIGH); digitalWrite(AIN2, LOW); analogWrite(PWMA, abs(velLimitada));
 }
}

void MotorIzquierdo(int velocidad, bool frenadoActivo) {
 int velLimitada = frenadoActivo ? constrain(velocidad, -255, 255) : constrain(velocidad, 0, 255);
 if (velLimitada >= 0) {
   digitalWrite(BIN1, LOW); digitalWrite(BIN2, HIGH); analogWrite(PWMB, velLimitada);
 } else {
   digitalWrite(BIN1, HIGH); digitalWrite(BIN2, LOW); analogWrite(PWMB, abs(velLimitada));
 }
}

void loop() {
 unsigned long currentMicros = micros();

 // Bucle de Control a 500Hz
 if (currentMicros - previousMicros >= intervaloDT) {
   float dt = (currentMicros - previousMicros) / 1000000.0;
   previousMicros += intervaloDT;

   uint16_t position = qtr.readLineBlack(sensorValues);
   int error = setPoint - (int)position;

   float p_term = error * Kp;
   float d_term = ((error - lastError) / dt) * Kd;
   lastError = error;

   float i_term = 0;
   int ajuste = (int)(p_term + i_term + d_term);

   bool frenadoActivo = (digitalRead(PIN_ESTRATEGIA) == LOW);

   int velDer = VelMax + ajuste;
   int velIzq = VelMax - ajuste;

   MotorDerecho(velDer, frenadoActivo);
   MotorIzquierdo(velIzq, frenadoActivo);

   // Telemetría a 50Hz
   contadorTelemetria++;
   if (contadorTelemetria >= 10) {
     contadorTelemetria = 0;
     dataPacket.posicion = position;
     dataPacket.p_term = (int16_t)p_term;
     dataPacket.i_term = (int16_t)i_term;
     dataPacket.d_term = (int16_t)d_term;
     dataPacket.pwm_der = (uint8_t)abs(constrain(velDer, frenadoActivo ? -255 : 0, 255));
     dataPacket.pwm_izq = (uint8_t)abs(constrain(velIzq, frenadoActivo ? -255 : 0, 255));
     dataPacket.timestamp = currentMicros;

     dataPacket.checksum = 0;
     uint8_t *ptr = (uint8_t *)&dataPacket;
     for (size_t i = 0; i < sizeof(dataPacket) - 1; i++) {
       dataPacket.checksum ^= ptr[i];
     }

     Serial.write(0xAA); Serial.write(0xBB);
     Serial.write((byte *)&dataPacket, sizeof(dataPacket));
   }
 }
}
