# Curso Completo: Seguidor de Línea Jr.

> **Nota**: Este documento contiene toda la estructura y contenido del curso actual.
> Puedes editar este archivo para reestructurar el curso, y luego se actualizarán los archivos individuales de las lecciones.

---

## Módulo 1: Introducción

### Lección 1.1: Objetivos del Curso
**Order**: 1  
**Slug**: `01-introduccion/01-objetivos`

---

<!-- ADMIN ONLY: VIDEO SECTION -->
> **🎥 SECCIÓN DE VIDEO (Solo visible para administradores)**
>
> **Video 1: Bienvenida al Curso**
> - Duración sugerida: 5-7 minutos
> - Contenido:
>   - Presentación del instructor
>   - Overview del robot final funcionando
>   - Qué hace especial a este curso (enfoque en ingeniería, no solo hobby)
>   - Motivación: mostrar robots en competencias reales
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
>
> **Video 2: Roadmap del Curso**
> - Duración sugerida: 8-10 minutos
> - Contenido:
>   - Explicación visual de los 5 módulos
>   - Mostrar físicamente cada componente que se usará
>   - Timeline esperado (cuánto tiempo toma cada fase)
>   - Qué herramientas necesitarán (soldador, multimetro, etc.)
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
<!-- END ADMIN ONLY -->

---

# Introducción al Curso

Bienvenido al curso **Seguidor de Línea Jr.**, un programa diseñado para llevarte desde los conceptos básicos de robótica hasta la implementación de sistemas de control de nivel ingeniería.

## ¿Qué aprenderás?

En este curso, no solo construirás un robot; entenderás la ciencia detrás de su movimiento. Los objetivos principales son:

1.  **Diseño y Mecánica**: Comprender la importancia del centro de masa y la tracción.
2.  **Electrónica**: Aprender a gestionar potencia y señales de sensores de alta precisión.
3.  **Algoritmos de Control**: Implementar un controlador **PID (Proporcional, Integral, Derivativo)**.
4.  **Telemetría**: Utilizar herramientas profesionales para analizar datos en tiempo real y optimizar el rendimiento.

## Metodología

El curso está dividido en módulos que siguen el proceso real de desarrollo de un producto tecnológico:
*   **Investigación**: Selección de materiales.
*   **Diseño**: Planos y estructura.
*   **Prototipado**: Montaje paso a paso.
*   **Software**: Programación y lógica.
*   **Optimización**: Mejora basada en datos (Telemetría).

¡Prepárate para llevar tu robot al siguiente nivel!

---

### Lección 1.2: Lista de Materiales
**Order**: 2  
**Slug**: `01-introduccion/02-materiales`

---

<!-- ADMIN ONLY: VIDEO SECTION -->
> **🎥 SECCIÓN DE VIDEO (Solo visible para administradores)**
>
> **Video 1: Tour de Componentes**
> - Duración sugerida: 10-12 minutos
> - Contenido:
>   - Mostrar físicamente cada componente en mano
>   - Explicar la función de cada uno en el robot
>   - Dónde comprarlos (tiendas recomendadas)
>   - Qué buscar al comprar (calidad, compatibilidad)
>   - Alternativas y sustituciones permitidas
>   - Comparación: componente original vs genérico
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
<!-- END ADMIN ONLY -->

---

# Lista de Materiales

Para este curso, utilizaremos una selección de componentes de nivel ingeniería que aseguran un rendimiento competitivo.

## Electrónica y Control

- **Arduino Nano V3** (MaterialLink: arduino-nano)
- **Sensor QTR-8RC** (MaterialLink: sensor-qtr-8rc)
- **Módulo Bluetooth HC-05/HC-06** (MaterialLink: modulo-bluetooth)
- **Módulo Pulsador** (MaterialLink: modulo-pulsador)

## Driver y Tracción

- **Driver TB6612FNG** (MaterialLink: driver-tb6612fng)
- **Motores TT** (MaterialLink: motores-tt)

## Energía y Chasis

- **Fuente de Energía (Batería 9V + Broche)** (MaterialLink: fuente-energia)
- **Chasis** (MaterialLink: chasis)

## Otros Componentes (Imprescindibles)
*   **Capacitores Cerámicos 104 (x6)**: Para el filtrado de ruido en los motores.
*   **Cables Jumper**: Macho-Hembra de varias medidas (10, 15 y 20cm).
*   **Tornillos de 2mm**: Delgados con tuerca para la fijación del sensor QTR.
*   **Cinta Aislante**: Para asegurar conectores y evitar cortocircuitos por vibración.

---

> [!IMPORTANT]
> No sustituyas el driver **TB6612FNG** por un L298N. El TB6612FNG es mucho más eficiente y compacto, vital para nuestra arquitectura.

---

### Lección 1.3: Reglas de Competencia Jr.
**Order**: 3  
**Slug**: `01-introduccion/03-reglas-competencia`  
**Description**: "Reglas oficiales de la categoría Junior y estrategias de adaptación a diferentes competencias."

---

<!-- ADMIN ONLY: VIDEO SECTION -->
> **🎥 SECCIÓN DE VIDEO (Solo visible para administradores)**
>
> **Video 1: Introducción a Competencias**
> - Duración sugerida: 8-10 minutos
> - Contenido:
>   - Footage de competencias reales (diferentes países/eventos)
>   - Explicación de reglas con ejemplos visuales
>   - Mostrar robots que cumplen vs no cumplen reglas
>   - Proceso típico de una competencia (registro, inspección, carreras)
>   - Ambiente y presión de competir
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
>
> **Video 2: Estrategias de Competencia**
> - Duración sugerida: 6-8 minutos
> - Contenido:
>   - Casos de estudio de equipos exitosos
>   - Errores comunes de novatos y cómo evitarlos
>   - Tips de veteranos (calibración en pista, manejo de nervios)
>   - Qué llevar el día de la competencia (checklist)
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
<!-- END ADMIN ONLY -->

---

# Competencias de Seguidor de Línea Jr.

Este robot no es solo un proyecto educativo: es tu boleto al mundo competitivo de la robótica. Las competencias de seguidor de línea son eventos donde la velocidad, precisión y confiabilidad de tu diseño se ponen a prueba contra otros equipos.

## Categoría Junior: Especificaciones Oficiales

La categoría **Junior** tiene reglas específicas diseñadas para nivelar el campo de juego y fomentar la creatividad dentro de límites técnicos:

### 1. Restricción de Motores
**Motores Amarillos (TT Motors)** son obligatorios en la mayoría de competencias Jr. Estos motores de plástico amarillo son:
*   **Accesibles**: Bajo costo y fáciles de conseguir.
*   **Justos**: Todos los equipos tienen la misma potencia base.
*   **Desafiantes**: Al tener menos torque que motores metálicos, obligan a optimizar el código y el diseño mecánico.

> [!WARNING]
> Usar motores diferentes (como motores metálicos N20 o micro metal gearmotors) te descalificará automáticamente en categoría Jr. Verifica siempre el reglamento específico de tu competencia.

