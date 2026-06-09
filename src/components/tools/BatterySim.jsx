import { useState, useEffect, useRef } from "react";

const STYLES = {
  aggressive: {
    label: "Aggressive",
    color: "#ef4444",
    desc: "Full throttle, constant turns",
    baseCurrent: 1.1,   // A average draw
    turnFactor: 0.18,   // extra spike per second
  },
  balanced: {
    label: "Balanced",
    color: "#f97316",
    desc: "Mix of speed and control",
    baseCurrent: 0.65,
    turnFactor: 0.06,
  },
  defensive: {
    label: "Defensive",
    color: "#22c55e",
    desc: "Slow, deliberate movement",
    baseCurrent: 0.38,
    turnFactor: 0.02,
  },
};

const CAPACITY_MAH = 2200;
const CELLS = 2;
const FULL_V = 4.2 * CELLS;    // 8.4V
const NOM_V  = 3.7 * CELLS;    // 7.4V
const WARN_V = 3.4 * CELLS;    // 6.8V
const CUTOFF_V = 3.0 * CELLS;  // 6.0V

// Li-Ion 2S discharge curve: maps % capacity remaining → voltage
function capacityToVoltage(pct) {
  // Piecewise approximation of Li-Ion 2S discharge curve
  if (pct > 95) return FULL_V - (FULL_V - 8.0) * ((100 - pct) / 5);
  if (pct > 20) return 8.0 - (8.0 - 7.0) * ((95 - pct) / 75);
  if (pct > 5)  return 7.0 - (7.0 - CUTOFF_V) * ((20 - pct) / 15);
  return CUTOFF_V;
}

