import { useLayoutEffect, useRef } from 'react'
import { Eyebrow, Streaks } from './ui.jsx'
import { reducedMotion } from '../motion/index.js'

/**
 * M14 gating (measured on a fresh load): the chart's CSS animations start when the chart box is
 * fully in view (fired at section top = 140px in a 900px viewport for the 760px box, i.e. threshold
 * 1.0); the stat blocks start when ~20% of the section is visible (section top at 740px). Both once.
 */
function useRevealOnce(ref, attr, ratio, extraRef) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reducedMotion() || typeof IntersectionObserver === 'undefined') return
    const targets = [el, extraRef?.current].filter(Boolean)
    targets.forEach((t) => t.setAttribute(attr, 'pending'))
    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20)
    const io = new IntersectionObserver(
      ([e]) => {
        const h = e.boundingClientRect.height
        if (!h) return
        // fully visible, or (box taller than the viewport) filling the viewport
        const needed = Math.min(h * ratio, (e.rootBounds?.height ?? window.innerHeight) - 1)
        if (e.isIntersecting && e.intersectionRect.height >= needed - 0.5) {
          targets.forEach((t) => t.setAttribute(attr, 'play'))
          io.disconnect()
        }
      },
      { threshold: thresholds }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, attr, ratio, extraRef])
}

// Section 7. Placeholder copy matched to spec counts.
const EYEBROW = 'Built for load' // c14
const LEAD = 'Fast at any size.' // c17 w4 (1 line at 1440)
const CONT = ' Dependable systems for people and agents.' // c42 w6 (2 lines at 1440)
const STATS = [
  ['12M', 'tool calls per month'], // c3 / c20
  ['4.8B', 'requests per month'], // c4 / c18
  ['65k', 'active agents deployed'], // c3 / c22
  ['20M', 'messages each day'], // c3 / c17
]

// Streak x positions (1440 dump, relative to the bordered box)
const SCALE_STREAKS = [
  [1223, 1],
  [0, 1],
  [255, 1],
  [1335, 1],
  [1095, 1],
  [175, 1],
  [1175, 1],
]

// Chart geometry (viewBox = bordered box 1390x760): exponential curve from (0, bottom - 56) to the
// top-right corner. k = 3.2 fitted to the reference screenshot (curve ~16% of its rise at mid-width).
const W = 1390
const H = 760
const BASE = H - 56
const K = 3.2
const curveY = (x) => BASE - (BASE * (Math.exp((K * x) / W) - 1)) / (Math.exp(K) - 1)
const STEP = 8
const XS = Array.from({ length: Math.floor(W / STEP) + 1 }, (_, i) => i * STEP + 0.5)
const CURVE_D = Array.from({ length: 140 }, (_, i) => {
  const x = (i / 139) * W
  return `${i ? 'L' : 'M'}${x.toFixed(1)} ${curveY(x).toFixed(1)}`
}).join(' ')
const AREA_D = `${CURVE_D} L${W} ${H} L0 ${H} Z`
const AREA_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${W} ${H}' preserveAspectRatio='none'><path d='${AREA_D}'/></svg>`
)}")`

export default function ScaleStats() {
  const sectionRef = useRef(null)
  const chartRef = useRef(null)
  const gridRef = useRef(null)
  const mobileChartRef = useRef(null)
  useRevealOnce(sectionRef, 'data-stats', 0.18)
  useRevealOnce(chartRef, 'data-reveal', 1, gridRef)
  useRevealOnce(mobileChartRef, 'data-reveal', 1)
  return (
    <section ref={sectionRef} className="bg-white-100" data-section="scale-stats">
      <div className="lg-container">
        <div className="relative flex flex-col border-solid border-white-500 pt-[88px] lg:min-h-[760px] lg:border-x lg:pb-14 lg:pt-[152px]">
          {/* Background layers (>= lg, full bordered box); hairline = live `infra-grid-reveal` layer */}
          <div ref={gridRef} aria-hidden="true" className="absolute inset-0 hidden lg:block">
            <div data-motion="scale-grid" className="absolute inset-0 bg-center-hairline" />
          </div>
          <div ref={chartRef} aria-hidden="true" className="absolute inset-0 hidden lg:block">
            <ChartLayers />
          </div>
          <Streaks xs={SCALE_STREAKS} variant="scale" className="hidden lg:block" />

          <div className="relative px-[calc(100%/12)] lg:px-[calc(100%/24)]">
            <div className="flex max-w-[464px] flex-col items-start gap-6">
              <Eyebrow>{EYEBROW}</Eyebrow>
              <h2 className="font-display text-section-sm lg:text-section">
                <span className="text-black-100">{LEAD}</span>
                <span className="text-black-700">{CONT}</span>
              </h2>
            </div>
            <dl className="mt-10 grid max-w-[480px] grid-cols-2 gap-x-12 gap-y-8 lg:mt-14">
              {STATS.map(([n, label]) => (
                <div key={label} data-motion="scale-stat" className="flex flex-col-reverse gap-1.5 border-l-2 border-solid border-blue-500 pl-4 md:pl-6">
                  <dt className="text-stat-label text-black-600">{label}</dt>
                  <dd className="m-0 font-display text-stat-sm text-black-100 md:text-stat">{n}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* < lg: chart sits in flow under the stats (768: 240 tall, 390: 220 tall), full-bleed */}
          <div ref={mobileChartRef} aria-hidden="true" className="relative mt-10 h-[220px] md:h-60 lg:hidden">
            <ChartLayers />
          </div>
        </div>
      </div>
    </section>
  )
}

function ChartLayers() {
  const svg = { viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: 'none', className: 'absolute inset-0 h-full w-full', fill: 'none' }
  return (
    <>
      {/* Blue wash, clipped to the area under the curve (M14: fades in) */}
      <div
        data-motion="scale-wash"
        className="absolute inset-0 bg-scale-wash"
        style={{ WebkitMaskImage: AREA_MASK, maskImage: AREA_MASK, WebkitMaskSize: '100% 100%', maskSize: '100% 100%' }}
      />
      {/* Static SVG 1: grey vertical ticks under the curve */}
      <svg {...svg}>
        <g className="text-white-500" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke">
          {XS.map((x) => (
            <line key={x} x1={x} x2={x} y1={curveY(x)} y2={H} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      </svg>
      {/* Static SVG 2: faint blue tick fill just under the curve, fading downward */}
      <svg {...svg}>
        <defs>
          <linearGradient id="scale-tick-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" className="text-blue-200" stopColor="currentColor" />
            <stop offset="1" className="text-blue-200" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g stroke="url(#scale-tick-fade)" strokeWidth="1">
          {XS.map((x) => (
            <line key={x} x1={x} x2={x + 0.01} y1={curveY(x)} y2={H} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      </svg>
      {/* SVG 3: the curve, clip-revealed left -> right by M14 (static end state: fully visible) */}
      <svg {...svg} data-motion="scale-curve" style={{ clipPath: 'inset(0)' }}>
        <path d={CURVE_D} className="text-blue-500" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
    </>
  )
}
