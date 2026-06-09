// ============================================================
//  SOCCER JR. - Firmware v1.0
//  Robot Soccer Junior - Control Remoto Bluetooth
// ============================================================
//  Protocolo: App "Bluetooth RC Controller"
//    F = Avanzar  |  B = Retroceder
//    L = Izquierda|  R = Derecha
//    S = Stop
// ============================================================
//  Hardware:
//    - Arduino Uno R3
//    - Shield L293D  OR  Módulo L298N (seleccionar abajo)
//    - Motores Amarillos TT (x2)
//    - Módulo Bluetooth HC-05
//    - Batería 18650 2S (7.4V nominal)
//    - Interruptor basculante en línea Vin
// ============================================================

// --- SELECCIÓN DE DRIVER ---
// Descomenta UNA de las dos líneas siguientes:
// #define DRIVER_L293D_SHIELD   // Usa el shield que monta directo sobre Arduino Uno
#define DRIVER_L298N_MODULE    // Usa el módulo independiente con cables

// --- CONFIGURACIÓN DE PINES ---
#ifdef DRIVER_L293D_SHIELD
  // Shield L293D (Adafruit Motor Shield v1 / compatible)
  // El shield usa pines fijos internamente via SN754410 / L293D
  // Los pines de dirección van al shift register del shield
  // NOTA: Si usas el shield Adafruit v1 real, usa la librería AFMotor.h
  // Esta config es para shields que exponen pines directamente:
  #define MOTOR_IZQ_EN  6   // PWM Enable Motor Izquierdo
  #define MOTOR_IZQ_A   7   // Dirección 1
  #define MOTOR_IZQ_B   8   // Dirección 2
  #define MOTOR_DER_EN  5   // PWM Enable Motor Derecho
  #define MOTOR_DER_A   9   // Dirección 1
  #define MOTOR_DER_B   10  // Dirección 2
  #define DRIVER_NAME "L293D Shield"
#endif

#ifdef DRIVER_L298N_MODULE
  // Módulo L298N con terminales de tornillo
  #define MOTOR_IZQ_EN  6   // PWM → ENA del L298N
  #define MOTOR_IZQ_A   7   // IN1 del L298N
  #define MOTOR_IZQ_B   8   // IN2 del L298N
  #define MOTOR_DER_EN  5   // PWM → ENB del L298N
  #define MOTOR_DER_A   9   // IN3 del L298N
  #define MOTOR_DER_B   10  // IN4 del L298N
  #define DRIVER_NAME "L298N Module"
#endif

// --- BLUETOOTH HC-05 ---
// HC-05 TX → Arduino D2 (RX del SoftwareSerial)
// HC-05 RX → Arduino D3 VIA DIVISOR DE TENSIÓN (1kΩ + 2kΩ) (TX del SoftwareSerial)
#include <SoftwareSerial.h>
SoftwareSerial bluetoothSerial(2, 3);  // RX, TX

// --- BATERÍA: DIVISOR DE TENSIÓN EN A0 ---
// Batería 18650 2S → 7.4V (nominal) → 8.4V (cargada) → 6.4V (mínima segura)
// Divisor: R1 = 10kΩ (lado Vin), R2 = 10kΩ (lado GND)
// Vout = Vbat * R2 / (R1 + R2) → factor de escala = 2.0
// Vout máx = 8.4V * 0.5 = 4.2V → OK para pin analógico de 5V
#define BAT_PIN        A0
#define BAT_R_FACTOR   2.0f   // R1 = R2 → dividir entre 2 para obtener Vbat real
#define BAT_WARN_MV    6800   // Advertencia en 6.8V (3.4V por celda)
#define BAT_CRIT_MV    6400   // Crítico en 6.4V (3.2V por celda) → apagar motores

// --- VELOCIDADES (0-255 PWM) ---
#define VEL_ADELANTE   200   // Velocidad normal de avance
#define VEL_GIRO       180   // Velocidad de giro (un motor para, el otro avanza)
#define VEL_RAPIDO     230   // Modo turbo (activar con tecla 'T' si se desea)

// --- LOG POST-MATCH (Buffer en RAM) ---
#define LOG_SIZE 200  // Cantidad máxima de entradas a recordar (ajusta según RAM disponible)

struct LogEntry {
  uint32_t timestamp_ms;
  char     comando;
  uint16_t bateria_mv;
  uint8_t  pwm_izq;
  uint8_t  pwm_der;
};

LogEntry logBuffer[LOG_SIZE];
uint8_t  logHead    = 0;      // Índice circular (next write position)
bool     logWrapped = false;  // true si el buffer dio una vuelta completa

