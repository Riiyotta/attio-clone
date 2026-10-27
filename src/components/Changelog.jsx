import { useEffect, useRef } from 'react'
import { Button, Eyebrow, SmallLinkButton, SpinnerIcon } from './ui.jsx'

// Section 10. Placeholder copy matched to spec counts.
const EYEBROW = 'Changelog' // c9
const LEAD = 'We ship every week.' // c19 w4
const CONT = ' New upgrades land often so you can keep moving.' // c46 w9 (47 incl. leading space)
const CTA = 'View all' // c8

const ENTRIES = [
  { date: 'September 29, 2026', title: 'Workflow run history, with logs', desc: 'Full visibility into each run, step by step, live.' }, // c18 / c31 / c50; title wraps to 2 lines at 258px (< lg) like live
  { date: 'September 22, 2026', title: 'Fresh steps for any flow', desc: 'Turn chats into scheduled jobs.' }, // c24 / c31
  { date: 'September 15, 2026', title: 'New actions', desc: 'Put more of your tools to work in automations with new actions for mail too.' }, // c11 / c77
  { date: 'September 10, 2026', title: 'Smarter search for records', desc: 'Get hints for what to look up next.' }, // c26 / c35
]

const NEWS_LEAD = 'Keep up with news.' // c18
const NEWS_CONT = 'Product news, straight to you.' // c30
const PLACEHOLDER = 'you@yourcompany.co' // c18

// 21 ticks per card (idx 0..20), hover colour = color-mix(#6f7988 (20-idx)/20, #e4e7ec).
// Live stagger (card vars --stagger 10ms, --tick-start 60ms): hover-in delay 60 + idx*10ms,
// hover-out delay (20-idx)*10ms.
const CARD_TICKS = Array.from({ length: 21 }, (_, i) => ({
  '--tick-hover': `color-mix(in oklab, var(--accent-foreground) ${((20 - i) / 20) * 100}%, var(--subtle-stroke))`,
  '--tick-in-delay': `${60 + i * 10}ms`,
  '--tick-out-delay': `${(20 - i) * 10}ms`,
}))

