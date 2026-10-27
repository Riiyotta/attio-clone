import { useState } from 'react'
import { Button } from '../ui.jsx'
import { Tooltip } from '../marketing/Blocks.jsx'
import { Check } from '../marketing/primitives.jsx'
import BillingToggle, { Crossfade } from './BillingToggle.jsx'
import { GROUPS, PLANS, TABLE } from './data.js'

// T1.3 ComparisonTable. >= lg: inner 1116 (x162), grid 220px repeat(4,1fr) gap 24; sticky plan
// header (top: header height, z2, pt 40, 199 tall); 8 sticky group titles (top: header + 197px);
// feature rows 57, sub-rows 45; featured column cells bg #fafafb. < lg: stacked collapsibles.

const COLS = 'grid grid-cols-[220px_1fr_1fr_1fr_1fr] gap-x-6'
const FEATURED = PLANS.findIndex((p) => p.featured)

/** Boolean cell glyphs. Not measured on the live site (icons were not captured): a 14px check
 *  in #505967 for "included", a short #cad0d9 dash for "not included". */
function Bool({ on }) {
  return on ? (
    <span className="flex h-5 items-center text-black-600" aria-label="Included">
      <Check />
    </span>
  ) : (
    <span className="flex h-5 items-center" aria-label="Not included">
      <span className="h-px w-2.5 rounded-full bg-white-800" />
    </span>
  )
}

function Value({ v, annual, dark = false }) {
  if (v === null || v === undefined) return null
  if (v === true || v === false) return <Bool on={v} />
  if (Array.isArray(v)) return <Crossfade a={v[0]} b={v[1]} showB={annual} />
  if (typeof v === 'object') return <Tooltip text={v.tip} />
  return <div className={`relative px-2 text-center text-sm ${dark ? 'text-black-300' : 'text-black-600'}`}>{v}</div>
}

function PlanHead({ plan, annual }) {
  return (
    <div>
      <div className="flex items-center gap-x-2">
        <h3 className="text-2xl text-black-300">{plan.name}</h3>
        {plan.featured && <div className="rounded-8 border border-solid border-blue-200 bg-blue-100 px-2 py-1 text-center text-xs text-blue-450">Popular</div>}
      </div>
      <div className="mt-2">
        {plan.price ? (
          <>
            <p className="text-xs text-black-700">
              <span>
                $<Crossfade a={plan.price[0]} b={plan.price[1]} showB={annual} />
              </span>{' '}
              per seat/month,
            </p>
            <p className="text-xs text-black-700">
              paid <Crossfade a="monthly" b="annually" showB={annual} />
            </p>
          </>
        ) : (
          <>
            <p className="text-xs text-black-700">Custom pricing,</p>
            <p className="text-xs text-black-700">agreed by contract</p>
          </>
        )}
      </div>
      <div className="mt-4 flex flex-col items-stretch">
        <Button variant={plan.featured ? 'primary' : 'outline'}>{plan.cta}</Button>
      </div>
    </div>
  )
}