// --- ESTADO GLOBAL ---
char comandoActual   = 'S';
int  pwmIzq          = 0;
int  pwmDer          = 0;
bool bateriaApagada  = false; // Si true, los motores no arrancan (protección LiPo)

// ============================================================
//  FUNCIÓN: leer_bateria_mv()
//  Retorna el voltaje de la batería en milivoltios.
// ============================================================
uint16_t leer_bateria_mv() {
  int raw = analogRead(BAT_PIN);
  // Vout = raw * (5.0 / 1023.0) * 1000  (en mV)
  // Vbat = Vout * BAT_R_FACTOR
  float vout_mv = raw * (5000.0f / 1023.0f);
  return (uint16_t)(vout_mv * BAT_R_FACTOR);
}

// ============================================================
//  FUNCIÓN: guardar_log()
//  Guarda una entrada en el buffer circular de log.
// ============================================================
void guardar_log(char cmd, uint16_t bat_mv, uint8_t pwm_i, uint8_t pwm_d) {
  logBuffer[logHead] = { millis(), cmd, bat_mv, pwm_i, pwm_d };
  logHead++;
  if (logHead >= LOG_SIZE) {
    logHead    = 0;
    logWrapped = true;
  }
}

// ============================================================
//  FUNCIÓN: volcar_log_usb()
//  Vuelca todo el log por Serial (USB) en formato CSV.
//  Llamar al inicio si el usuario abre el monitor serie.
// ============================================================
void volcar_log_usb() {
  Serial.println(F("=== SOCCER JR. POST-MATCH LOG ==="));
  Serial.println(F("Timestamp_ms,Comando,Bateria_mV,PWM_Izq,PWM_Der"));

  uint8_t start   = logWrapped ? logHead : 0;
  uint16_t count  = logWrapped ? LOG_SIZE : logHead;

  for (uint16_t i = 0; i < count; i++) {
    uint8_t idx = (start + i) % LOG_SIZE;
    Serial.print(logBuffer[idx].timestamp_ms);
    Serial.print(',');
    Serial.print(logBuffer[idx].comando);
    Serial.print(',');
    Serial.print(logBuffer[idx].bateria_mv);
    Serial.print(',');
    Serial.print(logBuffer[idx].pwm_izq);
    Serial.print(',');
    Serial.println(logBuffer[idx].pwm_der);
  }
  Serial.println(F("=== FIN DEL LOG ==="));
}

// ============================================================
//  FUNCIONES DE CONTROL DE MOTORES
// ============================================================

void mover_motor_izq(int velocidad) {
  // velocidad: negativo = reversa, positivo = avance, 0 = parar
  int v = constrain(abs(velocidad), 0, 255);
  if (velocidad > 0) {
    digitalWrite(MOTOR_IZQ_A, HIGH);
    digitalWrite(MOTOR_IZQ_B, LOW);
  } else if (velocidad < 0) {
    digitalWrite(MOTOR_IZQ_A, LOW);
    digitalWrite(MOTOR_IZQ_B, HIGH);
  } else {
    digitalWrite(MOTOR_IZQ_A, LOW);
    digitalWrite(MOTOR_IZQ_B, LOW);
  }
  analogWrite(MOTOR_IZQ_EN, v);
}

void mover_motor_der(int velocidad) {
  int v = constrain(abs(velocidad), 0, 255);
  if (velocidad > 0) {
    digitalWrite(MOTOR_DER_A, HIGH);
    digitalWrite(MOTOR_DER_B, LOW);
  } else if (velocidad < 0) {
    digitalWrite(MOTOR_DER_A, LOW);
    digitalWrite(MOTOR_DER_B, HIGH);
  } else {
    digitalWrite(MOTOR_DER_A, LOW);
    digitalWrite(MOTOR_DER_B, LOW);
  }
  analogWrite(MOTOR_DER_EN, v);
}

void parar_motores() {
  mover_motor_izq(0);
  mover_motor_der(0);
  pwmIzq = 0;
  pwmDer = 0;
}

