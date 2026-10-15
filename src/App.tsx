import { useState } from 'react';

type Mode = 'antennas' | 'metasurface';
type Count = 4 | 8 | 12;
type Pat = 1 | 2 | 3;

const CX = 250, CY = 250;
const OBJ_R = 38, DOM_R = 130, ANT_R = 170;

function antennaRing(n: number) {
  return Array.from({ length: n }, (_, i) => {
    const a = (i * 2 * Math.PI / n) - Math.PI / 2;
    return { x: CX + ANT_R * Math.cos(a), y: CY + ANT_R * Math.sin(a) };
  });
}

interface WL { x1: number; y1: number; x2: number; y2: number }

const X_START = 36, X_END = 202;
const SY = [170, 210, 250, 290, 330];

const PATTERNS: Record<Pat, WL[]> = {
  1: SY.map(y => ({ x1: X_START, y1: y, x2: X_END, y2: y })),
  2: SY.map((y, i) => ({ x1: X_START, y1: y, x2: X_END, y2: 230 + i * 10 })),
  3: SY.map(y => ({ x1: X_START, y1: y, x2: X_END, y2: y + 40 })),
};

const MS_CELLS = Array.from({ length: 8 }, (_, i) => ({
  x: 14, y: 105 + i * 37, w: 18, h: 30,
}));

const PATTERN_COLORS: Record<Pat, string> = {
  1: '#38bdf8',
  2: '#a78bfa',
  3: '#34d399',
};

const ANT_LABELS: Record<Count, string> = {
  4:  '4 antennas → 4 physical measurement positions around the imaging domain.',
  8:  '8 antennas → 8 physical measurement positions, providing more spatial measurement coverage.',
  12: '12 antennas → 12 physical measurement positions, with denser spatial coverage of the imaging domain.',
};

const PAT_LABELS: Record<Pat, string> = {
  1: 'Pattern 1 — Illustrative uniform configuration: wave trajectories propagate straight across the domain. Changing the metasurface configuration changes the illustrative illumination pattern without adding more physical antennas.',
  2: 'Pattern 2 — Illustrative converging configuration: wave trajectories are directed toward the center of the imaging domain. Changing the metasurface configuration changes the illustrative illumination pattern without adding more physical antennas.',
  3: 'Pattern 3 — Illustrative tilted configuration: wave trajectories arrive at an angle to the imaging domain. Changing the metasurface configuration changes the illustrative illumination pattern without adding more physical antennas.',
};

function Arrowhead({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <polygon
      points={`${x},${y} ${x - 7},${y - 4} ${x - 7},${y + 4}`}
      fill={color}
    />
  );
}

