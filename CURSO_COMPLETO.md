# Curso Completo: Robot Soccer Jr.
---


## Módulo: Introduccion

### Objetivos del Curso: Robot Soccer Jr.
**Order**: 1  
**Slug**: `01-introduccion/01-objetivos`

---

<AdminOnly>
> **🎥 SECCIÓN DE VIDEO (Solo visible para administradores)**
>
> **Video 1: Bienvenida y Robot en Acción**
> - Duración: 5-7 min
> - Mostrar el robot terminado en una cancha real, empujando el balón y metiendo gol.
> - Presentación del instructor y roadmap del curso.
>
> **Video 2: ¿Qué vamos a aprender?**
> - Duración: 6-8 min
> - Explicar visualmente los 5 módulos con recursos físicos en mano.
</AdminOnly>

---

# 🤖 Bienvenido al Curso: Robot Soccer Junior

Vas a construir un **robot de fútbol teledirigido** usando componentes electrónicos reales, impresión 3D y programación en dos etapas: primero con bloques visuales y luego con código profesional en C++.

## ¿Qué vas a construir?

Un robot compacto (máximo **20×20 cm**) capaz de:
- 🏎️ Moverse en **4 direcciones** controladas desde tu celular por **Bluetooth**
- ⚽ **Empujar una pelota** hacia la portería del oponente
- 🔋 Operar **10-15 minutos continúos** con una batería de litio 18650 2S

## Stack Tecnológico del Robot

| Componente | Función |
|---|---|
| **Arduino Uno R3** | "El cerebro" — procesa comandos y controla motores |
| **Shield L293D / Módulo L298N** | Puente H — amplifica señales para mover motores |
| **2 Motores Amarillos TT** | Las ruedas — propulsan el robot |
| **Módulo Bluetooth HC-05** | Radio — recibe comandos desde tu celular |
| **Batería 18650 2S (7.4V)** | La energía — alimenta todo el sistema |
| **Interruptor Basculante** | El "on/off" de seguridad |
| **Chasis Impresión 3D** | La estructura — diseñada por ti |

## ¿Qué habilidades vas a desarrollar?

```
DISEÑO          →   ELECTRÓNICA     →   PROGRAMACIÓN    →   COMPETENCIA
──────────────      ─────────────────   ─────────────────   ───────────
• Diseño 3D         • Motores DC        • SteamakersBlocks   • Estrategia
• Centro de masa    • Puentes H         • C++ (Arduino)      • Calibración
• Pala delantera    • Bluetooth         • Control RC         • Análisis
• Tolerancias       • Protección LiPo   • Diagramas de flujo • Iteración
```

## Metodología: De Bloques a Código

Este curso sigue un proceso de **dos fases de programación**:

1. **SteamakersBlocks** (Bloques visuales): Aprende la lógica del control sin preocuparte por la sintaxis.
2. **C++ en Arduino IDE**: Traduce tu programa a código profesional y entiende cada línea.

> [!TIP]
> Muchos campeones de robotics comenzaron con bloques visuales. No es un paso "para niños" — es ingeniería incremental. ¡Los mejores equipos documentan su lógica primero antes de escribir una sola línea de código!

## El Simulador: Practica sin Riesgos

Antes de armar el robot real, usaremos el **Simulador de Soccer Jr.** para entender:
- Cómo funciona la **tracción diferencial** (dos ruedas independientes)
- La diferencia de rendimiento entre el **L293D y el L298N**
- La física del **balón** (inercia, rebotes)
- El comportamiento de la **batería 18650** bajo carga

**[→ Abrir Simulador Soccer Jr.](/simulador)**

---

