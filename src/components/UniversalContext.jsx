import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Eyebrow, SmallLinkButton, Streaks } from './ui.jsx'
import { INTEGRATION_GLYPHS } from './logos.jsx'
import { Spring, observeInView, progress, reducedMotion } from '../motion/index.js'

/**
 * M9 (measured at 1440x900 and 390x844): the title region is scroll-scrubbed against its own box,
 * p = (viewportHeight - regionTop) / regionHeight (framer useScroll offset ["start end", "end end"]).
 * Every output is then smoothed by its own spring (fitted: stiffness 360, damping 57, mass 1).
 *   H2:       opacity 0->1 + blur 2.5->0 over p .575-.75, translateY 4->0 over p .55-.80
 *   eyebrow:  opacity 0->1 + blur 1.5->0 over p .65-.81, translateY 4->0 over p .61-.86
 *   horizon glow + edge svg: opacity 0->1, scale .84->1 over p .75-1.0
 *   planet rim: clip-path reveal left->right + opacity over p .50-1.0
 * Blur values are quantised to 0.5px steps like the live output.
 */
function useTitleRegionScroll(regionRef) {
  useEffect(() => {
    const region = regionRef.current
    if (!region || reducedMotion()) return
    const q = (sel) => region.querySelector(sel)
    const eyebrow = q('[data-motion="uc-eyebrow"]')
    const title = q('[data-motion="uc-title"]')
    const glow = q('[data-motion="uc-horizon-glow"]')
    const edge = q('[data-motion="uc-horizon-define"]')
    const rims = [...region.querySelectorAll('[data-motion="uc-planet-rim"]')]
    const horizon = q('[data-motion="uc-horizon"]')
    const K = 360
    const C = 57
    const springs = { h2o: 0, h2y: 0, eo: 0, ey: 0, g: 0, rim: 0 }
    Object.keys(springs).forEach((k) => (springs[k] = new Spring(0, K, C)))
    const targets = () => {
      const r = region.getBoundingClientRect()
      const p = (window.innerHeight - r.top) / r.height
      return {
        h2o: progress(p, 0.575, 0.75),
        h2y: progress(p, 0.55, 0.8),
        eo: progress(p, 0.65, 0.81),
        ey: progress(p, 0.61, 0.86),
        g: progress(p, 0.75, 1),
        rim: progress(p, 0.5, 1),
      }
    }
    const half = (v) => Math.round(v * 2) / 2
    const render = () => {
      const v = Object.fromEntries(Object.entries(springs).map(([k, sp]) => [k, sp.x]))
      title.style.opacity = v.h2o.toFixed(4)
      title.style.filter = `blur(${half(2.5 * (1 - v.h2o))}px)`
      title.style.transform = `translateY(${(4 * (1 - v.h2y)).toFixed(3)}px)`
      eyebrow.style.opacity = v.eo.toFixed(4)
      eyebrow.style.filter = `blur(${half(1.5 * (1 - v.eo))}px)`
      eyebrow.style.transform = `translateY(${(4 * (1 - v.ey)).toFixed(3)}px)`
      glow.style.opacity = v.g.toFixed(4)
      glow.style.transform = v.g >= 1 ? 'none' : `scale(${(0.84 + 0.16 * v.g).toFixed(5)})`
      edge.style.opacity = v.g.toFixed(4)
      // live: clip-path inset(-64px calc((1-q)*100% - q*64px) -64px -64px) on a full-width layer
      const box = horizon.getBoundingClientRect()
      const insetFromBoxRight = (1 - v.rim) * box.width - v.rim * 64
      rims.forEach((rim) => {
        const rr = rim.getBoundingClientRect()
        const right = insetFromBoxRight - (box.right - rr.right)
        rim.style.clipPath = `inset(-64px ${right.toFixed(2)}px -64px -9999px)`
        rim.style.opacity = v.rim.toFixed(4)
      })
    }
    const snap = () => {
      const t = targets()
      Object.entries(t).forEach(([k, val]) => springs[k].snap(val))
      render()
    }
    let raf = 0
    let last = 0
    const tick = (now) => {
      const dt = last ? Math.min((now - last) / 1000, 0.064) : 1 / 60
      last = now
      const t = targets()
      let moving = false
      Object.entries(t).forEach(([k, val]) => {
        springs[k].target = val
        if (springs[k].step(dt)) moving = true
      })
      render()
      raf = moving ? requestAnimationFrame(tick) : 0
    }
    const kick = () => {
      if (!raf) {
        last = 0
        raf = requestAnimationFrame(tick)
      }
    }
    snap()
    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', kick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', kick)
      window.removeEventListener('resize', kick)
    }
  }, [regionRef])
}

