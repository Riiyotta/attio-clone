import { useMemo } from 'react'
import { rng } from '../../data/copy.js'
import { AbstractAvatar } from '../marketing/art.jsx'

// Original diagrams for the architecture page. Chip styles are measured (T8.3): dark chip
// 170x69.5, bg #101010, 1px #fff, radius 4, padding 12, title JetBrains Mono 15/19.5 #fff,
// sub 12/18 #6f7988; light chip bg #edeff3 with #1c1d1f / #505967. Avatars 64 round, 2px white
// border + the mock floating-card shadow.

export function Chip({ title, sub, dark = false, className = '', style }) {
  return (
    <div
      style={style}
      className={`flex w-[170px] flex-col rounded-4 border border-solid p-3 font-mono ${
        dark ? 'border-white-100 bg-black-50' : 'border-white-400 bg-white-400'
      } ${className}`}
    >
      <span className={`text-mono-chip ${dark ? 'text-white-100' : 'text-black-100'}`}>{title}</span>
      <span className={`text-xs ${dark ? 'text-black-700' : 'text-black-600'}`}>{sub}</span>
    </div>
  )
}

function Avatar({ seed, className = '', style }) {
  return (
    <span style={style} className={`block size-16 overflow-hidden rounded-full border-2 border-solid border-white-100 shadow-mock-card ${className}`}>
      <AbstractAvatar size={60} seed={seed} />
    </span>
  )
}

/**
 * Signal flow figure: avatars (signal sources) feeding a dark chip, which feeds a light chip.
 * `layout`: chip positions [x, y] at >= lg inside a box of `height` (story figure: chips 482
 * apart; tail figure: chips offset across the row). Below lg the chips stack.
 */
export function FlowFigure({ chips, caption, seed = 0, height = 551, layout = [[105, 0], [105, 482]], avatars = [[0, 10], [0, 120], [0, 300]] }) {
  const [[x1, y1], [x2, y2]] = layout
  return (
    <figure className="relative">
      <figcaption className="sr-only">{caption}</figcaption>
      <div className="relative hidden lg:block" style={{ height }}>
        <svg aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible text-white-700" fill="none" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round">
          {avatars.map(([ax, ay], i) => (
            <path key={i} d={`M${ax + 64} ${ay + 32} C ${ax + 90} ${ay + 32}, ${x1 - 30} ${y1 + 35}, ${x1} ${y1 + 35}`} />
          ))}
          <path d={`M${x1 + 85} ${y1 + 70} C ${x1 + 85} ${(y1 + y2) / 2 + 40}, ${x2 + 85} ${(y1 + y2) / 2 - 40}, ${x2 + 85} ${y2}`} />
        </svg>
        {avatars.map(([ax, ay], i) => (
          <Avatar key={i} seed={seed + i + 1} className="absolute" style={{ left: ax, top: ay }} />
        ))}
        <Chip dark title={chips[0][0]} sub={chips[0][1]} className="absolute" style={{ left: x1, top: y1 }} />
        <Chip title={chips[1][0]} sub={chips[1][1]} className="absolute" style={{ left: x2, top: y2 }} />
      </div>
      <div className="flex flex-col items-start gap-6 lg:hidden">
        <div className="flex gap-2">
          {avatars.map((_, i) => (
            <Avatar key={i} seed={seed + i + 1} />
          ))}
        </div>
        <Chip dark title={chips[0][0]} sub={chips[0][1]} />
        <Chip title={chips[1][0]} sub={chips[1][1]} />
      </div>
    </figure>
  )
}

