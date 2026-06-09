import { useState, useEffect, useRef } from "react";

const BAUD = 9600;
const BIT_DURATION_MS = 1000 / BAUD; // ~0.104ms per bit
const BYTE_BITS = 10; // 1 start + 8 data + 1 stop

const COMMANDS = {
  F: { label: "Forward",  color: "#22c55e", effect: "Both motors: PWM=200 (forward)" },
  B: { label: "Backward", color: "#3b82f6", effect: "Both motors: PWM=200 (reverse)" },
  L: { label: "Left",     color: "#f59e0b", effect: "Left motor: 0 | Right motor: PWM=180" },
  R: { label: "Right",    color: "#a855f7", effect: "Right motor: 0 | Left motor: PWM=180" },
  S: { label: "Stop",     color: "#6b7280", effect: "Both motors: PWM=0" },
};

function charToBits(ch) {
  const ascii = ch.charCodeAt(0);
  const bits = [];
  bits.push(0); // start bit
  for (let i = 0; i < 8; i++) bits.push((ascii >> i) & 1); // LSB first
  bits.push(1); // stop bit
  return bits;
}

export default function SerialSim() {
  const [selectedCmd, setSelectedCmd] = useState("F");
  const [animating, setAnimating] = useState(false);
  const [stage, setStage] = useState(null); // "app" | "bt" | "hc05" | "uart" | "arduino" | "done"
  const [activeBit, setActiveBit] = useState(-1);
  const [latency, setLatency] = useState(null);
  const stageRef = useRef(null);

  const bits = charToBits(selectedCmd);
  const ascii = selectedCmd.charCodeAt(0);
  const cmd = COMMANDS[selectedCmd];

  const stages = ["app", "bt", "hc05", "uart", "arduino", "done"];
  const stageLabels = {
    app:     "📱 App sends character...",
    bt:      "📶 Bluetooth RF transmission (2.4GHz)...",
    hc05:    "📡 HC-05 receives packet, strips BT header...",
    uart:    "🔌 UART TX: transmitting bits at 9600 baud...",
    arduino: "🧠 Arduino reads byte, executes command...",
    done:    null,
  };

  const runAnimation = async () => {
    if (animating) return;
    setAnimating(true);
    setLatency(null);
    const start = performance.now();

    for (const s of stages.slice(0, -1)) {
      stageRef.current = s;
      setStage(s);
      setActiveBit(-1);

      if (s === "uart") {
        // Animate each bit
        for (let i = 0; i < bits.length; i++) {
          setActiveBit(i);
          await new Promise(r => setTimeout(r, 80)); // slowed for visibility
        }
      } else {
        const dur = s === "bt" ? 800 : s === "app" ? 400 : 500;
        await new Promise(r => setTimeout(r, dur));
      }
    }
    setLatency(Math.round(performance.now() - start));
    setStage("done");
    setAnimating(false);
  };

  const reset = () => { setStage(null); setActiveBit(-1); setLatency(null); };

  const StageRow = ({ id, label, active, done }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10,
      background: active ? "rgba(249,115,22,0.1)" : done ? "rgba(34,197,94,0.05)" : "rgba(255,255,255,0.02)",
      border: `1px solid ${active ? "rgba(249,115,22,0.4)" : done ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.05)"}`,
      transition: "all 0.3s" }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%",
        background: active ? "#f97316" : done ? "#22c55e" : "rgba(255,255,255,0.1)",
        boxShadow: active ? "0 0 10px #f97316" : "none", transition: "all 0.3s" }} />
      <span style={{ fontSize: 12, fontWeight: 600, color: active ? "#f97316" : done ? "#4ade80" : "rgba(255,255,255,0.3)", transition: "all 0.3s" }}>
        {label}
      </span>
    </div>
  );

  const stageIdx = stages.indexOf(stage);

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#0d1117", borderRadius: 16, padding: 24, border: "1px solid rgba(249,115,22,0.2)", marginTop: 24, marginBottom: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#a855f7", boxShadow: "0 0 10px #a855f7" }} />
        <span style={{ color: "#a855f7", fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase" }}>Serial Packet Visualizer</span>
      </div>

      {/* Command selector */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Select Command</div>
        <div style={{ display: "flex", gap: 8 }}>
          {Object.entries(COMMANDS).map(([ch, info]) => (
            <button key={ch} onClick={() => { setSelectedCmd(ch); reset(); }}
              style={{ padding: "8px 16px", borderRadius: 8, border: `2px solid ${selectedCmd === ch ? info.color : "rgba(255,255,255,0.1)"}`,
                background: selectedCmd === ch ? `${info.color}20` : "rgba(255,255,255,0.02)",
                color: selectedCmd === ch ? info.color : "rgba(255,255,255,0.4)", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              '{ch}'
            </button>
          ))}
        </div>
      </div>

      {/* Byte info */}
      <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 14, marginBottom: 20, border: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <div><span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Character: </span><span style={{ color: cmd.color, fontWeight: 800, fontSize: 18, fontFamily: "JetBrains Mono" }}>'{selectedCmd}'</span></div>
          <div><span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>ASCII: </span><span style={{ color: "#fff", fontWeight: 700, fontFamily: "JetBrains Mono" }}>{ascii} = 0x{ascii.toString(16).toUpperCase()} = 0b{ascii.toString(2).padStart(8,'0')}</span></div>
          <div><span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Effect: </span><span style={{ color: cmd.color, fontWeight: 600, fontSize: 12 }}>{cmd.effect}</span></div>
        </div>
      </div>

      {/* Bit-level visualization */}
      <div style={{ background: "#050a10", borderRadius: 10, padding: 16, marginBottom: 20, border: "1px solid rgba(0,255,100,0.08)" }}>
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>UART Frame (10 bits at 9600 baud = {(BYTE_BITS * BIT_DURATION_MS).toFixed(2)}ms)</div>
        <div style={{ display: "flex", gap: 3, alignItems: "flex-end" }}>
          {bits.map((bit, i) => {
            const isActive = stage === "uart" && activeBit === i;
            const isDone = stage === "uart" ? activeBit > i : stage === "arduino" || stage === "done";
            const label = i === 0 ? "START" : i === 9 ? "STOP" : `b${i-1}`;
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                <div style={{ fontSize: 9, color: isActive ? "#f97316" : isDone ? "#4ade80" : "rgba(255,255,255,0.3)", marginBottom: 3, fontFamily: "JetBrains Mono" }}>{label}</div>
                <div style={{ height: bit === 0 ? 24 : 40, width: "100%", borderRadius: 3,
                  background: isActive ? "#f97316" : isDone ? (bit === 1 ? "#4ade80" : "#1e3a2f") : (bit === 1 ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.04)"),
                  border: `1px solid ${isActive ? "#f97316" : isDone ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.08)"}`,
                  transition: "all 0.1s", boxShadow: isActive ? "0 0 12px #f97316" : "none" }} />
                <div style={{ fontSize: 10, color: isActive ? "#f97316" : isDone ? "#4ade80" : "rgba(255,255,255,0.4)", marginTop: 3, fontFamily: "JetBrains Mono", fontWeight: 700 }}>{bit}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transmission pipeline */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
        {stages.slice(0, -1).map((s, i) => (
          <StageRow key={s} id={s} label={stageLabels[s]}
            active={stage === s}
            done={stageIdx > stages.indexOf(s)} />
        ))}
      </div>

      {/* Result */}
      {stage === "done" && (
        <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 10, padding: 14, marginBottom: 16, color: "#4ade80", fontWeight: 700, fontSize: 13 }}>
          ✓ Command '{selectedCmd}' received by Arduino in ~{latency}ms · Motor action: {cmd.effect}
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={runAnimation} disabled={animating}
          style={{ flex: 1, padding: "12px 20px", borderRadius: 10, border: "none", background: animating ? "rgba(255,255,255,0.05)" : "#f97316", color: animating ? "rgba(255,255,255,0.3)" : "#000", fontWeight: 800, fontSize: 13, cursor: animating ? "default" : "pointer", transition: "all 0.2s" }}>
          {animating ? "Transmitting..." : "▶ Send Command"}
        </button>
        <button onClick={reset}
          style={{ padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.5)", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
          Reset
        </button>
      </div>
    </div>
  );
}