function ImagingScene({ mode, count, pat }: { mode: Mode; count: Count; pat: Pat }) {
  const ants = antennaRing(count);
  const waveColor = PATTERN_COLORS[pat];
  const waves = PATTERNS[pat];

  return (
    <svg
      viewBox="0 0 500 500"
      className="w-full h-full"
      aria-label="Microwave imaging visualization"
    >
      <defs>
        <radialGradient id="domGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0.3" />
        </radialGradient>
        <radialGradient id="objGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="500" height="500" fill="#0f172a" />

      {/* Grid dots */}
      {Array.from({ length: 10 }, (_, r) =>
        Array.from({ length: 10 }, (_, c) => (
          <circle
            key={`${r}-${c}`}
            cx={25 + c * 50}
            cy={25 + r * 50}
            r="1"
            fill="#334155"
          />
        ))
      )}

      {/* Imaging domain ring */}
      <circle cx={CX} cy={CY} r={DOM_R} fill="url(#domGrad)" stroke="#1e40af" strokeWidth="1" strokeDasharray="4 3" />

      {/* Domain label */}
      <text x={CX} y={CY - DOM_R - 8} textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="monospace">
        IMAGING DOMAIN
      </text>

      {/* ── METASURFACE MODE ── */}
      {mode === 'metasurface' && (
        <>
          {/* Metasurface panel background */}
          <rect x="10" y="98" width="26" height="304" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1" />

          {/* Unit cells */}
          {MS_CELLS.map((c, i) => (
            <rect
              key={i}
              x={c.x}
              y={c.y}
              width={c.w}
              height={c.h}
              rx="2"
              fill={waveColor}
              fillOpacity="0.25"
              stroke={waveColor}
              strokeWidth="1.5"
            />
          ))}

          {/* MS label */}
          <text x="23" y="93" textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="monospace">MS</text>

          {/* Wave lines */}
          {waves.map((w, i) => (
            <g key={i}>
              <line
                x1={w.x1} y1={w.y1} x2={w.x2} y2={w.y2}
                stroke={waveColor}
                strokeWidth="1.5"
                strokeDasharray="6 4"
                opacity="0.85"
              />
              <Arrowhead x={w.x2} y={w.y2} color={waveColor} />
            </g>
          ))}

          {/* Fixed antennas (receivers, right side) */}
          {antennaRing(6).filter(a => a.x > CX).map((a, i) => (
            <g key={i}>
              <circle cx={a.x} cy={a.y} r="7" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
              <circle cx={a.x} cy={a.y} r="3" fill="#94a3b8" />
            </g>
          ))}

          {/* Receiver label */}
          <text x={CX + ANT_R + 16} y={CY + 4} textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="monospace" transform={`rotate(-90, ${CX + ANT_R + 16}, ${CY})`}>
            RECEIVERS
          </text>
        </>
      )}

      {/* ── ANTENNA MODE ── */}
      {mode === 'antennas' && (
        <>
          {/* Measurement path lines */}
          {ants.map((a, i) => (
            <line
              key={i}
              x1={a.x} y1={a.y}
              x2={CX} y2={CY}
              stroke="#1e40af"
              strokeWidth="1"
              strokeDasharray="5 4"
              opacity="0.4"
            />
          ))}

          {/* Antenna elements */}
          {ants.map((a, i) => (
            <g key={i}>
              <circle cx={a.x} cy={a.y} r="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
              <circle cx={a.x} cy={a.y} r="4" fill="#38bdf8" />
              <text x={a.x} y={a.y + 22} textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="monospace">
                A{i + 1}
              </text>
            </g>
          ))}

          {/* Antenna position badge */}
          <rect x="170" y="14" width="160" height="22" rx="4" fill="#0f172a" stroke="#1e40af" strokeWidth="1" />
          <text x="250" y="29" textAnchor="middle" fontSize="9" fill="#60a5fa" fontFamily="monospace">
            {count} ANTENNA POSITIONS
          </text>
        </>
      )}

      {/* Object (tumor / scatterer) */}
      <circle cx={CX} cy={CY} r={OBJ_R} fill="url(#objGrad)" stroke="#3b82f6" strokeWidth="1.5" />
      <text x={CX} y={CY + 4} textAnchor="middle" fontSize="9" fill="#bfdbfe" fontFamily="monospace">
        OBJECT
      </text>
    </svg>
  );
}