/** Four 240x240 rings with mono chips (bg #edeff3, radius 4, padding 7 16). */
export function RingRow({ labels, caption }) {
  return (
    <figure className="relative mx-auto w-full max-w-[1200px] overflow-hidden">
      <figcaption className="sr-only">{caption}</figcaption>
      <div className="flex items-end max-md:w-[300%]">
        {labels.map((l, i) => (
          <div key={l} className="flex flex-1 flex-col items-center gap-4">
            <span className="rounded-4 bg-white-400 px-4 py-[7px] font-mono text-mono-chip text-black-100">{l}</span>
            <svg width="240" height="240" viewBox="0 0 240 240" aria-hidden="true" className="max-w-full text-white-800" fill="none" stroke="currentColor">
              {Array.from({ length: i + 2 }, (_, k) => (
                <circle key={k} cx="120" cy="120" r={110 - k * (80 / (i + 2))} strokeDasharray={k % 2 ? '3 5' : undefined} />
              ))}
              <circle cx="120" cy="120" r="6" className="text-black-100" fill="currentColor" stroke="none" />
              {Array.from({ length: 3 + i * 2 }, (_, k) => {
                const a = (k / (3 + i * 2)) * Math.PI * 2 + i
                const rr = 110 - (k % (i + 2)) * (80 / (i + 2))
                return <circle key={`d${k}`} cx={120 + Math.cos(a) * rr} cy={120 + Math.sin(a) * rr} r="3.5" className="text-black-600" fill="currentColor" stroke="none" />
              })}
            </svg>
          </div>
        ))}
      </div>
    </figure>
  )
}

/** Launch diagrams (564x577 / 629x733 / 529x339): labelled node lattices in mono 12.5px. */
export function LaunchDiagram({ variant = 0, caption }) {
  const [w, h] = [[564, 577], [629, 733], [529, 339]][variant]
  const nodes = useMemo(() => {
    const r = rng(variant * 31 + 5)
    const cols = variant === 2 ? 5 : 4
    const rows = variant === 1 ? 6 : variant === 2 ? 3 : 5
    const out = []
    for (let y = 0; y < rows; y++)
      for (let x = 0; x < cols; x++) out.push({ x: 50 + (x * (w - 100)) / (cols - 1), y: 50 + (y * (h - 100)) / (rows - 1), on: r() < 0.35, label: r() < 0.3 })
    return out
  }, [variant, w, h])
  const labels = ['sync', 'merge', 'score', 'route', 'notify', 'link', 'tag', 'draft']
  return (
    <figure className="relative w-full" style={{ maxWidth: w }}>
      <figcaption className="sr-only">{caption}</figcaption>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full" aria-hidden="true">
        <g className="text-white-500" stroke="currentColor" fill="none">
          {nodes.map((n, i) => {
            const right = nodes[i + 1]
            const down = nodes.find((m) => m.x === n.x && m.y > n.y)
            return (
              <g key={i}>
                {right && right.y === n.y && <line x1={n.x} y1={n.y} x2={right.x} y2={right.y} strokeDasharray={n.on ? undefined : '4 6'} />}
                {down && <line x1={n.x} y1={n.y} x2={down.x} y2={down.y} strokeDasharray="4 6" />}
              </g>
            )
          })}
        </g>
        {nodes.map((n, i) => (
          <g key={i}>
            <rect x={n.x - 11} y={n.y - 11} width="22" height="22" rx="4" className={n.on ? 'text-black-100' : 'text-white-400'} fill="currentColor" />
            {n.label && (
              <text x={n.x} y={n.y + 30} textAnchor="middle" className="fill-black-100 font-mono text-[12.5px]">
                {labels[i % labels.length]}
              </text>
            )}
          </g>
        ))}
      </svg>
    </figure>
  )
}

/** Dark code band glyphs: JetBrains Mono 16/20.8 in #2e3238 / #383e47 / #505967 on a 28.9 x 43.5 lattice. */
export function CodeGlyphs() {
  const cells = useMemo(() => {
    const r = rng(99)
    const G = ['{}', '//', '=>', '[]', '01', ';', '#', '<>', '::', '*', '()', '+']
    const tones = ['text-black-400', 'text-black-500', 'text-black-600']
    const out = []
    for (let y = 0; y < 16; y++)
      for (let x = 0; x < 48; x++) if (r() < 0.16) out.push({ x, y, g: G[Math.floor(r() * G.length)], t: tones[Math.floor(r() * 3)] })
    return out
  }, [])
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {cells.map((c, i) => (
        <span key={i} className={`absolute whitespace-pre font-mono text-code-glyph ${c.t}`} style={{ left: 9 + c.x * 28.9, top: 3 + c.y * 43.5 }}>
          {c.g}
        </span>
      ))}
    </div>
  )
}
