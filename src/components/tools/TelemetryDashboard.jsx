import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
    Title, Tooltip, Legend, Filler, BarElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import Papa from 'papaparse';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement,
    BarElement, Title, Tooltip, Legend, Filler, zoomPlugin);

// Cursor vertical sincronizado entre gráficas
const verticalLinePlugin = {
    id: 'verticalLine',
    afterDraw: (chart) => {
        if (chart.tooltip?._active?.length) {
            const x = chart.tooltip._active[0].element.x;
            const { top, bottom } = chart.scales.y;
            const ctx = chart.ctx;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, top); ctx.lineTo(x, bottom);
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(255,255,255,0.15)';
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.restore();
        }
    }
};
ChartJS.register(verticalLinePlugin);

const BAT_WARN_V = 6.8;
const BAT_CRIT_V = 6.4;

const COMANDO_COLOR = { F: '#4ade80', B: '#f87171', L: '#60a5fa', R: '#c084fc', S: '#94a3b8', I: '#38bdf8', J: '#fb923c' };
const COMANDO_LABEL = { F: 'Adelante', B: 'Atrás', L: 'Giro Izq', R: 'Giro Der', S: 'Stop', I: 'G.Brusco Izq', J: 'G.Brusco Der' };

const SoccerDashboard = () => {
    const [data, setData] = useState(null);
    const [fileInfo, setFileInfo] = useState(null);
    const [showGuide, setShowGuide] = useState(false);
    const chartsRef = useRef({});

    // Sync hover across charts
    const syncHover = (event, elements, chart) => {
        if (elements.length > 0) {
            const index = elements[0].index;
            Object.values(chartsRef.current).forEach((targetChart) => {
                if (targetChart && targetChart !== chart) {
                    const meta = targetChart.getDatasetMeta(0);
                    if (meta?.data[index]) {
                        const activeEls = targetChart.data.datasets.map((_, i) => ({ datasetIndex: i, index }));
                        targetChart.setActiveElements(activeEls);
                        targetChart.tooltip?.setActiveElements(activeEls, { x: meta.data[index].x, y: meta.data[index].y });
                    }
                    targetChart.update('none');
                }
            });
        }
    };

    const syncZoom = (e) => {
        const { min, max } = e.chart.scales.x;
        Object.values(chartsRef.current).forEach((chart) => {
            if (chart && chart !== e.chart) {
                chart.options.scales.x.min = min;
                chart.options.scales.x.max = max;
                chart.update('none');
            }
        });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setFileInfo({ name: file.name, points: 0 });
        Papa.parse(file, {
            header: false, dynamicTyping: true, skipEmptyLines: true,
            complete: (results) => {
                const rows = results.data;
                if (rows.length < 2) return;

                const parsed = {
                    labels: [], bat_v: [], cmd_num: [], pwm_izq: [], pwm_der: [],
                    cmd_raw: [],
                };

                const step = Math.max(1, Math.floor(rows.length / 3000));
                let count = 0;
                for (let i = 1; i < rows.length; i += step) {
                    const row = rows[i];
                    if (row.length < 5) continue;
                    const ts_ms = row[0] || 0;
                    const cmd = (row[1] || 'S').toString().trim();
                    const bat_mv = row[2] || 7400;
                    const pwm_i = row[3] || 0;
                    const pwm_d = row[4] || 0;

                    parsed.labels.push((ts_ms / 1000).toFixed(1) + 's');
                    parsed.bat_v.push(bat_mv / 1000);
                    parsed.cmd_raw.push(cmd);
                    // Encode command as number for chart
                    const cmdMap = { F: 5, B: 1, L: 3, R: 3, I: 4, J: 4, S: 0 };
                    parsed.cmd_num.push(cmdMap[cmd] ?? 0);
                    parsed.pwm_izq.push(pwm_i);
                    parsed.pwm_der.push(pwm_d);
                    count++;
                }

                // Stats
                const minBat = Math.min(...parsed.bat_v).toFixed(3);
                const cmdCounts = {};
                parsed.cmd_raw.forEach(c => { cmdCounts[c] = (cmdCounts[c] || 0) + 1; });
                const total = parsed.cmd_raw.length;
                const duration = parsed.labels.length > 0 ? parsed.labels[parsed.labels.length - 1] : '0s';

                setData({ ...parsed, stats: { minBat, cmdCounts, total, duration } });
                setFileInfo(prev => ({ ...prev, points: count }));
            }
        });
    };

    const resetZoom = () => Object.values(chartsRef.current).forEach(c => c?.resetZoom());

    const commonOptions = useMemo(() => ({
        responsive: true, maintainAspectRatio: false, animation: false,
        onHover: (event, elements, chart) => syncHover(event, elements, chart),
        interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: { position: 'top', align: 'end', labels: { color: '#94a3b8', usePointStyle: true, boxWidth: 6, font: { size: 9, weight: 'bold' } } },
            tooltip: {
                backgroundColor: 'rgba(15,23,42,0.98)', titleColor: '#e2e8f0', bodyColor: '#cbd5e1',
                borderColor: '#334155', borderWidth: 1, padding: 10,
            },
            zoom: {
                pan: { enabled: true, mode: 'x', onPan: syncZoom },
                zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x', onZoom: syncZoom }
            }
        },
        scales: {
            x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#475569', font: { size: 8 }, maxTicksLimit: 15, autoSkip: true, maxRotation: 0 } },
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#475569', font: { size: 9 } } }
        },
    }), []);

    // Battery chart options with horizontal alert lines
    const batOptions = useMemo(() => ({
        ...commonOptions,
        plugins: {
            ...commonOptions.plugins,
            annotation: undefined, // No annotation plugin, we'll use datasets instead
        },
        scales: {
            ...commonOptions.scales,
            y: {
                ...commonOptions.scales.y,
                min: 6.0, max: 8.6,
                ticks: { color: '#475569', font: { size: 9 }, stepSize: 0.4 }
            }
        }
    }), [commonOptions]);

    const EmptyState = () => (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
            <div className="w-24 h-24 rounded-[2rem] bg-black border border-white/5 flex items-center justify-center mb-8 shadow-2xl">
                <span className="text-4xl">⚽</span>
            </div>
            <h2 className="text-xl font-black text-white mb-3 tracking-tight uppercase">Esperando datos del partido</h2>
            <p className="text-slate-500 max-w-sm font-bold text-[10px] uppercase tracking-widest leading-relaxed">
                Exporta el log de tu robot vía USB (escribe 'D' en el monitor serie) y carga el CSV aquí
            </p>
            <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/5 text-left max-w-xs">
                <p className="text-[9px] text-white/40 font-mono uppercase tracking-widest mb-2">Formato CSV esperado:</p>
                <p className="text-[9px] text-green-400/70 font-mono">Timestamp_ms,Comando,Bateria_mV,PWM_Izq,PWM_Der</p>
                <p className="text-[9px] text-white/20 font-mono">1000,F,8345,200,200</p>
                <p className="text-[9px] text-white/20 font-mono">1500,L,8290,0,180</p>
                <p className="text-[9px] text-white/20 font-mono">...</p>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-screen w-screen bg-neutral-900 text-[#cbd5e1] overflow-hidden">

            {/* Header */}
            <header className="h-12 bg-black border-b border-white/5 flex items-center justify-between px-6 shrink-0 z-50">
                <div className="flex items-center gap-4">
                    <a href="/" className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Volver
                    </a>
                    <span className="w-px h-4 bg-white/10" />
                    <h1 className="text-[11px] font-black uppercase tracking-[0.2em] text-white">⚽ Análisis Post-Match — Soccer Jr.</h1>
                </div>

                <div className="flex items-center gap-3">
                    {fileInfo && (
                        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] font-mono">
                            <span className="text-green-400 opacity-70 uppercase tracking-tighter">CSV:</span>
                            <span className="text-white/50 truncate max-w-[180px]">{fileInfo.name}</span>
                            <span className="text-white/20">·</span>
                            <span className="text-white/40">{fileInfo.points} pts</span>
                        </div>
                    )}
                    <button
                        onClick={() => setShowGuide(!showGuide)}
                        className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all border ${showGuide ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:bg-white/10'}`}
                    >
                        {showGuide ? 'Ocultar Guía' : 'Ver Guía'}
                    </button>
                    <label className="flex items-center gap-2 px-4 py-1.5 bg-green-500 hover:bg-green-400 text-black rounded-lg font-black text-[9px] uppercase tracking-widest cursor-pointer transition-all active:scale-95 shadow-lg shadow-green-500/20">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                        {data ? 'Cambiar CSV' : 'Cargar CSV'}
                        <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
                    </label>
                    {data && <button onClick={resetZoom} className="text-[9px] font-black text-white/20 hover:text-white transition-colors">Reset Zoom</button>}
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                <main className="flex-1 flex flex-col min-w-0">
                    {!data ? <EmptyState /> : (
                        <div className="flex-1 flex flex-col">
                            {/* Stats Bar */}
                            {data.stats && (
                                <div className="shrink-0 flex items-center gap-6 px-6 py-3 bg-black/40 border-b border-white/5 overflow-x-auto">
                                    <StatBadge label="Duración" value={data.stats.duration} color="#4ade80" />
                                    <StatBadge label="Voltaje Mín." value={`${data.stats.minBat}V`} color={parseFloat(data.stats.minBat) < BAT_CRIT_V ? '#ef4444' : parseFloat(data.stats.minBat) < BAT_WARN_V ? '#f59e0b' : '#4ade80'} />
                                    <StatBadge label="Puntos Log" value={data.stats.total.toString()} color="#60a5fa" />
                                    {Object.entries(data.stats.cmdCounts).sort(([,a],[,b]) => b - a).slice(0, 4).map(([cmd, count]) => (
                                        <StatBadge key={cmd} label={COMANDO_LABEL[cmd] || cmd} value={`${Math.round(count / data.stats.total * 100)}%`} color={COMANDO_COLOR[cmd] || '#94a3b8'} />
                                    ))}
                                </div>
                            )}

                            {/* Chart 1: Battery Voltage */}
                            <div className="flex-1 min-h-0 border-b border-white/5 p-3 flex flex-col relative group">
                                <ChartLabel icon="🔋" label="Voltaje Batería 18650 2S" />
                                <div className="flex-1">
                                    <Line
                                        ref={(r) => (chartsRef.current['bat'] = r)}
                                        options={batOptions}
                                        data={{
                                            labels: data.labels,
                                            datasets: [
                                                { label: 'Batería (V)', data: data.bat_v, borderColor: '#4ade80', backgroundColor: 'rgba(74,222,128,0.05)', fill: true, pointRadius: 0, borderWidth: 1.5, tension: 0.1 },
                                                { label: `Alerta ${BAT_WARN_V}V`, data: data.labels.map(() => BAT_WARN_V), borderColor: 'rgba(251,191,36,0.6)', borderDash: [6, 4], pointRadius: 0, borderWidth: 1 },
                                                { label: `Crítico ${BAT_CRIT_V}V`, data: data.labels.map(() => BAT_CRIT_V), borderColor: 'rgba(239,68,68,0.6)', borderDash: [6, 4], pointRadius: 0, borderWidth: 1 },
                                            ]
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Chart 2: Commands over time */}
                            <div className="flex-1 min-h-0 border-b border-white/5 p-3 flex flex-col relative group">
                                <ChartLabel icon="📡" label="Historial de Comandos Bluetooth" />
                                <div className="flex-1">
                                    <Line
                                        ref={(r) => (chartsRef.current['cmd'] = r)}
                                        options={{ ...commonOptions, scales: { ...commonOptions.scales, y: { ...commonOptions.scales.y, min: -0.5, max: 5.5, ticks: { color: '#475569', font: { size: 9 }, callback: (v) => ({ 0: 'S', 1: 'B', 3: 'L/R', 4: 'Brusco', 5: 'F' })[v] || '' } } } }}
                                        data={{
                                            labels: data.labels,
                                            datasets: [
                                                {
                                                    label: 'Comando', data: data.cmd_num,
                                                    borderColor: data.cmd_raw.map(c => COMANDO_COLOR[c] || '#94a3b8'),
                                                    segment: { borderColor: ctx => COMANDO_COLOR[data.cmd_raw[ctx.p0DataIndex]] || '#94a3b8' },
                                                    pointRadius: 0, borderWidth: 2, stepped: 'before', tension: 0
                                                }
                                            ]
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Chart 3: Motor PWMs */}
                            <div className="flex-1 min-h-0 p-3 flex flex-col relative group">
                                <ChartLabel icon="⚙️" label="Salida PWM de Motores (0-255)" />
                                <div className="flex-1">
                                    <Line
                                        ref={(r) => (chartsRef.current['pwm'] = r)}
                                        options={{ ...commonOptions, scales: { ...commonOptions.scales, y: { ...commonOptions.scales.y, min: 0, max: 260 } } }}
                                        data={{
                                            labels: data.labels,
                                            datasets: [
                                                { label: 'Motor Izq', data: data.pwm_izq, borderColor: '#f97316', pointRadius: 0, borderWidth: 1.5, tension: 0.1 },
                                                { label: 'Motor Der', data: data.pwm_der, borderColor: '#a855f7', pointRadius: 0, borderWidth: 1.5, tension: 0.1 }
                                            ]
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </main>

                {/* Sidebar Guide */}
                <aside className={`${showGuide ? 'w-80 border-l' : 'w-0 border-none'} bg-black/40 backdrop-blur-xl border-white/5 transition-all duration-500 shrink-0 flex flex-col overflow-hidden`}>
                    <div className="p-6 space-y-8 h-full overflow-y-auto w-80">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-green-400 pb-3 border-b border-green-500/20">Guía de Análisis</h3>

                        <GuideSection num="01" color="text-green-400" bg="bg-green-500/10"
                            title="Curva de Batería"
                            text="La batería 18650 2S debería durar 8-15 minutos a carga completa. Caídas bruscas (>0.3V en un solo punto) indican giros bruscos o picos de corriente. Si llega a la zona roja en <60s, reduce el PWM base a 160."
                        />
                        <GuideSection num="02" color="text-blue-400" bg="bg-blue-500/10"
                            title="Comandos Bluetooth"
                            text="¿Mucho 'Stop'? Puede ser latencia de Bluetooth o indecisión del operador. ¿Mucho 'B' (Atrás)? El robot choca seguido con paredes o el oponente. El objetivo: maximizar 'F' con 'L/R' precisos."
                        />
                        <GuideSection num="03" color="text-orange-400" bg="bg-orange-500/10"
                            title="PWM de Motores"
                            text="Si los dos motores nunca son iguales, el robot no va en línea recta (desvía). Si el PWM promedio es muy bajo (<150), el robot es lento — prueba subir VEL_NORMAL a 220."
                        />

                        <div className="pt-4 border-t border-white/5">
                            <p className="text-[10px] text-white/30 leading-relaxed italic">
                                ⚡ <strong className="text-white/50">Tip Pro:</strong> Guarda los CSV de cada partido y compáralos. Tu evolución como piloto se verá en la reducción del tiempo de 'Stop' y el aumento del % de 'F'.
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

const StatBadge = ({ label, value, color }) => (
    <div className="flex flex-col items-center gap-0.5 shrink-0">
        <span className="text-[8px] text-white/30 uppercase tracking-widest font-bold">{label}</span>
        <span className="text-sm font-black" style={{ color }}>{value}</span>
    </div>
);

const ChartLabel = ({ icon, label }) => (
    <div className="absolute top-4 left-6 flex items-center gap-2 z-10 pointer-events-none">
        <span className="text-[10px]">{icon}</span>
        <span className="text-[9px] font-black uppercase tracking-widest text-white/40">{label}</span>
    </div>
);

const GuideSection = ({ num, color, bg, title, text }) => (
    <div className="space-y-3">
        <div className="flex items-center gap-3">
            <span className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center text-xs font-black ${color}`}>{num}</span>
            <h4 className="text-white font-black uppercase tracking-widest text-xs">{title}</h4>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed font-medium">{text}</p>
    </div>
);

export default SoccerDashboard;