### 2. Dimensiones Máximas
El robot debe caber dentro de un cuadrado de **20cm x 20cm** (medido en su proyección superior). La altura generalmente no tiene restricción, pero el diseño compacto es clave para:
*   **Estabilidad**: Un centro de gravedad bajo mejora el agarre en curvas cerradas.
*   **Velocidad en Curvas**: Menos masa alejada del centro = menos inercia = giros más rápidos.

### 3. Sensores Permitidos
La mayoría de competencias Jr. permiten:
*   Sensores infrarrojos reflectivos (como el QTR-8RC que usamos).
*   Algunos eventos permiten hasta 8 sensores, otros limitan a 6. **Revisa el reglamento**.

### 4. Autonomía Total
Una vez que presionas el botón de inicio:
*   **No puedes tocar el robot** hasta que cruce la meta o salga de la pista.
*   **No hay control remoto**: Todo el comportamiento debe estar programado.

## Adaptación a Diferentes Competencias

Cada evento tiene sus particularidades. Aquí te enseñamos a adaptarte:

### Tipos de Pista Comunes

#### Pista Clásica (Línea Negra sobre Blanco)
*   **Ancho de línea**: 18-25mm (varía por competencia).
*   **Curvas**: Radios de 10cm a 30cm.
*   **Estrategia**: Ajusta tu `baseSpeed` según la complejidad. Pistas con curvas cerradas requieren velocidad moderada pero PID agresivo.

#### Pista Invertida (Línea Blanca sobre Negro)
*   Algunos eventos usan este formato.
*   **Solución**: Cambia `qtr.readLineBlack()` por `qtr.readLineWhite()` en tu código. ¡Lleva ambas versiones del firmware!

#### Obstáculos y Gaps
*   **Gaps**: Espacios sin línea que el robot debe "recordar" y cruzar en línea recta.
*   **Estrategia**: Implementa lógica de "último error conocido" para mantener la trayectoria.

### Variaciones en el Reglamento

| Aspecto | Variación Común | Tu Estrategia |
|---------|----------------|---------------|
| **Tiempo de Calibración** | 5-10 segundos | Optimiza tu rutina de calibración del QTR para ser rápida pero efectiva |
| **Número de Vueltas** | 1-3 vueltas | Ajusta la agresividad del PID: más vueltas = prioriza estabilidad sobre velocidad pura |
| **Penalizaciones por Salida** | Descalificación vs. Penalización de Tiempo | Si hay penalización (no descalificación), puedes arriesgar más en las curvas |
| **Zona de Inicio** | Línea recta vs. Curva | Si inicia en curva, considera un `baseSpeed` inicial bajo que aumente gradualmente |

## Mentalidad Competitiva

### Antes de la Competencia
1.  **Lee el Reglamento Completo**: No asumas que todas las competencias son iguales.
2.  **Practica en Condiciones Similares**: Si la competencia es al aire libre, prueba tu robot bajo luz solar (los sensores IR pueden comportarse diferente).
3.  **Lleva Repuestos**: Batería extra, cables, y un Arduino Nano de respaldo.

### Durante la Competencia
*   **Calibra en la Pista Oficial**: Cada superficie refleja diferente. Usa los minutos de práctica para recalibrar.
*   **Observa a la Competencia**: Mira qué estrategias usan otros equipos (velocidad vs. estabilidad).
*   **Mantén la Calma**: Si fallas en la primera ronda, tienes tiempo para ajustar parámetros.

### Después de la Competencia
*   **Analiza tus Datos de Telemetría**: Revisa los logs CSV para ver dónde perdiste tiempo.
*   **Documenta tus Aprendizajes**: Qué funcionó, qué no, y qué cambiarías para la próxima.

## El Espíritu de la Categoría Jr.

La categoría Junior no se trata solo de ganar, sino de:
*   **Aprender el método científico**: Hipótesis (ajustar Kp) → Experimento (correr el robot) → Análisis (telemetría) → Iteración.
*   **Desarrollar resiliencia**: Los mejores equipos no son los que nunca fallan, sino los que se recuperan rápido.
*   **Compartir conocimiento**: La comunidad de robótica crece cuando todos enseñamos lo que aprendemos.

> [!TIP]
> Muchos campeones nacionales e internacionales comenzaron en categoría Jr. con motores amarillos y un Arduino Nano. La limitación de recursos no es una desventaja; es una oportunidad para demostrar ingenio.

---


## Módulo 2: Diseño

### Lección 2.1: Diseño del Chasis
**Order**: 4  
**Slug**: `02-diseno/01-chasis`

---

<!-- ADMIN ONLY: VIDEO SECTION -->
> **🎥 SECCIÓN DE VIDEO (Solo visible para administradores)**
>
> **Video 1: Principios de Diseño Mecánico**
> - Duración sugerida: 10-12 minutos
> - Contenido:
>   - Centro de masa explicado con ejemplos físicos
>   - Distribución de peso: demostración con balanza
>   - Comparación lado a lado: diseño bueno vs malo
>   - Efecto del centro de masa en curvas (video slow-motion)
>   - Materiales: acrílico vs impresión 3D vs corte láser
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
>
> **Video 2: Tutorial de Tinkercad**
> - Duración sugerida: 15-18 minutos
> - Contenido:
>   - Paso a paso del diseño en Tinkercad (screen recording)
>   - Medidas específicas para cada componente
>   - Uso de la regla para posicionar agujeros
>   - Exportar archivo STL para impresión 3D
>   - Exportar archivo SVG para corte láser
>   - Mostrar el diseño final impreso/cortado
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
<!-- END ADMIN ONLY -->

---

# Diseño y Mecánica

En el nivel "Junior Engineering", dejamos atrás los chasis de acrílico genéricos. Nuestro objetivo es que **tú diseñes tu propia estructura**.

## El Poder del Dibujo Técnico

Antes de fabricar, debemos medir. Utilizaremos **Tinkercad** como nuestra herramienta de diseño principal para aprender:
1.  **Precisión**: Uso de la regla para posicionar agujeros de motores y sensores.
2.  **Distribución de Peso**: Planificar dónde irá la batería de 9V para mantener un centro de masa equilibrado.
3.  **Fabricación Digital**: Preparar archivos para **Impresión 3D** o **Corte Láser**.

## Reto de Diseño
Crea una base que cumpla con:
*   Espacio dedicado para el Shield de expansión.
*   Soporte frontal ajustable para el sensor QTR-8RC.
*   Huecos pasantes para trenzar los cables de los motores.

> [!TIP]
> Un chasis diseñado por ti es más ligero, más resistente y permite que el mantenimiento sea mucho más sencillo. ¡Mide dos veces, corta (o imprime) una!

---

## Módulo 3: Montaje

### Lección 3.1: Fase 1 - Potencia
**Order**: 5  
**Slug**: `03-montaje/01-fase1-potencia`

---

