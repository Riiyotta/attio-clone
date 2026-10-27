import { useEffect, useRef } from 'react'
import { assets } from '../assets.js'
import { EASE_OUT_CUBIC, reducedMotion, revealOnView } from '../motion/index.js'
import SectionDivider from './SectionDivider.jsx'
import { Button, Eyebrow, Streaks } from './ui.jsx'
import { AvatarStack, Chip, CompanyGlyph, Icon, Initials, Meter, Sparkline, Tag, toneOf } from './mock.jsx'

// Section 5. Placeholder copy matched to spec counts.
const LEAD = 'Shape it your way.' // c18 w4
const CONT =
  ' Design objects, fields and views that match how your team works, then tune them in minutes whenever your process changes or expands.' // c132 w22; first word too wide to share line 1 at 390 (as live)

// Live action buttons (i = 0..n): ring blur 0 -> 2px -> 0 and content opacity 0 -> 1 inside one
// linear timeline of 810 + 50i ms; blur ramps over [450, 630] + 50i, unblurs to 738 + 50i;
// opacity fades over [510, 690] + 50i (segment easings ease-in-out / out-cubic, as sampled).
function playRecordButtons(root) {
  root.querySelectorAll('[data-hm-btn]').forEach((el) => {
    const i = +el.dataset.hmBtn
    const D = 810 + 50 * i
    const at = (ms) => (ms + 50 * i) / D
    el.animate(
      {
        filter: ['blur(0px)', 'blur(0px)', 'blur(2px)', 'blur(2px)', 'blur(0px)', 'blur(0px)'],
        offset: [0, at(450), at(630), at(630), at(738), 1],
        easing: ['ease-in-out', EASE_OUT_CUBIC, EASE_OUT_CUBIC, EASE_OUT_CUBIC, EASE_OUT_CUBIC],
      },
      { duration: D, easing: 'linear', fill: 'both' },
    )
    el.animate(
      { opacity: [0, 0, 1, 1], offset: [0, at(510), at(690), 1], easing: ['ease-in-out', EASE_OUT_CUBIC, EASE_OUT_CUBIC] },
      { duration: D, easing: 'linear', fill: 'both' },
    )
    el.setAttribute('data-hm-state', 'played')
  })
}

export default function SelfBuilding() {
  // Live trigger: the record frame ~16% visible (framer whileInView); items 600ms out-cubic with a
  // blur(1.5px) + blue glow -> clear filter, staggered as measured.
  const frameRef = useRef(null)
  useEffect(() => {
    const root = frameRef.current
    if (!root || reducedMotion()) return
    const btns = root.querySelectorAll('[data-hm-btn]')
    btns.forEach((el) => el.setAttribute('data-hm-state', 'pending'))
    const onPlay = () => playRecordButtons(root)
    root.addEventListener('hmplay', onPlay, { once: true })
    const stop = revealOnView(root, 0.16)
    return () => {
      stop()
      root.removeEventListener('hmplay', onPlay)
      btns.forEach((el) => el.removeAttribute('data-hm-state'))
    }
  }, [])
  return (
    <section className="overflow-hidden bg-white-200" data-section="self-building">
      {/* Row 1: 128px spacer */}
      <div className="lg-container">
        <div className="h-32 border-solid border-white-500 lg:border-x" />
      </div>

      <SectionDivider />

      {/* Row 2: heading block + tick band (504 tall at lg) */}
      <div className="lg-container">
        <div className="flex flex-col border-solid border-white-500 lg:border-x">
          <div className="flex flex-col items-start gap-6 px-[calc(100%/12)] pt-[88px] lg:items-center lg:px-[calc(100%/24)] lg:pt-[152px]">
            <div className="flex max-w-[926px] flex-col items-start gap-6 lg:items-center">
              <Eyebrow>Customization</Eyebrow>
              <h2 className="font-display text-section-sm lg:text-center lg:text-section">
                <span className="text-black-100">{LEAD}</span>
                <span className="text-black-700">{CONT}</span>
              </h2>
            </div>
            <Button variant="outline">Try the editor</Button>
          </div>
          {/* Vertical tick "barcode" band fading upward (1390x112 at lg, 72 tall at 390) */}
          <div data-motion="self-building-ticks" aria-hidden="true" className="tick-band relative h-[72px] w-full md:h-28">
            {/* Live: 5 streaks (1x360, transparent -> #a4adba -> transparent) at opacity 0, x0. They never
                animate on the live homepage (sampled 15s fully in view), so they stay idle here. */}
            <Streaks xs={[[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]]} variant="scale" animate={false} />
          </div>
        </div>
      </div>

      {/* Row 3: record card frame, clipped by the section bottom (464 tall incl. top hairline) */}
      <div className="lg-container">
        <div className="relative h-[464px] overflow-hidden border-t border-solid border-white-500 lg:border-x">
          <div
            ref={frameRef}
            data-motion="self-building-card"
            className="absolute left-0 top-0 h-[463px] w-[1157px] bg-frost px-1 pt-[3px] backdrop-blur-[4px] lg:left-[calc(100%/12_+_1px)] lg:w-[calc(100%*5/6_-_1px)]"
          >
            <div className="h-[460px] overflow-hidden rounded-t-13 border border-b-0 border-solid border-white-500 bg-white-100 shadow-attio-5">
              {assets.selfBuildingRecord.src ? (
                <img
                  src={assets.selfBuildingRecord.src}
                  alt={assets.selfBuildingRecord.alt}
                  className="h-full w-full object-cover object-left-top"
                />
              ) : (
                <RecordMock />
              )}
            </div>
          </div>
          {/* Frame edge hairlines (1px SVGs at the frame's left/right edges, >= lg) */}
          <span aria-hidden="true" className="absolute inset-y-0 hidden w-px bg-white-500 lg:left-[calc(100%/12_+_1px)] lg:block" />
          <span aria-hidden="true" className="absolute inset-y-0 hidden w-px bg-white-500 lg:left-[calc(100%/12_+_100%*5/6_-_1px)] lg:block" />
        </div>
      </div>
    </section>
  )
}

