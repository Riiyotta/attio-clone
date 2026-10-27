import { useEffect, useRef, useState } from 'react'
import { assets } from '../assets.js'
import { Eyebrow, SmallLinkButton } from './ui.jsx'
import { STORY_LOGOS } from './logos.jsx'
import StoryArt from './StoryArt.jsx'

// Section 8. Placeholder copy matched to spec counts.
const EYEBROW = 'Customer results' // c16
const LEAD = 'Picked by 25,000+ businesses.' // c29 w4
const CONT = 'From first hire to global operations.' // c37 w6
const CTA = 'Read more' // c9

// Tab logo boxes measured at 1440 (98x21, 107x25, 112x25, 121x15).
const LOGO_BOXES = [
  [98, 21],
  [107, 25],
  [112, 25],
  [121, 15],
]
// < md compact marks measured at 390 (20x20, 18x18, 35x18, 29x20).
const MARK_BOXES = [
  [20, 20],
  [18, 18],
  [35, 18],
  [29, 20],
]

const STORIES = [
  { overline: 'Health tech', lead: '2x faster deal reviews.', cont: 'How a clinic network turned usage into steady new growth.' },
  { overline: 'Retail apps', lead: '3x more qualified leads.', cont: 'How a storefront builder found its top buyers far sooner.' },
  { overline: 'Cloud infra', lead: '40% shorter sales cycle.', cont: 'How a hosting startup kept each handoff in one tidy place.' },
  { overline: 'Hospitality', lead: '5x larger team adoption.', cont: 'How a booking service gave every region one shared plan.' },
] // overline c11, lead c23 w4, continuation c56 w9

/**
 * M7 (sampled on the live site): each story runs 6000ms; the active tab's #fafafb fill grows
 * scaleX 0->1 linearly, then the next story opens (wraps 4 -> 1). Keeps cycling offscreen.
 * On switch (framer WAAPI, all cubic-bezier(.33,1,.68,1)):
 *   old fill: opacity 1->0, 300ms          old text: opacity 1->0 + blur 0->1.5px, 300ms
 *   new text: opacity 0->1, blur 1.5px->0, translateX 12px->0, 500ms
 *   old image: opacity 1->0 + blur 0->1px, 300ms
 *   new image: opacity 0->1, blur 1px->0, translateX(5px) scale(1.015) -> none, 500ms, delay 50ms
 * Clicking a tab selects it and restarts the 6s progress.
 */
const STORY_MS = 6000
const STORY_EXIT_MS = 300

function StoryText({ story, phase }) {
  return (
    <div data-motion="story-text" data-phase={phase} className="relative col-start-1 row-start-1 flex flex-col gap-3" aria-hidden={phase === 'exit' || undefined}>
      <p className="font-display text-overline uppercase tabular-nums text-black-700">{story.overline}</p>
      <p className="max-w-[16em] text-balance font-display text-story-sm lg:text-story">
        <span className="block text-black-100">{story.lead}</span>
        <span className="block text-black-700">{story.cont}</span>
      </p>
    </div>
  )
}

function StoryImage({ index, phase }) {
  const img = assets.storyImages[index]
  return (
    <div data-motion="story-image-layer" data-phase={phase} className="absolute inset-0" aria-hidden={phase === 'exit' || undefined}>
      {img.src ? (
        <img data-motion="story-image" src={img.src} alt={phase === 'exit' ? '' : img.alt} className="story-image absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div data-motion="story-image" role="img" aria-label={img.alt} className="story-image absolute inset-0">
          <StoryArt variant={index} />
        </div>
      )}
    </div>
  )
}