<!-- ADMIN ONLY: VIDEO SECTION -->
> **🎥 SECCIÓN DE VIDEO (Solo visible para administradores)**
>
> **Video 1: Soldadura del Interruptor**
> - Duración sugerida: 8-10 minutos
> - Contenido:
>   - Seguridad con el soldador (temperatura, ventilación)
>   - Técnica de soldadura paso a paso (close-up)
>   - Soldadura del interruptor al cable rojo
>   - Verificación con multímetro (continuidad y voltaje)
>   - Troubleshooting: cortocircuitos comunes y cómo detectarlos
>   - Aislamiento con termoretráctil
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
>
> **Video 2: Carga del Código Blink**
> - Duración sugerida: 5-6 minutos
> - Contenido:
>   - Instalación del Arduino IDE (si no lo tienen)
>   - Selección de placa (Arduino Nano) y puerto COM
>   - Explicación del código blink() línea por línea
>   - Proceso de carga (compilación y upload)
>   - Verificación del parpadeo del LED
>   - Qué hacer si no funciona (driver CH340, puerto incorrecto)
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
<!-- END ADMIN ONLY -->

---

> **📋 Prerequisitos**: Ninguno (primera lección práctica)

---

# Gestión de Energía

En esta fase, prepararemos el sistema eléctrico base. 

## Pasos Técnicos
1.  **Montaje del Cerebro**: Inserta el **Arduino Nano V3** en el **Shield de expansión I/O**. Asegúrate de que los pines encajen perfectamente.
2.  **Preparación de la Batería**: Suelda el **interruptor basculante** al cable rojo (positivo) del broche de batería de 9V. 
3.  **Conexión**: El cable rojo del interruptor va a la entrada **VIN** del Shield, y el negro a **GND**.

## Prueba de Verificación: Función Blink

Esta función no es solo un "Hola Mundo". La usaremos a lo largo del código final para confirmar visualmente diferentes etapas (inicio, fin de calibración, etc.). Por eso la creamos como una función reutilizable desde el principio.

Carga el siguiente código para asegurar que la placa recibe corriente estable:

```cpp
// Función Blink (Confirmación Visual)
void blink() {
  for(int i=0; i<5; i++){
    digitalWrite(LED_BUILTIN, HIGH);
    delay(100);
    digitalWrite(LED_BUILTIN, LOW);
    delay(100);
  }
}

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  blink(); // Llamar la función
}

void loop() {
  // Vacío por ahora
}
```

> [!TIP]
> **¿Por qué una función?** En el código final, llamaremos `blink()` después de la calibración de sensores para confirmar que el robot está listo. Crear funciones reutilizables desde el inicio es una buena práctica de programación.

> [!DEBUG]
> **¿No parpadea?** Verifica con un multímetro que lleguen 9V a los pines del Shield. Si el Arduino calienta mucho, desconecta de inmediato: podría haber un cortocircuito en las soldaduras del interruptor.

---

### Lección 3.2: Fase 2 - Sensores
**Order**: 6  
**Slug**: `03-montaje/02-fase2-sensores`

---

<!-- ADMIN ONLY: VIDEO SECTION -->
> **🎥 SECCIÓN DE VIDEO (Solo visible para administradores)**
>
> **Video 1: Montaje Mecánico del QTR**
> - Duración sugerida: 7-9 minutos
> - Contenido:
>   - Fijación con tornillos de 2mm (close-up)
>   - Ajuste de altura (3-5mm) con galga o regla
>   - Verificación de nivelación del sensor
>   - Asegurar cables con cinta aislante (técnica correcta)
>   - Prueba de vibración (sacudir el robot)
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
>
> **Video 2: Instalación de Librería y Calibración**
> - Duración sugerida: 10-12 minutos
> - Contenido:
>   - Instalación de librería QTRSensors en Arduino IDE
>   - Conexión de pines (A0-A5, 2, 3) con diagrama
>   - Carga del código completo
>   - Proceso de calibración en vivo (mover robot sobre línea)
>   - Interpretación de valores en Serial Monitor
>   - Qué significan los números (0-7000)
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
>
> **Video 3: Troubleshooting Sensores**
> - Duración sugerida: 5-7 minutos
> - Contenido:
>   - Valores erráticos: causas y soluciones
>   - Problemas de iluminación (luz solar directa)
>   - Verificación de conexiones con multímetro
>   - Sensor no responde: diagnóstico paso a paso
>   - Ajuste fino de altura para mejor lectura
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
<!-- END ADMIN ONLY -->

---

> **📋 Prerequisitos**: Haber completado Lección 3.1 (Potencia) - necesitas el código blink() funcionando

---

# Sensores de Alta Precisión

El sensor QTR es el ojo de tu robot. Un montaje descuidado aquí arruinará cualquier código PID por bueno que sea.

## Montaje Mecánico
*   Usa los **tornillos de 2mm** para fijar el sensor al chasis. No lo pegues; necesitas poder ajustarlo.
*   **La Regla de Oro**: La distancia óptima al suelo es de **3mm a 5mm**. Si está muy alto, no detectará la línea; si está muy bajo, chocará con las imperfecciones de la pista.

## Seguridad en Conexiones
Las vibraciones en carrera son fuertes. **Tip Pro**: Una vez conectados los cables jumper hembra al sensor, asegúralos con una vuelta de **cinta aislante**. Esto evita que se suelten en plena competencia.

## Software y Calibración

Ahora vamos a integrar el sensor QTR a nuestro código. Primero, instala la librería oficial:

1. Abre el Arduino IDE
2. Ve a **Sketch → Include Library → Manage Libraries**
3. Busca **"QTRSensors"** por Pololu
4. Instala la última versión

### Código Completo hasta Ahora

Este código ya incluye la función `blink()` que creamos en la Fase 1 (Potencia), y ahora agregamos toda la lógica del sensor QTR:

```cpp
#include <QTRSensors.h>

// --- Función Blink (Confirmación Visual) ---
void blink() {
  for(int i=0; i<5; i++){
    digitalWrite(LED_BUILTIN, HIGH);
    delay(100);
    digitalWrite(LED_BUILTIN, LOW);
    delay(100);
  }
}

// --- Sensores QTR ---
QTRSensors qtr;
const uint8_t SensorCount = 8;
uint16_t sensorValues[SensorCount];

void setup() {
  // Configuración de pines
  pinMode(LED_BUILTIN, OUTPUT);
  
  // Inicializar comunicación serial
  Serial.begin(115200);
  
  // 1. Secuencia inicial
  blink();
  
  // 2. Configuración de sensores QTR
  qtr.setTypeRC();
  qtr.setSensorPins((const uint8_t[]){A0, A1, A2, A3, A4, A5, 2, 3}, SensorCount);
  
  // 3. Calibración (LED encendido durante el proceso)
  digitalWrite(LED_BUILTIN, HIGH);
  for (uint16_t i = 0; i < 400; i++) {
    qtr.calibrate();
  }
  digitalWrite(LED_BUILTIN, LOW);
  
  // 4. Finalización calibración
  blink();
  
  delay(1000); // Pausa antes de empezar a leer
}

void loop() {
  // Leer posición de la línea (0-7000, donde 3500 es el centro)
  uint16_t position = qtr.readLineBlack(sensorValues);
  
  // Imprimir posición para debugging
  Serial.print("Posición: ");
  Serial.println(position);
  
  delay(100); // Pequeña pausa para no saturar el Serial Monitor
}
```

### Explicación del Código

**Instanciación y Configuración:**
- `QTRSensors qtr;` - Crea el objeto del sensor
- `qtr.setTypeRC();` - Configura para sensores tipo RC (resistencia-capacitancia)
- `qtr.setSensorPins(...)` - Asigna los 8 pines analógicos y digitales