function DesktopTable({ annual, setAnnual }) {
  return (
    <div className="mx-auto max-w-[1116px] max-lg:hidden" data-motion="comparison-desktop">
      <div className={`${COLS} sticky top-[var(--site-header-height)] z-[2] bg-white-100 pb-[33px] pt-10`}>
        <div className="-mb-0.5 flex flex-col justify-end gap-y-4">
          <p className="text-xs text-black-700">
            {TABLE.caption[0]} <br />
            {TABLE.caption[1]}
          </p>
          <BillingToggle annual={annual} onChange={setAnnual} compact />
        </div>
        {PLANS.map((p) => (
          <PlanHead key={p.name} plan={p} annual={annual} />
        ))}
      </div>
      <div className="mt-10 flex flex-col gap-y-[60px]">
        {GROUPS.map((g) => (
          <div key={g.title}>
            <h2 className="sticky top-[calc(var(--site-header-height)+197px)] z-[1] border-b border-solid border-white-500 bg-white-100 py-4 text-lg text-black-300">{g.title}</h2>
            {g.rows.map((r) => (
              <div key={r.label}>
                <div className={`${COLS} border-b border-solid border-white-500`}>
                  <div className="flex items-start justify-between gap-x-3 py-[18px]">
                    <div className="flex items-start gap-x-1 text-sm">
                      <span className="text-sm text-black-600">{r.label}</span>
                    </div>
                    {r.tip && <Tooltip text={r.tip} />}
                  </div>
                  {r.values.map((v, i) => (
                    <div key={i} className={`flex items-start justify-center gap-x-1.5 py-[18px] ${i === FEATURED ? 'bg-white-200' : ''}`}>
                      <Value v={v} annual={annual} />
                    </div>
                  ))}
                </div>
                {r.subs?.map((s) => (
                  <div key={s.label} className={`${COLS} border-b border-solid border-white-400`}>
                    <div className="py-3 pl-4 text-xs">
                      <span className="text-xs text-black-700">{s.label}</span>
                    </div>
                    {(s.prices ?? s.values).map((v, i) => (
                      <div key={i} className={`flex items-start justify-center py-3 ${i === FEATURED ? 'bg-white-200' : ''}`}>
                        {s.prices ? v && <span className="text-sm text-black-300"><Crossfade a={v[0]} b={v[1]} showB={annual} /></span> : <Value v={v} annual={annual} />}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function ChevronBtn({ open }) {
  return (
    <svg width="18" height="20" viewBox="0 0 18 20" aria-hidden="true" className={`shrink-0 text-black-700 transition-transform duration-300 ease-in-out-cubic ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.5 8.5 9 12l3.5-3.5" />
    </svg>
  )
}

/** < lg collapsible feature (open by default). */
function MobileItem({ label, cells, annual }) {
  const [open, setOpen] = useState(true)
  return (
    <div>
      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between border-b border-solid border-white-500 py-4 text-left text-sm">
        <span className="text-sm text-black-600">{label}</span>
        <ChevronBtn open={open} />
      </button>
      <div data-motion="faq-panel" data-open={open || undefined} inert={open ? undefined : ''}>
        <div>
          {PLANS.map((p, i) => (
            <div key={p.name} className="grid grid-cols-2 items-start border-b border-solid border-white-400 py-2.5 text-sm text-black-600">
              <span className="text-black-700">{p.name}</span>
              <span className="flex [&>div]:px-0 [&>div]:text-left">
                {Array.isArray(cells[i]) ? (
                  <span className="text-black-300">
                    <Crossfade a={cells[i][0]} b={cells[i][1]} showB={annual} />
                  </span>
                ) : cells[i] === null || cells[i] === undefined ? null : typeof cells[i] === 'object' && cells[i] !== true && cells[i] !== false ? (
                  <span>{cells[i].tip}</span>
                ) : (
                  <Value v={cells[i]} annual={annual} />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MobileTable({ annual, setAnnual }) {
  return (
    <div className="pt-12 lg:hidden">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-heading-md font-bold text-black-100">{TABLE.mobileTitle}</h2>
        <p className="mt-2 text-base text-black-300">{TABLE.mobileLead}</p>
        <BillingToggle annual={annual} onChange={setAnnual} className="mt-5" />
      </div>
      <div className="mt-10 flex flex-col gap-y-10">
        {GROUPS.map((g) => (
          <div key={g.title}>
            <h3 className="border-b border-solid border-white-500 py-4 text-lg text-black-300">{g.title}</h3>
            {g.rows.map((r) => (
              <MobileItem key={r.label} label={r.label} cells={r.values} annual={annual} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ComparisonTable({ annual, setAnnual }) {
  return (
    <div className="container lg:pt-11" data-section="comparison-table">
      <DesktopTable annual={annual} setAnnual={setAnnual} />
      <MobileTable annual={annual} setAnnual={setAnnual} />
    </div>
  )
}
