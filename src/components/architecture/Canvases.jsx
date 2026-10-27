import { useEffect, useRef } from 'react'
import { observeInView, reducedMotion } from '../../motion/index.js'
import { rng } from '../../data/copy.js'

// Original generative canvases for the architecture page (the live draw routines are proprietary
// and were not reproduced; only the containers were measured). Colours are read from token
// classes on the canvas element so no literal colours live in JSX.

/** Shared loop: DPR-aware sizing, ~30fps while visible, single static frame with reduced motion. */
function useCanvas(ref, setup, fps = 30) {
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const state = { w: 0, h: 0, t: 0 }
    const colors = [...canvas.parentElement.querySelectorAll('[data-color]')].map((el) => getComputedStyle(el).color)
    const scene = setup(ctx, state, colors)
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      state.w = canvas.clientWidth
      state.h = canvas.clientHeight
      canvas.width = Math.max(1, state.w * dpr)
      canvas.height = Math.max(1, state.h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      scene.resize?.()
      scene.draw()
    }
    resize()
    let raf = 0
    let last = 0
    const step = 1000 / fps
    const loop = (now) => {
      raf = requestAnimationFrame(loop)
      if (last && now - last < step) return
      state.t += last ? Math.min(now - last, 100) / 1000 : 0
      last = now
      scene.draw()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
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
      ro.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

function Swatches({ classes }) {
  return classes.map((c) => <span key={c} data-color aria-hidden="true" className={`hidden ${c}`} />)
}

/**
 * Hero glyph field: a 24px lattice of mono glyphs whose weight follows two slow travelling
 * waves; `progressRef` (0..1, typing progress) gradually densifies the field.
 */
export function HeroField({ progressRef }) {
  const ref = useRef(null)
  useCanvas(ref, (ctx, s, [light, mid]) => {
    const GLYPHS = ['·', ':', '+', '×', '#']
    return {
      draw() {
        const { w, h, t } = s
        const p = progressRef?.current ?? 0
        ctx.clearRect(0, 0, w, h)
        ctx.font = '12px "JetBrains Mono", monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        const pitch = 24
        const cx = w / 2
        const cy = h / 2
        for (let y = pitch / 2; y < h; y += pitch) {
          for (let x = pitch / 2; x < w; x += pitch) {
            const dx = (x - cx) / w
            const dy = (y - cy) / h
            const d = Math.sqrt(dx * dx + dy * dy)
            const wave = Math.sin(d * 18 - t * 0.9) * 0.5 + 0.5
            const drift = Math.sin(x * 0.011 + y * 0.017 + t * 0.4) * 0.5 + 0.5
            // keep the centre (headline) clear
            const clear = Math.min(1, Math.max(0, (d - 0.16) * 3.2))
            let v = (wave * 0.6 + drift * 0.4) * clear * (0.35 + p * 0.65)
            if (v < 0.18) continue
            const g = GLYPHS[Math.min(GLYPHS.length - 1, Math.floor(v * GLYPHS.length))]
            ctx.globalAlpha = Math.min(1, v * 0.9)
            ctx.fillStyle = v > 0.6 ? mid : light
            ctx.fillText(g, x, y)
          }
        }
        ctx.globalAlpha = 1
      },
    }
  })
  return (
    <>
      <Swatches classes={['text-white-700', 'text-black-900']} />
      <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />
    </>
  )
}

/** Dark-scene network: drifting nodes linked to their neighbours, a few nodes pulsing. */
export function NetworkField() {
  const ref = useRef(null)
  useCanvas(ref, (ctx, s, [line, node, hot]) => {
    const r = rng(17)
    const N = 90
    const nodes = Array.from({ length: N }, () => ({ x: r(), y: r(), vx: (r() - 0.5) * 0.01, vy: (r() - 0.5) * 0.01, ph: r() * 6.28, hot: r() < 0.08 }))
    return {
      draw() {
        const { w, h, t } = s
        ctx.clearRect(0, 0, w, h)
        const pts = nodes.map((n) => ({
          x: (((n.x + n.vx * t) % 1) + 1) % 1,
          y: (((n.y + n.vy * t) % 1) + 1) % 1,
          n,
        }))
        ctx.lineWidth = 1
        ctx.strokeStyle = line
        for (let i = 0; i < N; i++) {
          for (let j = i + 1; j < N; j++) {
            const dx = (pts[i].x - pts[j].x) * w
            const dy = (pts[i].y - pts[j].y) * h
            const dd = dx * dx + dy * dy
            if (dd < 150 * 150) {
              ctx.globalAlpha = 1 - Math.sqrt(dd) / 150
              ctx.beginPath()
              ctx.moveTo(pts[i].x * w, pts[i].y * h)
              ctx.lineTo(pts[j].x * w, pts[j].y * h)
              ctx.stroke()
            }
          }
        }
        for (const p of pts) {
          const pulse = p.n.hot ? Math.sin(t * 2 + p.n.ph) * 0.5 + 0.5 : 0
          ctx.globalAlpha = 1
          ctx.fillStyle = p.n.hot ? hot : node
          ctx.beginPath()
          ctx.arc(p.x * w, p.y * h, p.n.hot ? 2.5 + pulse * 1.5 : 1.5, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.globalAlpha = 1
      },
    }
  })
  return (
    <>
      <Swatches classes={['text-black-400', 'text-black-600', 'text-blue-400']} />
      <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />
    </>
  )
}

/** Closing stage: slow concentric dashed rings around the closing line. */
export function RingsField() {
  const ref = useRef(null)
  useCanvas(ref, (ctx, s, [ring, dot]) => {
    return {
      draw() {
        const { w, h, t } = s
        ctx.clearRect(0, 0, w, h)
        const cx = w / 2
        const cy = h / 2
        ctx.lineWidth = 1
        for (let i = 0; i < 12; i++) {
          const rad = 140 + i * 56
          ctx.strokeStyle = ring
          ctx.globalAlpha = 1 - i / 13
          ctx.setLineDash([2, 6 + i])
          ctx.lineDashOffset = (i % 2 ? 1 : -1) * t * (8 + i * 2)
          ctx.beginPath()
          ctx.ellipse(cx, cy, rad * 1.6, rad, 0, 0, Math.PI * 2)
          ctx.stroke()
          const a = t * (0.05 + i * 0.01) * (i % 2 ? 1 : -1) + i
          ctx.fillStyle = dot
          ctx.beginPath()
          ctx.arc(cx + Math.cos(a) * rad * 1.6, cy + Math.sin(a) * rad, 2, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.setLineDash([])
        ctx.globalAlpha = 1
      },
    }
  })
  return (
    <>
      <Swatches classes={['text-white-700', 'text-black-800']} />
      <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />
    </>
  )
}