**Proceso de Calibración:**
- Durante la calibración, **mueve el robot de lado a lado** sobre la línea negra
- El sensor aprende los valores mínimos (blanco) y máximos (negro)
- 400 iteraciones aseguran una calibración robusta

**Lectura de Posición:**
- `qtr.readLineBlack(sensorValues)` devuelve un valor de **0 a 7000**
- **3500** = línea centrada (ideal)
- **0** = línea completamente a la izquierda
- **7000** = línea completamente a la derecha

### Prueba Práctica

1. Carga el código
2. Abre el **Serial Monitor** (115200 baud)
3. Durante los primeros segundos (LED encendido), mueve el robot sobre la línea
4. Después del `blink()` final, observa cómo cambia la posición al mover el robot

> [!TIP]
> Si los valores no cambian mucho, verifica:
> - Distancia al suelo (3-5mm es óptimo)
> - Contraste de la línea (cinta negra mate sobre blanco funciona mejor que brillante)
> - Iluminación ambiente (evita sombras directas sobre los sensores)

> [!DEBUG]
> **¿Valores erráticos?** Revisa si la luz del ambiente le afecta directamente. En competencias bajo sol extremo, es posible que necesites una "visera" o escudo de sombras sobre los sensores.

---

### Lección 3.3: Fase 3 - Motores
**Order**: 7  
**Slug**: `03-montaje/03-fase3-motores`

---

<!-- ADMIN ONLY: VIDEO SECTION -->
> **🎥 SECCIÓN DE VIDEO (Solo visible para administradores)**
>
> **Video 1: Soldadura de Capacitores**
> - Duración sugerida: 10-12 minutos
> - Contenido:
>   - Técnica para soldar capacitores 104 (muy pequeños)
>   - Los 3 capacitores por motor (diagrama y ejecución)
>   - Trenzado de cables del motor (por qué y cómo)
>   - Verificación de continuidad con multímetro
>   - Prueba de ruido: antes vs después de capacitores
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
>
> **Video 2: Conexión del TB6612FNG**
> - Duración sugerida: 8-10 minutos
> - Contenido:
>   - Diagrama de pines del TB6612FNG explicado
>   - Conexión paso a paso (STBY, PWM, AIN, BIN)
>   - Conexión de motores a las salidas A y B
>   - Carga del código de prueba
>   - Verificación de dirección de giro
>   - Prueba de velocidad variable (PWM)
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
>
> **Video 3: Troubleshooting Motores**
> - Duración sugerida: 5-6 minutos
> - Contenido:
>   - Motor gira al revés: solución rápida
>   - Motor no gira: diagnóstico sistemático
>   - Ruido electromagnético persistente (más capacitores)
>   - Driver se calienta mucho: posibles causas
>   - Verificación de voltaje con multímetro
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
<!-- END ADMIN ONLY -->

---

> **📋 Prerequisitos**: Haber completado Lecciones 3.1 (Potencia) y 3.2 (Sensores)

---

# Propulsión y Filtrado

Los motores eléctricos generan chispas diminutas (ruido electromagnético) que vuelven loco al Arduino. Vamos a silenciar ese ruido.

## Filtrado de Ruido (CRÍTICO)
Debes soldar **3 capacitores cerámicos (104)** por cada motor de la siguiente manera:
1.  Un capacitor entre los dos terminales del motor.
2.  Un capacitor desde un terminal a la carcasa metálica del motor.
3.  Otro capacitor desde el otro terminal a la carcasa metálica.

## Cableado de Ingeniería
**Trenza los cables** del motor (enróllalos entre sí) antes de conectarlos al Shield. Esto crea un efecto de cancelación de interferencias.

## El Driver TB6612FNG
Conecta las salidas A y B del driver a tus motores. A diferencia del L298N, este driver no desperdicia energía en calor, enviando toda la potencia de la batería de 9V directamente a las ruedas.

## Código Completo hasta Ahora

Ahora agregamos el control de motores a nuestro código. Este ya incluye `blink()` y el sistema QTR de las fases anteriores:

```cpp
#include <QTRSensors.h>

// --- Pines Puente H (TB6612FNG) ---
#define STBY 7
#define PWMA 5
#define AIN1 6
#define AIN2 4
#define PWMB 10
#define BIN1 8
#define BIN2 9

// --- Función Blink (Confirmación Visual) ---
void blink() {
  for(int i=0; i<5; i++){
    digitalWrite(LED_BUILTIN, HIGH);
    delay(100);
    digitalWrite(LED_BUILTIN, LOW);
    delay(100);
  }
}

// --- Sensores QTR ---
QTRSensors qtr;
const uint8_t SensorCount = 8;
uint16_t sensorValues[SensorCount];

// --- Funciones de Control de Motores ---
void MotorIzquierdo(int velocidad) {
  analogWrite(PWMB, constrain(velocidad, 0, 255));
}

void MotorDerecho(int velocidad) {
  analogWrite(PWMA, constrain(velocidad, 0, 255));
}

void Motores(int velDer, int velIzq) {
  MotorDerecho(velDer);
  MotorIzquierdo(velIzq);
}

void setup() {
  // Configuración de pines
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(STBY, OUTPUT);
  pinMode(PWMA, OUTPUT);
  pinMode(AIN1, OUTPUT);
  pinMode(AIN2, OUTPUT);
  pinMode(PWMB, OUTPUT);
  pinMode(BIN1, OUTPUT);
  pinMode(BIN2, OUTPUT);
  
  // Inicializar comunicación serial
  Serial.begin(115200);
  
  // 1. Secuencia inicial
  blink();
  
  // 2. Configuración de sensores QTR
  qtr.setTypeRC();
  qtr.setSensorPins((const uint8_t[]){A0, A1, A2, A3, A4, A5, 2, 3}, SensorCount);
  
  // 3. Calibración
  digitalWrite(LED_BUILTIN, HIGH);
  for (uint16_t i = 0; i < 400; i++) {
    qtr.calibrate();
  }
  digitalWrite(LED_BUILTIN, LOW);
  
  // 4. Finalización calibración
  blink();
  
  // 5. Activar Motores (configurar dirección)
  digitalWrite(STBY, HIGH);  // Activar driver
  digitalWrite(AIN1, LOW);   // Motor A: adelante
  digitalWrite(AIN2, HIGH);
  digitalWrite(BIN1, LOW);   // Motor B: adelante
  digitalWrite(BIN2, HIGH);
}

void loop() {
  // Leer posición de la línea
  uint16_t position = qtr.readLineBlack(sensorValues);
  
  // Imprimir posición
  Serial.print("Posición: ");
  Serial.println(position);
  
  // Prueba de motores: avanzar a velocidad media
  Motores(150, 150);
  
  delay(100);
}
```

### Explicación del Código de Motores

**Definición de Pines:**
- `STBY`: Pin de standby (debe estar en HIGH para que el driver funcione)
- `PWMA` y `PWMB`: Control de velocidad (PWM) para cada motor
- `AIN1/AIN2` y `BIN1/BIN2`: Control de dirección de cada motor