function TickStrip({ count, styles, className = '' }) {
  return (
    <div aria-hidden="true" className={`flex h-10 justify-evenly lg:h-12 xl:h-14 ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} width="1" height="100%" className={`h-full w-px shrink-0 ${styles ? 'cl-tick' : 'text-white-500'}`} style={styles?.[i]}>
          <rect width="1" height="100%" fill="currentColor" />
        </svg>
      ))}
    </div>
  )
}

// Edge fades (live): left fade shown once the row is scrolled away from its start, right fade hidden
// at the end of the row; opacity transition 200ms cubic-bezier(.4,0,.2,1).
function useEdgeFades(ref) {
  useEffect(() => {
    const box = ref.current
    const scroller = box?.firstElementChild
    const left = box?.querySelector('[data-motion="changelog-fade-left"]')
    const right = box?.querySelector('[data-motion="changelog-fade-right"]')
    if (!scroller || !left || !right) return
    const update = () => {
      const max = scroller.scrollWidth - scroller.clientWidth
      if (scroller.scrollLeft > 0.5) left.setAttribute('data-visible', '')
      else left.removeAttribute('data-visible')
      if (max <= 0.5 || scroller.scrollLeft >= max - 0.5) right.setAttribute('data-hidden', '')
      else right.removeAttribute('data-hidden')
    }
    update()
    scroller.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      scroller.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ref])
}

export default function Changelog() {
  const rowRef = useRef(null)
  useEdgeFades(rowRef)
  return (
    <section className="bg-white-100" data-section="changelog">
      <div className="lg-container">
        <div className="flex flex-col border-solid border-white-500 lg:border-x lg:border-b">
          {/* Header */}
          <div className="px-[calc(100%/12)] pb-16 pt-[88px] lg:px-[calc(100%/24)] lg:pb-20 lg:pt-[152px]">
            <div className="flex flex-col items-start gap-6">
              <Eyebrow>{EYEBROW}</Eyebrow>
              <h2 className="max-w-[880px] font-display text-section-sm lg:text-section">
                <span className="text-black-100">{LEAD}</span>
                <span className="text-black-700">{CONT}</span>
              </h2>
              <SmallLinkButton>{CTA}</SmallLinkButton>
            </div>
          </div>

          {/* Cards row: 24-col grid at lg (gutter col 1 + cards cols 2-23 + gutter col 24);
              < lg a horizontally scrolling snap row of 307px cards */}
          <div ref={rowRef} className="relative">
            <div className="no-scrollbar overflow-x-auto max-lg:snap-x max-lg:snap-mandatory max-lg:scroll-pl-6 md:max-lg:scroll-pl-14 lg:overflow-visible">
              <div className="grid w-max grid-cols-[24px_repeat(4,307px)_24px] md:grid-cols-[56px_repeat(4,307px)_56px] lg:w-auto lg:grid-cols-[repeat(24,minmax(0,1fr))]">
                <div className="flex flex-col justify-end lg:col-[1/2]">
                  <TickStrip count={3} />
                </div>
                <div className="col-span-4 grid grid-cols-[repeat(4,307px)] lg:col-[2/24] lg:grid-cols-4">
                  {ENTRIES.map((e) => (
                    <a
                      key={e.title}
                      href="#"
                      className="group relative flex h-[246px] snap-start flex-col border-l border-solid border-white-500 lg:h-[304px] xl:h-[312px]"
                    >
                      <span aria-hidden="true" data-motion="changelog-accent" className="cl-accent absolute -left-px inset-y-0 w-px bg-black-700" />
                      <div className="flex flex-1 flex-col gap-4 px-6">
                        <time className="font-display text-time text-black-700">{e.date}</time>
                        <div className="flex flex-col gap-1">
                          <h3 className="line-clamp-2 text-changelog-title text-black-300 transition-colors duration-150 ease-header group-hover:text-black-100">
                            {e.title}
                          </h3>
                          <p className="line-clamp-2 text-body text-black-700">{e.desc}</p>
                        </div>
                      </div>
                      <TickStrip count={21} styles={CARD_TICKS} />
                    </a>
                  ))}
                </div>
                <div className="flex flex-col justify-end lg:col-[24/25]">
                  <TickStrip count={4} className="!justify-start gap-[13.5px]" />
                </div>
              </div>
            </div>
            {/* Edge fades for the scroll row (opacity 0 at rest; 200ms) */}
            {/* Live: w-1/12; at scroll start the left fade is 0 and the right fade 1 (row overflows < lg) */}
            <div aria-hidden="true" data-motion="changelog-fade-left" className="pointer-events-none absolute inset-y-0 left-0 w-1/12 bg-fade-right opacity-0 transition-opacity duration-200 ease-header" />
            <div aria-hidden="true" data-motion="changelog-fade-right" className="pointer-events-none absolute inset-y-0 right-0 w-1/12 bg-fade-left opacity-0 transition-opacity duration-200 ease-header max-lg:opacity-100" />
          </div>

          {/* Newsletter row */}
          <div className="flex flex-col items-center gap-6 border-t border-solid border-white-500 px-6 py-20 text-center lg:grid lg:h-[193px] lg:grid-cols-[repeat(24,minmax(0,1fr))] lg:items-center lg:gap-0 lg:px-0 lg:py-16 lg:text-left">
            <div className="font-display text-newsletter lg:col-[2/13]">
              <p className="text-black-100">{NEWS_LEAD}</p>
              <p className="text-black-700">{NEWS_CONT}</p>
            </div>
            <form
              className="grid w-full max-w-[352px] grid-cols-1 gap-2 sm:grid-cols-[1fr_auto] sm:py-3 lg:col-[13/24] lg:justify-self-end"
              onSubmit={(e) => e.preventDefault()}
            >
              <input type="email" required placeholder={PLACEHOLDER} aria-label="Email address" className="form-input" />
              <Button as="button" type="submit" variant="primary" className="relative h-10 gap-1.5">
                <span>Subscribe</span>
                {/* Submitting-state spinner (opacity 0 at rest) */}
                <SpinnerIcon size={24} className="absolute left-1/2 top-1/2 -ml-3 -mt-3 animate-spin opacity-0" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