/* Original record-detail mock (fictional CRM): 319px / 827px grid, 1px gap; avatar circle 38;
   highlights grid 236/236/292 gap 7. Invented company and people. */
const RECORD_FIELDS = [
  ['globe', 'Domain', <span className="text-blue-600">pinecrest.health</span>],
  ['users', 'Owner', <span className="flex items-center gap-1.5"><Initials name="Maya Chen" tone="blue" size={16} />Maya Chen</span>],
  ['flow', 'Stage', <Chip tone="teal">Negotiation</Chip>],
  ['coin', 'ARR', '$112,000'],
  ['building', 'Industry', <Tag>Healthcare</Tag>],
  ['pin', 'Location', 'Denver, CO'],
  ['tag', 'Segment', <Chip tone="iris" dot={false}>Mid-market</Chip>],
]

function RecordMock() {
  const card = 'rounded-12 border border-solid border-window-hairline bg-mock-surface px-3 py-2.5 flex flex-col justify-between'
  return (
    <div role="img" aria-label={assets.selfBuildingRecord.alt} className="grid h-full grid-cols-[319px_827px] gap-px bg-mock-stroke text-black-100">
      <div className="flex flex-col gap-px">
        <div className="flex h-[148px] flex-col justify-between bg-white-100 p-4">
          <div className="flex items-center gap-3">
            <span data-hm-item="" data-hm-glow="" data-hm-dur="600" data-hm-delay="180" className="flex shrink-0">
              <CompanyGlyph shape="peak" tone="green" size={38} radius="rounded-full" />
            </span>
            <div data-hm-item="" data-hm-glow="" data-hm-dur="600" data-hm-delay="220" className="flex flex-col">
              <span className="text-mock-lg font-semibold">Pinecrest Health</span>
              <span className="text-mock-base text-black-700">Outpatient clinic network</span>
            </div>
            <span data-hm-item="" data-hm-glow="" data-hm-dur="600" data-hm-delay="220" className="ml-auto flex">
              <Icon name="star" size={15} className="text-traffic-yellow" />
            </span>
          </div>
          <div className="flex items-center gap-[22px] pl-2.5 text-black-700">
            {['mail', 'phone', 'calendar', 'note', 'task'].map((ic, i) => (
              <span key={ic} data-hm-btn={i} className="flex">
                <Icon name={ic} size={15} />
              </span>
            ))}
            <span data-hm-btn={5} className="ml-auto flex h-7 items-center rounded-8 bg-black-200 px-2.5 text-mock-base text-white-200">Compose</span>
          </div>
        </div>
        <div className="flex-1 bg-white-100 px-4 pb-3.5 pt-1.5">
          <p data-hm-item="" data-hm-glow="" data-hm-dur="600" data-hm-delay="896" className="mb-1 text-mock-sm text-black-800">Details</p>
          <div className="flex flex-col">
            {RECORD_FIELDS.map(([ic, k, v], i) => (
              <div key={k} data-hm-item="" data-hm-glow="" data-hm-dur="600" data-hm-delay={936 + i * 40} className="flex h-[30px] origin-left items-center gap-3 text-mock-base">
                <Icon name={ic} size={13} className="text-black-800" />
                <span className="w-[72px] text-black-700">{k}</span>
                <span className="flex min-w-0 items-center">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white-100 px-6 pb-4 pt-6">
        <div data-hm-item="" data-hm-glow="" data-hm-dur="600" data-hm-delay="820" className="flex items-center gap-2">
          <Icon name="sparkle" size={14} className="text-blue-500" />
          <span className="text-mock-md font-medium">Highlights</span>
          <span className="ml-auto flex items-center gap-1 text-mock-sm text-black-800">
            <Icon name="plus" size={11} /> Add widget
          </span>
        </div>
        <div className="mt-[15px] grid grid-cols-[236px_236px_292px] gap-[7px]">
          <div data-hm-item="" data-hm-glow="" data-hm-dur="600" data-hm-delay="860" className={`${card} col-span-2 h-[99px]`}>
            <span className="flex items-center gap-1.5 text-mock-sm text-black-700">
              <Icon name="calendar" size={12} /> Next meeting
            </span>
            <div className="flex items-end justify-between">
              <div className="flex flex-col">
                <span className="text-mock-md font-medium">Contract review with Dr. Elena Ruiz</span>
                <span className="text-mock-sm text-black-700">Thursday · 10:00 – 10:45 · Video call</span>
              </div>
              <AvatarStack people={[['Elena Ruiz', 'green'], ['Maya Chen', 'blue'], ['Leo Brandt', 'red']]} size={22} />
            </div>
          </div>
          <div data-hm-item="" data-hm-glow="" data-hm-dur="600" data-hm-delay="900" className={`${card} relative h-[99px]`}>
            {/* live: the focused highlight card tints in (opacity 200ms cubic-bezier(0,0,0,1)) on reveal */}
            <span
              aria-hidden="true"
              data-hm-item=""
              data-hm-dur="200"
              data-hm-ease="cubic-bezier(0, 0, 0, 1)"
              className="pointer-events-none absolute inset-0 rounded-[11px]"
              style={{ background: 'linear-gradient(55deg, rgba(38,109,240,0.06) 0%, rgba(38,109,240,0.02) 35%)' }}
            />
            <span className="flex items-center gap-1.5 text-mock-sm text-black-700">
              <Icon name="coin" size={12} /> Open deal
            </span>
            <div className="flex items-end justify-between">
              <span className="text-mock-xl">$112,000</span>
              <Chip tone="teal">Negotiation</Chip>
            </div>
          </div>
          <div data-hm-item="" data-hm-glow="" data-hm-dur="600" data-hm-delay="940" className={`${card} h-[99px]`}>
            <span className="flex items-center gap-1.5 text-mock-sm text-black-700">
              <Icon name="heart" size={12} /> Health
            </span>
            <div className="flex items-end justify-between">
              <span className="text-mock-xl">86</span>
              <Sparkline values={[0.3, 0.35, 0.5, 0.45, 0.62, 0.7, 0.82]} width={84} height={26} className="text-traffic-green" />
            </div>
          </div>
          <div data-hm-item="" data-hm-glow="" data-hm-dur="600" data-hm-delay="980" className={`${card} h-[99px]`}>
            <span className="flex items-center gap-1.5 text-mock-sm text-black-700">
              <Icon name="mail" size={12} /> Last contacted
            </span>
            <div className="flex flex-col">
              <span className="text-mock-xl">2 days ago</span>
              <span className="text-mock-sm text-black-700">Email from Maya Chen</span>
            </div>
          </div>
          <div data-hm-item="" data-hm-glow="" data-hm-dur="600" data-hm-delay="1020" className={`${card} h-[99px]`}>
            <span className="flex items-center gap-1.5 text-mock-sm text-black-700">
              <Icon name="task" size={12} /> Open tasks
            </span>
            <div className="flex flex-col gap-1.5">
              <span className="flex items-baseline gap-1.5">
                <span className="text-mock-xl">3</span>
                <span className="text-mock-sm text-black-700">of 8 complete</span>
              </span>
              <Meter value={0.62} tone="blue" />
            </div>
          </div>
        </div>
        <div data-hm-item="" data-hm-glow="" data-hm-dur="600" data-hm-delay="1100" className="mt-[35px] flex items-center gap-2">
          <Icon name="clock" size={14} className="text-black-600" />
          <span className="text-mock-md font-medium">Activity</span>
        </div>
        <div className="mt-4 flex flex-col gap-3 rounded-12 border border-solid border-mock-stroke bg-white-100 p-3">
          {[
            ['mail', 'blue', 'Maya Chen', 'sent “Updated order form for review”', '2d'],
            ['phone', 'green', 'Leo Brandt', 'logged a 24 min call with Elena Ruiz', '4d'],
            ['flow', 'iris', 'Stage changed', 'from Proposal to Negotiation', '6d'],
          ].map(([ic, t, who, what, when], r) => (
            <div key={who} className="flex items-center gap-3 text-mock-base">
              <span data-hm-item="" data-hm-glow="" data-hm-dur="600" data-hm-delay={1140 + r * 20} className={`flex h-6 w-6 items-center justify-center rounded-full ${toneOf(t).soft}`}>
                <Icon name={ic} size={12} />
              </span>
              <span data-hm-item="" data-hm-glow="" data-hm-dur="600" data-hm-delay={1150 + r * 20}>
                <span className="font-medium">{who}</span> <span className="text-black-600">{what}</span>
              </span>
              <span data-hm-item="" data-hm-glow="" data-hm-dur="600" data-hm-delay={1160 + r * 20} className="ml-auto text-mock-sm text-black-800">{when} ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