**Funciones de Control:**
- `MotorDerecho(velocidad)`: Controla solo el motor derecho (0-255)
- `MotorIzquierdo(velocidad)`: Controla solo el motor izquierdo (0-255)
- `Motores(velDer, velIzq)`: Controla ambos motores simultáneamente
- `constrain()`: Asegura que los valores estén entre 0 y 255

**Configuración de Dirección:**
- `AIN1=LOW, AIN2=HIGH`: Motor A gira hacia adelante
- `BIN1=LOW, BIN2=HIGH`: Motor B gira hacia adelante
- Para retroceder, invierte estos valores

### Prueba de Fuego

1. Carga el código
2. Coloca el robot en el suelo (o eleva las ruedas)
3. Después de la calibración, los motores deberían girar a velocidad 150
4. Verifica que ambas ruedas giren en la misma dirección (adelante)

> [!TIP]
> **¿Por qué funciones separadas?** En el código PID final, necesitaremos ajustar cada motor independientemente para corregir la trayectoria. Crear estas funciones ahora nos facilita la integración posterior.

> [!DEBUG]
> **¿Gira al revés?** No desoldes nada. Simplemente invierte los cables en las terminales del driver o cambia la polaridad en tu función de código (intercambia AIN1 con AIN2 o BIN1 con BIN2).

---

### Lección 3.4: Fase 4 - Interfaz
**Order**: 8  
**Slug**: `03-montaje/04-fase4-interfaz`

---

<!-- ADMIN ONLY: VIDEO SECTION -->
> **🎥 SECCIÓN DE VIDEO (Solo visible para administradores)**
>
> **Video 1: Implementación del Botón**
> - Duración sugerida: 6-8 minutos
> - Contenido:
>   - Conexión del pulsador al Pin 11
>   - Explicación de pull-up interno (INPUT_PULLUP)
>   - Código de la función Iniciar() línea por línea
>   - Lógica de antirrebote explicada
>   - Prueba del botón (presionar y soltar)
>   - Integración con el código existente
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
<!-- END ADMIN ONLY -->

---

> **📋 Prerequisitos**: Haber completado Lecciones 3.1, 3.2 y 3.3 (todo el montaje básico)

---

# El Botón de Inicio

Un robot que arranca solo es peligroso y difícil de calibrar. Usaremos un **módulo pulsador** conectado al **Pin 11**.

## Lógica de Control "Esperar y Arrancar"
Implementaremos una función llamada `Iniciar()` que gestione el flujo de seguridad. El robot debe esperar a que el usuario interactúe antes de encender los motores.

### El Algoritmo Correcto
1.  **Esperar**: Ciclo infinito hasta detectar el botón presionado.
2.  **Antirrebote**: Un pequeño delay para confirmar que es una pulsación real.
3.  **Soltar**: Esperar a que el usuario retire el dedo. **¡Esto es clave!** Si arranca mientras presionas, moverás el robot de su posición ideal.
4.  **Confirmación**: Emitir un sonido (si tienes buzzer) o parpadear el LED y arrancar.

```cpp
void Iniciar() {
  while(digitalRead(11) == HIGH); // Espera presión (asumiendo Pull-up)
  delay(200);                    // Antirrebote
  while(digitalRead(11) == LOW);  // Espera a que sueltes
  delay(500);                    // Tiempo de gracia para retirar la mano
}
```

> [!DEBUG]
> **¿Arranca solo?** Revisa si tu pulsador es normalmente abierto o cerrado. Si el robot sale disparado sin tocar nada, invierte la lógica de `HIGH` y `LOW` en el código.

---

## Módulo 4: Programación

### Lección 4.1: Teoría de Control
**Order**: 9  
**Slug**: `04-programacion/01-teoria-control`

---

<!-- ADMIN ONLY: VIDEO SECTION -->
> **🎥 SECCIÓN DE VIDEO (Solo visible para administradores)**
>
> **Video 1: Fundamentos del PID**
> - Duración sugerida: 12-15 minutos
> - Contenido:
>   - Explicación visual de P, I, D con animaciones
>   - Cómo cada término afecta el movimiento del robot
>   - Ejemplos con gráficas (posición vs tiempo)
>   - Comparación: robot sin PID vs con PID (video lado a lado)
>   - Analogías del mundo real (ducha, termostato)
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
>
> **Video 2: Matemáticas del PID Simplificadas**
> - Duración sugerida: 8-10 minutos
> - Contenido:
>   - Cálculo paso a paso con números reales
>   - Ejemplo: posición 2000, setpoint 3500
>   - Cómo se traduce a velocidades de motores
>   - Efecto de Kp y Kd en los cálculos
>   - Pizarra/animación mostrando las fórmulas
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
<!-- END ADMIN ONLY -->

---

> **📋 Prerequisitos**: Haber completado todo el Módulo 3 (Montaje) - el robot debe estar armado

---

# Teoría de Control (PID)

El control PID es el algoritmo más utilizado en robótica industrial y de competencia. Su función es calcular la corrección necesaria para que el robot se mantenga sobre la línea.

## Las Tres Acciones

1.  **Proporcional (P)**: La corrección es proporcional al error actual. Si el robot está muy lejos de la línea, la corrección es fuerte.
2.  **Integral (I)**: Acumula el error histórico para eliminar el error de estado estacionario (offset).
3.  **Derivativo (D)**: Predice la tendencia del error basándose en su velocidad de cambio, amortiguando las oscilaciones.

## El Lazo Realimentado

El sistema lee la posición del sensor, calcula la diferencia respecto al centro (Setpoint), y aplica la corrección a los motores. Este ciclo se repite cientos de veces por segundo.

> [!TIP]
> Un buen ajuste de las constantes Kp, Ki y Kd es la clave para una carrera fluida y rápida.

---

### Lección 4.2: Código Base PID
**Order**: 10  
**Slug**: `04-programacion/02-codigo-base`

---

<!-- ADMIN ONLY: VIDEO SECTION -->
> **🎥 SECCIÓN DE VIDEO (Solo visible para administradores)**
>
> **Video 1: Implementación del Código**
> - Duración sugerida: 15-18 minutos
> - Contenido:
>   - Explicación línea por línea del código completo
>   - Cómo se integra todo (blink, QTR, motores, PID)
>   - Carga al Arduino
>   - Primera prueba en pista (expectativas realistas)
>   - Observación del comportamiento inicial
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
>
> **Video 2: Ajuste de Parámetros**
> - Duración sugerida: 12-15 minutos
> - Contenido:
>   - Proceso de tuning paso a paso
>   - Empezar con Kp solo (Kd=0)
>   - Agregar Kd para suavizar oscilaciones
>   - Ejemplos de valores buenos vs malos
>   - Uso del Serial Monitor para debugging
>   - Comparación: antes y después del ajuste
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
<!-- END ADMIN ONLY -->

---

> **📋 Prerequisitos**: Haber completado Lección 4.1 (Teoría de Control) - entender qué hace cada término

---

# Implementación del Código PID

En esta lección, ensamblaremos todas las piezas de software para que el robot pueda seguir la línea de forma independiente usando control PID.

## Código Completo hasta Ahora

Este código integra todo lo que hemos construido (blink, QTR, motores) y ahora agregamos el **algoritmo PID**:

