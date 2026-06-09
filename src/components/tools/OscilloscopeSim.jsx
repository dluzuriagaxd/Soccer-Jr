import { useState, useEffect, useRef } from "react";

const SAMPLE_RATE = 200; // samples per visible window
const WINDOW_MS = 20; // milliseconds visible

function generateNoisySignal(t, capOn, twistedOn) {
  // Base 12V motor supply (DC component)
  const base = 7.4;
  // Brush arcing spikes: high-frequency bursts at commutation
  const spikeFreq = 480; // Hz (brushes)
  const spikeMag = capOn ? 0.18 : 1.4;
  const spike = spikeMag * Math.abs(Math.sin(Math.PI * spikeFreq * t * 0.001)) *
    (Math.random() < 0.15 ? (Math.random() * 2 - 1) : 0);
  // High-frequency ripple from PWM
  const pwmRipple = (capOn ? 0.04 : 0.25) * Math.sin(2 * Math.PI * 20000 * t * 0.001);
  // Cable radiation contribution
  const cableNoise = twistedOn ? 0 : (0.08 * (Math.random() * 2 - 1));
  return base + spike + pwmRipple + cableNoise;
}

export default function OscilloscopeSim() {
  const [capOn, setCapOn] = useState(false);
  const [twistedOn, setTwistedOn] = useState(false);
  const [running, setRunning] = useState(true);
  const canvasRef = useRef(null);
  const timeRef = useRef(0);
  const animRef = useRef(null);
  const bufferRef = useRef([]);

  useEffect(() => {
    if (!running) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    const loop = () => {
      timeRef.current += WINDOW_MS / SAMPLE_RATE;

      // Build full buffer
      const samples = [];
      for (let i = 0; i < SAMPLE_RATE; i++) {
        const t = timeRef.current - WINDOW_MS + (i / SAMPLE_RATE) * WINDOW_MS;
        samples.push(generateNoisySignal(t, capOn, twistedOn));
      }
      bufferRef.current = samples;

      // Draw
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#050a10";
      ctx.fillRect(0, 0, W, H);

      // Grid lines (oscilloscope green tint)
      ctx.strokeStyle = "rgba(0,255,100,0.06)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 10; i++) {
        const x = (i / 10) * W;
        const y = (i / 10) * H;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Voltage scale: 5V to 10V visible
      const minV = 5.0;
      const maxV = 10.5;
      const toY = (v) => H - ((v - minV) / (maxV - minV)) * H;

      // Reference line at 7.4V (nominal)
      ctx.strokeStyle = "rgba(255,255,100,0.3)";
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.moveTo(0, toY(7.4)); ctx.lineTo(W, toY(7.4)); ctx.stroke();
      ctx.setLineDash([]);

      // Signal trace
      const noisy = !capOn || !twistedOn;
      const traceColor = noisy ? "rgba(255,80,80,0.9)" : "rgba(0,220,120,0.9)";
      ctx.strokeStyle = traceColor;
      ctx.lineWidth = 1.8;
      ctx.shadowColor = traceColor;
      ctx.shadowBlur = noisy ? 4 : 8;
      ctx.beginPath();
      samples.forEach((v, i) => {
        const x = (i / (SAMPLE_RATE - 1)) * W;
        const y = toY(v);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Labels
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.font = "10px JetBrains Mono, monospace";
      ctx.textAlign = "left";
      ctx.fillText("10.5V", 4, 12);
      ctx.fillText(" 7.4V ←nominal", 4, toY(7.4) - 3);
      ctx.fillText(" 5.0V", 4, H - 4);

      const noise = samples.reduce((sum, v) => sum + Math.pow(v - 7.4, 2), 0) / samples.length;
      const rms = Math.sqrt(noise);
      ctx.fillStyle = noisy ? "#f87171" : "#4ade80";
      ctx.textAlign = "right";
      ctx.font = "bold 11px JetBrains Mono, monospace";
      ctx.fillText(`Noise RMS: ${rms.toFixed(3)}V`, W - 6, 16);
      ctx.fillText(noisy ? "⚠ NOISY — signal corrupted" : "✓ CLEAN — safe for HC-05", W - 6, 32);

      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [capOn, twistedOn, running]);

  const ToggleBtn = ({ label, active, sub, onClick }) => (
    <button onClick={onClick} style={{
      flex: 1,
      padding: "14px 16px",
      borderRadius: 12,
      border: `2px solid ${active ? "#f97316" : "rgba(255,255,255,0.1)"}`,
      background: active ? "rgba(249,115,22,0.1)" : "rgba(255,255,255,0.02)",
      color: active ? "#f97316" : "rgba(255,255,255,0.5)",
      cursor: "pointer",
      textAlign: "left",
      transition: "all 0.2s",
    }}>
      <div style={{ fontWeight: 800, fontSize: 13 }}>{active ? "✓ " : "○ "}{label}</div>
      <div style={{ fontSize: 10, opacity: 0.6, marginTop: 3 }}>{sub}</div>
    </button>
  );

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#0d1117", borderRadius: 16, padding: 24, border: "1px solid rgba(249,115,22,0.2)", marginTop: 24, marginBottom: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 10px #4ade80" }} />
        <span style={{ color: "#4ade80", fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase" }}>Virtual Oscilloscope — Motor Power Line</span>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <ToggleBtn label="100nF Ceramic Cap" sub="Across motor terminals" active={capOn} onClick={() => setCapOn(p => !p)} />
        <ToggleBtn label="Twisted Cables" sub="1 twist per cm" active={twistedOn} onClick={() => setTwistedOn(p => !p)} />
      </div>

      {/* Oscilloscope screen */}
      <canvas ref={canvasRef} width={560} height={200} style={{ width: "100%", height: "auto", borderRadius: 10, border: "1px solid rgba(0,255,100,0.1)" }} />

      <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, textAlign: "center", marginTop: 8 }}>
        {WINDOW_MS}ms window · motor power rail · nominal 7.4V — red = corrupted, green = clean
      </p>

      {/* Status */}
      <div style={{ marginTop: 16, padding: 12, borderRadius: 10, background: (!capOn || !twistedOn) ? "rgba(239,68,68,0.08)" : "rgba(34,197,94,0.08)", border: `1px solid ${(!capOn || !twistedOn) ? "rgba(239,68,68,0.3)" : "rgba(34,197,94,0.3)"}`, color: (!capOn || !twistedOn) ? "#f87171" : "#4ade80", fontSize: 12, fontWeight: 600, textAlign: "center" }}>
        {!capOn && !twistedOn && "No filtering — motor EMI is corrupting the power rail and the Bluetooth signal"}
        {capOn && !twistedOn && "Cap installed — spikes absorbed, but radiated cable noise still present"}
        {!capOn && twistedOn && "Cables twisted — radiated EMI reduced, but spikes still on the power rail"}
        {capOn && twistedOn && "✓ Full filtering — power rail clean, radiated EMI cancelled. Bluetooth is stable."}
      </div>
    </div>
  );
}
