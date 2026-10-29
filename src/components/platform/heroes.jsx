import { useEffect, useRef, useState } from 'react'
import { reducedMotion } from '../../motion/index.js'
import { CompanyGlyph, Icon } from '../mock.jsx'
import { GlyphTile } from './art.jsx'
import { HeroCopy, StripeField } from './shell.jsx'

// Route heroes for the T1 v2 platform pages (CLONE_SPEC_PLATFORM.md 3.1). Artwork is original;
// boxes, positions and keyframes follow the measured values.

const HERO_H = 'h-[calc(100svh-var(--site-header-height))] min-h-16'

/* ------------------------------------------------------------------ */
/* H-CENTER web-agent: 40px line grid + scattered domain chips           */
/* ------------------------------------------------------------------ */
// Chip centre offsets from the hero centre at 1440 (measured), and the layer's rest translateY.
const CHIP_OFFSETS = [
  [392, -196],
  [261.333, -261.333],
  [-261.333, -130.667],
  [-522.667, -196],
  [588, 0],
  [392, 130.667],
  [-522.667, 0],
  [-326.667, 196],
  [-522.667, 326.667],
  [196, 326.667],
]
const CHIP_LAYER_Y = -65.333
const GLYPHS = ['orbit', 'stack', 'peak', 'wave', 'split', 'grid', 'arc', 'spark', 'ring', 'slash']