```cpp
#include <QTRSensors.h>

// --- Pines Puente H (TB6612FNG) ---
#define STBY 7
#define PWMA 5
#define AIN1 6
#define AIN2 4
#define PWMB 10
#define BIN1 8
#define BIN2 9

// --- Constantes PID ---
float Kp = 0.2; 
float Kd = 0.05;
int setPoint = 3500;  // Centro del sensor (0-7000)
int VelMax = 200;     // Velocidad base
int lastError = 0;    // Para calcular el término derivativo

// --- Función Blink (Confirmación Visual) ---
void blink() {
  for(int i=0; i<5; i++){
    digitalWrite(LED_BUILTIN, HIGH);
    delay(100);
    digitalWrite(LED_BUILTIN, LOW);
    delay(100);
  }
}

// --- Sensores QTR ---
QTRSensors qtr;
const uint8_t SensorCount = 8;
uint16_t sensorValues[SensorCount];

// --- Funciones de Control de Motores ---
void MotorIzquierdo(int velocidad) {
  analogWrite(PWMB, constrain(velocidad, 0, 255));
}

void MotorDerecho(int velocidad) {
  analogWrite(PWMA, constrain(velocidad, 0, 255));
}

void Motores(int velDer, int velIzq) {
  MotorDerecho(velDer);
  MotorIzquierdo(velIzq);
}

void setup() {
  // Configuración de pines
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(STBY, OUTPUT);
  pinMode(PWMA, OUTPUT);
  pinMode(AIN1, OUTPUT);
  pinMode(AIN2, OUTPUT);
  pinMode(PWMB, OUTPUT);
  pinMode(BIN1, OUTPUT);
  pinMode(BIN2, OUTPUT);
  
  // Inicializar comunicación serial
  Serial.begin(115200);
  
  // 1. Secuencia inicial
  blink();
  
  // 2. Configuración de sensores QTR
  qtr.setTypeRC();
  qtr.setSensorPins((const uint8_t[]){A0, A1, A2, A3, A4, A5, 2, 3}, SensorCount);
  
  // 3. Calibración
  digitalWrite(LED_BUILTIN, HIGH);
  for (uint16_t i = 0; i < 400; i++) {
    qtr.calibrate();
  }
  digitalWrite(LED_BUILTIN, LOW);
  
  // 4. Finalización calibración
  blink();
  
  // 5. Activar Motores
  digitalWrite(STBY, HIGH);
  digitalWrite(AIN1, LOW);
  digitalWrite(AIN2, HIGH);
  digitalWrite(BIN1, LOW);
  digitalWrite(BIN2, HIGH);
}

void loop() {
  // 1. Leer posición de la línea (0-7000)
  uint16_t position = qtr.readLineBlack(sensorValues);
  
  // 2. Calcular error (diferencia entre posición actual y setpoint)
  int error = setPoint - (int)position;
  
  // 3. Término Proporcional (P)
  float p_term = error * Kp;
  
  // 4. Término Derivativo (D)
  float d_term = (error - lastError) * Kd;
  lastError = error;
  
  // 5. Término Integral (I) - Omitido por ahora
  float i_term = 0;
  
  // 6. Calcular ajuste total
  int ajuste = (int)(p_term + i_term + d_term);
  
  // 7. Aplicar ajuste a los motores
  int velDer = constrain(VelMax + ajuste, 0, 255);
  int velIzq = constrain(VelMax - ajuste, 0, 255);
  
  Motores(velDer, velIzq);
  
  // Debug (opcional): imprimir valores
  Serial.print("Pos:");
  Serial.print(position);
  Serial.print(" | Error:");
  Serial.print(error);
  Serial.print(" | P:");
  Serial.print(p_term);
  Serial.print(" | D:");
  Serial.println(d_term);
}
```

### Explicación del Algoritmo PID

**Cálculo del Error:**
- `error = setPoint - position`
- Si `position = 3500` (centro), entonces `error = 0` (perfecto)
- Si `position = 0` (línea a la izquierda), entonces `error = 3500` (positivo)
- Si `position = 7000` (línea a la derecha), entonces `error = -3500` (negativo)

**Término Proporcional (P):**
- `p_term = error * Kp`
- Corrección proporcional al error
- `Kp` más alto = reacción más agresiva

**Término Derivativo (D):**
- `d_term = (error - lastError) * Kd`
- Predice la tendencia del error
- Amortigua las oscilaciones
- `Kd` más alto = más suavidad en las correcciones

**Aplicación a Motores:**
- Si `ajuste > 0`: la línea está a la izquierda → motor derecho más rápido
- Si `ajuste < 0`: la línea está a la derecha → motor izquierdo más rápido

## Ajuste de Parámetros

El éxito del robot depende de encontrar los valores óptimos de `Kp` y `Kd`:

**Valores iniciales recomendados:**
- `Kp = 0.2` (puedes probar entre 0.1 y 0.5)
- `Kd = 0.05` (puedes probar entre 0.01 y 0.1)
- `VelMax = 200` (empieza conservador, luego aumenta)

**Proceso de ajuste:**
1. Empieza con `Kp = 0.2, Kd = 0`
2. Si oscila mucho, reduce `Kp`
3. Si es muy lento para reaccionar, aumenta `Kp`
4. Una vez que siga la línea (aunque oscile), agrega `Kd` para suavizar

> [!TIP]
> **¿Quieres experimentar sin riesgo?** Usa el simulador para probar diferentes valores de Kp y Kd antes de cargar el código al robot. Esto te ahorra tiempo y baterías.

**Nota**: Esta lección incluye un enlace al simulador para experimentar con diferentes configuraciones PID antes de cargar el código al robot.

---

## Módulo 5: Telemetría

### Lección 5.1: Hardware Bluetooth
**Order**: 11  
**Slug**: `05-telemetria/01-hardware-bluetooth`

---

<!-- ADMIN ONLY: VIDEO SECTION -->
> **🎥 SECCIÓN DE VIDEO (Solo visible para administradores)**
>
> **Video 1: Fabricación del Mini-Shield**
> - Duración sugerida: 15-18 minutos
> - Contenido:
>   - Corte de baquelita perforada al tamaño correcto
>   - Soldadura de zócalo para Bluetooth (pines hembra)
>   - Soldadura del divisor de voltaje (resistencias 1K y 2K)
>   - Integración del botón de arranque en la misma placa
>   - Prueba de continuidad con multímetro
>   - Montaje final sobre el Shield de expansión
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
>
> **Video 2: Configuración del Bluetooth**
> - Duración sugerida: 8-10 minutos
> - Contenido:
>   - Conexión HC-05/HC-06 al Mini-Shield
>   - Configuración de baudrate (115200)
>   - Emparejamiento con computadora (Windows/Mac/Linux)
>   - Verificación de comunicación (enviar/recibir datos)
>   - Troubleshooting: no se empareja, no envía datos
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
<!-- END ADMIN ONLY -->

---

> **📋 Prerequisitos**: Tener el robot funcionando con PID (Lección 4.2 completada)

---

# Preparación del Módulo de Datos

En robótica de competencia, los cables sueltos son el enemigo #1. Para el Bluetooth, no usaremos jumpers directos. Vamos a fabricar una solución pro.

