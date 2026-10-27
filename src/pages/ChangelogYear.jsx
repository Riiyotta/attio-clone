import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import PageShell from '../components/marketing/PageShell.jsx'
import { Arrow, DashedV, Hairline, HoverWash } from '../components/marketing/primitives.jsx'
import { SubscribeForm } from '../components/forms/Fields.jsx'
import { CURRENT_YEAR, YEARS, entriesFor } from '../data/changelog.js'

// Ruler behind the year strip: 1200 vertical 1px lines (#e4e7ec, 48 tall) across -92..1532,
// offsets compressing logarithmically from the left edge (10, 30, 48, 66, 82, 98, 113, ...).
// x_i = 10 + 400 * ln(1 + 0.05 i) reproduces the measured sequence. Static.
const RULER_D = Array.from({ length: 1200 }, (_, i) => `M${(10 + 400 * Math.log(1 + 0.05 * i)).toFixed(2)} 0v48`).join('')

function YearTimeline({ year }) {
  return (
    <div className="relative h-[80px] w-[864px]">
      <svg aria-hidden="true" width="1624" height="48" viewBox="0 0 1624 48" className="absolute bottom-0 left-1/2 -translate-x-1/2 text-white-500">
        <path d={RULER_D} stroke="currentColor" strokeWidth="1" shapeRendering="crispEdges" />
      </svg>
      <div className="absolute inset-0 flex">
        {YEARS.map((y) => (
          <div key={y} className="relative h-20 w-36">
            <span aria-hidden="true" className={`absolute bottom-12 left-1/2 -translate-x-1/2 -translate-y-3.5 whitespace-nowrap text-overline uppercase ${y === year ? 'text-black-100' : 'text-black-900'}`}>
              {y}
            </span>
            <Link to={`/changelog/${y}`} aria-label={`Changelog ${y}`} aria-current={y === year ? 'page' : undefined} className="absolute inset-0" />
          </div>
        ))}
      </div>
    </div>
  )
}

function TagGlyph({ tag }) {
  const tone = { 'New feature': 'bg-blue-400', Improvement: 'bg-traffic-green', Mobile: 'bg-white-800', Desktop: 'bg-white-800' }[tag]
  return <span aria-hidden="true" className={`block size-1.5 shrink-0 rounded-2 ${tone}`} />
}

// T7: ChangelogHero(subscribe) -> YearTimeline(6) -> EntriesList(55) -> Spacer.
export default function ChangelogYear() {
  const { year: y } = useParams()
  const year = Number(y)
  const entries = useMemo(() => (YEARS.includes(year) ? entriesFor(year) : []), [year])
  if (!YEARS.includes(year)) return <Navigate to={`/changelog/${CURRENT_YEAR}`} replace />
  return (
    <PageShell title={`Changelog ${year}`}>
      <section className="lg:container">
        <div className="relative overflow-hidden border-solid border-white-500 lg:border-x">
          <div className="grid grid-cols-12">
            <nav aria-label="Breadcrumb" className="col-[2/-2] flex h-28 items-end justify-between pb-5">
              <p className="text-overline uppercase text-black-900">
                <Link to="/changelog" className="whitespace-nowrap text-black-700 transition-colors duration-[400ms] ease-in-out hover:text-black-300">
                  Changelog
                </Link>
                <span className="px-2">/</span>
                {year}
              </p>
              <p className="text-overline uppercase text-black-900">{entries.length} updates</p>
            </nav>
          </div>
          <Hairline />
          <div className="grid grid-cols-12">
            <header className="col-[2/-2] flex w-full flex-col items-center pb-10 pt-20 text-black-100">
              <h1 className="max-w-[15em] text-balance text-center text-page-hero-sm lg:text-page-hero">Ship notes</h1>
              <p className="mt-4 max-w-xl text-balance text-center text-lg text-black-300 lg:text-xl">New features, fixes and polish shipped weekly.</p>
              <SubscribeForm placeholder="Work email address" buttonLabel="Subscribe" className="mt-6 min-h-16 w-full max-w-sm content-start" />
            </header>
          </div>
          <div className="relative h-[184px]">
            <div className="absolute left-1/2 top-2 -translate-x-1/2">
              <YearTimeline year={year} />
            </div>
          </div>
        </div>
      </section>
      <div className="lg:container">
        <div className="border-solid border-white-500 lg:border-x">
          <Hairline />
          <div className="grid grid-cols-12 content-start gap-px bg-white-500 pb-20 [&>*]:bg-white-100">
            {entries.map((e) => (
              <a key={e.id} href="#" className="group relative col-span-full grid grid-cols-12 items-baseline gap-y-2 py-5 lg:h-[108px] lg:gap-y-0 lg:py-6">
                <HoverWash />
                <time className="relative col-[2/-2] text-overline uppercase tabular-nums text-black-900 lg:col-[2/4] lg:row-start-1">{e.date}</time>
                <h2 className="relative col-[2/-2] line-clamp-1 text-pretty text-base font-semibold leading-[22px] text-black-300 transition-colors duration-150 group-hover:text-black-100 lg:col-[4/-5] lg:row-start-1 lg:leading-5">{e.title}</h2>
                <p className="relative col-[2/-2] line-clamp-2 max-w-[28em] text-pretty text-sm text-black-700 lg:col-[4/-5] lg:row-start-2">{e.excerpt}</p>
                <div className="relative col-[2/-2] flex flex-wrap items-center gap-x-3 gap-y-1 lg:col-[-5/-2] lg:row-[1/4] lg:flex-col lg:items-start lg:gap-0">
                  {e.tags.map((t) => (
                    <div key={t} className="flex items-center gap-x-1.5">
                      <TagGlyph tag={t} />
                      <span className="text-sm leading-5 text-black-900">{t}</span>
                    </div>
                  ))}
                </div>
                <Arrow className="arrow-shift absolute right-[calc(100%/12/2)] top-[30px] hidden text-black-900 group-hover:text-black-300 lg:block" />
              </a>
            ))}
          </div>
          <div className="grid h-[100px] w-full grid-cols-12 overflow-hidden lg:h-[120px] xl:h-40">
            <div className="col-[2/-2] flex justify-between">
              <DashedV />
              <DashedV />
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