// ============================================================
//  FUNCIÓN: ejecutar_comando()
//  Traduce el comando BT a movimiento de motores.
// ============================================================
void ejecutar_comando(char cmd) {
  if (bateriaApagada) {
    parar_motores();
    return;
  }

  switch (cmd) {
    case 'F':  // Avanzar
      mover_motor_izq(VEL_ADELANTE);
      mover_motor_der(VEL_ADELANTE);
      pwmIzq = VEL_ADELANTE;
      pwmDer = VEL_ADELANTE;
      break;

    case 'B':  // Retroceder
      mover_motor_izq(-VEL_ADELANTE);
      mover_motor_der(-VEL_ADELANTE);
      pwmIzq = VEL_ADELANTE;  // log como positivo (se sabe la dirección por cmd)
      pwmDer = VEL_ADELANTE;
      break;

    case 'L':  // Girar Izquierda (Motor derecho avanza, izquierdo para)
      mover_motor_izq(0);
      mover_motor_der(VEL_GIRO);
      pwmIzq = 0;
      pwmDer = VEL_GIRO;
      break;

    case 'R':  // Girar Derecha (Motor izquierdo avanza, derecho para)
      mover_motor_izq(VEL_GIRO);
      mover_motor_der(0);
      pwmIzq = VEL_GIRO;
      pwmDer = 0;
      break;

    case 'I':  // Giro brusco Izquierda (ambos motores, sentidos opuestos)
      mover_motor_izq(-VEL_GIRO);
      mover_motor_der(VEL_GIRO);
      pwmIzq = VEL_GIRO;
      pwmDer = VEL_GIRO;
      break;

    case 'J':  // Giro brusco Derecha
      mover_motor_izq(VEL_GIRO);
      mover_motor_der(-VEL_GIRO);
      pwmIzq = VEL_GIRO;
      pwmDer = VEL_GIRO;
      break;

    case 'S':  // Stop
    default:
      parar_motores();
      break;
  }
}

// ============================================================
//  FUNCIÓN: blink()
//  Parpadeo del LED integrado — confirmación visual de estados.
// ============================================================
void blink(int veces = 3, int ms = 150) {
  for (int i = 0; i < veces; i++) {
    digitalWrite(LED_BUILTIN, HIGH);
    delay(ms);
    digitalWrite(LED_BUILTIN, LOW);
    delay(ms);
  }
}

// ============================================================
//  SETUP
// ============================================================
void setup() {
  // --- Pines de motores ---
  pinMode(MOTOR_IZQ_EN, OUTPUT);
  pinMode(MOTOR_IZQ_A,  OUTPUT);
  pinMode(MOTOR_IZQ_B,  OUTPUT);
  pinMode(MOTOR_DER_EN, OUTPUT);
  pinMode(MOTOR_DER_A,  OUTPUT);
  pinMode(MOTOR_DER_B,  OUTPUT);

  // --- LED de estado ---
  pinMode(LED_BUILTIN, OUTPUT);

  // --- Comunicaciones ---
  Serial.begin(115200);         // USB → Monitor serie (para log)
  bluetoothSerial.begin(9600);  // HC-05 en modo AT viene a 38400, pero normal a 9600

  // --- Seguridad inicial: motores apagados ---
  parar_motores();

  // --- Señal de inicio ---
  blink(5, 100);

  // --- Info de inicio por serie ---
  Serial.println(F("=== SOCCER JR. v1.0 - LISTO ==="));
  Serial.print(F("Driver: "));
  Serial.println(F(DRIVER_NAME));
  Serial.println(F("Comandos BT: F=Adelante B=Retroceder L=Izquierda R=Derecha S=Stop"));
  Serial.println(F("Escribe 'D' en el monitor serie para volcar el log post-match."));
}

// ============================================================
//  LOOP
// ============================================================
void loop() {
  // --- Leer comando Bluetooth ---
  if (bluetoothSerial.available()) {
    char received = (char)bluetoothSerial.read();

    // Solo procesar comandos válidos
    if (received == 'F' || received == 'B' || received == 'L' ||
        received == 'R' || received == 'S' || received == 'I' || received == 'J') {
      comandoActual = received;
      ejecutar_comando(comandoActual);
    }
  }

  // --- Leer batería cada 500ms ---
  static uint32_t ultimaLecturaBat = 0;
  if (millis() - ultimaLecturaBat > 500) {
    ultimaLecturaBat = millis();
    uint16_t bat_mv = leer_bateria_mv();

    // Protección LiPo: si voltaje cae a nivel crítico, apagar motores
    if (bat_mv < BAT_CRIT_MV && bat_mv > 1000) { // >1000 filtra lecturas falsas (cable desconectado)
      if (!bateriaApagada) {
        bateriaApagada = true;
        parar_motores();
        blink(10, 50);  // Parpadeo rápido de alerta
        Serial.println(F("!! BATERIA BAJA - MOTORES DESACTIVADOS !!"));
      }
    } else if (bat_mv >= BAT_WARN_MV) {
      bateriaApagada = false; // Reset si se reemplaza la batería
    }

    // Guardar en log cada 500ms
    guardar_log(comandoActual, bat_mv, (uint8_t)pwmIzq, (uint8_t)pwmDer);
  }

  // --- Recibir comando de debug por USB ---
  if (Serial.available()) {
    char serialCmd = (char)Serial.read();
    if (serialCmd == 'D' || serialCmd == 'd') {
      parar_motores(); // Seguridad: parar antes de volcar
      volcar_log_usb();
    }
  }
}