> [!IMPORTANT]
> Antes de la próxima lección, descarga e instala: **Arduino IDE 2.x** desde [arduino.cc](https://www.arduino.cc) y **SteamakersBlocks** según las instrucciones de tu instructor.

---

### Lista de Materiales: Robot Soccer Jr.
**Order**: 2  
**Slug**: `01-introduccion/02-materiales`

---

<AdminOnly>
> **🎥 SECCIÓN DE VIDEO (Solo visible para administradores)**
>
> **Video 1: Tour de Componentes**
> - Duración: 10-12 min
> - Mostrar físicamente cada componente, su función, dónde comprarlo y alternativas.
> - Demostración side-by-side: Shield L293D vs Módulo L298N — diferencias físicas y eléctricas.
</AdminOnly>

---

# 🛒 Lista de Materiales

Estos son todos los componentes que necesitas para tu Robot Soccer Jr. El kit está diseñado para ser **asequible, educativo y compatible con competencias Jr. oficiales**.

## 🧠 Electrónica y Control

| Componente | Especificación | Notas |
|---|---|---|
| **Arduino Uno R3** | ATmega328P, 5V, 14 pines digitales | El "cerebro" del robot |
| **Shield L293D** ó **Módulo L298N** | Ver comparación abajo | Solo uno de los dos |
| **Módulo Bluetooth HC-05** | SPP (Serial Port Profile), 2.4GHz | Solo para control RC |
| **Interruptor Basculante** | 250V AC / 3A — contacto simple | On/Off de seguridad |

> [!WARNING]
> El **HC-05** (clásico) y el **HC-06** son diferentes: el HC-05 puede ser maestro o esclavo, el HC-06 solo es esclavo. Para este curso, **cualquiera funciona** — ambos se configuran igual como receptor.

## ⚡ Driver de Motores: ¿Shield L293D o Módulo L298N?

Esta es la decisión más importante antes de comprar. Aquí la comparación honesta:

```
┌─────────────────────┬─────────────────────┬─────────────────────┐
│ Característica      │ Shield L293D        │ Módulo L298N        │
├─────────────────────┼─────────────────────┼─────────────────────┤
│ Montaje             │ Directo sobre UNO   │ Cableado externo    │
│ Chip Driver         │ SN754410 / L293D    │ L298N               │
│ Tecnología          │ CMOS                │ Bipolar (Darlington)│
│ Eficiencia          │ ~80%                │ ~70%                │
│ Caída de voltaje    │ ~1.4V               │ ~2.0V               │
│ Corriente max/ch.   │ 600mA               │ 2A                  │
│ Precio aprox.       │ $5-8 USD            │ $2-4 USD            │
│ Recomendado para    │ Montaje limpio      │ Proyectos con cable │
└─────────────────────┴─────────────────────┴─────────────────────┘
```

> [!IMPORTANT]
> Con **batería 18650 2S (7.4V)** y el **L298N**: Los motores solo reciben ~5.4V efectivos (7.4V - 2.0V de caída interna). Con el **L293D**: reciben ~6.0V. Ambos funcionan con motores amarillos TT, pero el L293D dará más velocidad.

## 🔧 Propulsión

| Componente | Especificación | Notas |
|---|---|---|
| **Motores Amarillos TT** (×2) | DC 3-6V, reducción 1:48 | **Obligatorios en categoría Jr.** |
| **Ruedas para TT Motor** (×2) | Diámetro 65mm | Compatibles con eje del motor |

## 🔋 Energía

| Componente | Especificación | Notas |
|---|---|---|
| **Batería 18650 2S** | 7.4V nominal, 8.4V cargada, 3000mAh | El paquete de dos celdas en serie |
| **Cargador 18650 2S** | Salida 8.4V CC, balanceo de celdas | Indispensable — no uses cualquier cargador |
| **Conector XT30 o XT60** | Macho en batería, hembra en robot | Para conexión segura y desconexión rápida |

> [!CAUTION]
> **Seguridad con baterías de litio 18650:**
> - Nunca las cargues sin supervisión
> - Nunca las descargues por debajo de **3.0V por celda** (6.0V total)
> - Nunca las cortocircuites — pueden incendiarse
> - Siempre usa el cargador específico para 2S con balanceo

## 🖨️ Estructura

| Componente | Especificación | Notas |
|---|---|---|
| **Chasis Impreso 3D** | PLA o PETG, diseño propio | Lo diseñarás en el Módulo 2 |
| **Tornillos M3 × 10mm** (×8) | Con tuercas M3 | Para fijar motores y placa |
| **Tornillos M2 × 6mm** (×4) | Para fijar el Arduino al chasis | |

## 🔌 Accesorios Esenciales

- **Cables Jumper** Macho-Hembra y Macho-Macho (pack variado, 10-20cm)
- **Capacitores Cerámicos 104 (100nF) × 6** — Filtrado de ruido en motores
- **Resistencias: 1kΩ × 1 y 2kΩ × 1** — Divisor de tensión para pin RX del HC-05
- **Resistencias: 10kΩ × 2** — Divisor de tensión para lectura de batería en A0
- **Cinta Aislante** — Para asegurar conexiones contra vibraciones
- **Multímetro Digital** — Indispensable para verificar voltajes y continuidad

## Herramientas de Trabajo

| Herramienta | Para qué |
|---|---|
| Soldador + estaño | Capacitores en motores, interruptor |
| Alicate de corte | Recortar cables |
| Destornilladores | M2 y M3 |
| Regla / calibrador | Medir para el diseño 3D |

---

> [!TIP]
> Antes de comprar, revisa si tu **escuela o club de robótica** ya tiene algunos de estos componentes disponibles para préstamo. Los Arduinos Uno y módulos Bluetooth suelen estar en los kits escolares.

---

### Reglas de Competencia Soccer Jr.
**Order**: 3  
**Slug**: `01-introduccion/03-reglas-competencia`

---

<AdminOnly>
> **🎥 SECCIÓN DE VIDEO (Solo visible para administradores)**
>
> **Video 1: Competencia en Acción**
> - Duración: 8-10 min
> - Footage de partidos reales, explicación de reglas con ejemplos visuales.
> - Cómo es el proceso de inspección técnica y las penalizaciones comunes.
</AdminOnly>

---

# ⚽ Reglas de Competencia: Soccer Junior

El **Soccer Junior** es una categoría de robótica competitiva donde dos robots teledirigidos se enfrentan en una cancha miniatura para empujar un balón a la portería del oponente.

## 🏟️ El Campo de Juego

```
┌─────────────────────────────────────────────────────────┐
│  ┌──┐                                              ┌──┐  │
│  │  │          ┌─────────────┐                     │  │  │
│  │  │          │   CENTRO    │                     │  │  │
│  │  │     ╔════╪═════════════╪════╗                │  │  │
│  │G │     ║    │    ⬤ ○     │    ║                │G │  │
│  │O │     ╚════╪═════════════╪════╝                │O │  │
│  │A │          │             │                     │A │  │
│  │L │          └─────────────┘                     │L │  │
│  └──┘                                              └──┘  │
│  ← PORTERÍA ROJA →                    ← PORTERÍA AZUL →  │
└─────────────────────────────────────────────────────────┘
         122 cm × 183 cm (medidas estándar)
```

| Elemento | Dimensión estándar |
|---|---|
| Campo (largo × ancho) | 183 cm × 122 cm |
| Portería (ancho × alto) | 30 cm × 20 cm |
| Balón | Pelota de ping-pong naranja (40mm) |
| Paredes | Madera o acrílico, h=10cm mínimo |

## 📏 Especificaciones del Robot

### 1. Dimensiones Máximas
El robot debe **caber en un cuadrado de 20×20 cm** (medido en proyección horizontal).

> [!WARNING]
> La medición se hace con el robot en posición de inicio, con todos los accesorios extendidos. Un robot de 20.1 cm es **descalificado automáticamente**.

### 2. Restricción de Motores — CRÍTICO
**Solo se permiten motores amarillos TT (plástico)** en categoría Junior. Esto garantiza equidad.

| ✅ Permitido | ❌ Prohibido |
|---|---|
| Motores TT amarillos plástico | Motores metálicos N20 |
| Motores TT con engranajes estándar | Micro Metal Gearmotors |
| Motor doble eje TT | Servomotores continuos de metal |

### 3. Sistema de Control Permitido
- **Bluetooth (HC-05 / HC-06)**: Permitido ✅
- **WiFi RC**: Consulta el reglamento específico
- **IR Remote**: Permitido en algunas competencias ✅
- **Control autónomo con sensores**: No aplica para Soccer Jr. RC

### 4. Prohibiciones de Diseño Mecánico

> [!CAUTION]
> Estas características **descalifican** tu robot en inspección técnica:
> - Mecanismos de **agarre activo** del balón (loops, imanes, ganchos)
> - Dispositivos que **retengan** la pelota más de 0.3 segundos
> - Superficies pegajosas o con Velcro dirigidas al balón
> - Partes cortantes o con puntas que puedan dañar el campo

### 5. Diseño de Pala Delantera (Dribbler Pasivo)
La **pala delantera** es tu ventaja competitiva legal. Debe:
- Ser parte fija del chasis (no móvil activamente)
- Permitir que el balón ruede libremente (no retenerlo)
- Ayudar a guiar el balón en la dirección de avance

## ⏱️ Formato del Partido

| Aspecto | Regla estándar |
|---|---|
| Duración del partido | 2 × 3 minutos |
| Descanso entre tiempos | 1 minuto |
| Sistema de puntuación | 1 punto por gol |
| Empate | Tiempo extra + penales (depende del evento) |
| Jugadores por equipo | 1 robot en campo (algunos eventos: 2v2) |

## 🎯 Proceso en el Día de Competencia

```
LLEGADA → INSCRIPCIÓN → INSPECCIÓN → PRÁCTICA → PARTIDO → PREMIACIÓN

1. Inscripción:   Registrar robot con nombre del equipo y número
2. Inspección:    Verificar dimensiones, motores, y que no haya agarre
3. Práctica:      15-30 min en la cancha oficial para calibrar
4. Partido:       Enfrentamientos según bracket del evento
5. Premiación:    Top 3 de la categoría
```

## 🏆 Estrategias Ganadoras

### Estrategia 1: La Pala Ancha
Una pala frontal más ancha que el balón tiene mejor cobertura de control.

### Estrategia 2: La Diagonal Rápida
Los robots que atacan en diagonal confunden al oponente y tienen mejor ángulo de tiro.

### Estrategia 3: Giro Brusco
Un giro en el lugar (ambos motores en sentidos opuestos) permite cambiar de dirección sin retroceder, ganando tiempo crucial.

### Estrategia 4: Defensa en Línea
Posicionarse frente a tu portería y rebotar el balón lateralmente hacia los costados del campo.

> [!TIP]
> **La clave no es la velocidad — es el control.** Un robot más lento con mejor maniobrabilidad gana más partidos que uno rápido pero que choca con las paredes. Practica en el simulador para desarrollar "musculatura" de control antes del partido real.

## Lista de Verificación Pre-Competencia

- [ ] Robot entra en cuadrado de 20×20 cm
- [ ] Solo motores amarillos TT instalados
- [ ] Batería completamente cargada (8.4V)
- [ ] HC-05 emparejado con el celular del operador
- [ ] App de control probada y funcionando
- [ ] Pala delantera fija y sin mecanismos de agarre
- [ ] Tornillos apretados (las vibraciones los aflojan)
- [ ] Repuesto: cable USB de carga + batería de respaldo

---


## Módulo: Diseno

### 3D Chassis Design: Soccer Jr.
**Order**: 4  
**Slug**: `02-diseno/01-chasis`

---

<AdminOnly>
> **🎥 VIDEO SECTION (Visible to admins only)**
>
> **Video 1: Design Principles for Soccer Robots**
> - Duration: 10–12 min
> - Low center of mass: live demonstration with physical model
> - Front guide designs and angle variations
> - Common beginner design mistakes
>
> **Video 2: Tinkercad Tutorial — Soccer Jr.**
> - Duration: 18–20 min (full screen recording)
> - Step by step: base plate, motor holes, battery holder, Arduino mount
</AdminOnly>

---

# 🖨️ 3D Chassis Design

The chassis is not just "the base" — it's the component that defines **how your robot moves on the field**. A good design can compensate for motor limitations; a poor design can ruin even the best code.

## Core Design Principles

### 1. Low and Centered Center of Mass

The **center of mass (CoM)** is the point where the robot's entire weight effectively acts. For Soccer Jr., the ideal CoM position is:

```
Side View — Ideal Center of Mass:

        ┌────────────────────────────┐
        │  Arduino    HC-05  Switch  │  ← Top layer (electronics)
        ├────────────────────────────┤
        │  [18650 2S Battery Pack]   │  ← As low as possible
        ├────────────────────────────┤
        │      Motor  ⬤  Motor       │
    ────┴────────────────────────────┴────  ← Field surface
                    ↑
            Center of Mass (CoM)
            should be as close
            to the ground as possible
```

**Why?** A low CoM improves stability during sharp turns. A high CoM will cause the robot to tip (and skid) in tight maneuvers.

### 2. The Front Guide (Passive Ball Controller)

The **front guide** is a concave geometry at the front of the robot. Its job is to **keep the ball centered** as the robot moves forward — the ball naturally settles into the curve and doesn't roll sideways.

```
Top View — Front Guide Geometry:

Type A: Concave (Recommended)          Type B: Flat
┌─────────────────────────┐           ┌─────────────────────────┐
│     Robot Body          │           │     Robot Body          │
│   ┌─────────────────┐   │           │   ┌─────────────────┐   │
│   │                 │   │           │   │                 │   │
│   │    ⬤ Ball       │   │           │   │    ⬤ Ball       │   │
│   └─────────────────┘   │           │   └─────────────────┘   │
│     ╰──── Guide ────╯   │           │     └──── Guide ────┘   │
└─────────────────────────┘           └─────────────────────────┘
  Ball stays centered while moving      Ball can escape sideways
```

**Recommended dimensions:**
- Width: **5 to 8 cm** (slightly wider than a ping-pong ball at 4 cm)
- Concave depth: **5 to 8 mm**
- Thickness: minimum **3 mm in PLA** for impact resistance

> [!NOTE]
> **More advanced robots** in higher competition categories (e.g., Middle Size League) feature an **active kicker** — a solenoid mechanism that fires the ball at high speed. The Soccer Jr. front guide is the simpler, passive equivalent: it guides the ball instead of launching it.

### 3. Component Layout

```
Top View of Chassis (20×20 cm):

┌────────────────────────────────────────┐
│  ←─── 20 cm ──────────────────────→   │
│  ┌────────────────────────────────┐   ↑
│  │  [TT Motor L]    [TT Motor R]  │   │ 20cm
│  │  [    Arduino Uno R3         ] │   │
│  │  [  18650 2S Battery Pack    ] │   │
│  │  [Driver]  [HC-05]  [Switch]  │   ↓
│  └────────────────────────────────┘
│       ╔══ FRONT GUIDE ══╗             │
└────────────────────────────────────────┘
         ↑ FRONT OF ROBOT
```

**Golden Rule for Layout:**
- **Battery low and rear** → low CoM + counterbalances the front guide weight
- **Arduino above battery** → easy USB access for programming
- **Driver to one side** → short cable runs to both motors

## Steps in Tinkercad

### Step 1: Create the Base Plate
1. Go to [tinkercad.com](https://www.tinkercad.com) (free, no install)
2. Insert a **Box** of **200mm × 150mm × 5mm** (chassis base)
3. Set color to "Plastic – Light Gray"

### Step 2: Motor Mounting Holes
TT motors have a specific bolt pattern. Add cylinders as "holes":
- Shaft diameter: **6 mm**
- Mounting bolt spacing: **10 mm × 28 mm**

### Step 3: Battery Holder
- Create a "corral" box of **72 mm × 35 mm × 25 mm** for the 18650 2S pack
- Leave side openings for ventilation and connector access

### Step 4: The Front Guide
- Add a box of **70 mm × 8 mm × 15 mm** at the front
- For the concave curve, use the "Paraboloid" shape or round the edges with "Fillet"

### Step 5: Export for Printing
- **File → Export → STL**
- Recommended print settings:
  - Material: **PLA** (easy to print and repair)
  - Infill: **30%** (sufficient strength without extra weight)
  - Layer height: **0.2 mm** (good speed/quality balance)

> [!TIP]
> Print a **small test piece first** (just one corner with a motor hole) to verify tolerances before committing to a full chassis print. A 6 mm hole in the design might come out at 5.8 mm on your printer — and that matters.

> [!WARNING]
> If your chassis measures exactly 20×20 cm in the design, **add 0.5 mm of margin** on all sides — PLA deforms slightly as it cools. Design at **19×19 cm** and you'll have the correct margin for technical inspection.

---


## Módulo: Montaje

### Fase 1: Potencia — Batería y Encendido
**Order**: 5  
**Slug**: `03-montaje/01-fase1-potencia`

---

<AdminOnly>
> **🎥 SECCIÓN DE VIDEO (Solo visible para administradores)**
>
> **Video 1: Seguridad con Baterías 18650**
> - Duración: 8-10 min
> - Demo de cortocircuito controlado y consecuencias
> - Cómo verificar voltaje antes de conectar (multímetro)
> - Instalación correcta del interruptor basculante
>
> **Video 2: Primera Carga del Código**
> - Duración: 5-6 min
> - Instalación de Arduino IDE 2.x
> - Selección de placa (Arduino Uno) y puerto COM
> - Compilar y cargar el código Blink
</AdminOnly>

---

> **📋 Prerrequisitos:** Tener el Arduino Uno, la batería 18650 2S, el interruptor basculante y el cable USB.

---

# Fase 1: Sistema de Potencia 🔋

Esta es la fase más crítica de seguridad. Una conexión incorrecta con baterías de litio puede dañar los componentes o, en casos extremos, causar un incendio. **Sigue los pasos en orden.**

## Diagrama de Conexión: Sistema de Potencia

```
 BATERÍA 18650 2S                                    ARDUINO UNO
 ┌──────────────┐                                   ┌───────────┐
 │  + (8.4V)    │──── CABLE ROJO ────[ SWITCH ]────►│  Vin      │
 │              │                                   │           │
 │  - (GND)     │──── CABLE NEGRO ──────────────────►│  GND      │
 └──────────────┘                                   └───────────┘
     │
     └── El interruptor CORTA el positivo
         (NUNCA cortar el negativo)
         
VOLTAJES ESPERADOS:
  Batería cargada: 8.4V  ← Mide aquí con multímetro antes de conectar
  Batería vacía:   7.4V  ← Nominal (50% de carga aprox.)
  Mínimo seguro:   6.4V  ← Por debajo de esto: RECARGAR YA
  Pin Vin Arduino: 7-12V ← El Vin acepta este rango, genera 5V internamente
  Pin 5V Arduino:  5.0V  ← Aquí alimentaremos sensores y módulos
```

## Paso a Paso

### 1. Preparación de la Batería

Antes de conectar nada, **mide el voltaje** de tu batería:

1. Enciende el multímetro en modo DC Voltaje (V⎓)
2. Toca el cable **rojo** del multímetro al **+ de la batería**
3. Toca el cable **negro** al **– de la batería**
4. ✅ Lectura esperada: entre **7.4V y 8.4V**

> [!CAUTION]
> Si el multímetro lee **menos de 6.0V**, la batería está demasiado descargada para usar. Cárgala primero. Si lee **más de 8.6V**, algo está mal — no la conectes.

### 2. Soldadura del Interruptor Basculante

El interruptor va en **serie con el cable POSITIVO** (rojo):

```
CABLE ROJO DE BATERÍA:
  [+Batería] ──→ CORTAR A LA MITAD ──→ SOLDAR CADA MITAD A UN TERMINAL DEL SWITCH
                                          
  Resultado:
  [+Batería] ──→ [TERMINAL 1 SWITCH] ── [TERMINAL 2 SWITCH] ──→ [Vin Arduino]
                                    ↑↑
                            El switch abre/cierra aquí
```

**Técnica de soldadura:**
1. Calienta el soldador a 350-380°C
2. Estañar primero cada terminal del switch (precalentar)
3. Pelar 5mm del cable rojo en cada extremo
4. Torcer las fibras y estañar las puntas
5. Unir cable a terminal, calentar ambos 2-3 segundos y retirar
6. Esperar enfriar sin mover (10 segundos)
7. Cubrir con termoretráctil o cinta aislante

> [!WARNING]
> **¿El estaño no fluye?** El soldador está frío o no estañaste primero las superficies. **¿El plástico del cable se derrite?** El soldador está muy caliente o lo tienes mucho tiempo — baja temperatura o sé más rápido.

### 3. Conexión al Arduino Uno

Con el interruptor en posición **OFF**:

| Cable | Desde | Hacia | Color |
|---|---|---|---|
| Positivo | Terminal 2 del Switch | Pin **Vin** del Arduino | Rojo |
| Negativo | – de la Batería | Pin **GND** del Arduino | Negro |

> [!WARNING]
> **¡El pin Vin del Arduino NO es el 5V!** El pin `5V` es una **salida** del regulador interno. Conectar la batería ahí quemaría el Arduino. Siempre usa el pin `Vin` para alimentación externa.

### 4. Verificación con Código Blink

Una vez conectado, carga este código por USB **antes de encender con la batería**:

```cpp
// ============================================
// FASE 1: Código Blink — Verificación de Potencia
// Propósito: Confirmar que el Arduino recibe corriente estable
// Si el LED parpadea 5 veces rápido y luego empieza el ciclo,
// la alimentación es correcta.
// ============================================

void blink(int veces = 5, int ms = 100) {
  for (int i = 0; i < veces; i++) {
    digitalWrite(LED_BUILTIN, HIGH);  // LED encendido
    delay(ms);
    digitalWrite(LED_BUILTIN, LOW);   // LED apagado
    delay(ms);
  }
}

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  blink(5, 100);   // 5 parpadeos rápidos = ARRANQUE OK
}

void loop() {
  blink(3, 200);   // 3 parpadeos cada 2 segundos = FUNCIONANDO
  delay(2000);
}
```

### 5. Primera Prueba con Batería

1. Asegúrate de que el código Blink esté cargado
2. Desconecta el cable USB de la laptop
3. Enciende el interruptor basculante
4. **¿El LED del Arduino parpadea?** ✅ La potencia es correcta
5. **¿No pasa nada?** → Revisa conexiones con multímetro

## Diagrama de Flujo: Arranque del Robot

```
          INICIO
             │
             ▼
    ¿Interruptor ON?
      │          │
     NO          SÍ
      │           │
      │           ▼
      │    Corriente llega a Vin
      │           │
      │           ▼
      │    Arduino arranca setup()
      │           │
      │           ▼
      │    Configura pines: LED_BUILTIN como OUTPUT
      │           │
      │           ▼
      │    blink(5, 100) → 5 parpadeos rápidos = OK
      │           │
      │           ▼
      │        loop()
      │      Parpadeos continuos
      │
      └──── (No hay energía, no pasa nada)
      
      FIN DE FASE 1 → SIGUIENTE: Driver y Motores
```

> [!TIP]
> Esta función `blink()` la conservaremos en todas las fases del código. En el firmware final, los **5 parpadeos rápidos al inicio** serán tu señal de que el robot está listo. ¡Es como el sonido de "ding" cuando abre una puerta de avión!

---

### Fase 2: Driver de Motores y Propulsión
**Order**: 6  
**Slug**: `03-montaje/02-fase2-sensores`

---

<AdminOnly>
> **🎥 SECCIÓN DE VIDEO (Solo visible para administradores)**
>
> **Video 1: Soldadura de Capacitores en Motores**
> - Duración: 10-12 min
> - Técnica para soldar capacitores 104 (muy pequeños) en las terminales del motor
> - Demostración: ruido en el osciloscópio antes vs después de capacitores
>
> **Video 2: Conexión del Driver — L293D y L298N**
> - Duración: 12-15 min (grabar los dos casos por separado)
> - Diagrama de conexión y prueba de dirección de cada motor
</AdminOnly>

---

> **📋 Prerrequisitos:** Haber completado Fase 1 — Arduino arrancando y LED parpadeando con la batería.

---

# Fase 2: Driver de Motores ⚙️

Los motores DC no pueden conectarse directamente al Arduino — el microcontrolador solo puede entregar **40mA por pin**, mientras que cada motor TT puede consumir hasta **600mA**. El **Puente H** (L293D o L298N) actúa como amplificador de corriente.

## ¿Por qué los Capacitores Cerámicos? (CRÍTICO)

Los motores DC generan **chispas microscópicas** en sus escobillas. Estas chispas crean interferencias electromagnéticas (EMI) que literalmente confunden al Arduino, causando **reinicios aleatorios en plena competencia**.

```
SIN CAPACITORES:                    CON CAPACITORES 104:
     Motor → ~~ruido~~               Motor → ~~sin ruido~~
     Arduino se reinicia            Arduino estable ✅
```

**Dónde soldar los 3 capacitores por motor:**

```
     Motor DC (vista de terminales)
     
     Terminal + ──┬──────── Terminal –
                  │              │
               [104]          [104]   ← Un capacitor entre terminales
                  │              │
               [104]             │   ← Un capacitor de cada terminal a la carcasa
                  │              │
              ┌───────────────────┐
              │  CARCASA METÁLICA  │
              └───────────────────┘
              
     Total: 3 capacitores × 2 motores = 6 capacitores en total
     Capacitor: Cerámico 104 = 100nF = 0.1µF (sin polaridad, da igual el sentido)
```

## Diagrama de Conexión: Shield L293D

El Shield L293D se monta directamente sobre el Arduino Uno (pin a pin):

```
SHIELD L293D montado sobre ARDUINO UNO
──────────────────────────────────────

 Alimentación del Shield:
   Batería+ (post-switch) → Terminal VM del shield  (voltaje motores: 7.4V)
   Arduino 5V             → Terminal VCC del shield (lógica: 5V)
   GND compartido         → GND del shield

 Motor IZQUIERDO → Terminales M1 del shield
   Cable rojo motor IZQ → M1A
   Cable negro motor IZQ→ M1B
   (Si gira al revés, simplemente intercambia M1A y M1B)

 Motor DERECHO → Terminales M2 del shield
   Cable rojo motor DER → M2A
   Cable negro motor DER→ M2B

 Control de velocidad por PWM — Pines del Arduino:
   Motor IZQ velocidad → Pin 6  (PWMA en firmware)
   Motor IZQ dir A     → Pin 7  (AIN1)
   Motor IZQ dir B     → Pin 8  (AIN2)
   Motor DER velocidad → Pin 5  (PWMB)
   Motor DER dir A     → Pin 9  (BIN1)
   Motor DER dir B     → Pin 10 (BIN2)
```

## Diagrama de Conexión: Módulo L298N

El L298N se conecta con cables jumper individuales:

```
MÓDULO L298N ←────────────────────────────────────── ARDUINO UNO
─────────────────────────────────────────────────────────────────

Módulo L298N          Cable          Arduino Uno
──────────────        ──────         ──────────────
ENA            ←──── JUMPER ────────  Pin 6  (PWM)
IN1            ←──── JUMPER ────────  Pin 7
IN2            ←──── JUMPER ────────  Pin 8
IN3            ←──── JUMPER ────────  Pin 9
IN4            ←──── JUMPER ────────  Pin 10
ENB            ←──── JUMPER ────────  Pin 5  (PWM)
GND            ←──── NEGRO  ────────  GND
5V (del L298N) ──────────────────── (NO conectar al 5V del Arduino — conflicto!)

Módulo L298N          Cable          BATERÍA / POTENCIA
──────────────        ──────         ──────────────────
12V (o VIN)    ←──── ROJO   ────────  + Batería (post-switch)
GND            ←──── NEGRO  ────────  – Batería

Módulo L298N          Motor Izquierdo
──────────────        ──────────────────
OUT1           ─────── Cable rojo
OUT2           ─────── Cable negro
(Si gira al revés: intercambia OUT1 y OUT2)

Módulo L298N          Motor Derecho
──────────────        ──────────────────
OUT3           ─────── Cable rojo
OUT4           ─────── Cable negro
```

> [!WARNING]
> El módulo L298N tiene un regulador de 5V integrado. Cuando usas más de 12V, **quita el jumper** que conecta ese regulador o se puede quemar. Con 7.4V-8.4V puedes **dejar el jumper** y usar su 5V para alimentar el Arduino (puentea al pin 5V del Uno).

## Código de Prueba: Fase 2 — Motores

Este código acumula la función `blink()` de la Fase 1 y agrega el control básico de motores:

```cpp
// ============================================
// FASE 2: Motores — Prueba de Propulsión
// Verifica dirección y velocidad de ambos motores
// ============================================

// --- Pines del driver (mismos para L293D y L298N) ---
#define MOTOR_IZQ_EN  6    // PWM: velocidad motor izquierdo
#define MOTOR_IZQ_A   7    // Dirección 1
#define MOTOR_IZQ_B   8    // Dirección 2
#define MOTOR_DER_EN  5    // PWM: velocidad motor derecho
#define MOTOR_DER_A   9    // Dirección 1
#define MOTOR_DER_B   10   // Dirección 2

// --- Función Blink (de Fase 1) ---
void blink(int veces = 3, int ms = 150) {
  for (int i = 0; i < veces; i++) {
    digitalWrite(LED_BUILTIN, HIGH);
    delay(ms);
    digitalWrite(LED_BUILTIN, LOW);
    delay(ms);
  }
}

// --- Control de motores ---
void moverMotorIzq(int velocidad) {
  // velocidad: -255 a 255 (negativo = reversa)
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

void moverMotorDer(int velocidad) {
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

void setup() {
  // Configurar pines
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(MOTOR_IZQ_EN, OUTPUT); pinMode(MOTOR_IZQ_A, OUTPUT); pinMode(MOTOR_IZQ_B, OUTPUT);
  pinMode(MOTOR_DER_EN, OUTPUT); pinMode(MOTOR_DER_A, OUTPUT); pinMode(MOTOR_DER_B, OUTPUT);
  
  // Señal de inicio
  blink(5, 100);
  delay(1000);
}

void loop() {
  // Secuencia de prueba:
  
  // 1. Avanzar 2 segundos
  moverMotorIzq(180);  moverMotorDer(180);
  delay(2000);
  
  // 2. Detener
  moverMotorIzq(0);    moverMotorDer(0);
  delay(500);
  
  // 3. Retroceder 2 segundos
  moverMotorIzq(-180); moverMotorDer(-180);
  delay(2000);
  
  // 4. Detener
  moverMotorIzq(0);    moverMotorDer(0);
  delay(2000);
}
```

### ¿Qué verificar?
- ✅ Ambos motores giran hacia adelante al avanzar
- ✅ Ambos motores giran hacia atrás al retroceder
- ❌ **¿Un motor gira al revés?** → Intercambia los dos cables de ESE motor en el driver (sin tocar el código)

> [!TIP]
> **Trenza los cables de los motores** (enróllalos entre sí antes de conectar al driver). Esto crea un campo magnético de cancelación mutua que reduce aún más el ruido electromagnético. ¡Los ingenieros de F1 hacen lo mismo en sus sistemas de telemetría!

---

### Fase 3: Bluetooth HC-05 y Divisor de Tensión
**Order**: 7  
**Slug**: `03-montaje/03-fase3-motores`

---

<AdminOnly>
> **🎥 SECCIÓN DE VIDEO (Solo visible para administradores)**
>
> **Video 1: ¿Por qué el Divisor de Tensión?**
> - Duración: 8-10 min
> - Explicar niveles de voltaje 5V vs 3.3V visualmente
> - Calcular el divisor con la fórmula
> - Demo: conectar HC-05 SIN divisor y mostrar el riesgo (si hay osciloscópio)
>
> **Video 2: Configuración y Prueba de HC-05**
> - Duración: 10-12 min
> - Configurar nombre y PIN del HC-05 en modo AT (opcional)
> - Emparejar desde Android y desde iOS
> - Enviar 'F' y verificar en el monitor serie
</AdminOnly>

---

> **📋 Prerrequisitos:** Fase 1 y Fase 2 completadas. El robot avanza y retrocede correctamente con la batería.

---

# Fase 3: Módulo Bluetooth HC-05 📡

El HC-05 es el "oído" de tu robot — recibe los comandos de tu celular y los pasa al Arduino como texto (caracteres ASCII).

## ¿Por qué el Divisor de Tensión? — INGENIERÍA REAL

```
EL PROBLEMA: Incompatibilidad de voltajes lógicos

  ARDUINO UNO                    HC-05
  ┌─────────┐   TX (5V) ──────►  RX (3.3V)
  │  5V TTL │                  │  3.3V TTL│
  └─────────┘                  └──────────┘
                   ↑
           ¡El HC-05 solo tolera 3.3V en su pin RX!
           Conectar 5V directamente lo degrada o quema con el tiempo.
           
  Señal 5V en el pin TX del Arduino:
  ▁▁▁████▁▁█████▁▁▁  ← Voltaje: 0V y 5V
  
  Lo que el HC-05 puede recibir:
  ▁▁▁████▁▁█████▁▁▁  ← Voltaje: 0V y MÁXIMO 3.3V
  
  SOLUCIÓN: Divisor Resistivo
```

## El Divisor de Tensión: Cálculo y Conexión

```
  CÁLCULO DEL DIVISOR:
  
  Vin = 5V (TX del Arduino)
  Vout = 3.3V (RX del HC-05)
  
  Fórmula: Vout = Vin × R2 / (R1 + R2)
  
  Con R1 = 1kΩ y R2 = 2kΩ:
  Vout = 5 × 2000 / (1000 + 2000) = 5 × 0.667 = 3.33V ✅
  
  DIAGRAMA DEL DIVISOR:
  
  Arduino PIN D3 (TX) ──────────┬────────── R1 (1kΩ) ──── HC-05 RX
                                │
                               R2 (2kΩ)
                                │
                               GND
                               
  Vout se mide entre el nodo (┬) y GND = 3.33V ✅
```

## Diagrama Completo de Conexión HC-05

```
HC-05 MÓDULO              ARDUINO UNO / BREADBOARD
─────────────             ────────────────────────
VCC  (3.3V-6V) ──────────  Pin 5V del Arduino
GND            ──────────  GND del Arduino
TXD            ──────────  Pin D2 del Arduino  (SoftwareSerial RX)
RXD            ──── R1 (1kΩ) ─── Nodo ─── Pin D3 del Arduino (SoftwareSerial TX)
                                    │
                                   R2 (2kΩ)
                                    │
                                   GND

Nota: El LED del HC-05 parpadeará RÁPIDO cuando no hay pareja,
      y LENTO (cada 2s) cuando está emparejado con tu celular.
```

## Configuración de la App de Control

Descarga **"Bluetooth RC Controller"** en tu celular Android o cualquier app similar de joystick Bluetooth.

Los comandos que envía la app y cómo los interpreta el robot:

| Botón en la App | Carácter enviado | Acción del Robot |
|---|---|---|
| ⬆️ Adelante | `F` | Avanza — ambos motores al frente |
| ⬇️ Atrás | `B` | Retrocede — ambos motores atrás |
| ◀️ Izquierda | `L` | Giro suave — motor derecho avanza |
| ▶️ Derecha | `R` | Giro suave — motor izquierdo avanza |
| ⏹️ Stop | `S` | Para — ambos motores detenidos |

## Código de Prueba: Fase 3 — Bluetooth

Este código incluye todo lo de Fases 1 y 2, más el Bluetooth. El robot ya responde a los comandos del celular:

```cpp
// ============================================
// FASE 3: Bluetooth HC-05 — Prueba Completa
// Controla el robot desde tu celular.
// Abrir el Monitor Serie para ver los comandos.
// ============================================
#include <SoftwareSerial.h>

// --- Pines Bluetooth HC-05 ---
SoftwareSerial btSerial(2, 3);  // RX=D2, TX=D3 (con divisor en D3)

// --- Pines del driver (igual que Fase 2) ---
#define MOTOR_IZQ_EN  6
#define MOTOR_IZQ_A   7
#define MOTOR_IZQ_B   8
#define MOTOR_DER_EN  5
#define MOTOR_DER_A   9
#define MOTOR_DER_B   10

#define VEL 180   // Velocidad de prueba (0-255)

// --- Función Blink (de Fase 1) ---
void blink(int veces = 3, int ms = 150) {
  for (int i = 0; i < veces; i++) {
    digitalWrite(LED_BUILTIN, HIGH); delay(ms);
    digitalWrite(LED_BUILTIN, LOW);  delay(ms);
  }
}

// --- Funciones de motor (de Fase 2) ---
void moverMotorIzq(int v) {
  int spd = constrain(abs(v), 0, 255);
  digitalWrite(MOTOR_IZQ_A, v > 0); digitalWrite(MOTOR_IZQ_B, v < 0);
  analogWrite(MOTOR_IZQ_EN, spd);
}
void moverMotorDer(int v) {
  int spd = constrain(abs(v), 0, 255);
  digitalWrite(MOTOR_DER_A, v > 0); digitalWrite(MOTOR_DER_B, v < 0);
  analogWrite(MOTOR_DER_EN, spd);
}

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(MOTOR_IZQ_EN, OUTPUT); pinMode(MOTOR_IZQ_A, OUTPUT); pinMode(MOTOR_IZQ_B, OUTPUT);
  pinMode(MOTOR_DER_EN, OUTPUT); pinMode(MOTOR_DER_A, OUTPUT); pinMode(MOTOR_DER_B, OUTPUT);
  
  Serial.begin(115200);     // Para debug en PC
  btSerial.begin(9600);     // HC-05 por defecto a 9600 baud
  
  blink(5, 100);
  Serial.println("Soccer Jr. Fase 3 - Esperando comandos BT...");
}

void loop() {
  if (btSerial.available()) {
    char cmd = (char)btSerial.read();
    Serial.print("CMD recibido: ");
    Serial.println(cmd);
    
    switch(cmd) {
      case 'F': moverMotorIzq(VEL);  moverMotorDer(VEL);  break; // Adelante
      case 'B': moverMotorIzq(-VEL); moverMotorDer(-VEL); break; // Atrás
      case 'L': moverMotorIzq(0);    moverMotorDer(VEL);  break; // Giro izq
      case 'R': moverMotorIzq(VEL);  moverMotorDer(0);    break; // Giro der
      default:  moverMotorIzq(0);    moverMotorDer(0);    break; // Stop
    }
  }
}
```

### Prueba Paso a Paso

1. **Carga el código** por USB al Arduino
2. **Empareja el HC-05** desde Bluetooth de tu celular (PIN por defecto: `1234` o `0000`)
3. **Abre la app** de RC Controller
4. **Conecta** a "HC-05" desde la app
5. **Presiona botones** y observa que el robot responde
6. **Abre el Monitor Serie** en el Arduino IDE para ver qué comandos llegan

> [!TIP]
> Si el HC-05 no aparece en la lista de dispositivos Bluetooth de tu celular, mantén el **botón de configuración del HC-05 presionado** por 3 segundos hasta que el LED parpadee muy rápido (modo pairing). Luego busca desde el celular.

> [!WARNING]
> **¿Los motores no responden pero el LED del HC-05 sí parpadea lento (emparejado)?** Revisa que el **Monitor Serie esté cerrado** antes de que el Bluetooth funcione — ambos comparten la comunicación serial del Arduino y pueden interferir. Desconecta USB del Arduino, enciende con la batería y controla solo por BT.

---

### Fase 4: Ensamble Final en Chasis 3D
**Order**: 8  
**Slug**: `03-montaje/04-fase4-interfaz`

---

<AdminOnly>
> **🎥 SECCIÓN DE VIDEO (Solo visible para administradores)**
>
> **Video 1: Ensamble Completo Paso a Paso**
> - Duración: 15-18 min
> - Montaje de motores en chasis con tornillos M3
> - Instalación de batería y conector XT
> - Organización profesional del cableado (bridas, cinta, rutas)
> - Prueba final de movimiento y inspección técnica
</AdminOnly>

---

> **📋 Prerrequisitos:** Chasis impreso en 3D, Fases 1, 2 y 3 funcionando correctamente.

---

# Fase 4: Ensamble Final 🔧

Este es el momento en que tu robot pasa de ser un "circuito en la mesa" a una **máquina competitiva**. La organización del cableado no es estética — es ingeniería: cables sueltos pueden atascarse en las ruedas y perder una competencia.

## Orden de Ensamble

```
SECUENCIA DE MONTAJE:

  1. Motores ──────────────────► Fijar en chasis (tornillos M3 desde abajo)
         ↓
  2. Ruedas ───────────────────► Presionar en eje del motor (ajuste a presión)
         ↓
  3. Batería 18650 2S ─────────► Asegurar en compartimento (brida o velcro)
         ↓
  4. Driver (L293D o L298N) ──► Montar sobre Arduino (shield) o fijar con M3 (módulo)
         ↓
  5. Arduino Uno ──────────────► Fijar en chasis con tornillos M2 x 6mm
         ↓
  6. HC-05 + Divisor ──────────► Conectar cables jumper al Arduino
         ↓
  7. Interruptor basculante ──► Instalar en orificio del chasis
         ↓
  8. Organizar cableado ───────► Bridas, cinta aislante en conectores
         ↓
  9. PRUEBA FINAL ─────────────► Inspección técnica pre-competencia
```

## Gestión Profesional del Cableado

```
VISTA SUPERIOR DEL ROBOT (cableado organizado):

 ┌────────────────────────────────────────────┐
 │    [Motor Izq]                [Motor Der]  │
 │        │  └─── cable trenzado ───┘  │      │
 │        └──────────────────────────►Driver  │
 │                                    │       │
 │    ┌──[HC-05]                      │       │
 │    │       jumpers cortos          │       │
 │    └──►[ARDUINO UNO]◄─────────────┘       │
 │              │                            │
 │              └──►[SWITCH]──►[BATERÍA]     │
 │                                           │
 │    ══════════ PALA DELANTERA ═══════════  │
 └────────────────────────────────────────────┘

REGLAS DE CABLEADO:
  ✅ Cables de motor: TRENZADOS (cancelan interferencias EMI)
  ✅ Cables de señal (jumpers): AGRUPADOS con brida
  ✅ Conectores: ASEGURADOS con cinta aislante (las vibraciones los sueltan)
  ✅ Longitud: lo más CORTOS posible (menos inducción)
  ❌ NUNCA cables cruzando las ruedas
  ❌ NUNCA extremos sueltos que puedan tocar partes metálicas
```

## Inspección Técnica Pre-Competencia

Verifica cada punto **antes de ir a competir**:

### Dimensiones
```
  Herramienta: una caja de 20×20cm de cartón
  
  ┌────────────────────┐  ← 20 cm
  │                    │
  │   [Tu Robot]       │  20 cm
  │                    │
  └────────────────────┘
  
  El robot debe caber dentro con todos sus partes extendidas.
```

| Verificación | Estado |
|---|---|
| ☐ Robot cabe en 20×20 cm | Pendiente |
| ☐ Solo motores amarillos TT | Pendiente |
| ☐ Pala delantera fija (no se mueve) | Pendiente |
| ☐ Ningún mecanismo de agarre del balón | Pendiente |
| ☐ Sin partes cortantes o puntas | Pendiente |

### Eléctrica
| Verificación | Estado |
|---|---|
| ☐ Batería cargada: 8.4V (medir con multímetro) | Pendiente |
| ☐ Switch funciona (enciende y apaga sin problemas) | Pendiente |
| ☐ LED del Arduino parpadea al encender | Pendiente |
| ☐ HC-05 se empareja con el celular | Pendiente |
| ☐ Los 4 comandos (F/B/L/R) funcionan | Pendiente |
| ☐ Stop funciona correctamente | Pendiente |

### Mecánica
| Verificación | Estado |
|---|---|
| ☐ Todos los tornillos apretados | Pendiente |
| ☐ Ruedas bien ajustadas (no se salen con las manos) | Pendiente |
| ☐ Ningún cable puede tocar las ruedas en movimiento | Pendiente |
| ☐ Batería asegurada (no se mueve al sacudir el robot) | Pendiente |

## Prueba de Campo Final

Antes de ir a competir, realiza esta secuencia en tu propia "cancha" (puede ser el piso):

```
PRUEBA DE CAMPO:
  
  1. [F por 3 seg] ──→ Robot avanza en línea recta ──→ ¿Desvía? ajusta un motor
  2. [B por 3 seg] ──→ Robot retrocede en línea recta
  3. [L por 1 seg] ──→ Giro hacia la izquierda limpio
  4. [R por 1 seg] ──→ Giro hacia la derecha limpio
  5. [F + pelota]  ──→ Empujar la pelota 1 metro con la pala delantera
  6. [Giro brusco] ──→ Cambio de dirección sin perder el balón
```

> [!TIP]
> ¿El robot desvía al ir en línea recta? Es normal si un motor es ligeramente más rápido que el otro. Ajusta el valor PWM de ese motor en el firmware: si desvía a la izquierda, **reduce en 5-10** el PWM del motor derecho. Itera hasta que vaya recto.

> [!WARNING]
> En competencia, las condiciones del piso pueden ser diferentes a las de tu casa. **Siempre lleva una batería completamente cargada de repaldo** y prueba en la cancha oficial durante el tiempo de práctica para re-calibrar si es necesario.

## ¡Felicitaciones — El Robot Está Listo!

Con la Fase 4 completada, tienes un **robot Soccer Jr. funcional y competitivo**. Los siguientes módulos te enseñarán a:
- **Programar en SteamakersBlocks** (para entender la lógica visualmente)
- **Traducir a C++** (el código profesional del firmware completo)
- **Analizar tu rendimiento** con datos reales del post-match log

---


## Módulo: Programacion

### Programación en SteamakersBlocks
**Order**: 9  
**Slug**: `04-programacion/01-teoria-control`

---

<AdminOnly>
> **🎥 SECCIÓN DE VIDEO (Solo visible para administradores)**
>
> **Video 1: Intro a SteamakersBlocks**
> - Duración: 8-10 min
> - Interfaz, cómo conectar el Arduino, cómo subir el programa
> - Filosofía: "piensa la lógica primero, escribe el código después"
>
> **Video 2: Construyendo el Programa de Control**
> - Duración: 15-18 min (screen recording completo)
> - Construir el programa completo paso a paso con bloques
> - Probar en el robot físico mientras se construye
</AdminOnly>

---

> **📋 Prerrequisitos:** Robot físico completamente armado y funcionando con el código de Fase 3.

---

# 🧱 Programación con SteamakersBlocks

SteamakersBlocks es una plataforma de programación visual donde construyes programas **arrastrando bloques** en lugar de escribir código. Es idéntico en lógica al Arduino C++, pero sin preocuparte por la sintaxis.

## ¿Por qué Empezar con Bloques?

```
La Curva de Aprendizaje del Programador de Robots:

  Dificultad
  ──────────                                          ●  C++ Avanzado (PID, optimización)
      │                                       ●  C++ con librerías
      │                               ●  C++ básico Arduino
      │                   ●  SteamakersBlocks (hoy estamos aquí)
      │           ●  Pseudocódigo
      │   ●  Flowchart (diagramas de flujo)
      └─────────────────────────────────────────────────►  Tiempo
      
  Los bloques NO son "para niños" — son la misma lógica
  que usa un ingeniero al diseñar el algoritmo antes de codificar.
```

## Diagrama de Flujo: Lógica del Control RC

Antes de construir los bloques, entiende la lógica con un diagrama de flujo:

```
┌─────────────────────────────────────────────────────────────┐
│                    INICIO DEL PROGRAMA                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  CONFIGURACIÓN (setup):                                     │
│  • Definir pines de motores como SALIDA                     │
│  • Iniciar comunicación Bluetooth a 9600 baudios            │
│  • Parpadear LED 5 veces → Robot LISTO                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
                   ┌───────────────┐
                   │   REPETIR     │◄──────────────────┐
                   │   SIEMPRE     │                   │
                   └───────┬───────┘                   │
                           │                           │
                           ▼                           │
                ┌──────────────────────┐               │
                │ ¿Hay dato Bluetooth  │               │
                │ disponible?          │               │
                └─────┬──────────┬─────┘               │
                      │ SÍ       │ NO                  │
                      │          └────────────────────►│
                      ▼                                │
           ┌─────────────────────┐                     │
           │ Leer el comando     │                     │
           │ (un carácter ASCII) │                     │
           └──────────┬──────────┘                     │
                      │                                │
                      ▼                                │
           ┌─────────────────────────────────────────┐ │
           │      ¿Cuál es el comando?               │ │
           └──┬─────┬─────┬─────┬─────┬─────────────┘ │
              │     │     │     │     │               │
             'F'   'B'   'L'   'R'  Otro             │
              │     │     │     │     │               │
              ▼     ▼     ▼     ▼     ▼               │
           [Adel][Retr][GiroL][GiroR][Stop]            │
              │     │     │     │     │               │
              └─────┴─────┴─────┴─────┴──────────────►┘
```

## Construir el Programa en SteamakersBlocks

### Bloque 1: Configuración Inicial

En SteamakersBlocks, el programa tiene dos secciones principales:
- **Al iniciar** (equivale a `setup()`)
- **Para siempre** (equivale a `loop()`)

```
┌─────────────────────────────────────────────────────────┐
│  🟦 AL INICIAR                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 🔌 configurar pin [6] como [SALIDA]             │   │
│  │ 🔌 configurar pin [7] como [SALIDA]             │   │
│  │ 🔌 configurar pin [8] como [SALIDA]             │   │
│  │ 🔌 configurar pin [5] como [SALIDA]             │   │
│  │ 🔌 configurar pin [9] como [SALIDA]             │   │
│  │ 🔌 configurar pin [10] como [SALIDA]            │   │
│  │ 📡 iniciar Bluetooth en pin [2] y [3] a [9600]  │   │
│  │ 💡 parpadear LED [5] veces a [100ms]            │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Bloque 2: Leer y Responder

```
┌─────────────────────────────────────────────────────────┐
│  🔄 PARA SIEMPRE                                        │
│  ┌─────────────────────────────────────────────────┐   │
│  │  🔍 SI [Bluetooth tiene datos]                  │   │
│  │     ENTONCES                                    │   │
│  │     📥 guardar en [comando] ← [leer Bluetooth]  │   │
│  │                                                 │   │
│  │     🔀 SI [comando] = ['F']                     │   │
│  │        ENTONCES: 🚀 mover ambos motores adelante│   │
│  │                                                 │   │
│  │     🔀 SI SINO [comando] = ['B']                │   │
│  │        ENTONCES: 🔙 mover ambos motores atrás   │   │
│  │                                                 │   │
│  │     🔀 SI SINO [comando] = ['L']                │   │
│  │        ENTONCES: ↰ solo motor derecho avanza    │   │
│  │                                                 │   │
│  │     🔀 SI SINO [comando] = ['R']                │   │
│  │        ENTONCES: ↱ solo motor izquierdo avanza  │   │
│  │                                                 │   │
│  │     🔀 SI NO (cualquier otro)                   │   │
│  │        ENTONCES: ⏹️ parar todos los motores     │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Bloques para "Mover Motor Adelante/Atrás"

Cada acción de motor usa 3 bloques internamente:

```
"Mover Motor Izquierdo Adelante" =
  ┌──────────────────────────────────────┐
  │ 📤 escribir en pin [7]  valor [ALTO] │  ← AIN1 = HIGH
  │ 📤 escribir en pin [8]  valor [BAJO] │  ← AIN2 = LOW
  │ 📊 PWM en pin [6] valor [180]        │  ← Velocidad 180/255
  └──────────────────────────────────────┘

"Parar Motor Izquierdo" =
  ┌──────────────────────────────────────┐
  │ 📤 escribir en pin [7]  valor [BAJO] │
  │ 📤 escribir en pin [8]  valor [BAJO] │
  │ 📊 PWM en pin [6] valor [0]          │
  └──────────────────────────────────────┘
```

## Tabla de Equivalencia: Bloques ↔ C++

Una vez que tu programa de bloques funciona, esta tabla te muestra la equivalencia directa con el código C++:

| Bloque Visual | Código C++ equivalente |
|---|---|
| 🔌 `configurar pin [N] como SALIDA` | `pinMode(N, OUTPUT);` |
| 📤 `escribir en pin [N] ALTO` | `digitalWrite(N, HIGH);` |
| 📊 `PWM en pin [N] valor [V]` | `analogWrite(N, V);` |
| 📡 `iniciar Bluetooth [RX] [TX] a [baud]` | `SoftwareSerial bt(RX,TX); bt.begin(baud);` |
| 🔍 `Bluetooth tiene datos` | `bt.available()` |
| 📥 `leer Bluetooth` | `(char)bt.read()` |
| 🔀 `SI [condición] ENTONCES` | `if (condicion) { ... }` |
| 🔄 `PARA SIEMPRE` | `void loop() { ... }` |
| 💡 `parpadear LED N veces` | `blink(N, 150);` |

> [!TIP]
> Cuando tu programa de SteamakersBlocks está funcionando perfectamente, muchas plataformas tienen un botón "Ver Código" que muestra el C++ generado automáticamente. Úsalo para **comparar** tu programa de bloques con el código — así es como se aprende a programar profesionalmente.

## Ejercicio: Agregar un Nuevo Comportamiento en Bloques

Después de que el control básico funcione, intenta agregar en SteamakersBlocks:

**"Modo Turbo"**: Si el celular envía la letra `T`, los motores van a velocidad 230 en lugar de 180.

```
Pista: Agrega un bloque SI SINO adicional:

  🔀 SI SINO [comando] = ['T']
     ENTONCES:
     📊 PWM en pin [6] valor [230]   ← Turbo motor izquierdo
     📊 PWM en pin [5] valor [230]   ← Turbo motor derecho
```

En la próxima lección, vamos a escribir exactamente este mismo programa **en código C++** y verás que es prácticamente la misma lógica, solo con diferente sintaxis.

---

### Código C++: Firmware Completo Soccer Jr.
**Order**: 10  
**Slug**: `04-programacion/02-codigo-base`

---

<AdminOnly>
> **🎥 SECCIÓN DE VIDEO (Solo visible para administradores)**
>
> **Video 1: De Bloques a Código**
> - Duración: 12-15 min
> - Abrir SteamakersBlocks y el firmware lado a lado
> - Señalar línea por línea la equivalencia
> - Explicar por qué C++ tiene ventajas (más control, más opciones)
>
> **Video 2: Carga y Prueba del Firmware Final**
> - Duración: 8-10 min
> - Compilar, cargar, probar en cancha con el balón real
</AdminOnly>

---

> **📋 Prerrequisitos:** Haber completado el programa de SteamakersBlocks y entender la lógica del control RC.

---

# 🖥️ Firmware Completo en C++

Ahora traduces lo que hiciste en SteamakersBlocks al **código real que corre en tu Arduino**. Verás que cada bloque que pusiste tiene exactamente una línea de código C++ equivalente.

## Estructura del Firmware

```
ESTRUCTURA DEL PROGRAMA ARDUINO:

├── Sección 1: Includes y Definiciones
│   ├── #include <SoftwareSerial.h>    ← Librería para Bluetooth
│   ├── #define PINES_MOTOR...         ← Nombres descriptivos para los pines
│   └── SoftwareSerial bt(2, 3);       ← Objeto del Bluetooth
│
├── Sección 2: Variables Globales
│   ├── char comandoActual             ← El último comando recibido
│   └── int pwmIzq, pwmDer            ← Velocidad actual de cada motor
│
├── Sección 3: Funciones de Apoyo
│   ├── blink()                        ← LED de confirmación
│   ├── moverMotorIzq(int v)           ← Controla motor izquierdo
│   ├── moverMotorDer(int v)           ← Controla motor derecho
│   └── ejecutarComando(char cmd)      ← Traduce 'F','B','L','R','S' a motores
│
├── Sección 4: setup()
│   ├── Configurar pines como OUTPUT
│   ├── Iniciar Serial y Bluetooth
│   └── Señal de inicio: blink(5, 100)
│
└── Sección 5: loop()
    ├── Leer Bluetooth si hay datos
    ├── Ejecutar el comando recibido
    └── Leer batería cada 500ms y guardar log
```

## El Firmware Completo

Descarga el archivo oficial: **[Soccer-Jr.ino ↓](/downloads/Soccer-Jr.ino)**

O cópialo directamente aquí:

```cpp
// ============================================================
//  SOCCER JR. - Firmware v1.0 Completo
//  Robot Soccer Junior — Control Bluetooth RC
// ============================================================
//  PROTOCOLO: App "Bluetooth RC Controller"
//    F=Avanzar  B=Retroceder  L=Giro Izq  R=Giro Der  S=Stop
// ============================================================

// --- Seleccionar tu driver (descomenta solo UNO) ---
// #define DRIVER_L293D_SHIELD
#define DRIVER_L298N_MODULE

#include <SoftwareSerial.h>
SoftwareSerial bt(2, 3);  // HC-05: RX=pin2, TX=pin3 (con divisor en pin3)

// --- Pines del Driver ---
#define MOTOR_IZQ_EN  6   // PWM velocidad motor izquierdo
#define MOTOR_IZQ_A   7   // Dirección 1
#define MOTOR_IZQ_B   8   // Dirección 2
#define MOTOR_DER_EN  5   // PWM velocidad motor derecho
#define MOTOR_DER_A   9   // Dirección 1
#define MOTOR_DER_B   10  // Dirección 2

// --- Batería: divisor de tensión en A0 ---
// R1=10kΩ (Vbat a A0), R2=10kΩ (A0 a GND) → factor 2.0
#define BAT_PIN       A0
#define BAT_CRIT_MV   6400   // < 6.4V = apagar motores

// --- Velocidades ---
#define VEL_NORMAL  200  // 0-255 PWM
#define VEL_GIRO    180  // Para giros (algo menos que avance)

// --- Variables ---
char comandoActual = 'S';
bool bateriaApagada = false;

// ── FUNCIÓN: blink ──────────────────────────────────────────
void blink(int veces = 3, int ms = 150) {
  for (int i = 0; i < veces; i++) {
    digitalWrite(LED_BUILTIN, HIGH); delay(ms);
    digitalWrite(LED_BUILTIN, LOW);  delay(ms);
  }
}

// ── FUNCIÓN: moverMotorIzq ──────────────────────────────────
// velocidad: positivo = adelante, negativo = atrás, 0 = parar
void moverMotorIzq(int velocidad) {
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

// ── FUNCIÓN: moverMotorDer ──────────────────────────────────
void moverMotorDer(int velocidad) {
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

// ── FUNCIÓN: ejecutarComando ────────────────────────────────
void ejecutarComando(char cmd) {
  if (bateriaApagada) {
    moverMotorIzq(0); moverMotorDer(0);
    return;  // Protección: batería baja → no mover
  }
  
  switch (cmd) {
    case 'F':  // AVANZAR
      moverMotorIzq(VEL_NORMAL);
      moverMotorDer(VEL_NORMAL);
      break;
    case 'B':  // RETROCEDER
      moverMotorIzq(-VEL_NORMAL);
      moverMotorDer(-VEL_NORMAL);
      break;
    case 'L':  // GIRO IZQUIERDA (suave)
      moverMotorIzq(0);
      moverMotorDer(VEL_GIRO);
      break;
    case 'R':  // GIRO DERECHA (suave)
      moverMotorIzq(VEL_GIRO);
      moverMotorDer(0);
      break;
    case 'I':  // GIRO BRUSCO IZQUIERDA (en el lugar)
      moverMotorIzq(-VEL_GIRO);
      moverMotorDer(VEL_GIRO);
      break;
    case 'J':  // GIRO BRUSCO DERECHA (en el lugar)
      moverMotorIzq(VEL_GIRO);
      moverMotorDer(-VEL_GIRO);
      break;
    default:   // STOP (cualquier otro carácter)
      moverMotorIzq(0);
      moverMotorDer(0);
      break;
  }
}

// ── SETUP ────────────────────────────────────────────────────
void setup() {
  // Configurar pines de motor como salida
  pinMode(MOTOR_IZQ_EN, OUTPUT); pinMode(MOTOR_IZQ_A, OUTPUT); pinMode(MOTOR_IZQ_B, OUTPUT);
  pinMode(MOTOR_DER_EN, OUTPUT); pinMode(MOTOR_DER_A, OUTPUT); pinMode(MOTOR_DER_B, OUTPUT);
  pinMode(LED_BUILTIN, OUTPUT);
  
  // Motores apagados por seguridad
  moverMotorIzq(0); moverMotorDer(0);
  
  // Comunicaciones
  Serial.begin(115200);  // USB Monitor Serie
  bt.begin(9600);        // HC-05
  
  // Señal de inicio exitoso → 5 parpadeos rápidos
  blink(5, 100);
  Serial.println("=== SOCCER JR. v1.0 - LISTO ===");
}

// ── LOOP ─────────────────────────────────────────────────────
void loop() {
  // 1. LEER BLUETOOTH
  if (bt.available()) {
    char cmd = (char)bt.read();
    if (cmd == 'F' || cmd == 'B' || cmd == 'L' || cmd == 'R' ||
        cmd == 'S' || cmd == 'I' || cmd == 'J') {
      comandoActual = cmd;
      ejecutarComando(comandoActual);
    }
  }
  
  // 2. MONITOR DE BATERÍA (cada 500ms)
  static unsigned long ultimaLectura = 0;
  if (millis() - ultimaLectura > 500) {
    ultimaLectura = millis();
    
    int raw = analogRead(BAT_PIN);
    float vout_mv = raw * (5000.0 / 1023.0);  // mV del pin A0
    uint16_t bat_mv = (uint16_t)(vout_mv * 2.0);  // Factor divisor 10k/10k
    
    if (bat_mv < BAT_CRIT_MV && bat_mv > 1000) {
      // Batería críticamente baja — apagar motores
      bateriaApagada = true;
      moverMotorIzq(0); moverMotorDer(0);
      blink(10, 50);  // Parpadeo de alarma
    }
  }
}
```

## Diagrama de Flujo del Firmware Completo

```
      SETUP: Configurar pines, Bluetooth, LED
             blink(5) → ROBOT LISTO
                    │
                    ▼
     ┌──────────────────────────────────────┐
     │  LOOP (repite millones de veces/seg)  │◄─────┐
     └──────────────────────────────────────┘       │
                    │                               │
                    ▼                               │
     ┌──────────────────────────────────────┐       │
     │  ¿bt.available()? (dato Bluetooth)   │       │
     └───────┬────────────────────┬─────────┘       │
             │ SÍ                 │ NO               │
             ▼                   │                  │
     ┌───────────────┐           │                  │
     │  cmd = bt.read│           │                  │
     └───────┬───────┘           │                  │
             │                   │                  │
             ▼                   │                  │
     ┌───────────────────────────────────────┐      │
     │  ejecutarComando(cmd):                │      │
     │  F→ Ambos adelante  B→ Ambos atrás    │      │
     │  L→ Solo der avanza R→ Solo izq avanza│      │
     │  I→ Giro brusco izq J→ Giro brusco der│      │
     │  otro→ Parar                          │      │
     └───────────────────────────────────────┘      │
             │                   │                  │
             └───────────────────┘                  │
                       │                            │
                       ▼                            │
     ┌──────────────────────────────────────┐       │
     │  ¿Han pasado 500ms?                  │       │
     └──────┬──────────────────────┬────────┘       │
            │ SÍ                   │ NO              │
            ▼                      │                 │
     ┌────────────────────┐        │                 │
     │  Leer batería A0   │        │                 │
     │  bat_mv = raw×2×5V/│        │                 │
     │  ¿bat_mv < 6400?   │        │                 │
     └──────┬─────────────┘        │                 │
            │ SÍ                   │                 │
            ▼                      │                 │
     ┌────────────────────┐        │                 │
     │ PARAR MOTORES      │        │                 │
     │ blink(10, 50)      │        │                 │
     └──────┬─────────────┘        │                 │
            └──────────────────────┘                 │
                       │                             │
                       └────────────────────────────►┘
```

## Comparación Final: Bloques vs C++

```
┌──────────────────────────────────────────────────────────────────┐
│  STEAMAKERSBLOCKS              │  C++ ARDUINO                     │
├────────────────────────────────┼─────────────────────────────────┤
│ 🔄 PARA SIEMPRE                │ void loop() { ... }             │
│ 🔌 configurar pin OUTPUT       │ pinMode(N, OUTPUT)              │
│ 📤 escribir pin ALTO           │ digitalWrite(N, HIGH)           │
│ 📊 PWM valor 180               │ analogWrite(N, 180)             │
│ 🔍 SI bluetooth tiene datos    │ if (bt.available())             │
│ 📥 leer bluetooth              │ (char)bt.read()                 │
│ 🔀 SI [cmd]='F' ENTONCES       │ if (cmd == 'F') { ... }         │
│    mover ambos adelante        │    moverMotorIzq(200);          │
│                                │    moverMotorDer(200);          │
│ ⏱️ millis() - ultima > 500     │ millis() - lastTime > 500       │
└──────────────────────────────────────────────────────────────────┘
```

> [!TIP]
> **La regla de los programadores:** Si puedes dibujarlo en un diagrama de flujo, puedes escribirlo en código. La diferencia entre SteamakersBlocks y C++ es solo el **idioma** — la lógica es idéntica. ¡Ahora hablas Arduino C++!

---


## Módulo: Appendix

### DC Motors & Gear Reduction
**Order**: 13  
**Slug**: `05-appendix/01-dc-motors`

---

import DcMotorSim from '../../../components/tools/DcMotorSim.jsx';

<AdminOnly>
> **🎥 VIDEO SECTION (Visible to admins only)**
>
> **Video 1: Inside a DC Motor**
> - Duration: 8–10 min
> - Disassemble a TT motor and identify each part
> - Demonstrate how current direction changes rotation direction
>
> **Video 2: Gear Reduction in Practice**
> - Duration: 6–8 min
> - Show the gear train inside the yellow gearbox
> - Measure RPM with and without load
</AdminOnly>

---

# ⚙️ DC Motors & Gear Reduction

Your Soccer Jr. robot moves because of two **yellow TT DC motors**. They look simple — but there's real physics happening inside.

## How a DC Motor Works

A DC motor converts **electrical energy into rotational mechanical energy** using three key principles:

```
Inside a DC Motor (simplified cross-section):

         N ──────────────── N
         │   ┌──────────┐   │
         │   │  Coil    │   │
         │   │ (rotates)│   │    ← When current flows through
         │   └──────────┘   │      the coil, it experiences
         S ──────────────── S      a magnetic force (Lorentz)

         ↑           ↑
    Permanent    Commutator + Brushes
     Magnets     (reverse current every half-turn
                  to keep rotation going)
```

1. **Permanent magnets** create a fixed magnetic field inside the motor
2. **The coil (armature)** carries current and sits inside that field → it experiences a rotational force
3. **The commutator** reverses the current direction every half revolution so the coil always spins the same way

**Direction of rotation** is controlled simply by reversing the voltage polarity — which is exactly what the H-bridge does for us.

## The Yellow Gearbox: Why We Need Gear Reduction

The raw DC motor inside the TT motor spins at **~12,000 RPM** with almost no torque — far too fast and weak to move a robot. The **yellow plastic gearbox** solves this with a gear reduction of approximately **1:48**.

```
Gear Reduction Chain (1:48 example):

Motor shaft: 12,000 RPM ──► Gear 1 (small) ──► Gear 2 (large)
                                    ↓                  ↓
                              × (1/4) speed      × 4 torque

Continue through 3–4 gear stages:

Final output: ~250 RPM, 48× more torque ✅
```

**The tradeoff is always conserved:**
- More gear reduction → **slower speed, more torque** (power to push/turn)
- Less gear reduction → **faster speed, less torque** (risks stalling on carpet)

For Soccer Jr., the 1:48 ratio is chosen to balance speed (competitive on a 2×2m field) with enough torque to push the ball and handle collisions.

## Voltage, Current, and the Torque-Speed Curve

The relationship between a motor's speed and torque follows a straight line — the **torque-speed curve**:

```
Torque-Speed Curve (fixed voltage):

Torque ↑
       │╲
       │  ╲  Stall torque (motor stopped, max torque)
       │    ╲
       │      ╲
       │        ╲
       └──────────╲─── Speed →
                   No-load speed (motor free-spinning, min torque)

Increasing voltage → shifts the whole line UP and RIGHT
```

- At **stall** (robot pushing against a wall): maximum torque, zero speed
- At **no load** (robot driving freely): maximum speed, minimum torque
- **PWM** (what `analogWrite()` does) effectively lowers the average voltage, which shifts the curve down and left — less speed AND less torque

---

## 🔬 Interactive Simulator: Torque-Speed Curve

Adjust the voltage (PWM duty cycle) and load to see how your motor's operating point moves along the curve.

<DcMotorSim client:only="react" />

---

> [!TIP]
> In your firmware, `VEL_NORMAL = 200` means roughly **78% duty cycle** (200/255). On the simulator, set duty cycle to 78% and observe the operating point. That's exactly where your robot runs during a normal forward drive.

> [!NOTE]
> **Open the [Soccer Jr. Field Simulator](/simulador)** and set `VEL_NORMAL` to 255 vs 150. Notice how at 255 the robot feels faster but harder to control on tight turns — that's the torque-speed tradeoff in action.

---

### The H-Bridge — Bidirectional Motor Control
**Order**: 14  
**Slug**: `05-appendix/02-h-bridge`

---

import HBridgeSim from '../../../components/tools/HBridgeSim.jsx';

<AdminOnly>
> **🎥 VIDEO SECTION (Visible to admins only)**
>
> **Video 1: Why We Need an H-Bridge**
> - Duration: 6–8 min
> - Measure motor current draw with a multimeter (show 400–600mA)
> - Show Arduino datasheet: max 40mA per GPIO pin
> - Demonstrate: connecting motor directly → brown pin smell / GPIO failure
>
> **Video 2: Inside the L298N**
> - Duration: 8–10 min
> - Trace the actual PCB circuit on the driver module
> - Show IN1/IN2/ENA pins and their effect on the motor
</AdminOnly>

---

# 🔌 The H-Bridge — Bidirectional Motor Control

Your Arduino is the brain. But it can't **directly** power the motors. Here's why — and how the L298N driver module solves the problem.

## The Problem: GPIO Pins Are Weak

```
Arduino Uno GPIO pin limits:
  Max output current:  40 mA  (absolute maximum, datasheet)
  Safe operating:      20 mA

TT Motor (yellow) at 5V:
  No-load current:    ~150 mA
  Under load:         ~400–600 mA
  Stall current:      ~800 mA+

Result: connecting a motor directly → 📛 GPIO burns out
```

We need a **power switch** that the Arduino controls with a tiny signal (20mA) but that lets battery current (600mA+) flow to the motor. That's exactly what the **H-bridge** is.

## The H-Bridge Topology

The name comes from the shape of the circuit — 4 transistors arranged like the letter **H**:

```
H-Bridge Circuit:

     Battery (+)
         │
    ┌────┴────┐
    │         │
   [S1]      [S2]   ← High-side switches (transistors)
    │         │
    ├── M ────┤      M = Motor
    │         │
   [S3]      [S4]   ← Low-side switches (transistors)
    │         │
    └────┬────┘
     Battery (-)

Forward:   S1 + S4 ON  →  current flows left→right through motor
Backward:  S2 + S3 ON  →  current flows right→left through motor
Brake:     S1 + S3 ON  →  both motor terminals tied to (+) → short brake
Coast:     all OFF      →  motor spins freely (no braking)
```

**Shoot-through protection** is critical: if S1 and S3 are ON simultaneously, you short-circuit the battery. The L298N has built-in dead-time to prevent this.

## PWM: Controlling Speed

Once you can go forward and backward, how do you control **speed**? With **PWM (Pulse Width Modulation)**.

```
PWM at different duty cycles (same 7.4V battery):

100% duty:  ████████████████  → Full 7.4V average → max speed
 78% duty:  █████████████░░░  → 5.8V average → VEL_NORMAL=200
 50% duty:  ████████░░░░░░░░  → 3.7V average → half speed
 25% duty:  ████░░░░░░░░░░░░  → 1.85V average → slow crawl

Arduino:  analogWrite(ENA_PIN, 200)  // 200/255 = 78% duty cycle
```

The motor's **inertia** averages out the pulses — it "sees" a lower voltage and runs slower. This is how `analogWrite()` controls your motor speed without wasting energy as heat (unlike a resistor).

## The L298N Module Pinout

```
Your robot's wiring:

Arduino          L298N Module         Motors
─────────        ────────────         ──────
Pin 5  ──ENA──► [ENA]                 [Motor A]
Pin 6  ──IN1──► [IN1] ──────────────► Left Motor (+)
Pin 7  ──IN2──► [IN2] ──────────────► Left Motor (-)
Pin 8  ──IN3──► [IN3] ──────────────► Right Motor (+)
Pin 9  ──IN4──► [IN4] ──────────────► Right Motor (-)
Pin 10 ──ENB──► [ENB]                 [Motor B]
                [12V] ◄── Battery (+)
                [GND] ◄── Battery (-) & Arduino GND
                [5V]  ──► Arduino VIN (optional power)
```

---

## 🔬 Interactive Simulator: H-Bridge Switch Board

Click the four transistor switches to set motor direction. Then adjust the PWM slider to control speed. Watch the current flow through the H.

<HBridgeSim client:only="react" />

---

> [!WARNING]
> Never activate S1+S3 or S2+S4 at the same time — this is a **shoot-through condition** that short-circuits the power supply. The L298N protects you automatically, but avoid it in custom driver code.

> [!TIP]
> If one of your motors spins in the wrong direction, you don't need to rewrite code — just swap the two motor wires going into the L298N output terminals. The firmware doesn't care which wire is (+) or (-).

---

### EMI Filters — Protecting Your Robot's Brain
**Order**: 15  
**Slug**: `05-appendix/03-emi-filters`

---

import OscilloscopeSim from '../../../components/tools/OscilloscopeSim.jsx';

<AdminOnly>
> **🎥 VIDEO SECTION (Visible to admins only)**
>
> **Video 1: Demonstrating Motor Noise**
> - Duration: 8–10 min
> - Show oscilloscope capture of a motor power line: before and after capacitor
> - Demonstrate: robot losing Bluetooth commands when motors are at full speed without caps
>
> **Video 2: Soldering the Fix**
> - Duration: 6–8 min
> - Solder 100nF ceramic capacitors across motor terminals
> - Demonstrate proper twisted-pair technique for motor cables
</AdminOnly>

---

# 📡 EMI Filters — Protecting Your Robot's Brain

Your robot has a hidden enemy: **its own motors**. Here's what happens and how to stop it.

## The Problem: Brush Arcing = Radio Noise

Inside every brushed DC motor, the commutator brushes make and break electrical contact thousands of times per second. Each break is a tiny **spark** — and sparks are broadband RF emitters.

```
Motor brush arcing — what's happening electrically:

Normal operation:
  Battery ──────► Coil ──────► Battery
          12V, 400mA (steady)

At commutation (brush lifts):
  Inductance of coil resists current drop → voltage spike!
  
  Voltage │    ╻      ╻      ╻      ╻
     12V  │────╹──────╹──────╹──────╹────  normal
     50V+ │  ↑ Spike (inductive kickback)
          └───────────────────────────────► time

  Each spike radiates as RF noise across 1MHz–500MHz spectrum
  The Bluetooth HC-05 operates at 2.4GHz — right in the noisy zone
```

This noise travels two ways:
1. **Conducted** — along the power wires back into the Arduino and HC-05 power rails
2. **Radiated** — through the air, directly into the HC-05 antenna

## Solution 1: Ceramic Capacitor Across Motor Terminals

A **100nF (0.1µF) ceramic capacitor** placed directly across the motor terminals absorbs the voltage spikes before they travel anywhere.

```
How the capacitor works:

WITHOUT capacitor:
  Motor ──► Voltage spike ──► Power wires ──► Arduino/HC-05 ← 💥

WITH capacitor:
  Motor ──► Voltage spike → Capacitor charges instantly
                           ↓
                    Spike energy absorbed
                    Power line stays clean ✅

  Ceramic capacitor (not electrolytic!) because:
  → Very low internal inductance (ESL)
  → Fast response time (nanoseconds)
  → Handles the high-frequency spikes from brush arcing
```

**Where to solder it:** directly across the two motor terminals, as close to the motor body as possible. Long wires between the cap and motor defeat the purpose.

## Solution 2: Twisted Motor Cables

The current going to the motor (+) and returning from it (-) creates a magnetic field. If the two wires run parallel and separate, their fields add up and radiate outward. If you **twist** them together, the fields cancel:

```
Parallel wires (bad):           Twisted pair (good):

  →→→→→→→→→→→→→  (+)             →/→/→/→/→/→/→/  (+)
                                  /×/×/×/×/×/×/
  ←←←←←←←←←←←←  (-)             ←/←/←/←/←/←/←  (-)

  Fields ADD → radiates          Fields CANCEL → near-zero radiation
```

**In practice:** twist the two motor wires with ~1 twist per centimeter before routing them to the L298N. It takes 30 seconds and measurably reduces Bluetooth dropout.

## Solution 3: Physical Separation

RF noise drops off with the **square of the distance**. Double the distance → 4× less noise power.

```
Good HC-05 placement:

┌────────────────────────────────┐
│  [Motor L]          [Motor R]  │  ← Motors: noise sources
│                                │
│     [L298N]    [Arduino]       │
│                                │
│                     [HC-05] ←──────── As far from motors as possible
└────────────────────────────────┘
         FRONT GUIDE →
```

Place the HC-05 at the **rear corner diagonal** from the motors. Use a short antenna extension wire if the chassis forces it near the motors.

---

## 🔬 Interactive Simulator: Virtual Oscilloscope

Toggle the ceramic capacitor and twisted cables ON/OFF and observe the power line noise in the time domain and frequency spectrum.

<OscilloscopeSim client:only="react" />

---

> [!CAUTION]
> Use **ceramic** capacitors (marked 104 = 100nF), NOT electrolytic. Electrolytic caps are too slow for high-frequency EMI suppression and will not help. Wrong capacitor type = Bluetooth still dropping commands.

> [!TIP]
> If your robot loses Bluetooth connection at full throttle but works fine at 50% speed, that's the classic EMI signature. Add the 100nF caps first — it fixes 90% of cases without any code changes.

---

### Bluetooth & Serial Communication
**Order**: 16  
**Slug**: `05-appendix/04-bluetooth-serial`

---

import SerialSim from '../../../components/tools/SerialSim.jsx';

<AdminOnly>
> **🎥 VIDEO SECTION (Visible to admins only)**
>
> **Video 1: Serial Communication Fundamentals**
> - Duration: 8–10 min
> - Show Arduino Serial Monitor: send characters, read responses
> - Visualize baud rate: slow vs fast, timing diagram on oscilloscope
>
> **Video 2: HC-05 Configuration**
> - Duration: 10–12 min
> - AT command mode: change baud rate, device name, pairing PIN
> - Pair with Android phone step by step
</AdminOnly>

---

# 📶 Bluetooth & Serial Communication

Your phone sends a command like `'F'` (forward). Your Arduino reads it and spins the motors. Between those two events, there's a full communication stack — let's trace every step.

## Layer 1: UART — The Serial Protocol

**UART (Universal Asynchronous Receiver-Transmitter)** is the protocol used between the HC-05 and the Arduino. It's the simplest possible serial protocol:

```
UART Transmission of the character 'F' (ASCII 70 = 0b01000110):

          Start                              Stop
          bit                               bit
  Line:   │▼│                               │▲│
  HIGH ───┘ └───────────────┐   ┌───────────┘ └─────────  next byte...
  LOW  ──────────────────────┘ └─────────────────────────
         │  0  1  0  0  0  1  1  0  │
         │←────── data bits ────────→│
         │← LSB first (bit 0 = '0') →│

Baud rate = 9600 means each bit lasts:  1/9600 = 104 µs
One byte = 10 bits (1 start + 8 data + 1 stop) = 1.04 ms
```

**Key settings for HC-05 ↔ Arduino:**
- Baud rate: **9600** (default for HC-05 in slave mode)
- Data bits: **8**
- Parity: **None**
- Stop bits: **1** (commonly written as 8N1)

In your firmware: `Serial.begin(9600)` sets this up on the Arduino side.

## Layer 2: HC-05 — The Bluetooth Radio Modem

The HC-05 is not a complex Bluetooth stack — it's a **radio modem**. It does exactly one thing:

```
HC-05 block diagram:

  UART RX ──► [HC-05 chip] ──► Bluetooth RF  (Arduino sends, phone receives)
  UART TX ◄── [HC-05 chip] ◄── Bluetooth RF  (phone sends, Arduino reads)

  What the HC-05 sees:  a stream of bytes from UART
  What it does:         wraps them in Bluetooth SPP packets and transmits
  What the phone sees:  a virtual COM port with the same byte stream
```

**SPP (Serial Port Profile)** is the Bluetooth profile that makes this work. It emulates a physical serial cable over Bluetooth — which is why your phone app can use a simple Bluetooth serial library to send text characters.

## Layer 3: The Full Command Path

```
Full path for command 'F' (Forward):

1. User presses [↑] button in phone app
   ↓
2. App calls: bluetoothSocket.send("F")
   ↓
3. Phone Bluetooth radio transmits SPP packet (2.4GHz RF)
   ─────── [air, ~1–3m range] ───────
   ↓
4. HC-05 receives RF, strips SPP headers
   ↓
5. HC-05 sends byte 0x46 ('F') via UART TX pin
   ─────── [wire, 104µs per bit at 9600 baud] ───────
   ↓
6. Arduino reads byte in Serial.read()
   ↓
7. switch(cmd) { case 'F': moveForward(); break; }
   ↓
8. analogWrite() sets motor PWM → robot moves forward

Total end-to-end latency: 20–80ms (Bluetooth) + <2ms (UART + code)
```

## Why 2.4GHz Motors and 2.4GHz Bluetooth Conflict

Both Bluetooth and the brushed DC motor noise operate in overlapping frequency ranges:

```
Frequency spectrum (simplified):

  DC motor brush noise:   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
                          1MHz                    1GHz  2.4GHz  5GHz

  Bluetooth channels:                                   ████████
                                                        2.4–2.485GHz

  Overlap zone:                                         ░░░░░████
                                                        ↑ Motor noise
                                                          bleeds into
                                                          BT channels
```

The ceramic capacitors (covered in the [EMI Filters lesson](./03-emi-filters)) are your primary weapon. Physical separation is your backup.

---

## 🔬 Interactive Simulator: Serial Packet Visualizer

Type a command character below and watch the full journey: byte encoding → UART transmission → Bluetooth RF → Arduino reception.

<SerialSim client:only="react" />

---

> [!TIP]
> If your robot responds but with a noticeable delay (~500ms), check your app's send loop. Some apps send the command repeatedly every 100ms while the button is held; others only send once on press. The "send once" approach requires the Arduino to handle a timeout (stop motors if no command received in X ms) — which is already implemented in `Soccer-Jr.ino`.

> [!NOTE]
> The HC-05 can be configured in **AT command mode** (hold the small button while powering on) to change its name (so it shows up as "Soccer-Jr-01" instead of "HC-05" in the Bluetooth device list) and its PIN. Not required to get it working, but useful for identifying your robot at a tournament.

---

### The Battery — Li-Ion Chemistry & Safe Operation
**Order**: 17  
**Slug**: `05-appendix/05-battery`

---

import BatterySim from '../../../components/tools/BatterySim.jsx';

<AdminOnly>
> **🎥 VIDEO SECTION (Visible to admins only)**
>
> **Video 1: Battery Chemistry Made Simple**
> - Duration: 8–10 min
> - Open a spent 18650 cell (safely!) to show physical structure
> - Demonstrate voltage measurement at different charge states
>
> **Video 2: Safe Handling and Charging**
> - Duration: 6–8 min
> - Show the correct charger for 18650 2S (balance charger)
> - Demonstrate storage voltage (3.8V/cell) for long-term storage
</AdminOnly>

---

# 🔋 The Battery — Li-Ion Chemistry & Safe Operation

Your robot runs on a **2S 18650 Li-Ion battery pack** — two cells in series. Understanding how it works prevents hardware damage and helps you predict how long your robot will last in a match.

## The 18650 Cell

The "18650" is a standardized cylindrical cell format:
- **18mm** diameter × **65.0mm** length × round (hence "0")
- Same basic chemistry as laptop batteries, power tool batteries, and Tesla Model S cells
- Nominal capacity for the cells used in Soccer Jr.: **2000–3000 mAh** depending on the supplier

```
Single 18650 Li-Ion cell voltage states:

  4.2V ─── Fully charged (never exceed this)
  │
  3.7V ─── Nominal (rated/average voltage)
  │
  3.0V ─── Cutoff (never discharge below this)
             ↓
             Permanent capacity loss if violated
```

## 2S Configuration: Two Cells in Series

"2S" means two cells connected in **series** — positive terminal of cell 1 to negative terminal of cell 2:

```
2S Pack:

  [Cell 1]  +──┤├──  [Cell 2]  +──► (+) output
  (-)──────┘             └──────────► (-) output

Voltages add:
  Fully charged:  4.2V + 4.2V = 8.4V
  Nominal:        3.7V + 3.7V = 7.4V  ← what "7.4V pack" means
  Cutoff:         3.0V + 3.0V = 6.0V  ← stop using the robot here
  
Capacity stays the same as a single cell (mAh doesn't add in series)
Current capacity stays at 2000–3000 mAh
```

Your L298N module accepts **up to 35V input** — so the 8.4V peak is perfectly safe.

## The Discharge Curve

The most important thing to understand about Li-Ion batteries is the **discharge curve** — how voltage changes as the battery drains:

```
Li-Ion 2S Discharge Curve (constant current):

Voltage
  8.4V │▓
       │▓▓
  8.0V │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ← FLAT ZONE (~80% of capacity)
  7.5V │                           Your robot's operating zone
  7.0V │                        ▓▓▓
       │                           ▓▓▓▓
  6.4V │─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ▓▓▓  ← STEEP DROP BEGINS
  6.0V │────────────────────────────── ▓  ← CUTOFF (stop here)
       └──────────────────────────────────► % capacity used
       0%        25%        50%       75%   100%
```

**Key insight:** Li-Ion voltage stays relatively flat through most of the discharge. This means **you can't reliably estimate remaining capacity from voltage alone** (unlike lead-acid batteries). The robot will feel "fine" at 30% capacity remaining, then slow down suddenly as it hits the steep drop zone.

## Battery Comparison

| Chemistry | Voltage (nominal) | Energy Density | Weight | Cost | Risk |
|---|---|---|---|---|---|
| **Li-Ion 18650** | 3.7V/cell | High | Light | Medium | Low-medium |
| LiPo | 3.7V/cell | Very High | Lightest | Medium | Higher (swelling/fire) |
| NiMH | 1.2V/cell | Medium | Heavy | Low | Very Low |
| Alkaline | 1.5V/cell | Low | Heaviest | Low | Very Low |

For Soccer Jr., **Li-Ion 18650** is the best balance: good energy density, reusable (500+ cycles), low risk with a basic BMS, and widely available. LiPo would be lighter but requires more careful handling and charging — overkill for this application.

## Over-Discharge: Permanent Damage

If a Li-Ion cell is discharged below **3.0V**, the internal chemistry changes irreversibly:

```
What happens below 3.0V/cell:

  Normal: Li+ ions intercalate cleanly between graphite layers
  
  Below 3.0V: Copper current collector begins to dissolve
              → Copper deposits form inside cell
              → Short-circuit risk + permanent capacity loss
              
  Symptom: battery that "felt fine" now only lasts half as long
```

**In practice:** stop using the robot when the pack voltage reads **6.4V** or lower. Your charger will refuse to charge cells below 2.5V — that's a tell that you over-discharged.

---

## 🔬 Interactive Simulator: Battery Discharge Curve

Choose a play style and watch how the battery voltage drops through a simulated match. See how aggressive driving versus conservative driving affects how long your robot lasts.

<BatterySim client:only="react" />

---

> [!CAUTION]
> **Never leave Li-Ion cells charging unattended for extended periods**, and always use a charger rated for Li-Ion chemistry (not NiMH chargers). A quality 18650 charger with overcharge protection costs less than $15 and will outlast many battery cycles.

> [!TIP]
> For long-term storage (weeks+), charge batteries to **~3.8V per cell** (storage voltage) instead of 4.2V. This significantly extends cycle life. A charged-to-full battery sitting on a shelf for months degrades faster than one stored at mid-charge.

---

