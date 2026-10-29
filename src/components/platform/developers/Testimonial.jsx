import { useEffect, useRef } from 'react'
import { reducedMotion } from '../../../motion/index.js'
import { rng } from '../../../data/copy.js'
import { Block, GridLines, UBox, u } from './Blueprint.jsx'

/* ------------------------------------------------------------------ */
/* Portrait: original generative halftone bust (live is an unmeasured  */
/* <canvas>; this is an abstract figure, not a person).                */
/* ------------------------------------------------------------------ */
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
]

function shade(nx, ny, v) {
  // Signed-distance-ish masks for head, neck and shoulders (unit square, y down).
  const head = ((nx - v.hx) / v.hr) ** 2 + ((ny - v.hy) / (v.hr * 1.22)) ** 2
  const neck = Math.abs(nx - v.hx) < v.hr * 0.48 && ny > v.hy && ny < v.hy + v.hr * 1.9
  const sh = ((nx - 0.5) / 0.5) ** 2 + ((ny - 1.12) / 0.42) ** 2
  let inside = 0
  let lx = 0
  let ly = 0
  if (head < 1) {
    inside = 1
    lx = (nx - v.hx) / v.hr
    ly = (ny - v.hy) / (v.hr * 1.22)
  } else if (sh < 1) {
    inside = 1
    lx = (nx - 0.5) / 0.5
    ly = (ny - 1.12) / 0.42
  } else if (neck) {
    inside = 0.75
    lx = (nx - v.hx) / (v.hr * 0.5)
    ly = 0.2
  }
  if (!inside) return 0
  const lz = Math.sqrt(Math.max(0, 1 - Math.min(1, lx * lx + ly * ly)))
  // light from upper-left
  let l = 0.25 + 0.75 * Math.max(0, -0.55 * lx - 0.45 * ly + 0.7 * lz)
  // hair / cap band on the top of the head
  if (head < 1 && ny < v.hy - v.hr * v.cap) l *= 0.45
  // eye band + brow shadow
  if (head < 1 && Math.abs(ny - (v.hy - v.hr * 0.05)) < v.hr * 0.09 && Math.abs(Math.abs(nx - v.hx) - v.hr * 0.38) < v.hr * 0.16) l *= 0.6
  // collar fold
  if (sh < 1 && Math.abs(nx - v.hx) < 0.08 && ny < v.hy + v.hr * 2.6) l *= 0.6
  return l * inside
}

function Portrait({ variant = 0, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const color = getComputedStyle(canvas).color // text-white-900 token
    const v = [
      { hx: 0.48, hy: 0.36, hr: 0.2, cap: 0.55, seed: 3 },
      { hx: 0.52, hy: 0.38, hr: 0.19, cap: 0.75, seed: 9 },
    ][variant % 2]
    const draw = () => {
      const size = canvas.clientWidth
      if (!size) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = size * dpr
      canvas.height = size * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, size, size)
      ctx.fillStyle = color
      const cell = 2
      const n = Math.floor(size / cell)
      const r = rng(v.seed)
      for (let y = 0; y < n; y++) {
        for (let x = 0; x < n; x++) {
          const base = shade(x / n, y / n, v)
          const l = base + (r() - 0.5) * 0.12
          if (base <= 0 || l <= 0.04) continue
          if (l * 16 > BAYER[y % 4][x % 4]) ctx.fillRect(x * cell, y * cell, cell - 0.6, cell - 0.6)
        }
      }
    }
    draw()
    const ro = new ResizeObserver(draw)
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [variant])
  return (
    <div className={`mix-blend-lighten ${className}`}>
      <canvas ref={ref} role="img" aria-label="Abstract halftone portrait" className="block size-full text-white-900" />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Scroll-linked word reveal (inferred from span structure; timings   */
/* borrowed from M-S4: first word at 850/900 of the viewport, last at */
/* 400/900, each word 600ms colour transition). Approximate.          */
/* ------------------------------------------------------------------ */
function useWordReveal(ref) {
  useEffect(() => {
    const p = ref.current
    if (!p) return
    const words = [...p.querySelectorAll('[data-word]')]
    if (reducedMotion()) {
      words.forEach((w) => w.setAttribute('data-on', ''))
      return
    }
    let raf = 0
    const update = () => {
      raf = 0
      const vh = window.innerHeight
      const top = p.getBoundingClientRect().top
      const t = (vh * (850 / 900) - top) / (vh * (450 / 900))
      const n = Math.max(0, Math.min(words.length, Math.ceil(t * words.length)))
      words.forEach((w, i) => (i < n ? w.setAttribute('data-on', '') : w.removeAttribute('data-on')))
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

function Quote({ text, className = '' }) {
  const ref = useRef(null)
  useWordReveal(ref)
  const words = text.split(' ')
  return (
    <p ref={ref} className={`relative text-pretty font-display text-head-sm-md font-medium ${className}`}>
      <span aria-hidden="true" className="absolute right-full top-0 text-white-400">
        “
      </span>
      {words.map((w, i) => (
        <span key={i}>
          <span data-word="" className="dev-word">
            {i === words.length - 1 ? `${w}”` : w}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  )
}

/**
 * D-TESTIMONIAL (B2/B6). Desktop: 10 unit rows; mono label col 2/5 row 3, portrait col 3/9 rows
 * 3/-3 (6x6), quote box col 9/-3 rows 3/-3, quote text col 10/-4 rows 4/-4 (centred).
 * Mobile twin: 8u portrait centred, quote, then the mono label (measured gaps at 768 / 390).
 */
export default function Testimonial({ data, variant = 0 }) {
  return (
    <Block>
      <div className="relative max-lg:hidden" style={{ height: u(10) }}>
        <GridLines cols={24} rows={10} />
        <div className="absolute flex flex-col justify-end gap-1" style={{ left: u(1), top: u(2), width: u(3), height: u(1) }}>
          <p className="font-mono text-xs uppercase text-black-800">
            <span className="block">{data.name}</span>
            <span className="block">{data.role}</span>
          </p>
          <span aria-hidden="true" className="block h-px w-full bg-black-800" />
        </div>
        <UBox x={8} y={2} w={14} h={6} />
        <div className="absolute" style={{ left: u(2), top: u(2), width: u(6), height: u(6) }}>
          <Portrait variant={variant} className="size-full" />
        </div>
        <div className="absolute flex items-center" style={{ left: u(9), top: u(3), width: u(12), height: u(4) }}>
          <Quote text={data.quote} />
        </div>
      </div>
      <div className="flex flex-col pb-[11px] md:pb-[30px] lg:hidden">
        <div className="mx-auto" style={{ width: u(8), height: u(8) }}>
          <Portrait variant={variant} className="size-full" />
        </div>
        <div style={{ marginTop: u(1), paddingInline: u(1) }}>
          <Quote text={data.quote} />
          <p className="mt-[39px] font-mono text-xs uppercase text-black-800 md:mt-[78px]">
            <span className="block">{data.name}</span>
            <span className="block">{data.role}</span>
          </p>
        </div>
      </div>
    </Block>
  )
}