export default function CustomerStories() {
  const [{ active, prev, prevFill, n }, setState] = useState({ active: 0, prev: null, prevFill: 0, n: 0 })
  const fillRef = useRef(null)
  const story = STORIES[active]
  const go = (i) => {
    const fill = fillRef.current ? parseFloat((fillRef.current.style.transform.match(/scaleX\(([\d.]+)/) || [])[1] || 0) : 0
    setState((st) => ({ active: i, prev: i === st.active ? null : st.active, prevFill: fill, n: st.n + 1 }))
  }
  // 6s linear progress, then advance
  useEffect(() => {
    let raf = 0
    let start = 0
    const tick = (now) => {
      if (!start) start = now
      const p = Math.min((now - start) / STORY_MS, 1)
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${p.toFixed(5)})`
      if (p >= 1) {
        go((active + 1) % STORIES.length)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, n])
  // drop the exiting layers once their 300ms exit has played
  useEffect(() => {
    if (prev === null) return
    const t = setTimeout(() => setState((st) => (st.n === n ? { ...st, prev: null } : st)), STORY_EXIT_MS)
    return () => clearTimeout(t)
  }, [prev, n])
  const phase = n > 0 ? 'enter' : undefined

  return (
    <section className="border-t border-solid border-white-500 bg-white-100" data-section="customer-stories">
      <div className="lg-container">
        <div className="flex flex-col border-solid border-white-500 lg:border-x">
          {/* Header (425 tall at lg incl. border) */}
          <div className="border-b border-solid border-white-500 px-[calc(100%/12)] pb-16 pt-[88px] lg:px-[calc(100%/24)] lg:pb-20 lg:pt-[152px]">
            <div className="flex flex-col items-start gap-6">
              <Eyebrow>{EYEBROW}</Eyebrow>
              <h2 className="font-display text-section-sm lg:text-section">
                <span className="block text-black-100">{LEAD}</span>
                <span className="block text-black-700">{CONT}</span>
              </h2>
              <SmallLinkButton>{CTA}</SmallLinkButton>
            </div>
          </div>

          <span className="sr-only" aria-live="polite">
            {`Showing story ${active + 1} of ${STORIES.length}: ${story.lead} ${story.cont}`}
          </span>

          {/* Tab strip: 4 cols, 1px gaps over the stroke colour */}
          <div role="tablist" aria-label="Customer stories" className="grid grid-cols-4 gap-px border-b border-solid border-white-500 bg-white-500">
            {LOGO_BOXES.map(([w, h], i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={STORY_LOGOS[i].name}
                onClick={() => go(i)}
                className="relative flex h-14 items-center justify-center bg-white-100 transition-colors duration-200 ease-out hover:bg-white-300 md:h-[60px] lg:h-20 [--logo-scale:0.75] lg:[--logo-scale:1]"
              >
                {/* M7 progress fill: static start state scaleX(0) on the active tab */}
                {i === active && (
                  <span ref={fillRef} key={`fill-${n}`} data-motion="story-tab-progress" aria-hidden="true" className="absolute inset-0 origin-left scale-x-0 bg-white-200" />
                )}
                {i === prev && (
                  <span
                    key={`exit-${n}`}
                    data-motion="story-tab-progress"
                    data-phase="exit"
                    aria-hidden="true"
                    className="absolute inset-0 origin-left bg-white-200"
                    style={{ transform: `scaleX(${prevFill})` }}
                  />
                )}
                {/* >= md: invented wordmark; < md: compact mark (boxes measured, see LOGO_BOXES / MARK_BOXES) */}
                {(() => {
                  const { Wordmark, Mark } = STORY_LOGOS[i]
                  return (
                    <>
                      <span
                        aria-hidden="true"
                        className="relative hidden max-w-full text-black-300 md:block"
                        style={{ width: `calc(${w}px * var(--logo-scale))`, height: `calc(${h}px * var(--logo-scale))` }}
                      >
                        <span className="block origin-top-left scale-75 lg:scale-100" style={{ width: w, height: h }}>
                          <Wordmark w={w} h={h} />
                        </span>
                      </span>
                      <span aria-hidden="true" className="relative block text-black-300 md:hidden" style={{ width: MARK_BOXES[i][0], height: MARK_BOXES[i][1] }}>
                        <Mark w={MARK_BOXES[i][0]} h={MARK_BOXES[i][1]} />
                      </span>
                    </>
                  )
                })()}
              </button>
            ))}
          </div>

          {/* Story card */}
          <a href="#" className="group grid grid-cols-1 border-b border-solid border-white-500 lg:h-[430px] lg:grid-cols-2">
            <div className="relative flex flex-col justify-end bg-white-100 px-[calc(100%/12)] py-6 max-lg:order-2 lg:border-r lg:border-solid lg:border-white-500 lg:py-8 lg:pl-[calc(100%/12)] lg:pr-8">
              <div aria-hidden="true" className="absolute inset-0 bg-white-200 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
              <div className="relative grid">
                {prev !== null && <StoryText key={`t-exit-${n}`} story={STORIES[prev]} phase="exit" />}
                <StoryText key={`t-${n}`} story={story} phase={phase} />
              </div>
            </div>
            <div className="relative aspect-[696/429] overflow-hidden bg-white-300 max-lg:order-1 lg:aspect-auto lg:h-full">
              {prev !== null && <StoryImage key={`i-exit-${n}`} index={prev} phase="exit" />}
              <StoryImage key={`i-${n}`} index={active} phase={phase} />
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