export default function BatterySim() {
  const [style, setStyle] = useState("balanced");
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);   // seconds
  const [history, setHistory] = useState([]);   // { t, v, cap }
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const stateRef = useRef({ cap: 100, elapsed: 0 });

  const cfg = STYLES[style];

  // Drain per second (% of capacity)
  function drainPerSec(t) {
    // Add some randomness for realism
    const noise = 1 + (Math.random() - 0.5) * 0.2;
    const spikes = Math.random() < 0.1 ? cfg.turnFactor * 3 : cfg.turnFactor;
    return ((cfg.baseCurrent + spikes) / CAPACITY_MAH * 1000 * 100) * noise;
  }

  const startSim = () => {
    if (running) return;
    stateRef.current = { cap: 100, elapsed: 0 };
    setElapsed(0);
    setHistory([{ t: 0, v: FULL_V, cap: 100 }]);
    setRunning(true);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setElapsed(0);
    setHistory([]);
    stateRef.current = { cap: 100, elapsed: 0 };
  };

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      stateRef.current.elapsed += 1;
      stateRef.current.cap = Math.max(0, stateRef.current.cap - drainPerSec(stateRef.current.elapsed));
      const v = capacityToVoltage(stateRef.current.cap);
      setElapsed(stateRef.current.elapsed);
      setHistory(prev => [...prev, { t: stateRef.current.elapsed, v, cap: stateRef.current.cap }]);
      if (stateRef.current.cap <= 0) {
        clearInterval(intervalRef.current);
        setRunning(false);
      }
    }, 200); // 200ms real = 1s simulated (5× speedup)
    return () => clearInterval(intervalRef.current);
  }, [running, style]);

  // Draw chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || history.length < 2) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "#050a10";
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    for (let i = 0; i <= 8; i++) {
      const y = (i / 8) * H;
      ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(W, y); ctx.stroke();
    }

    const maxT = Math.max(history[history.length - 1].t, 60);
    const toX = (t) => 40 + (t / maxT) * (W - 50);
    const toY = (v) => H - 20 - ((v - CUTOFF_V) / (FULL_V - CUTOFF_V)) * (H - 30);

    // Warning zone
    const warnY = toY(WARN_V);
    const cutoffY = toY(CUTOFF_V);
    ctx.fillStyle = "rgba(239,68,68,0.06)";
    ctx.fillRect(40, warnY, W - 50, cutoffY - warnY);

    // Reference lines
    const refLines = [
      { v: FULL_V, label: "8.4V (full)", color: "rgba(34,197,94,0.4)" },
      { v: NOM_V,  label: "7.4V (nominal)", color: "rgba(255,255,255,0.2)" },
      { v: WARN_V, label: "6.8V ⚠ warn", color: "rgba(251,191,36,0.5)" },
      { v: CUTOFF_V, label: "6.0V ✕ stop", color: "rgba(239,68,68,0.5)" },
    ];
    refLines.forEach(({ v, label, color }) => {
      const y = toY(v);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(W, y); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = color;
      ctx.font = "9px JetBrains Mono, monospace";
      ctx.textAlign = "left";
      ctx.fillText(label, 42, y - 2);
    });

    // Discharge curve
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    history.forEach((pt, i) => {
      const x = toX(pt.t);
      const y = toY(pt.v);
      const frac = pt.cap / 100;
      const r = Math.round(239 + (34-239)*frac);
      const g = Math.round(68  + (197-68)*frac);
      const b = Math.round(68  + (94-68)*frac);
      ctx.strokeStyle = `rgb(${r},${g},${b})`;
      if (i === 0) ctx.moveTo(x, y);
      else { ctx.lineTo(x, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y); }
    });

    // Axis labels
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.font = "10px JetBrains Mono";
    ctx.textAlign = "center";
    ctx.fillText("time (s)", W / 2 + 20, H - 2);
    ctx.save(); ctx.translate(12, H / 2); ctx.rotate(-Math.PI/2);
    ctx.fillText("Voltage (V)", 0, 0);
    ctx.restore();

  }, [history]);

  const lastV = history.length > 0 ? history[history.length - 1].v : FULL_V;
  const lastCap = history.length > 0 ? history[history.length - 1].cap : 100;
  const voltColor = lastV > WARN_V ? "#22c55e" : lastV > CUTOFF_V ? "#f59e0b" : "#ef4444";

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#0d1117", borderRadius: 16, padding: 24, border: "1px solid rgba(249,115,22,0.2)", marginTop: 24, marginBottom: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 10px #22c55e" }} />
        <span style={{ color: "#22c55e", fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase" }}>Battery Discharge Simulator</span>
      </div>

      {/* Style selector */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 20 }}>
        {Object.entries(STYLES).map(([key, s]) => (
          <button key={key} onClick={() => { setStyle(key); reset(); }} disabled={running}
            style={{ padding: "12px 10px", borderRadius: 10, border: `2px solid ${style === key ? s.color : "rgba(255,255,255,0.1)"}`,
              background: style === key ? `${s.color}18` : "rgba(255,255,255,0.02)",
              color: style === key ? s.color : "rgba(255,255,255,0.4)", fontWeight: 700, fontSize: 12, cursor: running ? "default" : "pointer", textAlign: "center" }}>
            <div style={{ fontSize: 14, marginBottom: 3 }}>{s.label}</div>
            <div style={{ fontSize: 10, opacity: 0.7 }}>{s.desc}</div>
          </button>
        ))}
      </div>

      {/* Chart */}
      <canvas ref={canvasRef} width={560} height={220} style={{ width: "100%", height: "auto", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", marginBottom: 16 }} />

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 16 }}>
        {[
          { label: "Time",     value: `${elapsed}s`,           color: "rgba(255,255,255,0.8)" },
          { label: "Voltage",  value: `${lastV.toFixed(2)}V`,  color: voltColor },
          { label: "Capacity", value: `${lastCap.toFixed(0)}%`, color: "#60a5fa" },
          { label: "Avg Draw", value: `${(cfg.baseCurrent * 1000).toFixed(0)}mA`, color: cfg.color },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: 10, border: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, textTransform: "uppercase" }}>{label}</div>
            <div style={{ color, fontSize: 20, fontWeight: 800, margin: "4px 0" }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Warning */}
      {lastV <= WARN_V && lastV > CUTOFF_V && history.length > 0 && (
        <div style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: 10, padding: 12, color: "#fbbf24", fontWeight: 700, fontSize: 12, textAlign: "center", marginBottom: 12 }}>
          ⚠ Battery warning — consider ending the match soon
        </div>
      )}
      {lastV <= CUTOFF_V && history.length > 0 && (
        <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.4)", borderRadius: 10, padding: 12, color: "#f87171", fontWeight: 700, fontSize: 12, textAlign: "center", marginBottom: 12 }}>
          🔴 Battery depleted — power off and recharge immediately to prevent cell damage
        </div>
      )}

      {/* Controls */}
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={startSim} disabled={running}
          style={{ flex: 1, padding: "12px 20px", borderRadius: 10, border: "none", background: running ? "rgba(255,255,255,0.05)" : cfg.color, color: running ? "rgba(255,255,255,0.3)" : "#000", fontWeight: 800, fontSize: 13, cursor: running ? "default" : "pointer" }}>
          {running ? "⚡ Simulating match..." : "▶ Start Match Simulation"}
        </button>
        <button onClick={reset}
          style={{ padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.5)", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
          Reset
        </button>
      </div>
      <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 10, textAlign: "center", marginTop: 8 }}>Simulation runs at 5× speed · Based on {CAPACITY_MAH}mAh 2S Li-Ion pack</p>
    </div>
  );
}