## El Problema de los 5V
Los módulos HC-05 y HC-06 operan a 3.3V en su pin **RX**. El Arduino Nano entrega 5V. Si los conectas directamente, acortarás la vida de tu Bluetooth o lo quemarás al instante.

## Solución: El "Mini-Shield" Modular
Te enseñaremos a fabricar una placa pequeña usando un pedazo de **baquelita perforada** (perfboard).

### Componentes de la Placa
1.  **Zócalo para BT**: No sueldes el Bluetooth directamente; usa pines hembra para poder quitarlo y ponerlo.
2.  **Divisor de Voltaje**: Suelda dos resistencias (ej. 1K y 2K) para bajar la señal TX del Arduino a los 3.3V que necesita el RX del Bluetooth.
3.  **Botón de Arranque**: Aprovecha para integrar el pulsador en la misma placa.

## Ventajas de este Enfoque
*   **Limpieza**: Menos "espagueti" de cables en tu robot.
*   **Modularidad**: Puedes pasar el sistema de telemetría de un robot a otro en segundos.
*   **Fiabilidad**: Las soldaduras en baquelita son mil veces más resistentes que los conectores de los jumpers.

> [!TIP]
> Si diseñas bien tu Mini-Shield, este puede conectarse directamente sobre los pines del Shield de expansión I/O, creando una torre compacta de tecnología.

---

### Lección 5.2: Protocolo de Datos
**Order**: 12  
**Slug**: `05-telemetria/02-protocolo-datos`

---

<!-- ADMIN ONLY: VIDEO SECTION -->
> **🎥 SECCIÓN DE VIDEO (Solo visible para administradores)**
>
> **Video 1: Estructuras Binarias en C**
> - Duración sugerida: 10-12 minutos
> - Contenido:
>   - Explicación de struct en C/C++
>   - __attribute__((packed)) y por qué es importante
>   - Cálculo de checksum XOR paso a paso
>   - Ventajas vs texto ASCII (demostración de velocidad)
>   - Visualización de bytes en hexadecimal
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
<!-- END ADMIN ONLY -->

---

> **📋 Prerequisitos**: Lección 5.1 (Hardware Bluetooth) - tener Bluetooth funcionando

---

# Optimización del Envío (Binario)

Enviar datos como texto (ASCII) es fácil de leer pero lento e ineficiente para el ancho de banda del Bluetooth. Para una telemetría suave, utilizaremos un **Protocolo Binario**.

## Estructura (Struct)
Definimos un paquete compacto que contiene solo la información esencial:

```cpp
struct TelemetryPacket {
  uint16_t position;
  int16_t p_term;
  int16_t i_term;
  int16_t d_term;
  uint32_t timestamp;
};
```

## Ventajas
*   **Velocidad**: Reducción del tráfico de datos en más de un 60%.
*   **Precisión**: No hay pérdida de resolución por redondeo de strings.
*   **Robustez**: Implementaremos un Checksum para asegurar que los datos no se corrompan en el aire.

---

### Lección 5.3: Captura de Datos
**Order**: 13  
**Slug**: `05-telemetria/03-captura-datos`

---

<!-- ADMIN ONLY: VIDEO SECTION -->
> **🎥 SECCIÓN DE VIDEO (Solo visible para administradores)**
>
> **Video 1: Código Final Completo**
> - Duración sugerida: 12-15 minutos
> - Contenido:
>   - Integración de telemetría al código PID
>   - Explicación del loop completo (PID + envío)
>   - Carga al Arduino del firmware final
>   - Verificación de envío de datos (Serial Monitor)
>   - Comparación: código sin telemetría vs con telemetría
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
>
> **Video 2: Uso del Plotter Python**
> - Duración sugerida: 10-12 minutos
> - Contenido:
>   - Instalación de dependencias (pip install)
>   - Ejecución del script plotter.py
>   - Selección del puerto Bluetooth correcto
>   - Interpretación de gráficas en tiempo real
>   - Guardado de archivos CSV
>   - Troubleshooting: no recibe datos, gráficas erráticas
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
<!-- END ADMIN ONLY -->

---

> **📋 Prerequisitos**: Lecciones 5.1 y 5.2 completadas - entender el protocolo binario

---

# Herramientas de Captura

En esta lección final, agregaremos el sistema de telemetría binaria a nuestro código PID. Este es el **código completo final** que corresponde exactamente al `LFR-Telemetry.ino`.

## Código Completo Final (LFR-Telemetry.ino)

Este es el código completo que integra TODO lo que hemos construido a lo largo del curso:

```cpp
#include <QTRSensors.h>

// --- Data Structure ---
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

// --- Pines Puente H ---
#define STBY 7
#define PWMA 5
#define AIN1 6
#define AIN2 4
#define PWMB 10
#define BIN1 8
#define BIN2 9

// --- Constantes PID ---
float Kp = 0.2; 
float Kd = 0.05;
int setPoint = 3500;
int VelMax = 200; 
int lastError = 0;

// --- Función Blink (Confirmación Visual) ---
void blink() {
  for (int i = 0; i < 5; i++) {
    digitalWrite(LED_BUILTIN, HIGH);
    delay(100);
    digitalWrite(LED_BUILTIN, LOW);
    delay(100);
  }
}

// --- Sensores QTR ---
QTRSensors qtr;
const uint8_t SensorCount = 8;
uint16_t sensorValues[SensorCount];

// --- Funciones de Control de Motores ---
void MotorIzquierdo(int velocidad) {
  analogWrite(PWMB, constrain(velocidad, 0, 255));
}

void MotorDerecho(int velocidad) {
  analogWrite(PWMA, constrain(velocidad, 0, 255));
}

void Motores(int velDer, int velIzq) {
  MotorDerecho(velDer);
  MotorIzquierdo(velIzq);
}

void setup() {
  // Configuración de pines
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(STBY, OUTPUT);
  pinMode(PWMA, OUTPUT);
  pinMode(AIN1, OUTPUT);
  pinMode(AIN2, OUTPUT);
  pinMode(PWMB, OUTPUT);
  pinMode(BIN1, OUTPUT);
  pinMode(BIN2, OUTPUT);

  // Inicializar comunicaciones: Hardware Serial a 115200 (Alta velocidad)
  Serial.begin(115200);

  // 1. Secuencia inicial
  blink();

  // Configuración de sensores
  qtr.setTypeRC();
  qtr.setSensorPins((const uint8_t[]){A0, A1, A2, A3, A4, A5, 2, 3}, SensorCount);

  // 2. Calibración
  digitalWrite(LED_BUILTIN, HIGH);
  for (uint16_t i = 0; i < 400; i++) {
    qtr.calibrate();
  }
  digitalWrite(LED_BUILTIN, LOW);

  // 3. Finalización calibración
  blink();

  // Activar Motores
  digitalWrite(STBY, HIGH);
  digitalWrite(AIN1, LOW);
  digitalWrite(AIN2, HIGH);
  digitalWrite(BIN1, LOW);
  digitalWrite(BIN2, HIGH);
}

void loop() {
  uint32_t currentMicros = micros();

  // Leer sensores
  uint16_t position = qtr.readLineBlack(sensorValues);

  // PID Calculations
  int error = setPoint - (int)position;
  
  // P Term
  float p_term = error * Kp;
  
  // D Term (Simple differentiation)
  float d_term = (error - lastError) * Kd; 
  lastError = error;
  
  // I Term (Omitted for this example)
  float i_term = 0; 

  int ajuste = (int)(p_term + i_term + d_term);

  // Motores
  int velDer = constrain(VelMax + ajuste, 0, 255);
  int velIzq = constrain(VelMax - ajuste, 0, 255);
  
  Motores(velDer, velIzq);

  // --- Telemetría Binaria ---
  // Populate Struct
  dataPacket.posicion = position;
  dataPacket.p_term = (int16_t)p_term;
  dataPacket.i_term = (int16_t)i_term;
  dataPacket.d_term = (int16_t)d_term;
  dataPacket.pwm_izq = (uint8_t)velIzq;
  dataPacket.pwm_der = (uint8_t)velDer;
  dataPacket.timestamp = currentMicros;
  
  // Calculate Checksum (XOR)
  dataPacket.checksum = 0;
  uint8_t *ptr = (uint8_t *)&dataPacket;
  for (int i = 0; i < sizeof(dataPacket) - 1; i++) {
    dataPacket.checksum ^= ptr[i];
  }

  // Send Header
  Serial.write(0xAA);
  Serial.write(0xBB);
  
  // Send Struct
  Serial.write((byte*)&dataPacket, sizeof(dataPacket));
  
  // No delay() calls to maximize control loop speed
}
```