// Section 6 (universal-context group): 6a dark brand moment + horizon + features + tabs +
// connectivity, 6b dark SDK block, 6f white quote-reveal under the curtain.
// Placeholder copy is original and matched to the spec's char/word/line counts.

const TITLE_EYEBROW = 'All tools share a' // c17 w4
const TITLE = 'Unlimited Insights' // c18 w2 (+ sup = 758px at 1440; live 759)
const TITLE_MARK = '*' // c1 superscript mark

const FEATURES = [
  { title: 'Logs on its own', desc: 'Calls, meetings, product events and invoices, all saved.', Icon: IconBars }, // c15 / c56
  { title: 'Every tool stays in sync', desc: 'Docs, chat and your other apps, kept up to date', Icon: IconGlobe }, // c24 / c49
  { title: 'Learns your style', desc: 'So each next step fits a little better', Icon: IconBook }, // c17 / c38
  { title: 'Ask and get answers.', desc: 'Any record, any question, instantly.', Icon: IconChat }, // c20 / c36
  { title: 'Agents share one memory', desc: 'Working from the same facts as your crew.', Icon: IconHeadset }, // c23 / c41
]

const TABS_EYEBROW = 'Signals' // c7
const TABS_LEAD = 'All the apps read from one live record' // c38 w8 (2 lines with the continuation)
const TABS_CONT = ' in every new run' // c16 w4
const TABS = [
  { label: 'Records', desc: 'Notes, threads, meetings, usage and connected apps, always current.' }, // c7 / c65
  { label: 'Workflows and agents', desc: 'Automations and helpers that read the same data before they act.' }, // c20 / c65
  { label: 'Connected', desc: 'Hundreds of apps that send their updates into one shared picture.' }, // c9 / c65
]

const CONNECT_EYEBROW = 'Integrations' // c12
const CONNECT_TITLE = 'Connected to everything else' // c28 w4
const CONNECT_BODY = 'Chat, docs, data tools, issue trackers and all the other apps your people use.' // c78 w13
const CONNECT_CTA = 'Browse all connectors' // c21

const SDK_LEAD = 'APIs and hooks' // c14 w3
const SDK_CONT = 'Build it into your stack' // c24 w4
const SDK_CTA = 'Read docs' // c9

// 17 words, ~95 chars; breaks to 3 lines at 1440 (text-wrap: balance, max 18em).
const QUOTE_WORDS =
  '“Our team now plans, sells and reports from one shared source, and the results speak for us.”'.split(' ')
const QUOTE_NAME = 'Casey Morales' // c13
const QUOTE_ROLE = 'VP of Revenue Systems, Example Corp' // c35 w6

// Streak x positions in the UC title region (1440 dump, relative to the bordered box).
const UC_STREAKS = [
  [7, 1],
  [447, 2],
  [1335, 2],
  [695, 2],
  [1159, 2],
  [1143, 2],
]

export default function UniversalContext() {
  return (
    <div className="relative isolate" data-section="universal-context">
      {/* (A) dark curtain stack */}
      <div className="relative z-10">
        <BrandSection />
        <SdkSection />
      </div>
      {/* (B) white quote section sliding under the curtain */}
      <QuoteReveal />
    </div>
  )
}

/* ------------------------------------------------------------------------------------------ */
/* 6a                                                                                          */
/* ------------------------------------------------------------------------------------------ */

// Planet diameter samples (viewport width -> disc diameter) measured at 390/768/1280/1440.
// The site's formula is not exposed (it also depends on viewport height); interpolate between samples.
const PLANET_SAMPLES = [
  [390, 457],
  [768, 937],
  [1280, 1445],
  [1440, 1728],
]
function planetDiameter(w) {
  if (w <= PLANET_SAMPLES[0][0]) return PLANET_SAMPLES[0][1]
  for (let i = 1; i < PLANET_SAMPLES.length; i++) {
    const [x1, y1] = PLANET_SAMPLES[i]
    const [x0, y0] = PLANET_SAMPLES[i - 1]
    if (w <= x1) return y0 + ((w - x0) / (x1 - x0)) * (y1 - y0)
  }
  return PLANET_SAMPLES[PLANET_SAMPLES.length - 1][1]
}

