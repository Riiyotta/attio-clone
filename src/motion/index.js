// Shared motion helpers. Every constant used by callers was measured on the live site
// (see the Animation hand-off report); nothing here picks a "nice looking" default.

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/** cubic-bezier(x1, y1, x2, y2) as a JS easing function (Newton + bisection fallback). */
export function bezier(x1, y1, x2, y2) {
  const cx = 3 * x1
  const bx = 3 * (x2 - x1) - cx
  const ax = 1 - cx - bx
  const cy = 3 * y1
  const by = 3 * (y2 - y1) - cy
  const ay = 1 - cy - by
  const sx = (t) => ((ax * t + bx) * t + cx) * t
  const sy = (t) => ((ay * t + by) * t + cy) * t
  const dx = (t) => (3 * ax * t + 2 * bx) * t + cx
  return (x) => {
    if (x <= 0) return 0
    if (x >= 1) return 1
    let t = x
    for (let i = 0; i < 8; i++) {
      const err = sx(t) - x
      const d = dx(t)
      if (Math.abs(err) < 1e-6) return sy(t)
      if (Math.abs(d) < 1e-6) break
      t -= err / d
    }
    let lo = 0
    let hi = 1
    t = x
    for (let i = 0; i < 30; i++) {
      const v = sx(t)
      if (Math.abs(v - x) < 1e-6) break
      if (v < x) lo = t
      else hi = t
      t = (lo + hi) / 2
    }
    return sy(t)
  }
}

export const ease = {
  inOut: bezier(0.42, 0, 0.58, 1), // CSS `ease-in-out`
  outCubic: bezier(0.33, 1, 0.68, 1),
}

export const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)
/** Linear map of v from [a, b] to [0, 1], clamped. */
export const progress = (v, a, b) => clamp01((v - a) / (b - a))
export const rand = (a, b) => a + Math.random() * (b - a)

/**
 * Mass-1 damped spring that follows a moving target (framer `useSpring` equivalent).
 * Constants are fitted per use site from sampled live curves.
 */
export class Spring {
  constructor(value, stiffness, damping) {
    this.x = value
    this.v = 0
    this.target = value
    this.k = stiffness
    this.c = damping
  }
  /** Advance by dt seconds (sub-stepped for stability). Returns true while still moving. */
  step(dt) {
    const n = Math.max(1, Math.ceil(dt / 0.004))
    const h = dt / n
    for (let i = 0; i < n; i++) {
      const a = this.k * (this.target - this.x) - this.c * this.v
      this.v += a * h
      this.x += this.v * h
    }
    if (Math.abs(this.target - this.x) < 1e-4 && Math.abs(this.v) < 1e-3) {
      this.x = this.target
      this.v = 0
      return false
    }
    return true
  }
  snap(v) {
    this.x = this.target = v
    this.v = 0
  }
}

/** IntersectionObserver wrapper; returns a disconnect function. */
export function observeInView(el, cb, options = {}) {
  if (!el || typeof IntersectionObserver === 'undefined') {
    cb(true, null)
    return () => {}
  }
  const io = new IntersectionObserver(([entry]) => cb(entry.isIntersecting, entry), options)
  io.observe(el)
  return () => io.disconnect()
}

/* ------------------------------------------------------------------ */
/* Homepage in-view reveals (framer `whileInView` + `animate` equivalents) */
/* ------------------------------------------------------------------ */

export const EASE_OUT_CUBIC = 'cubic-bezier(0.33, 1, 0.68, 1)'
const GLOW_FROM = 'blur(1.5px) drop-shadow(0 0 7px rgba(38,109,240,0.55))'
const GLOW_TO = 'blur(0px) drop-shadow(0 0 0px rgba(38,109,240,0))'

/** Keyframes for one [data-hm-item]: opacity 0->1 plus optional blur (px) or the blue glow filter. */
function itemKeyframes(el) {
  const kf = { opacity: [0, 1] }
  if (el.dataset.hmGlow !== undefined) kf.filter = [GLOW_FROM, GLOW_TO]
  else if (el.dataset.hmBlur) kf.filter = [`blur(${el.dataset.hmBlur}px)`, 'blur(0px)']
  return kf
}

/**
 * Hides every [data-hm-item] inside `root` until `root` reaches `amount` (IntersectionObserver
 * ratio, framer `amount`), then plays each item once via WAAPI with its data-hm-dur / data-hm-delay /
 * data-hm-ease / data-hm-blur. Items may override the threshold with data-hm-amount. Dispatches
 * `hmplay` (detail.amount) on root for sequenced extras. Returns a cleanup function.
 */
export function revealOnView(root, amount) {
  if (!root || reducedMotion() || typeof IntersectionObserver === 'undefined') return () => {}
  const items = [...root.querySelectorAll('[data-hm-item]')]
  const groups = new Map()
  for (const el of items) {
    const a = el.dataset.hmAmount ? +el.dataset.hmAmount : amount
    if (!groups.has(a)) groups.set(a, [])
    groups.get(a).push(el)
  }
  if (!groups.has(amount)) groups.set(amount, [])
  for (const el of items) el.setAttribute('data-hm-state', 'pending')
  const observers = []
  for (const [a, els] of groups) {
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting && e.intersectionRatio >= a - 0.001)) return
        io.disconnect()
        for (const el of els) {
          el.animate(itemKeyframes(el), {
            duration: +(el.dataset.hmDur || 680),
            delay: +(el.dataset.hmDelay || 0),
            easing: el.dataset.hmEase || EASE_OUT_CUBIC,
            fill: 'backwards',
          })
          el.setAttribute('data-hm-state', 'played')
        }
        root.dispatchEvent(new CustomEvent('hmplay', { detail: { amount: a } }))
      },
      { threshold: a },
    )
    io.observe(root)
    observers.push(io)
  }
  return () => {
    observers.forEach((io) => io.disconnect())
    for (const el of items) el.removeAttribute('data-hm-state')
  }
}