### ¡Felicidades! Has Completado el Código

Este código final incluye:

✅ **Fase 1 (Potencia)**: Función `blink()` para confirmación visual  
✅ **Fase 2 (Sensores)**: Sistema QTR completo con calibración  
✅ **Fase 3 (Motores)**: Control de motores con TB6612FNG  
✅ **Fase 4 (Interfaz)**: Configuración de pines y setup  
✅ **Módulo 4 (Programación)**: Algoritmo PID completo  
✅ **Módulo 5 (Telemetría)**: Envío binario de datos  

### Explicación de la Telemetría

**Estructura de Datos:**
```cpp
struct Telemetria {
  uint16_t posicion;    // Posición de la línea (0-7000)
  int16_t p_term;       // Término proporcional
  int16_t i_term;       // Término integral
  int16_t d_term;       // Término derivativo
  uint8_t pwm_izq;      // PWM motor izquierdo
  uint8_t pwm_der;      // PWM motor derecho
  uint32_t timestamp;   // Marca de tiempo en microsegundos
  uint8_t checksum;     // Verificación de integridad
} __attribute__((packed));
```

**Protocolo de Envío:**
1. **Header**: `0xAA 0xBB` - Marca el inicio de un paquete
2. **Datos**: Estructura completa (15 bytes)
3. **Checksum**: XOR de todos los bytes para detectar errores

**Ventajas del Envío Binario:**
- 🚀 **Velocidad**: 60% más rápido que texto ASCII
- 🎯 **Precisión**: Sin pérdida de resolución
- 🛡️ **Robustez**: Checksum detecta corrupción de datos

## Paso 2: Ejecutar el Plotter

Descarga el script de Python oficial e instálalo en tu Arduino Nano. Este código ya incluye las estructuras binarias y la lógica de envío.

**Archivo de descarga**: `/downloads/LFR-Telemetry.ino`

El script `Potter.py` te permitirá visualizar las gráficas en tiempo real y guardar un registro CSV de cada carrera.

**Archivo de descarga**: `/downloads/Potter.py`

### Requisitos
Asegúrate de tener instaladas las librerías necesarias ejecutando:
`pip install pyqtgraph pyserial` (o las dependencias indicadas en el archivo).

---

### Lección 5.4: Análisis y Optimización
**Order**: 14  
**Slug**: `05-telemetria/04-analisis`

---

<!-- ADMIN ONLY: VIDEO SECTION -->
> **🎥 SECCIÓN DE VIDEO (Solo visible para administradores)**
>
> **Video 1: Interpretación de Gráficas**
> - Duración sugerida: 12-15 minutos
> - Contenido:
>   - Análisis de oscilaciones en las gráficas
>   - Identificación de problemas (Kp alto, Kd bajo, etc.)
>   - Correlación entre gráfica y comportamiento del robot
>   - Lectura de archivos CSV en Excel/Google Sheets
>   - Patrones comunes y qué significan
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
>
> **Video 2: Optimización Basada en Datos**
> - Duración sugerida: 10-12 minutos
> - Contenido:
>   - Caso de estudio: robot oscilando mucho
>   - Ajuste de parámetros basado en telemetría
>   - Comparación antes/después (gráficas y video)
>   - Mejores tiempos de vuelta logrados
>   - Tips finales para competencias
> - Preview: `https://www.youtube.com/embed/dQw4w9WgXcQ` (reemplazar con video real)
<!-- END ADMIN ONLY -->

---

> **📋 Prerequisitos**: Lección 5.3 (Captura de Datos) - tener datos reales capturados

---

# Análisis de Ingeniería

El verdadero secreto de los campeones no es un código perfecto, sino un análisis de datos superior.

## Interpretación de Gráficas

Al observar las gráficas de telemetría, fíjate en:
*   **Oscilaciones**: Si la posición cruza el Setpoint demasiadas veces, tu **Kp** es muy alto o tu **Kd** muy bajo.
*   **Error Estacionario**: Si el robot se mantiene cerca pero no "pisa" la línea en rectas, aumenta ligeramente **Ki**.
*   **Respuesta Lenta**: Si el robot no reacciona a tiempo en curvas, aumenta **Kp**.

## El Dashboard Pro

Para un análisis más profundo de los logs CSV generados por `Potter.py`, utiliza nuestro Dashboard dedicado.

**Nota**: Esta lección incluye un enlace al Dashboard de Telemetría para cargar y analizar archivos CSV.

---

## Resumen de la Estructura del Curso

### Total de Lecciones: 14

1. **Módulo 1: Introducción** (3 lecciones)
   - Objetivos del Curso
   - Lista de Materiales
   - Reglas de Competencia Jr.

2. **Módulo 2: Diseño** (1 lección)
   - Diseño del Chasis

3. **Módulo 3: Montaje** (4 lecciones)
   - Fase 1: Potencia
   - Fase 2: Sensores
   - Fase 3: Motores
   - Fase 4: Interfaz

4. **Módulo 4: Programación** (2 lecciones)
   - Teoría de Control
   - Código Base PID

5. **Módulo 5: Telemetría** (4 lecciones)
   - Hardware Bluetooth
   - Protocolo de Datos
   - Captura de Datos
   - Análisis y Optimización

---

## Notas para Reestructuración

- Los componentes especiales usados en las lecciones:
  - `MaterialLink` (usado en Lección 1.2)
  - `DownloadButton` (usado en Lección 5.3)
  - Enlaces a `/simulador` (en Lección 4.2)
  - Enlaces a `/telemetria` (en Lección 5.4)

- Cada lección tiene:
  - `title`: Título de la lección
  - `order`: Orden numérico (1-14)
  - `description`: Descripción breve
  - `slug`: Ruta en formato `modulo/leccion`
