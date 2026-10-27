import { Button } from '../ui.jsx'
import { mobileBtn } from '../marketing/Blocks.jsx'
import { Check } from '../marketing/primitives.jsx'
import BillingToggle, { Crossfade } from './BillingToggle.jsx'
import { HERO, PLANS } from './data.js'

/**
 * Price digits roll (P6): stacked old/new spans in an inline-grid with overflow hidden. Incoming
 * 100% -> 0 with opacity 0 -> 1, outgoing 0 -> -100% with opacity 1 -> 0, 500ms ease-out.
 */
function RollingDigits({ monthly, annualValue, annual }) {
  const base = 'col-start-1 row-start-1 transition duration-500 ease-out'
  return (
    <span className="inline-grid overflow-y-hidden">
      <span aria-hidden={annual} className={`${base} ${annual ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
        {monthly}
      </span>
      <span aria-hidden={!annual} className={`${base} ${annual ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        {annualValue}
      </span>
    </span>
  )
}

function PlanCard({ plan, annual }) {
  const featured = plan.featured
  return (
    <div
      className={`flex flex-col justify-between rounded-20 border border-solid px-[23px] pb-[23px] pt-[21px] ${
        featured ? 'border-blue-300 shadow-plan-card-featured' : 'border-white-500 shadow-plan-card'
      }`}
    >
      <div className="flex flex-col">
        <header className="text-xl text-black-300">{plan.name}</header>
        <div className="mt-4 lg:mt-8">
          <div className="flex items-start gap-2">
            <div className="inline-block overflow-y-hidden text-heading-md text-black-100">
              <div className="inline-flex">
                {plan.price ? (
                  <>
                    <span>$</span>
                    <RollingDigits monthly={plan.price[0]} annualValue={plan.price[1]} annual={annual} />
                  </>
                ) : (
                  <span>{plan.custom}</span>
                )}
              </div>
            </div>
            {plan.save && (
              <div
                data-motion="save-badge"
                className={`mt-1.5 rounded-8 border border-solid border-blue-200 bg-blue-100 px-[7px] py-[3px] text-center text-xs text-blue-450 [transition:opacity_300ms_150ms_cubic-bezier(0,0,0,1),transform_500ms_100ms_cubic-bezier(0,0,0,1)] ${
                  annual ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                }`}
              >
                {plan.save}
              </div>
            )}
          </div>
          <div className="mt-0.5 text-xs text-black-700">
            {plan.price ? (
              <span>
                {plan.caption}
                <Crossfade a="monthly" b="annually" showB={annual} />
              </span>
            ) : (
              <span>{plan.customCaption}</span>
            )}
          </div>
        </div>
        <div className="mt-5 text-pretty text-sm font-semibold text-black-300 lg:mt-8">{plan.desc}</div>
        <ul className="mt-2.5 flex flex-col gap-y-2.5">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <span className="mt-px size-[18px] shrink-0 rounded-6 bg-white-300 p-0.5 text-black-700">
                <Check />
              </span>
              <span className="text-pretty text-sm text-black-600">{f}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5 flex flex-col items-stretch lg:mt-8">
        <Button variant={featured ? 'primary' : 'outline'} className={mobileBtn}>
          {plan.cta}
        </Button>
      </div>
    </div>
  )
}

/** "+" corner mark: 7x7, two 1px bars #d3d8df, fade-in 1s delay 1s (P4). */
function Corner({ className }) {
  return (
    <div data-motion="pricing-corner" aria-hidden="true" className={`absolute size-[7px] ${className}`}>
      <div className="absolute left-0 top-[3px] h-px w-full rounded-full bg-white-700" />
      <div className="absolute left-[3px] top-0 h-full w-px rounded-full bg-white-700" />
    </div>
  )
}

export default function PricingHero({ annual, setAnnual }) {
  // P3 sweep delays: horizontal top 0 / bottom .45s; verticals 0 / .15 / .3 / .45 / .6s.
  const vDelays = ['0s', '0.15s', '0.3s', '0.45s']
  return (
    <div className="container" data-section="pricing-hero">
      <div className="flex flex-col items-center pt-[116px]">
        <h1 className="text-center text-page-hero-sm lg:text-page-hero">{HERO.title}</h1>
        <p className="mt-4 max-w-md text-balance text-center text-xl text-black-300">{HERO.lead}</p>
        <BillingToggle annual={annual} onChange={setAnnual} className="mt-8" />
      </div>
      <div className="relative mt-10 grid grid-cols-12 gap-x-6 lg:mt-20">
        <div aria-hidden="true" className="pricing-line pointer-events-none absolute -top-3 left-0 hidden h-px w-full bg-pricing-line-h lg:block" style={{ '--line-delay': '0s' }} />
        <div aria-hidden="true" className="pricing-line pointer-events-none absolute -bottom-3 left-0 hidden h-px w-full translate-y-full bg-pricing-line-h lg:block" style={{ '--line-delay': '0.45s' }} />
        <div className="relative isolate col-span-12 grid grid-cols-1 gap-6 lg:col-[2/-2] lg:grid-cols-4">
          {vDelays.map((d, i) => (
            <div
              key={i}
              aria-hidden="true"
              className="pricing-line-v pointer-events-none absolute top-[-50px] hidden h-[calc(100%+100px)] w-px bg-pricing-line-v lg:block"
              style={{ '--line-delay': d, left: `calc(${i} * ((100% - 72px) / 4 + 24px) - 12px)` }}
            />
          ))}
          <div aria-hidden="true" className="pricing-line-v pointer-events-none absolute top-[-50px] hidden h-[calc(100%+100px)] w-px bg-pricing-line-v lg:block" style={{ '--line-delay': '0.6s', left: 'calc(100% + 11px)' }} />
          {PLANS.map((p) => (
            <PlanCard key={p.name} plan={p} annual={annual} />
          ))}
          <Corner className="left-[-15px] top-[-15px] hidden lg:block" />
          <Corner className="left-[calc(100%+9px)] top-[-15px] hidden lg:block" />
          <Corner className="left-[-15px] top-[calc(100%+9px)] hidden lg:block" />
          <Corner className="left-[calc(100%+9px)] top-[calc(100%+9px)] hidden lg:block" />
        </div>
      </div>
    </div>
  )
}
