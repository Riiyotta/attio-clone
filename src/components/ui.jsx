import { useEffect, useId, useRef } from 'react'
import { bezier, observeInView, reducedMotion } from '../motion/index.js'
// Shared primitives used across sections: generic stroke icons, buttons, eyebrow pill,
// asset placeholder and the neutral brand wordmark.

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function ArrowRightIcon({ size = 14, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" className={className} {...stroke}>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

export function ChevronDownIcon({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true" className={className} {...stroke}>
      <path d="M5.5 7.5 9 11l3.5-3.5" />
    </svg>
  )
}

export function ChevronRightIcon({ size = 12, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" aria-hidden="true" className={className} {...stroke}>
      <path d="M4.5 2.5 8 6l-3.5 3.5" />
    </svg>
  )
}

export function CloseIcon({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true" className={className} {...stroke}>
      <path d="M5 5l8 8M13 5l-8 8" />
    </svg>
  )
}

// Hamburger / close glyphs drawn on an 18 grid at 24px (live: stroke 1.2 / 1.1 in 18 units).
export function MenuIcon({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true" className={className} {...stroke} strokeWidth={1.2}>
      <path d="M15 6H3M15 12H3" />
    </svg>
  )
}

export function MenuCloseIcon({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true" className={className} {...stroke} strokeWidth={1.1}>
      <path d="m12.5 5.5-7 7m7 0-7-7" />
    </svg>
  )
}

/** Buttons per spec 0.8. variant: primary | outline | ghost; size: md (h36) | small (h32 link). */
export function Button({ as: Tag = 'a', variant = 'outline', size = 'md', className = '', children, ...rest }) {
  const v = { primary: 'btn-primary', outline: 'btn-outline', ghost: 'btn-ghost' }[variant]
  const s = size === 'small' ? 'btn-small' : ''
  const props = Tag === 'a' && rest.href === undefined ? { href: '#', ...rest } : rest
  return (
    <Tag className={`btn ${v} ${s} ${className}`} {...props}>
      {children}
    </Tag>
  )
}

/** Small "link" button (h32, 12/18 label + 14px arrow-right). */
export function SmallLinkButton({ children, className = '', ...rest }) {
  return (
    <Button variant="outline" size="small" className={className} {...rest}>
      <span>{children}</span>
      <ArrowRightIcon size={14} />
    </Button>
  )
}

export function Eyebrow({ children, className = '' }) {
  return <p className={`eyebrow ${className}`}>{children}</p>
}

/**
 * Image slot. Renders the asset when `src` is set, otherwise a neutral placeholder box at the
 * exact manifest size (override sizing with className for fluid slots). Radius/border/shadow come
 * from className so each section applies the spec's frame styles.
 */
export function AssetSlot({ asset, className = '', style, fluid = false, children }) {
  const size = fluid ? undefined : { width: asset.width, height: asset.height }
  if (asset.src) {
    return (
      <img
        src={asset.src}
        width={asset.width}
        height={asset.height}
        alt={asset.alt}
        className={`object-cover ${className}`}
        style={{ ...size, ...style }}
      />
    )
  }
  return (
    <div
      role="img"
      aria-label={asset.alt}
      data-placeholder=""
      className={`overflow-hidden bg-white-300 ${className}`}
      style={{ ...size, ...style }}
    >
      {children}
    </div>
  )
}

/**
 * Prototype brand "Corvale" (fictional product). Original mark: a rounded tile with an open
 * orbit ring and a satellite dot knocked out (SVG mask, so it inherits currentColor and works on
 * light and dark), followed by a lowercase Inter Display wordmark fitted to the slot width.
 */
export function BrandMark({ asset, className = '' }) {
  const id = useId().replace(/:/g, '')
  if (asset.src) {
    return <img src={asset.src} width={asset.width} height={asset.height} alt={asset.alt} className={className} />
  }
  const { width: w, height: h } = asset
  const s = h / 24 // mark drawn on a 24 grid
  const textX = h * 1.3
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label="Corvale"
      className={className}
      fill="currentColor"
    >
      <defs>
        <mask id={`corvale-${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width={h} height={h}>
          <rect width={h} height={h} fill="white" />
          <g transform={`scale(${s})`}>
            {/* open ring, gap at the upper right */}
            <path d="M15.9 7.6A6 6 0 1 0 17.6 13" fill="none" stroke="black" strokeWidth="2.6" strokeLinecap="round" />
            <circle cx="17.4" cy="8.6" r="1.9" fill="black" />
          </g>
        </mask>
      </defs>
      <rect width={h} height={h} rx={h * 0.29} mask={`url(#corvale-${id})`} />
      <text
        x={textX}
        y={h * 0.78}
        fontFamily="InterDisplay, 'interDisplay Fallback', sans-serif"
        fontWeight="600"
        fontSize={h * 0.82}
        letterSpacing={-h * 0.02}
        textLength={w - textX - 1}
        lengthAdjust="spacingAndGlyphs"
      >
        corvale
      </text>
    </svg>
  )
}

/** Simple skeleton bar for generic mock UI (neutral fill). */
export function Bar({ w, h = 8, className = 'bg-white-500' }) {
  return <span className={`block shrink-0 rounded-full ${className}`} style={{ width: w, height: h }} />
}

/** Avatar circle for mock UI. */
export function Avatar({ size = 20, className = 'bg-white-700' }) {
  return <span className={`block shrink-0 rounded-full ${className}`} style={{ width: size, height: size }} />
}

export function ArrowUpRightIcon({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" className={className} {...stroke}>
      <path d="M7 13l6-6M8 7h5v5" />
    </svg>
  )
}

export function SpinnerIcon({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className} {...stroke}>
      <path d="M12 4a8 8 0 1 0 8 8" />
    </svg>
  )
}

/**
 * Light streaks (M16; also the UC title region and scale-stats). Rest state: opacity 0. A JS loop
 * re-creates the live framer behaviour, measured by sampling the inline transforms:
 * - cta / scale: streaks travel UP at a constant 185-310px/s from below the box (start y = box
 *   height + 0..480px) to fully above it (y = -360 * scaleY). Opacity is 0 until the streak enters
 *   the box, ramps linearly to its peak (cta .11-.22, scale .30-.55) over 0.6-1.8s, holds, then fades
 *   linearly to 0 over the last 0.7-1.0s of travel. New random x / scale each cycle after a
 *   0.3-1.0s idle. CTA streaks are scaled (sx .55-.95, sy .35-1); scale-stats ones are not.
 * - uc: streaks FALL from above the region (y -200..-620) into the planet's disc top (title block
 *   bottom + 64px), decelerating at the end. Opacity is keyed to travel progress: 0 until 27%, ramp to
 *   the peak (.11-.24) by 50%, hold to 82%, linear fade to 0 at 100%. sx .55-.95, sy .35-.8.
 */
const STREAK_VARIANTS = {
  cta: { dir: 'up', speed: [185, 305], peak: [0.11, 0.22], sx: [0.55, 0.95], sy: [0.35, 1] },
  scale: { dir: 'up', speed: [185, 310], peak: [0.3, 0.55], sx: [1, 1], sy: [1, 1] },
  uc: { dir: 'down', speed: [185, 300], peak: [0.11, 0.24], sx: [0.55, 0.95], sy: [0.35, 0.8] },
}

function runStreaks(container, variant) {
  const cfg = STREAK_VARIANTS[variant]
  const els = [...container.querySelectorAll('[data-motion="streak"]')]
  const r = (a, b) => a + Math.random() * (b - a)
  const ucEase = bezier(0.4, 0.4, 0.7, 1) // linear start, decelerating finish (sampled)
  const state = els.map((el) => {
    el.style.transformOrigin = '0 0'
    el.style.willChange = 'transform, opacity'
    return { el, base: parseFloat(el.style.left) || 0, idle: r(0, 2500), t: 0, run: null }
  })
  const W = () => container.clientWidth
  const H = () => container.clientHeight
  const ucEnd = () => {
    const title = container.parentElement?.querySelector('[data-motion="uc-title"]')?.parentElement
    if (!title) return H() * 0.57
    return title.getBoundingClientRect().bottom - container.getBoundingClientRect().top + 64
  }
  const newRun = () => {
    const sy = r(...cfg.sy)
    const run = { x: r(0, W()), sx: r(...cfg.sx), sy, peak: r(...cfg.peak), speed: r(...cfg.speed) }
    if (cfg.dir === 'up') {
      run.y0 = H() + r(0, 480)
      run.y1 = -360 * sy
      run.dur = ((run.y0 - run.y1) / run.speed) * 1000
      run.ramp = r(600, 1800)
      run.fade = r(700, 1000)
    } else {
      run.y0 = -r(200, 620)
      run.y1 = ucEnd()
      run.dur = ((run.y1 - run.y0) / run.speed) * 1000
    }
    return run
  }
  const apply = (s, y, o) => {
    const { el, run, base } = s
    el.style.opacity = o.toFixed(3)
    el.style.transform = `translate3d(${(run.x - base).toFixed(2)}px, ${y.toFixed(2)}px, 0) scaleX(${run.sx.toFixed(4)}) scaleY(${run.sy.toFixed(4)})`
  }
  const frame = (s, dt) => {
    if (!s.run) {
      s.idle -= dt
      if (s.idle > 0) return
      s.run = newRun()
      s.t = 0
      s.enter = null
    }
    const run = s.run
    s.t += dt
    const p = Math.min(s.t / run.dur, 1)
    let y
    let o
    if (cfg.dir === 'up') {
      y = run.y0 + (run.y1 - run.y0) * p
      if (s.enter === null && y < H()) s.enter = s.t
      const since = s.enter === null ? -1 : s.t - s.enter
      const left = run.dur - s.t
      o = since < 0 ? 0 : run.peak * Math.min(since / run.ramp, 1, left / run.fade)
    } else {
      y = run.y0 + (run.y1 - run.y0) * ucEase(p)
      o = p < 0.27 ? 0 : p < 0.5 ? (run.peak * (p - 0.27)) / 0.23 : p < 0.82 ? run.peak : (run.peak * (1 - p)) / 0.18
    }
    apply(s, y, Math.max(0, o))
    if (p >= 1) {
      s.run = null
      s.idle = r(300, 1000)
      s.el.style.opacity = '0'
    }
  }
  let raf = 0
  let last = 0
  const tick = (now) => {
    raf = requestAnimationFrame(tick)
    const dt = last ? Math.min(now - last, 64) : 16
    last = now
    state.forEach((s) => frame(s, dt))
  }
  const start = () => {
    if (!raf) {
      last = 0
      raf = requestAnimationFrame(tick)
    }
  }
  const stop = () => {
    cancelAnimationFrame(raf)
    raf = 0
  }
  const off = observeInView(container, (inView) => (inView ? start() : stop()))
  return () => {
    stop()
    off()
  }
}

export function Streaks({ xs, variant, className = '', animate = true }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!animate || !ref.current || reducedMotion()) return
    return runStreaks(ref.current, variant)
  }, [variant, animate])
  const bg = { uc: 'bg-streak-uc', scale: 'bg-streak-scale', cta: 'bg-streak-cta' }[variant]
  return (
    <div ref={ref} aria-hidden="true" data-motion="streaks" data-variant={variant} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {xs.map(([x, w], i) => (
        <div
          key={i}
          data-motion="streak"
          className={`absolute top-0 h-[360px] opacity-0 ${bg}`}
          style={{ left: x, width: w }}
        />
      ))}
    </div>
  )
}
