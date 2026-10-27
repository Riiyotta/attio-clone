import { Fragment, useState } from 'react'
import { Icon } from '../mock.jsx'
import { Arrow, DashedV, GuideRow, Hatch, HoverWash, SectionHead } from '../marketing/primitives.jsx'

// T2-d.3 step list (also T2-f.4 with 4 steps). Hatch + bordered white panel (col 2/-2); each
// step a 20-col grid row, 120 tall, py 20: "0N" overline + 1px connector, title 18/24 600 as
// per-character inline-flex spans, "//" overline at col 11, description 14/20 #6f7988 at col 13
// (max-w 320) with an inline underlined link. Footer link row 63 (border-t, HoverWash).
// The per-character typewriter and connector fill were not measured (spec §6.2): static here.

function Title({ text }) {
  return (
    <h3 className="text-lg font-semibold text-black-100">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split('').map((ch, i) => (
          <span key={i} data-motion="step-char" className="inline-flex whitespace-pre">
            {ch}
          </span>
        ))}
      </span>
    </h3>
  )
}

export function Steps({ steps, footer }) {
  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute inset-x-0 -top-5 grid h-[150px] grid-cols-12 max-lg:hidden">
        <div className="col-[2/-2] flex justify-between">
          <DashedV />
          <DashedV />
        </div>
      </div>
      <div className="relative grid grid-cols-12">
        <Hatch className="absolute inset-0 size-full max-lg:hidden" />
        <div className="relative col-span-full flex flex-col border border-solid border-white-500 bg-white-100 lg:col-[2/-2]">
          <div className="relative grid auto-rows-fr">
            {steps.map(([title, desc, link], i) => (
              <div key={title} className="relative grid h-full grid-cols-12 gap-y-2 py-5 max-lg:grid-rows-[auto_1fr] lg:grid-cols-[repeat(20,minmax(0,1fr))] lg:min-h-[120px]">
                <div className="relative col-[2/3] row-span-2 flex flex-col items-start lg:row-span-1">
                  <span className="text-overline uppercase text-black-100">{String(i + 1).padStart(2, '0')}</span>
                  {i < steps.length - 1 && <span aria-hidden="true" data-motion="step-connector" className="ml-2 mt-2 w-px flex-1 origin-top bg-white-500" />}
                </div>
                <div className="col-[3/-2] lg:col-[3/11]">
                  <Title text={title} />
                </div>
                <p className="col-[11/12] text-center text-overline leading-5 text-black-900 max-lg:hidden">//</p>
                <p className="col-[3/-2] max-w-[320px] text-pretty text-sm text-black-700 lg:col-[13/-2]">
                  {desc.split('{link}').map((part, k, arr) => (
                    <Fragment key={k}>
                      {part}
                      {k < arr.length - 1 && (
                        <a href="#" className="-mx-px rounded-2 px-px underline transition-colors duration-[400ms] hover:text-black-300 hover:duration-150">
                          {link}
                        </a>
                      )}
                    </Fragment>
                  ))}
                </p>
              </div>
            ))}
          </div>
          {footer && (
            <a href="#" className="group relative grid cursor-pointer grid-cols-12 items-baseline border-t border-solid border-white-500 py-5 lg:grid-cols-[repeat(20,minmax(0,1fr))]">
              <HoverWash />
              <div className="relative col-[2/-2] flex items-center gap-2 mix-blend-multiply">
                <span className="text-base text-black-600">{footer}</span>
                <Arrow className="arrow-shift text-black-600" />
              </div>
            </a>
          )}
        </div>
      </div>
      <GuideRow />
    </div>
  )
}

/** Segmented tab (217x36 track #f3f4f6 r12 p2; tabs 105.6x32 r10 16px icon + 14/20). */
export function SegmentedTabs({ tabs, active, onChange }) {
  return (
    <div role="tablist" className="relative isolate grid w-fit grid-cols-2 gap-0.5 rounded-12 bg-white-300 p-0.5">
      {tabs.map(([label, icon], i) => {
        const on = i === active
        return (
          <button
            key={label}
            role="tab"
            type="button"
            aria-selected={on}
            onClick={() => onChange(i)}
            className={`relative inline-flex h-8 w-[105.6px] cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-10 border border-solid border-transparent px-2.5 text-sm transition-colors duration-300 ease-in-out ${
              on ? 'text-black-100' : 'text-black-700 hover:text-black-300'
            }`}
          >
            {on && <span aria-hidden="true" data-motion="segment-pill" className="absolute inset-0 z-0 rounded-10 bg-white-100 shadow-segment-pill" />}
            <span className="relative z-[1] flex items-center gap-1.5">
              <Icon name={icon} size={16} />
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

/** T2-d.3 StartBuilding: SectionHead + tabs (default = 2nd) + 5 steps + footer link. */
export function StartBuilding({ head, tabs, stepSets, footer }) {
  const [tab, setTab] = useState(1)
  return (
    <section className="container">
      <div className="relative border-x border-solid border-white-500">
        <SectionHead lead={head[0]} cont={head[1]} />
        <div className="grid grid-cols-12">
          <div className="col-[2/-2]">
            <SegmentedTabs tabs={tabs} active={tab} onChange={setTab} />
          </div>
        </div>
        <div className="mt-10" role="tabpanel">
          <Steps key={tab} steps={stepSets[tab]} footer={footer} />
        </div>
      </div>
    </section>
  )
}