export function HeroWebAgent({ copy, chips, timing }) {
  return (
    <div className="container flex flex-1 flex-col max-lg:contents" data-section="hero">
      <div className="flex w-full flex-1 flex-col border-x border-solid border-white-500 max-lg:border-none">
        <div className={`relative overflow-hidden ${HERO_H}`}>
          <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center pb-[8svh]">
            <div className="pointer-events-auto w-full px-6">
              <HeroCopy {...copy} timing={timing} />
            </div>
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" style={{ transform: `translateY(${CHIP_LAYER_Y}px)` }}>
            <svg className="pl-radial-reveal absolute inset-0 h-full w-full text-white-500" viewBox="0 0 1280 480" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="pl-wa-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M40 0H0V40" fill="none" stroke="currentColor" />
                </pattern>
              </defs>
              <rect x="-400" y="-400" width="2080" height="1280" fill="url(#pl-wa-grid)" />
            </svg>
          </div>
          <div className="pointer-events-none absolute inset-0 z-10 [--pl-chip-scale:0.5] max-md:hidden lg:[--pl-chip-scale:1]" style={{ transform: `translateY(${CHIP_LAYER_Y}px)` }}>
            {chips.map((label, i) => {
              const [x, y] = CHIP_OFFSETS[i % CHIP_OFFSETS.length]
              return (
                <div key={label} className="absolute left-1/2 top-1/2" style={{ transform: `translate(calc(-50% + ${x}px * var(--pl-chip-scale)), calc(-50% + ${y}px * var(--pl-chip-scale)))` }}>
                  <button type="button" tabIndex={-1} className="pl-chip group pointer-events-auto relative flex cursor-default items-center gap-1.5 border border-solid border-platform-chip-border bg-white-100 py-1 pl-1 pr-1.5 font-mono text-mono-chip-sm text-platform-chip-text">
                    <CompanyGlyph shape={GLYPHS[i % GLYPHS.length]} tone="dark" size={14} radius="rounded-4" className="pl-chip-icon" />
                    <span>{label}</span>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* H-CENTER custom-agents: dot field + 4 agent cards on routing lines    */
/* ------------------------------------------------------------------ */
// Card boxes 264x80 at 1440 (relative to the 1390x784 stage): (250,102) (973,156) (104,508) (1001,602).
const AGENT_POS_LG = [
  [250, 102],
  [973, 156],
  [104, 508],
  [1001, 602],
]
const TILE_TONES = [
  'bg-platform-tile-blue border-platform-tile-blue-border text-blue-500',
  'bg-platform-tile-cyan border-platform-tile-cyan-border text-art-teal',
  'bg-platform-tile-yellow border-platform-tile-yellow-border text-black-500',
  'bg-platform-tile-blue border-platform-tile-blue-border text-blue-500',
]
const RUN_MS = 2500 // custom-agents-border-draw / status-start duration
const GAP_MS = 400 // pause between cards (sequence timing not sampled; approx)

export function AgentCard({ agent, i, state, widthClass = 'w-[220px] lg:w-[264px]' }) {
  return (
    <div className={`relative h-20 ${widthClass}`} data-agent-state={state}>
      {/* status pills sit 28px above the right edge when shown */}
      <div className="pl-agent-pill pl-agent-pill-run absolute right-0 flex items-center gap-1 rounded-8 border border-solid border-white-500 bg-white-100 px-[5px] py-px">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="animate-[spin_1s_linear_infinite] text-black-800" aria-hidden="true">
          <path d="M8 2.5a5.5 5.5 0 1 0 5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="text-xs text-black-600">Running</span>
      </div>
      <div className="pl-agent-pill pl-agent-pill-done absolute right-0 flex items-center gap-1 rounded-8 border border-solid border-platform-status-border bg-platform-status-bg px-[5px] py-px">
        <Icon name="checkCircle" size={12} className="text-platform-status-text" />
        <span className="text-xs text-platform-status-text">Completed</span>
      </div>
      <div className="relative flex size-full items-center justify-center rounded-12 bg-white-400 shadow-agent-card">
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full overflow-visible" fill="none">
          <rect x="0.75" y="0.75" style={{ width: 'calc(100% - 1.5px)', height: 'calc(100% - 1.5px)' }} rx="11.25" pathLength="1000" strokeDasharray="1000" className="pl-agent-border text-traffic-green" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <div className="relative h-[calc(100%-2px)] w-[calc(100%-2px)] rounded-[11px] bg-white-100 px-[13px] pb-[11px] pt-[13px]">
          <div className="flex items-center gap-2 pb-[7px]">
            <span className={`inline-flex size-6 items-center justify-center rounded-[7px] border border-solid ${TILE_TONES[i % 4]}`}>
              <Icon name={agent.icon} size={14} strokeWidth={1.5} />
            </span>
            <span className="truncate text-agent-title text-black-100">{agent.title}</span>
          </div>
          <p className="truncate text-agent-desc text-black-800">{agent.desc}</p>
        </div>
        {/* connector ports */}
        <span className="pl-agent-port absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full border border-solid border-white-700 bg-white-100 opacity-40" />
        <span className="pl-agent-port absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rounded-full border border-solid border-white-700 bg-white-100 opacity-40" />
      </div>
    </div>
  )
}

export function HeroCustomAgents({ copy, agents, timing }) {
  const [step, setStep] = useState(-1)
  useEffect(() => {
    if (reducedMotion()) {
      setStep(agents.length)
      return
    }
    let s = -1
    let id = setTimeout(function next() {
      s = (s + 1) % (agents.length + 1)
      setStep(s)
      id = setTimeout(next, s === agents.length ? RUN_MS * 2 : RUN_MS + GAP_MS)
    }, 1000)
    return () => clearTimeout(id)
  }, [agents.length])
  const stateOf = (i) => (step === agents.length || i < step ? 'done' : i === step ? 'running' : 'idle')
  // Routing lines between consecutive cards (port bottom-centre -> next port top-centre), stage units.
  const pts = AGENT_POS_LG.map(([x, y]) => [x + 132, y])
  return (
    <div className="container flex flex-1 flex-col max-lg:contents" data-section="hero">
      <div className="flex w-full flex-1 flex-col border-x border-solid border-white-500 max-lg:border-none">
        <div className={`relative overflow-hidden bg-white-100 ${HERO_H}`}>
          <div aria-hidden="true" className="absolute inset-0 bg-agent-dots [background-position:8px_8px] [background-size:16px_16px]" />
          <div className="absolute inset-0 z-10 flex items-center justify-center px-5 md:px-6">
            <div className="relative w-full max-w-[520px] lg:max-w-[600px]">
              <HeroCopy {...copy} timing={timing} />
            </div>
          </div>
          <div className="absolute inset-0 max-md:hidden">
            <svg aria-hidden="true" className="absolute inset-0 size-full max-lg:hidden" viewBox="0 0 1390 784" preserveAspectRatio="none" fill="none">
              {pts.slice(0, -1).map(([x1, y1], i) => {
                const [x2, y2] = pts[i + 1]
                const sy = y1 + 80
                const my = (sy + y2) / 2
                return (
                  <path key={i} d={`M${x1} ${sy} V${my} H${x2} V${y2}`} className="text-white-700" stroke="currentColor" strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
                )
              })}
            </svg>
            {agents.map((a, i) => (
              <div
                key={a.title}
                className={`absolute ${['left-4 top-6', 'right-4 top-[49px]', 'bottom-[90px] left-4', 'bottom-[53px] right-4'][i]} lg:bottom-auto lg:left-[var(--x)] lg:right-auto lg:top-[var(--y)]`}
                style={{ '--x': `${(AGENT_POS_LG[i][0] / 1390) * 100}%`, '--y': `${(AGENT_POS_LG[i][1] / 784) * 100}%` }}
              >
                <AgentCard agent={a} i={i} state={stateOf(i)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* H-CENTER enrichment: header + 4 kanban columns + 96px bottom fade     */
/* ------------------------------------------------------------------ */
const DOT_TONES = ['bg-blue-500', 'bg-traffic-yellow', 'bg-art-teal', 'bg-traffic-green']

export function HeroEnrichment({ copy, columns, timing }) {
  return (
    <div className="relative" data-section="hero">
      <section className="relative flex flex-col overflow-hidden md:h-[calc(100svh-var(--site-header-height))]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="pl-stripes pl-mask-t absolute inset-0" />
        </div>
        <div className="relative z-10 px-6">
          <HeroCopy {...copy} timing={timing} className="pb-16 pt-[120px]" />
        </div>
        <div className="relative h-[356px] md:min-h-0 md:flex-1">
          <div className="flex h-full w-full justify-center gap-4 overflow-hidden px-8">
            {columns.map((col, ci) => (
              <div key={col.label} className={`flex w-full max-w-[300px] shrink-0 flex-col rounded-t-12 bg-white-200 px-6 pt-1.5 ${ci > 1 ? 'max-md:hidden' : ''} ${ci > 2 ? 'max-lg:hidden' : ''}`}>
                <div className="flex h-9 items-center gap-2">
                  <span className={`size-2.5 rounded-full ${DOT_TONES[ci % 4]}`} />
                  <span className="text-kanban-label text-black-100">{col.label}</span>
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-[5px] bg-white-400 px-1 text-kanban-count text-black-600">{col.cards.length}</span>
                </div>
                <div className="mt-2 flex flex-col gap-2">
                  {col.cards.map((card, k) => (
                    <div key={card.name} className="rounded-12 border border-solid border-white-500 bg-white-100 p-3 shadow-agent-card">
                      <span className="flex items-center gap-2 text-mock-md text-black-100">
                        <CompanyGlyph shape={GLYPHS[(ci * 3 + k) % GLYPHS.length]} tone={['blue', 'teal', 'iris', 'amber', 'navy'][(ci + k) % 5]} size={16} radius="rounded-4" />
                        {card.name}
                      </span>
                      <div className="mt-2 flex flex-col gap-2.5">
                        {card.fields.map(([icon, v]) => (
                          <span key={v} className="flex items-center gap-2 text-mock-md text-black-100">
                            <Icon name={icon} size={14} className="text-black-800" />
                            {v}
                          </span>
                        ))}
                      </div>
                      <div className="mt-2 text-right text-kanban-count text-black-700">{card.age}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white-100 to-transparent" />
      </section>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* H-HORIZON universal-context: stripes + concentric horizon arc         */
/* ------------------------------------------------------------------ */
export function HeroHorizon({ copy, timing }) {
  // Original arc: planet r 773 centred below the 1390x463 (3:1) box, top 26px into the box.
  const cx = 695
  const r = 773
  const cy = 26 + r
  return (
    <div className="container flex flex-1 flex-col max-lg:contents" data-section="hero">
      <div className="relative flex min-h-[calc(100svh-var(--site-header-height))] w-full flex-1 flex-col overflow-hidden border-x border-solid border-white-500 max-lg:border-none">
        <div aria-hidden="true" className="pl-mask-t pointer-events-none absolute inset-0">
          <div className="pl-stripes-uc size-full" />
        </div>
        <div className="grid shrink-0 grid-cols-12">
          <div className="col-[2/-2]">
            <HeroCopy {...copy} timing={timing} className="pb-[60px] pt-[120px]" />
          </div>
        </div>
        <div aria-hidden="true" className="pointer-events-none relative mt-auto aspect-[3/1]">
          <div className="pl-horizon-enter absolute inset-x-0 bottom-0 h-full">
            <svg viewBox="0 0 1390 463" preserveAspectRatio="xMidYMax slice" className="size-full">
              <defs>
                <linearGradient id="pl-horizon-glow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" className="text-blue-400" stopColor="currentColor" />
                  <stop offset="0.5" className="text-art-periwinkle" stopColor="currentColor" />
                  <stop offset="1" className="text-art-iris" stopColor="currentColor" />
                </linearGradient>
                <radialGradient id="pl-horizon-halo" cx={cx} cy={cy} r={r + 60} gradientUnits="userSpaceOnUse">
                  <stop offset={r / (r + 60)} className="text-art-haze" stopColor="currentColor" stopOpacity="0.9" />
                  <stop offset="1" className="text-art-haze" stopColor="currentColor" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx={cx} cy={cy} r={r + 60} fill="url(#pl-horizon-halo)" className="pl-horizon-group" />
              {[48, 36, 24, 12].map((d, i) => (
                <circle key={d} cx={cx} cy={cy} r={r + d} fill="none" stroke="url(#pl-horizon-glow)" strokeOpacity={0.12 + i * 0.08} className="pl-horizon-group" />
              ))}
              <circle cx={cx} cy={cy} r={r} className="pl-horizon-define text-white-100" fill="currentColor" stroke="url(#pl-horizon-glow)" strokeWidth="2" />
              <circle cx={cx} cy={cy} r={r} className="pl-horizon-group text-white-100" fill="currentColor" stroke="url(#pl-horizon-glow)" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* H-RADAR reporting                                                     */
/* ------------------------------------------------------------------ */
const RINGS = 12
// Dots: [ring index, angle clockwise from up]. A dot pings as the 8s beam passes its angle.
const RADAR_DOTS = [
  [2, 38],
  [4, 112],
  [1, 165],
  [3, 236],
  [5, 300],
  [6, 70],
]
export function HeroRadar({ copy, timing }) {
  const ringPct = (i) => 98 - i * 7.12 // 1364 -> 274 of the 1392 field
  return (
    <div className="relative flex flex-col items-center pb-10 lg:pb-16 xl:pb-24" data-section="hero">
      <div aria-hidden="true" className="container absolute inset-x-0 top-4 h-[680px]">
        <div className="pointer-events-none relative h-full overflow-hidden">
          <div className="absolute inset-0">
            {Array.from({ length: RINGS }, (_, i) => (
              <div
                key={i}
                className="pl-radar-ring absolute left-1/2 top-[372px] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-solid border-white-500"
                style={{ width: `${ringPct(i)}%`, '--pl-fade-delay': `${1035 + 35 * (RINGS - 1 - i)}ms`, '--pl-pulse-delay': `${1955 + 120 * (RINGS - 1 - i)}ms` }}
              />
            ))}
            <div className="absolute left-1/2 top-[372px] aspect-square w-[98%] -translate-x-1/2 -translate-y-1/2">
              <div className="pl-radar-sweep absolute inset-0 rounded-full">
                <div className="pl-radar-wake absolute inset-0 rounded-full" />
                <div className="absolute bottom-1/2 left-1/2 h-1/2 w-px bg-gradient-to-t from-blue-400 to-transparent opacity-60" />
              </div>
              {RADAR_DOTS.map(([ring, deg]) => {
                const rr = ringPct(ring) / 98 / 2
                const a = (deg * Math.PI) / 180
                return (
                  <span
                    key={deg}
                    className="pl-radar-dot absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400 opacity-0"
                    style={{ left: `${50 + rr * 100 * Math.sin(a)}%`, top: `${50 - rr * 100 * Math.cos(a)}%`, '--pl-dot-delay': `${1835 + (deg / 360) * 8000}ms` }}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="relative grid w-full grid-cols-12">
        <div className="col-[2/-2]">
          <HeroCopy {...copy} timing={timing} className="mx-auto max-w-[640px] pb-10 pt-[280px]" />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* H-MCP: square-cell grid, client logo cells, typed prompt box          */
/* ------------------------------------------------------------------ */
// Logo cells [col, row] (1-based) per layout: lg 12x7, md 8x8, sm 4x8.
const MCP_CELLS = {
  lg: [[2, 1], [5, 1], [9, 1], [2, 5], [11, 5]],
  md: [[2, 1], [4, 1], [7, 1], [1, 6], [8, 6]],
  sm: [[1, 6], [2, 6], [4, 6], [3, 1], [4, 1]],
}
const MCP_GLYPHS = ['spark', 'ring', 'orbit', 'grid', 'wave']
// Invented client skins (off-white surfaces). The live cycle period and typing speed were not
// sampled: 45ms per character and a 3.2s hold are approximations.
const SKINS = ['bg-white-100 border-white-500', 'bg-white-200 border-white-700', 'bg-art-mist border-white-700', 'bg-white-100 border-white-600', 'bg-blue-100 border-blue-200']
const TYPE_MS = 45
const HOLD_MS = 3200

function cellStyle([c, r]) {
  return { gridColumn: `${c} / span 1`, gridRow: `${r} / span 1` }
}

export function HeroMcp({ copy, prompts, timing }) {
  const [skin, setSkin] = useState(0)
  const [typed, setTyped] = useState(reducedMotion() ? prompts[0] : '')
  useEffect(() => {
    if (reducedMotion()) return
    let p = 0
    let n = 0
    let id
    const tick = () => {
      const text = prompts[p]
      if (n <= text.length) {
        setTyped(text.slice(0, n))
        n += 1
        id = setTimeout(tick, TYPE_MS)
      } else {
        id = setTimeout(() => {
          p = (p + 1) % prompts.length
          n = 0
          setSkin((s) => (s + 1) % SKINS.length)
          tick()
        }, HOLD_MS)
      }
    }
    id = setTimeout(tick, 2200)
    return () => clearTimeout(id)
  }, [prompts])

  const lines = (cols, rows) => (
    <>
      {Array.from({ length: cols - 1 }, (_, i) => (
        <span key={`v${i}`} className="absolute inset-y-0 w-px bg-white-500" style={{ left: `${((i + 1) / cols) * 100}%` }} />
      ))}
      {Array.from({ length: rows - 1 }, (_, i) => (
        <span key={`h${i}`} className="absolute inset-x-0 h-px bg-white-500" style={{ top: `${((i + 1) / rows) * 100}%` }} />
      ))}
    </>
  )
  const logos = (key) =>
    MCP_CELLS[key].map((cell, i) => (
      <div key={`${key}${i}`} className="pl-logo-in flex items-center justify-center" style={{ ...cellStyle(cell), '--pl-delay': `${1600 + 80 * i}ms` }}>
        <GlyphTile icon={MCP_GLYPHS[i]} tone={i} size={36} radius="rounded-10" />
      </div>
    ))
  return (
    <div className="container flex flex-1 flex-col max-lg:contents" data-section="hero">
      <div className="flex w-full flex-1 flex-col overflow-hidden border-x border-solid border-white-500 max-lg:border-none">
        <div className="relative grid aspect-[4/8] grid-cols-4 grid-rows-8 md:aspect-square md:grid-cols-8 lg:aspect-[12/7] lg:grid-cols-12 lg:grid-rows-7 lg:max-[1439px]:aspect-auto lg:max-[1439px]:h-[820px]">
          <div aria-hidden="true" className="pl-grid-reveal pointer-events-none absolute inset-0">
            <div className="absolute inset-0 md:hidden">{lines(4, 8)}</div>
            <div className="absolute inset-0 max-md:hidden lg:hidden">{lines(8, 8)}</div>
            <div className="absolute inset-0 max-lg:hidden">{lines(12, 7)}</div>
          </div>
          <div className="contents md:hidden">{logos('sm')}</div>
          <div className="contents max-md:hidden lg:hidden">{logos('md')}</div>
          <div className="contents max-lg:hidden">{logos('lg')}</div>
          <div className="relative col-[1/-1] row-[1/6] flex items-center bg-white-100 px-6 py-8 md:row-[2/6] lg:col-[2/-2] lg:row-[2/5]">
            <div className="relative z-10 flex w-full flex-col">
              <HeroCopy {...copy} timing={timing} />
            </div>
          </div>
          <div className="relative col-[1/-1] row-[7/8] p-4 md:col-[2/-2] lg:col-[3/-3] lg:row-[6/7]">
            <div className="pl-box-reveal relative h-full w-full">
              <div className="relative flex h-full items-center rounded-[2rem]">
                {SKINS.map((s, i) => (
                  <div key={s} aria-hidden="true" className={`absolute inset-0 rounded-[2rem] border border-solid shadow-prompt-box transition-opacity duration-500 ease-in-out ${s} ${i === skin ? 'opacity-100' : 'opacity-0'}`} />
                ))}
                <p className="relative flex-1 truncate px-6 text-base text-black-300 lg:text-prompt">
                  {typed}
                  <span aria-hidden="true" className="pl-caret ml-px inline-block h-[1.1em] w-px translate-y-[0.15em] bg-black-300" />
                </p>
                <span className="relative mr-6 flex size-8 shrink-0 items-center justify-center rounded-full bg-black-200 text-white-100">
                  <Icon name="arrowUp" size={16} strokeWidth={1.6} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