/**
 * Layout (not motion): the title region ends exactly where the planet's arc meets the bordered
 * box's side edges (measured at all four widths). Region height = disc top + sagitta(D, box/2).
 */
function usePlanetGeometry(ref) {
  const [geo, setGeo] = useState({ d: 1728, sag: 352 })
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const d = planetDiameter(window.innerWidth)
      const r = d / 2
      // the arc meets the bordered box's outer edges (offsetWidth includes the 1px side borders)
      const hw = (el.parentElement?.offsetWidth ?? el.clientWidth) / 2
      const sag = hw >= r ? r : r - Math.sqrt(r * r - hw * hw)
      setGeo({ d, sag })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])
  return geo
}

function BrandSection() {
  return (
    <section className="dark relative bg-black-50" data-section="universal-context-brand">
      <div className="lg-container">
        {/* Live: content spans the full 1392 box; the side hairlines are an overlay (x24 / x1415). */}
        <div className="relative">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 hidden border-x border-solid border-black-400 lg:block" />
          <TitleRegion />
          <FeatureRow />
          <TabsRow />
          <Connectivity />
        </div>
      </div>
    </section>
  )
}

function TitleRegion() {
  const ref = useRef(null)
  const { d, sag } = usePlanetGeometry(ref)
  useTitleRegionScroll(ref)
  return (
    <div ref={ref} className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-dark-stripes" />
      <Streaks xs={UC_STREAKS} variant="uc" />

      {/* Title block: top +176 (< lg) / +280 (lg) */}
      <div className="relative z-20 flex flex-col items-center gap-1 px-6 pt-[176px] text-center lg:pt-[280px]">
        <p data-motion="uc-eyebrow" className="text-sm text-black-800 md:text-body">
          {TITLE_EYEBROW}
        </p>
        <h2
          data-motion="uc-title"
          className="max-w-full whitespace-nowrap font-display text-mega-sm text-white-200 md:text-mega-md xl:text-mega"
        >
          {TITLE}
          <sup className="relative top-[0.15em] inline-block align-top text-[0.4em] leading-none tracking-normal">{TITLE_MARK}</sup>
        </h2>
      </div>

      {/* Disc top sits 64px below the title block; region ends where the arc meets the box edges. */}
      <div aria-hidden="true" className="mt-16" style={{ height: sag }} />

      {/* Horizon (bottom 640px of the region, clipped) */}
      <div aria-hidden="true" data-motion="uc-horizon" className="absolute inset-x-0 bottom-0 z-10 h-[min(640px,100%)] overflow-hidden">
        <div className="absolute left-1/2" style={{ top: `calc(100% - ${sag}px)`, width: d, height: d, marginLeft: -d / 2 }}>
          {/* Atmospheric glow, rest state (2247px at 1440 = 1.3 x disc). M9 animates scale .84 -> 1, opacity 0 -> 1. */}
          <div
            data-motion="uc-horizon-glow"
            className="absolute left-1/2 top-1/2 rounded-full bg-horizon-glow"
            style={{ width: d * 1.3, height: d * 1.3, marginLeft: -(d * 1.3) / 2, marginTop: -(d * 1.3) / 2 }}
          />
          <div data-motion="uc-planet-rim" className="planet-rim absolute -inset-[3px] rounded-full" />
          <div data-motion="uc-planet-rim" className="planet-rim absolute -inset-[2px] rounded-full" />
          <div className="absolute inset-0 rounded-full bg-black-50" />
          {/* "define" layer: opacity 0 at rest (keyframes universal-context-horizon-define/reveal) */}
          <svg data-motion="uc-horizon-define" className="absolute inset-0 h-full w-full opacity-0" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="49.9" fill="none" stroke="currentColor" strokeWidth="0.1" className="text-black-600" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function FeatureRow() {
  return (
    <div className="grid grid-cols-1 border-t border-solid border-black-400 lg:grid-cols-5">
      {FEATURES.map(({ title, desc, Icon }, i) => (
        <div
          key={title}
          className={`flex flex-col items-center gap-4 px-6 py-8 text-center lg:aspect-square lg:items-stretch lg:justify-between lg:gap-8 lg:px-7 lg:text-left ${
            i > 0 ? 'border-t border-solid border-black-300 lg:border-l lg:border-t-0' : ''
          }`}
        >
          <Icon />
          <div className="flex flex-col gap-1.5">
            <p className="text-uc-feature text-white-200">{title}</p>
            <p className="text-uc-feature-desc text-black-800">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function TabsHeading({ centered = false }) {
  return (
    <div className={`flex flex-col gap-8 ${centered ? 'items-center text-center' : 'items-start'}`}>
      <div className={`flex flex-col gap-6 ${centered ? 'items-center' : 'items-start'}`}>
        <Eyebrow>{TABS_EYEBROW}</Eyebrow>
        <h2 className="max-w-[478px] font-display text-section-sm lg:text-section">
          <span className="text-white-200">{TABS_LEAD}</span>
          <span className="text-black-800">{TABS_CONT}</span>
        </h2>
      </div>
      <SmallLinkButton>Find out</SmallLinkButton>
    </div>
  )
}

/**
 * M10 (sampled on the live site): the active tab's bar fills scaleX 0->1 linearly over 5000ms, then
 * the next tab opens. After a switch the bar holds at 0 before filling: ~1100ms when the cycle wraps
 * to tab 0, ~3250ms for tabs 1 and 2 (synced to the canvas scene change). Leaving the viewport
 * resets the fill to 0 and pauses; on re-entry it fills again after ~150ms.
 */
const TAB_FILL = 5000
const TAB_HOLD = [1100, 3250, 3250]
const TAB_ENTRY_HOLD = 150
function useTabCycle(rootRef, count) {
  const [active, setActive] = useState(0)
  const st = useRef({ active: 0, phase: 'idle', t: 0, hold: TAB_ENTRY_HOLD, progress: 0 })
  const paint = () => {
    const root = rootRef.current
    if (!root) return
    const { active: a, progress: pr } = st.current
    root.querySelectorAll('[data-motion="uc-tab-progress"]').forEach((el) => {
      el.style.transform = `scaleX(${+el.dataset.index === a ? pr.toFixed(4) : 0})`
    })
    root.querySelectorAll('[data-motion="uc-tab-progress-mobile"]').forEach((el) => {
      const i = +el.dataset.index
      el.style.transform = `scaleX(${i < a ? 1 : i === a ? pr.toFixed(4) : 0})`
    })
  }
  const select = (i, hold) => {
    st.current = { ...st.current, active: i, t: 0, hold, progress: 0, phase: st.current.phase === 'idle' ? 'idle' : 'hold' }
    setActive(i)
    paint()
  }
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    let raf = 0
    let last = 0
    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      const dt = last ? Math.min(now - last, 64) : 0
      last = now
      const s = st.current
      s.t += dt
      if (s.phase === 'hold' && s.t >= s.hold) {
        s.phase = 'fill'
        s.t -= s.hold
      }
      if (s.phase === 'fill') {
        s.progress = Math.min(s.t / TAB_FILL, 1)
        if (s.progress >= 1) {
          const next = (s.active + 1) % count
          select(next, TAB_HOLD[next])
          st.current.phase = 'hold'
          return
        }
      }
      paint()
    }
    const off = observeInView(root, (inView) => {
      cancelAnimationFrame(raf)
      raf = 0
      const s = st.current
      s.t = 0
      s.progress = 0
      if (inView) {
        s.phase = 'hold'
        s.hold = TAB_ENTRY_HOLD
        last = 0
        raf = requestAnimationFrame(tick)
      } else {
        s.phase = 'idle'
      }
      paint()
    })
    return () => {
      cancelAnimationFrame(raf)
      off()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])
  return [active, (i) => select(i, TAB_HOLD[i])]
}

function TabsRow() {
  const rootRef = useRef(null)
  const [active, setActive] = useTabCycle(rootRef, TABS.length)
  return (
    <div ref={rootRef} className="relative">
      {/* Full-bleed hairlines (1440 wide at lg) */}
      <span aria-hidden="true" className="absolute -inset-x-6 top-0 hidden h-px bg-black-400 lg:block" />
      <span aria-hidden="true" className="absolute -inset-x-6 bottom-0 hidden h-px bg-black-400 lg:block" />

      {/* >= lg: accordion left, wireframe right (808 tall) */}
      <div className="hidden lg:flex">
        <div className="flex w-1/2 flex-col px-[58px] pb-24 pt-[152px]">
          <TabsHeading />
          <div className="mt-[154px] flex flex-col gap-7" data-motion="uc-tabs" data-active={active}>
            {TABS.map((t, i) => (
              <div key={t.label} className="flex flex-col">
                <button
                  type="button"
                  aria-expanded={i === active}
                  onClick={() => setActive(i)}
                  className="group w-fit text-left text-uc-tab text-white-200"
                >
                  <span className="underline-anim">{t.label}</span>
                </button>
                {/* Live: exit 125ms ease-out (opacity 1->0, blur 0->1px), enter 500ms ease-out, height ~300ms */}
                <div data-motion="uc-tab-panel" data-state={i === active ? 'open' : 'closed'} aria-hidden={i !== active}>
                  <div>
                    <p className="mt-2 max-w-[360px] text-uc-body text-black-800">{t.desc}</p>
                    <div className="relative mt-5 h-0.5 w-full overflow-hidden bg-black-400">
                      <div data-motion="uc-tab-progress" data-index={i} className="absolute inset-0 origin-left scale-x-0 bg-black-800" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative w-1/2 border-l border-solid border-black-400">
          <Wireframe className="absolute inset-y-0 left-0 h-full w-full" />
        </div>
      </div>

      {/* < lg: centred heading, square wireframe, segmented progress, active text */}
      <div className="flex flex-col items-center px-6 pb-32 pt-[88px] lg:hidden">
        <TabsHeading centered />
        <div className="relative mt-8 aspect-square w-full max-w-[560px] overflow-hidden">
          <Wireframe className="absolute inset-0 h-full w-full" />
        </div>
        <div className="mt-8 flex w-full max-w-[420px] gap-1.5 md:mt-16">
          {TABS.map((t, i) => (
            <button
              key={t.label}
              type="button"
              aria-label={t.label}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className="relative h-0.5 flex-1 overflow-hidden bg-black-400"
            >
              <span data-motion="uc-tab-progress-mobile" data-index={i} className="absolute inset-0 origin-left scale-x-0 bg-black-800" />
            </button>
          ))}
        </div>
        <div className="mt-4 w-full max-w-[420px] text-center">
          <p className="text-uc-tab text-white-200">{TABS[active].label}</p>
          <p className="mt-2 text-uc-body text-black-800">{TABS[active].desc}</p>
        </div>
      </div>
    </div>
  )
}

/**
 * Original perspective wireframe (the site uses a canvas; this is a static SVG): a tilted disc of
 * concentric ellipses and radial spokes around a vertical axis, a few lit nodes and one highlighted
 * orbit. The highlight dot sits at its rest position; motion is left to the Animation pass.
 */
function Wireframe({ className = '' }) {
  const cx = 347.5
  const cy = 452
  const tilt = 0.36
  const rings = [46, 92, 142, 198, 260, 330, 410]
  const spokes = Array.from({ length: 24 }, (_, i) => (i * 15 * Math.PI) / 180)
  const R = rings[rings.length - 1]
  const pt = (r, a) => [cx + Math.cos(a) * r, cy + Math.sin(a) * r * tilt]
  const nodes = [
    [142, 3], [198, 7], [260, 10], [92, 15], [198, 19], [330, 21], [260, 1],
  ].map(([r, k]) => pt(r, spokes[k]))
  const [dx, dy] = pt(260, spokes[13])
  return (
    <svg
      data-motion="uc-wireframe"
      role="img"
      aria-label="Wireframe illustration"
      viewBox="0 0 695 808"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      fill="none"
    >
      <defs>
        <radialGradient id="uc-wire-fade" cx={cx} cy={cy} r={R} gradientUnits="userSpaceOnUse" gradientTransform={`translate(0 ${cy * (1 - tilt)}) scale(1 ${tilt})`}>
          <stop offset="0.55" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="uc-wire-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="695" height="808">
          <rect width="695" height="808" fill="url(#uc-wire-fade)" />
        </mask>
        <radialGradient id="uc-wire-dot" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" className="text-white-200" stopColor="currentColor" stopOpacity=".55" />
          <stop offset="1" className="text-white-200" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g mask="url(#uc-wire-mask)" stroke="currentColor" strokeWidth="1">
        <g className="text-black-400">
          {rings.map((r) => (
            <ellipse key={r} cx={cx} cy={cy} rx={r} ry={r * tilt} />
          ))}
          {spokes.map((a, i) => {
            const [x, y] = pt(R, a)
            return <line key={i} x1={cx} y1={cy} x2={x} y2={y} />
          })}
        </g>
        {/* highlighted orbit */}
        <ellipse cx={cx} cy={cy} rx="260" ry={260 * tilt} className="text-black-600" />
      </g>
      {/* echo rings stacked above the disc, receding upward */}
      <g className="text-black-400" stroke="currentColor" strokeWidth="1">
        {[1, 2, 3, 4, 5].map((k) => (
          <ellipse key={k} cx={cx} cy={cy - k * 58} rx={250 - k * 38} ry={(250 - k * 38) * tilt} opacity={1 - k * 0.16} />
        ))}
      </g>
      <line x1={cx} y1="120" x2={cx} y2={cy} className="text-black-500" stroke="currentColor" strokeDasharray="2 4" />
      <rect x={cx - 4} y={cy - 4} width="8" height="8" className="fill-black-600" transform={`rotate(45 ${cx} ${cy})`} />
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="5" className="fill-black-50 stroke-black-600" strokeWidth="1" />
          <circle cx={x} cy={y} r="1.75" className="fill-black-800" />
        </g>
      ))}
      {/* moving highlight dot (static rest position on the highlighted orbit) */}
      <circle cx={dx} cy={dy} r="16" fill="url(#uc-wire-dot)" />
      <circle data-motion="uc-wireframe-dot" cx={dx} cy={dy} r="2.5" className="fill-white-200" />
    </svg>
  )
}

function Connectivity() {
  // M11: Embla auto-scroll at 30px/s (measured -15px per 500ms), paused while offscreen.
  const marqueeRef = useRef(null)
  useEffect(() => {
    const box = marqueeRef.current
    const track = box?.querySelector('[data-motion="uc-marquee-track"]')
    if (!track) return
    return observeInView(box, (inView) => (inView ? track.setAttribute('data-inview', '') : track.removeAttribute('data-inview')))
  }, [])
  return (
    <div className="relative px-6 pb-[72px] pt-[88px] md:px-14 md:pb-28 lg:pt-[152px]">
      <div aria-hidden="true" className="absolute inset-0 bg-dark-stripes" />
      <div className="relative flex flex-col items-center text-center">
        <Eyebrow>{CONNECT_EYEBROW}</Eyebrow>
        <h3 className="mt-6 max-w-[696px] font-display text-section-sm text-white-200 lg:text-section">{CONNECT_TITLE}</h3>
        <p className="mt-4 max-w-[464px] text-connect-body text-black-800">{CONNECT_BODY}</p>
        <SmallLinkButton className="mt-8">{CONNECT_CTA}</SmallLinkButton>
      </div>
      {/* Integration marquee: full bordered-box width, 128px slides (32 gutter + 96 tile) */}
      <div ref={marqueeRef} className="marquee-fade relative -mx-6 mt-16 overflow-hidden md:-mx-14 md:mt-20 lg:mt-24">
        <div data-motion="uc-marquee-track" className="-ml-8 flex w-max items-center">
          {[0, 1, 2].map((set) =>
            GLYPHS.map((Glyph, i) => (
              <div key={`${set}-${i}`} className="shrink-0 pl-8" aria-hidden={set > 0 ? 'true' : undefined}>
                <div className="flex size-20 items-center justify-center rounded-23 md:size-[88px] bg-integration-tile shadow-integration-tile lg:size-24">
                  <Glyph />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

/* Original integration app-icon glyphs live in logos.jsx (INTEGRATION_GLYPHS). */
const GLYPHS = INTEGRATION_GLYPHS

/* Generic 24px line icons for the feature row */
const ic = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true', className: 'shrink-0 text-white-200' }
function IconBars() {
  return (<svg {...ic}><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M9 15v-3M12 15V9M15 15v-5" /></svg>)
}
function IconGlobe() {
  return (<svg {...ic}><circle cx="12" cy="12" r="8" /><path d="M4 12h16M12 4c2.5 2.5 2.5 13.5 0 16M12 4c-2.5 2.5-2.5 13.5 0 16" /></svg>)
}
function IconBook() {
  return (<svg {...ic}><path d="M4 6h5a3 3 0 0 1 3 3v10a2 2 0 0 0-2-2H4zM20 6h-5a3 3 0 0 0-3 3v10a2 2 0 0 1 2-2h6z" /></svg>)
}
function IconChat() {
  return (<svg {...ic}><path d="M5 6h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3V8a2 2 0 0 1 2-2" /><path d="M17 10h2v8l-2-1.5" /></svg>)
}
function IconHeadset() {
  return (<svg {...ic}><path d="M5 15v-3a7 7 0 0 1 14 0v3" /><rect x="4" y="14" width="4" height="5" rx="1.5" /><rect x="16" y="14" width="4" height="5" rx="1.5" /></svg>)
}

/* ------------------------------------------------------------------------------------------ */
/* 6b SDK                                                                                      */
/* ------------------------------------------------------------------------------------------ */

function SdkSection() {
  return (
    <section className="dark bg-black-50" data-section="universal-context-sdk">
      <div className="lg-container">
        <div className="border-solid border-black-400 lg:border-x">
          <div className="relative flex flex-col border-y border-solid border-black-400 lg:flex-row">
            {/* Graph-paper grid (>= lg): 23 vertical + 7 horizontal hairlines, evenly spaced */}
            <div aria-hidden="true" className="absolute inset-0 hidden justify-evenly lg:flex">
              {Array.from({ length: 23 }, (_, i) => (
                <span key={i} className="w-px bg-black-400" />
              ))}
            </div>
            <div aria-hidden="true" className="absolute inset-0 hidden flex-col justify-evenly lg:flex">
              {Array.from({ length: 7 }, (_, i) => (
                <span key={i} className="h-px bg-black-400" />
              ))}
            </div>

            {/* Left card: col 2 -> centre, rows 1..7 of 8 (bg masks the grid) */}
            <div className="relative px-6 py-16 md:px-8 lg:static lg:w-1/2 lg:p-0">
              <div className="flex items-center justify-center bg-black-50 lg:absolute lg:bottom-[12.5%] lg:left-[calc(100%/24)] lg:right-1/2 lg:top-[12.5%] lg:justify-start lg:px-8">
                <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
                  <h2 className="font-display text-section-sm lg:text-section">
                    <span className="block text-white-200">{SDK_LEAD}</span>
                    <span className="block text-black-700">{SDK_CONT}</span>
                  </h2>
                  <SmallLinkButton>{SDK_CTA}</SmallLinkButton>
                </div>
              </div>
            </div>

            {/* Right half: line illustration, aspect 1.5 (drives panel height at lg) */}
            <div className="relative bg-black-50 lg:w-1/2">
              <SdkIllustration className="block aspect-[768/431] w-full lg:aspect-[3/2]" />
            </div>
          </div>
          <div className="h-16 md:h-32" />
        </div>
      </div>
    </section>
  )
}

/**
 * Original geometric line drawing: dotted guides, an isometric block with hatched faces and
 * "code line" strokes, wired by dashed connectors to two endpoint chips.
 */
function SdkIllustration({ className = '' }) {
  const cx = 347.5
  const cy = 231.5
  const s = 110
  const k = s * 0.87
  const p = (x, y) => [cx + x, cy + y]
  const pts = (arr) => arr.map((a) => a.join(',')).join(' ')
  const top = [p(0, -s), p(k, -s / 2), p(0, 0), p(-k, -s / 2)]
  const left = [p(-k, -s / 2), p(0, 0), p(0, s), p(-k, s / 2)]
  const right = [p(0, 0), p(k, -s / 2), p(k, s / 2), p(0, s)]
  const nodes = [p(0, -s), p(k, -s / 2), p(0, 0), p(-k, -s / 2), p(0, s), p(-k, s / 2), p(k, s / 2)]
  // left face: lines parallel to the vertical edge
  const leftHatch = Array.from({ length: 13 }, (_, i) => {
    const t = (i + 1) / 14
    const [x1, y1] = p(-k + k * t, -s / 2 + (s / 2) * t)
    return <line key={i} x1={x1} y1={y1 + 3} x2={x1} y2={y1 + s - 3} />
  })
  // top face: lines parallel to the left-top edge
  const topHatch = Array.from({ length: 9 }, (_, i) => {
    const t = (i + 1) / 10
    const [x1, y1] = [cx + k * t, cy - s + (s / 2) * t]
    return <line key={i} x1={x1 - k + 6} y1={y1 + s / 2 - 3.5} x2={x1 - 4} y2={y1 + 2.3} />
  })
  // right face: "code lines" following the face slope
  const code = [
    [0.16, 0.55], [0.28, 0.3], [0.4, 0.62], [0.52, 0.45], [0.64, 0.25], [0.76, 0.5],
  ].map(([v, len], i) => {
    const indent = i === 2 || i === 3 ? 0.18 : 0.1
    const [x1, y1] = [cx + k * indent, cy - (s / 2) * indent + s * v]
    const [x2, y2] = [cx + k * (indent + len), cy - (s / 2) * (indent + len) + s * v]
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="2" strokeLinecap="round" />
  })
  const chip = (x, y, label) => (
    <g>
      <rect x={x} y={y} width="112" height="26" rx="6" className="fill-black-50 stroke-black-500" />
      <circle cx={x + 13} cy={y + 13} r="3" className="fill-black-600" />
      <text x={x + 24} y={y + 17} className="fill-black-700" fontFamily="'JetBrains Mono', monospace" fontSize="10">
        {label}
      </text>
    </g>
  )
  return (
    <svg data-motion="sdk-illustration" role="img" aria-label="Line illustration" viewBox="0 0 695 463" preserveAspectRatio="xMidYMid meet" className={className} fill="none">
      <g className="text-black-500" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4">
        <line x1="0" y1="58" x2="695" y2="58" />
        <line x1="0" y1="405" x2="695" y2="405" />
        <line x1="0" y1="0" x2="463" y2="463" />
        <line x1="695" y1="0" x2="232" y2="463" />
        <path d={`M${cx - k} ${cy} H120 V112`} />
        <path d={`M${cx + k} ${cy + 20} H575 V340`} />
      </g>
      <g className="text-black-600" stroke="currentColor" strokeWidth="1">
        <polygon points={pts(top)} className="fill-black-50" />
        <polygon points={pts(left)} className="fill-black-50" />
        <polygon points={pts(right)} className="fill-black-50" />
        <g className="text-black-500">
          {leftHatch}
          {topHatch}
        </g>
        <g className="text-black-700">{code}</g>
      </g>
      {nodes.map(([x, y]) => (
        <rect key={`${x}${y}`} x={x - 2} y={y - 2} width="4" height="4" className="fill-black-600" />
      ))}
      {chip(64, 86, 'GET /records')}
      {chip(519, 340, 'POST /notes')}
    </svg>
  )
}

/* ------------------------------------------------------------------------------------------ */
/* 6f quote-reveal                                                                             */
/* ------------------------------------------------------------------------------------------ */

/**
 * M12 (measured, reversible): with p = scroll progress through the 250svh sticky container
 * ((scrollY - containerTop) / (containerHeight - viewportHeight)), word k (1-based) of N turns dark
 * once p >= 0.1 + k * 0.75 / (N + 1). At 900px that is 135px + 56.25px per word (live thresholds
 * 200/250/310/360/.../1100px for 17 words). Colour change itself is the 500ms ease-out transition.
 */
function useQuoteReveal(ref) {
  useEffect(() => {
    const box = ref.current
    if (!box) return
    const words = [...box.querySelectorAll('.quote-word')]
    const N = words.length
    let raf = 0
    const update = () => {
      raf = 0
      const r = box.getBoundingClientRect()
      const span = r.height - window.innerHeight
      const p = span > 0 ? -r.top / span : 0
      words.forEach((w, i) => {
        if (p >= 0.1 + ((i + 1) * 0.75) / (N + 1)) w.setAttribute('data-revealed', '')
        else w.removeAttribute('data-revealed')
      })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref])
}

function QuoteReveal() {
  const containerRef = useRef(null)
  useQuoteReveal(containerRef)
  return (
    <section
      className="relative z-0 -mt-[100svh] bg-white-100"
      data-section="quote-reveal"
    >
      <div className="lg-container">
        <div ref={containerRef} className="h-[250svh] border-solid border-white-500 lg:border-x">
          <div
            data-motion="quote-panel"
            className="sticky top-[var(--site-header-height)] flex h-[calc(100svh_-_var(--site-header-height))] flex-col justify-center overflow-hidden"
          >
            <DotGrid />
            <div className="relative mx-auto flex w-[calc(100%*10/12)] flex-col items-center text-center">
              <p data-motion="quote-words" className="max-w-[18em] text-balance font-quote text-quote-sm lg:text-quote">
                {QUOTE_WORDS.map((w, i) => (
                  <span key={i}>
                    <span className="quote-word" data-word-index={i}>
                      {w}
                    </span>
                    {i < QUOTE_WORDS.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </p>
              <p className="mt-9 text-sm font-semibold text-black-300 lg:mt-[52px]">{QUOTE_NAME}</p>
              <p className="mt-0.5 text-sm text-black-300">{QUOTE_ROLE}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DotGrid() {
  return (
    <svg aria-hidden="true" className="absolute inset-0 h-full w-full">
      <defs>
        <pattern id="quote-dots" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="0.75" className="fill-white-500" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#quote-dots)" />
    </svg>
  )
}