export default function App() {
  const [mode, setMode] = useState<Mode>('antennas');
  const [count, setCount] = useState<Count>(8);
  const [pat, setPat] = useState<Pat>(1);

  const explainText = mode === 'antennas'
    ? ANT_LABELS[count]
    : PAT_LABELS[pat];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">MetaMWI</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Interactive Metasurface-Assisted Microwave Imaging Demonstrator
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">

        {/* Mode toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode('antennas')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === 'antennas'
                ? 'bg-sky-600 text-white'
                : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
            }`}
          >
            More Antennas
          </button>
          <button
            onClick={() => setMode('metasurface')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === 'metasurface'
                ? 'bg-sky-600 text-white'
                : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Reconfigurable Metasurface
          </button>
        </div>

        {/* Main content: controls above scene on mobile, side-by-side on larger screens */}
        <div className="flex flex-col md:flex-row md:gap-6">

          {/* Controls — above scene on mobile */}
          <div className="mb-4 md:mb-0 md:w-56 md:shrink-0 flex flex-col gap-4">

            {mode === 'antennas' && (
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Antenna Count
                </h2>
                <div className="flex md:flex-col gap-2">
                  {([4, 8, 12] as Count[]).map(n => (
                    <button
                      key={n}
                      onClick={() => setCount(n)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex-1 md:flex-none ${
                        count === n
                          ? 'bg-sky-600 text-white'
                          : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {n} Antennas
                    </button>
                  ))}
                </div>
              </div>
            )}

            {mode === 'metasurface' && (
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Illumination Pattern
                </h2>
                <div className="flex md:flex-col gap-2">
                  {([1, 2, 3] as Pat[]).map(p => (
                    <button
                      key={p}
                      onClick={() => setPat(p)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex-1 md:flex-none ${
                        pat === p
                          ? 'bg-sky-600 text-white'
                          : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Pattern {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Explanation */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                What's happening
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">{explainText}</p>
            </div>
          </div>

          {/* Scene */}
          <div className="flex-1 bg-gray-900 rounded-2xl overflow-hidden aspect-square md:aspect-auto md:min-h-[420px]">
            <ImagingScene mode={mode} count={count} pat={pat} />
          </div>
        </div>

        {/* Technical note */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-semibold">Educational visualization.</span>{' '}
            Wave patterns shown here are illustrative and are not generated by a full electromagnetic solver.
            This application does not solve Maxwell's equations or implement a validated microwave-imaging inversion algorithm.
            Antenna positions, metasurface configurations, and wave trajectories are schematic representations
            intended to communicate the underlying concepts discussed in Mojabi, Phaneuf &amp; Liu (2023).
          </p>
        </div>

        {/* Comparison section */}
        <section className="mt-8">
          <h2 className="text-base font-semibold text-slate-800 mb-4">
            Approach Comparison
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h3 className="font-semibold text-slate-800 mb-3">More Antennas</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex gap-2"><span className="text-slate-400 shrink-0">—</span>Increases measurement diversity by adding physical elements</li>
                <li className="flex gap-2"><span className="text-slate-400 shrink-0">—</span>Each antenna provides a unique transmit/receive pair</li>
                <li className="flex gap-2"><span className="text-slate-400 shrink-0">—</span>Hardware cost and complexity scale with antenna count</li>
                <li className="flex gap-2"><span className="text-slate-400 shrink-0">—</span>Fixed illumination pattern per configuration</li>
                <li className="flex gap-2"><span className="text-slate-400 shrink-0">—</span>Well-established in clinical and industrial systems</li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h3 className="font-semibold text-slate-800 mb-3">Reconfigurable Metasurface</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex gap-2"><span className="text-slate-400 shrink-0">—</span>Multiple illumination patterns from the same metasurface hardware</li>
                <li className="flex gap-2"><span className="text-slate-400 shrink-0">—</span>Different measurement conditions without simply adding more antennas</li>
                <li className="flex gap-2"><span className="text-slate-400 shrink-0">—</span>Metasurface configurations can be electronically changed</li>
                <li className="flex gap-2"><span className="text-slate-400 shrink-0">—</span>Adds fabrication and tuning complexity</li>
                <li className="flex gap-2"><span className="text-slate-400 shrink-0">—</span>Offers a flexible approach to creating different illumination conditions</li>
              </ul>
            </div>

          </div>
          <p className="mt-3 text-xs text-slate-400 italic">
            Neither approach is presented as universally better. Different system designs involve trade-offs between hardware complexity, flexibility, and measurement diversity.
          </p>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-4 py-4 mt-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs text-slate-500">
            Research prototype by{' '}
            <span className="font-medium text-slate-700">Damilola Ayobami Ojoawo</span>
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            Electrical &amp; Electronics Engineering · Applied Electromagnetics · Intelligent Systems
          </p>
        </div>
      </footer>

    </div>
  );
}
