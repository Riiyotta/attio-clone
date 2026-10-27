import { useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { observeInView, reducedMotion } from '../../motion/index.js'
import { rng } from '../../data/copy.js'
import { DashedH, DashedV } from '../marketing/primitives.jsx'
import { SecondaryCards } from './Listing.jsx'

/* ------------------------------------------------------------------ */
/* ASCII field (original generative art for the 1390x395 panel)        */
/* ------------------------------------------------------------------ */
const RAMP = ' .,:-=+*#%@'

/**
 * Canvas glyph field drawn in Courier New (18.18px / 18.18 line, ls -1, #cfd4dc at >= lg;
 * 13.33px below, as measured). Layered sine "terrain" drifting slowly, faded at the edges.
 * ~15fps while on screen; a single static frame with reduced motion.
 */
function AsciiField() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let w = 0
    let h = 0
    let fs = 18.18
    let cols = 0
    let rows = 0
    let cw = 0
    const color = getComputedStyle(canvas).color // `text-ascii` token (#cfd4dc)
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      fs = window.innerWidth >= 992 ? 18.18 : 13.33
      ctx.font = `${fs}px "Courier New", monospace`
      cw = ctx.measureText('M').width - 1 // letter-spacing -1
      cols = Math.ceil(w / cw)
      rows = Math.ceil(h / fs)
    }
    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)
      ctx.textBaseline = 'top'
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const nx = x / cols
          const ny = y / rows
          let v =
            Math.sin(nx * 9 + t * 0.35) * 0.35 +
            Math.sin(ny * 6.5 - t * 0.25 + nx * 3) * 0.3 +
            Math.sin((nx + ny) * 14 + t * 0.6) * 0.15 +
            Math.cos(nx * 23 - ny * 11 - t * 0.4) * 0.1
          v = (v + 0.9) / 1.8
          const edge = Math.min(1, nx * 6, (1 - nx) * 6, ny * 3, (1 - ny) * 3)
          v *= edge
          const ch = RAMP[Math.max(0, Math.min(RAMP.length - 1, Math.floor(v * RAMP.length)))]
          if (ch === ' ') continue
          ctx.globalAlpha = 0.18 + v * 0.7
          ctx.fillStyle = color
          ctx.fillText(ch, x * cw, y * fs)
        }
      }
      ctx.globalAlpha = 1
    }
    resize()
    let raf = 0
    let last = 0
    let t = 0
    const loop = (now) => {
      raf = requestAnimationFrame(loop)
      if (now - last < 66) return
      t += last ? (now - last) / 1000 : 0
      last = now
      draw(t)
    }
    const onResize = () => {
      resize()
      draw(t)
    }
    window.addEventListener('resize', onResize)
    draw(0)
    let off = () => {}
    if (!reducedMotion()) {
      off = observeInView(canvas, (vis) => {
        cancelAnimationFrame(raf)
        last = 0
        if (vis) raf = requestAnimationFrame(loop)
      })
    }
    return () => {
      cancelAnimationFrame(raf)
      off()
      window.removeEventListener('resize', onResize)
    }
  }, [])
  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full text-ascii" />
}

/* ------------------------------------------------------------------ */
/* T6 EngHero                                                          */
/* ------------------------------------------------------------------ */
export function EngHero({ data }) {
  return (
    <section className="dark eng-dark bg-black-50">
      <div className="container">
        <div className="border-x border-solid border-black-400">
          <div className="flex flex-col lg:h-[clamp(800px,calc(100svh-44px-var(--site-header-height)),1200px)]">
            <div className="flex flex-col max-lg:h-[calc(62svh-var(--site-header-height))] lg:contents">
              <div className="grid h-[113px] shrink-0 grid-cols-12 pt-[46px] lg:grid-cols-24">
                <h1 className="col-[2/-2] cursor-default font-mono text-sm uppercase text-white-100">{data.title}</h1>
              </div>
              <div className="relative min-h-0 flex-1 overflow-hidden">
                <AsciiField />
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex flex-col justify-evenly opacity-60">
                  {[0, 1, 2].map((i) => (
                    <DashedH key={i} className="!text-black-400" />
                  ))}
                </div>
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex justify-evenly opacity-60">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <DashedV key={i} className="!text-black-400" />
                  ))}
                </div>
              </div>
            </div>
            <SecondaryCards posts={data.secondary} dark className="shrink-0" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* ContributionHeatmap + careers CTA                                   */
/* ------------------------------------------------------------------ */
const SHADES = ['bg-black-200', 'bg-black-600', 'bg-black-700', 'bg-black-800', 'bg-black-900']

export function Heatmap({ data }) {
  const ref = useRef(null)
  const cells = useMemo(() => {
    const r = rng(42)
    return Array.from({ length: 359 }, () => {
      const v = r()
      return v < 0.42 ? 0 : v < 0.66 ? 1 : v < 0.82 ? 2 : v < 0.93 ? 3 : 4
    })
  }, [])
  // Squares start at opacity 0 and reveal in view (stagger not captured: random 0-600ms, 300ms fade).
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reducedMotion()) {
      el.dataset.reveal = 'done'
      return
    }
    el.dataset.reveal = 'pending'
    const off = observeInView(
      el,
      (vis) => {
        if (vis) {
          el.dataset.reveal = 'done'
          off()
        }
      },
      { threshold: 0.4 }
    )
    return () => off()
  }, [])
  const delays = useMemo(() => {
    const r = rng(7)
    return cells.map(() => Math.round(r() * 600))
  }, [cells])
  return (
    <section className="dark eng-dark bg-black-50">
      <div className="container">
        <div className="border-x border-solid border-black-400 pb-[100px] pt-40">
          <div className="grid grid-cols-12 lg:grid-cols-24">
            <p className="col-[2/-2] mb-2 text-pretty text-sm text-black-800 md:mb-3">{data.stats}</p>
            <div className="col-[2/-2] overflow-hidden">
              <div ref={ref} className="heatmap grid w-full min-w-[800px] auto-cols-fr grid-flow-col grid-rows-7 gap-[2px]">
                {cells.map((v, i) => (
                  <span key={i} className={`heat-cell block aspect-square rounded-[30%] ${SHADES[v]}`} style={{ '--d': `${delays[i]}ms` }} />
                ))}
              </div>
            </div>
            <div className="col-[2/-2] mt-[58px]">
              <h2 className="max-w-[16em] text-pretty text-head-sm-md text-white-100 lg:text-head-sm">{data.cta}</h2>
              <Link to="/careers" className="btn btn-ghost group -ml-3.5 mt-[15px] h-10 gap-1.5 rounded-12 px-3.5 text-base text-white-500">
                {data.ctaLink}
                <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" className="arrow-shift" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
