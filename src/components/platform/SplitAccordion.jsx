import { useEffect, useRef, useState } from 'react'
import { reducedMotion, observeInView } from '../../motion/index.js'
import { DotWell, Hairline, LegacyBlock, LegacyHeading, V2Block, V2Heading } from './shell.jsx'

/* ------------------------------------------------------------------ */
/* S-SPLIT (3.2) v2 split accordion, 769 tall at >= lg                   */
/* ------------------------------------------------------------------ */

// M-S1: fill grows linearly at ~0.17-0.18/s (5.5-6s per item). Only while the grid top is
// between ~570px and ~-300px of a 900px viewport AND the page scrolled in the last ~250ms.
const V2_ITEM_MS = 5750
const SCROLL_IDLE_MS = 250

export function SplitAccordion({ lead, cont, items, className = '' }) {
  const [active, setActive] = useState(0)
  const gridRef = useRef(null)
  const fills = useRef([])
  const state = useRef({ p: 0, active: 0 })
  state.current.active = active

  useEffect(() => {
    const grid = gridRef.current
    if (!grid || reducedMotion()) return
    let lastScroll = -Infinity
    let raf = 0
    let last = 0
    let visible = false
    const onScroll = () => {
      lastScroll = performance.now()
    }
    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      const dt = last ? Math.min(now - last, 64) : 0
      last = now
      const top = grid.getBoundingClientRect().top
      const vh = window.innerHeight
      const inBand = top < vh * (570 / 900) && top > -300 * (vh / 900)
      if (!inBand || now - lastScroll > SCROLL_IDLE_MS) return
      const s = state.current
      s.p += dt / V2_ITEM_MS
      if (s.p >= 1) {
        s.p = 0
        setActive((a) => (a + 1) % items.length)
      }
      const el = fills.current[s.active]
      if (el) el.style.transform = `scaleX(${s.p})`
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
    window.addEventListener('scroll', onScroll, { passive: true })
    const off = observeInView(grid, (v) => {
      visible = v
      if (visible) start()
      else stop()
    })
    return () => {
      stop()
      off()
      window.removeEventListener('scroll', onScroll)
    }
  }, [items.length])

  const select = (i) => {
    state.current.p = 0
    fills.current.forEach((el) => el && (el.style.transform = 'scaleX(0)'))
    setActive(i)
  }
  useEffect(() => {
    // bars wrap: every fill except the active one resets
    fills.current.forEach((el, i) => el && i !== active && (el.style.transform = 'scaleX(0)'))
  }, [active])

  return (
    <V2Block className={className} data-section="split-accordion">
      <div className="px-8 py-12 lg:hidden">
        <V2Heading lead={lead} cont={cont} className="max-w-[20em]" />
      </div>
      <div className="relative flex w-full flex-col">
        <div ref={gridRef} className="grid lg:h-[640px] lg:grid-cols-2">
          <div className="flex min-h-0 flex-col justify-between gap-6 px-8 pb-10 pt-6 lg:px-[8.333%] lg:py-14">
            <V2Heading lead={lead} cont={cont} className="hidden max-w-[480px] lg:block" />
            <div className="flex flex-col gap-3 lg:gap-6">
              {items.map((it, i) => {
                const on = i === active
                return (
                  <button
                    key={it.title}
                    type="button"
                    aria-pressed={on}
                    onClick={() => select(i)}
                    className="group w-full cursor-pointer text-left lg:max-w-[364px]"
                  >
                    <span className={`block text-lg transition-colors duration-300 ease-out motion-reduce:transition-none ${on ? 'text-black-300' : 'text-black-900'}`}>
                      {it.title}
                    </span>
                    <span className={`block text-sm transition-colors delay-75 duration-300 ease-out motion-reduce:transition-none lg:text-base ${on ? 'text-black-700' : 'text-white-900'}`}>
                      {it.desc}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`relative mt-2 block h-0.5 overflow-hidden bg-white-500 transition-opacity delay-150 duration-500 ease-out lg:mt-3 ${on ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <span ref={(el) => (fills.current[i] = el)} className="absolute inset-0 origin-left bg-black-700" style={{ transform: 'scaleX(0)' }} />
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
          <div className="relative aspect-square min-h-0 overflow-hidden border-t border-solid border-white-500 bg-white-300 lg:aspect-auto lg:border-l lg:border-t-0">
            {items.map((it, i) => (
              <div
                key={it.title}
                aria-hidden={i !== active}
                className={`absolute inset-0 mx-auto size-full max-w-[560px] transition-opacity delay-150 duration-500 ease-out lg:max-w-none ${i === active ? 'opacity-100' : 'opacity-0'}`}
              >
                {it.media}
              </div>
            ))}
          </div>
        </div>
      </div>
    </V2Block>
  )
}

/* ------------------------------------------------------------------ */
/* S-SPLIT-L (3.3) legacy split accordion, 750 tall at >= lg            */
/* ------------------------------------------------------------------ */

// M-S2: time-based once in view, translateX(-100% -> 0) linear ~5.5s per item, then the next
// item expands (height/opacity/blur ~500ms). Loops. Clicking an idle title selects it.
const LEGACY_ITEM_MS = 5500

/** Item progress bar driven by the page clock (rAF + performance.now), like the live fill, so a capture
 * taken at a given JS time shows the same fill on both builds (1.3.0; was a 5.5s CSS keyframe). */
function ClockFill({ ms, running, done = false, as: Tag = 'div', className }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!running) {
      el.style.transform = done ? 'none' : 'translateX(-100%)'
      return
    }
    const t0 = performance.now()
    let raf = 0
    const step = () => {
      const p = Math.min(1, (performance.now() - t0) / ms)
      el.style.transform = `translateX(${((p - 1) * 100).toFixed(2)}%)`
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [running, done, ms])
  return <Tag ref={ref} className={className} style={{ transform: done ? 'none' : 'translateX(-100%)' }} />
}

export function SplitAccordionLegacy({ lead, cont, items, className = '' }) {
  const [active, setActive] = useState(0)
  const [run, setRun] = useState(0) // bumps to restart the fill animation
  const rootRef = useRef(null)
  const [inView, setInView] = useState(false)

  // The sequence only advances while the block is in view; it pauses (keeps the current item)
  // when scrolled away. Re-sampled live 2026-10-29 on /platform/sequences: item 2 active after
  // 6.5s in view, still item 2 after scrolling to the top and back.
  useEffect(() => observeInView(rootRef.current, (v) => setInView(v)), [])
  useEffect(() => {
    if (!inView || reducedMotion()) return
    const id = setTimeout(() => setActive((a) => (a + 1) % items.length), LEGACY_ITEM_MS)
    return () => clearTimeout(id)
  }, [inView, active, run, items.length])

  const select = (i) => {
    setActive(i)
    setRun((r) => r + 1)
  }
  const running = (i) => inView && i === active && !reducedMotion()

  const media = (
    <>
      <DotWell />
      <div className="absolute inset-0 flex items-center justify-center lg:p-6">
        {items.map((it, i) => (
          <div
            key={it.title}
            aria-hidden={i !== active}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out lg:inset-6 ${i === active ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="size-full max-h-[560px] max-w-[560px]">{it.media}</div>
          </div>
        ))}
      </div>
    </>
  )

  return (
    <LegacyBlock className={className} data-section="split-accordion-legacy">
      <div ref={rootRef} className="relative flex w-full flex-col">
        {/* < lg: header row on top */}
        <header className="grid grid-cols-12 pb-[60px] pt-[100px] lg:hidden">
          <div className="col-[2/-2]">
            <LegacyHeading lead={lead} cont={cont} />
          </div>
        </header>
        <div className="flex w-full flex-col items-center justify-between py-10 lg:h-[750px]">
          <Hairline />
          {/* >= lg layout */}
          <div className="relative hidden h-[540px] w-full grid-cols-12 lg:grid">
            <div className="relative col-[2/6] pb-80">
              <LegacyHeading lead={lead} cont={cont} />
              <div className="absolute inset-x-0 bottom-0">
                {items.map((it, i) => {
                  const on = i === active
                  return (
                    <div key={it.title} className="flex flex-col pt-7">
                      <h3 className="text-lg font-semibold text-black-300">
                        <button type="button" onClick={() => select(i)} aria-expanded={on} className={`group text-left ${on ? 'pointer-events-none' : ''}`}>
                          <span className={on ? '' : 'underline-anim'}>{it.title}</span>
                        </button>
                      </h3>
                      <div className="pl-collapse" data-open={on || undefined}>
                        <div>
                          <p className="mt-2 text-balance text-black-700 lg:max-xl:text-sm">{it.desc}</p>
                          <div className="mt-5 h-0.5 w-full overflow-hidden rounded-full bg-white-500">
                            <ClockFill key={`${active}-${run}`} ms={LEGACY_ITEM_MS} running={running(i)} className="h-full w-full rounded-full bg-black-700" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="relative col-[7/-1] overflow-hidden border-y border-solid border-white-500">{media}</div>
            {/* centre seam ticks */}
            <div aria-hidden="true" className="absolute inset-y-0 right-1/2 flex w-5 flex-col justify-between">
              <span className="block h-px w-5 bg-white-500" />
              <span className="block h-px w-5 bg-white-500" />
            </div>
          </div>
          {/* < lg layout: square media then a 192 item stack with segmented progress */}
          <div className="relative mt-8 aspect-square w-full overflow-hidden lg:hidden">{media}</div>
          <div className="relative grid w-full grid-cols-12 lg:hidden">
            <div className="relative col-[2/-2] h-48">
              <div className="absolute inset-x-0 bottom-8 h-32">
                <div className="absolute inset-x-0 top-8">
                  <div className="flex gap-1.5">
                    {items.map((it, i) => (
                      <button key={it.title} type="button" aria-label={it.title} onClick={() => select(i)} className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-white-500">
                        <ClockFill key={`${active}-${run}`} as="span" ms={LEGACY_ITEM_MS} running={running(i)} done={i < active} className="absolute inset-0 rounded-full bg-black-700" />
                      </button>
                    ))}
                  </div>
                  <div className="absolute inset-x-0 top-5">
                    <h3 className="text-lg font-semibold text-black-300 max-md:text-base">{items[active].title}</h3>
                    <p className="mt-2 text-balance text-black-700 max-md:text-sm">{items[active].desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Hairline />
        </div>
      </div>
    </LegacyBlock>
  )
}
