import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageShell from '../components/marketing/PageShell.jsx'
import { DashedV, Hairline } from '../components/marketing/primitives.jsx'
import { Button, ArrowUpRightIcon } from '../components/ui.jsx'
import { mobileBtn } from '../components/marketing/Blocks.jsx'
import AppIcon from '../components/apps/AppIcon.jsx'
import AppCard, { VerifiedBadge } from '../components/apps/AppCard.jsx'
import Gallery from '../components/apps/Gallery.jsx'
import { APPS, CATEGORIES, appBySlug, appDetail } from '../data/apps.js'

/** Diagonal stroke pattern (#d3d8df) used for the header's right decorative strip. */
function StripPattern() {
  return (
    <svg aria-hidden="true" className="absolute inset-y-0 right-0 hidden h-full w-[calc(100%/12)] text-white-700 lg:block">
      <defs>
        <pattern id="app-strip" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#app-strip)" />
    </svg>
  )
}

// T5: Breadcrumb -> AppHeader -> Body(sticky meta aside + Gallery + 3 overview sections) -> Related.
export default function AppDetail() {
  const { slug } = useParams()
  const app = appBySlug(slug) ?? APPS[3]
  const d = useMemo(() => appDetail(app), [app])
  const cat = CATEGORIES[app.category]
  const dev = app.by.replace(/^By /, '')
  return (
    <PageShell title={app.name}>
      <div className="container">
        <div className="relative border-x border-solid border-white-500">
          {/* 1. Breadcrumb bar (112 tall, items end, pb 20) */}
          <aside className="relative grid h-28 grid-cols-12 items-end pb-5">
            <p className="col-[2/-2] whitespace-nowrap text-overline uppercase text-black-900 lg:col-[2/9]">
              <Link to="/apps" className="transition-colors duration-300 hover:text-black-700">
                Apps
              </Link>
              <span className="px-2">/</span>
              <span className="text-black-800">{app.name}</span>
            </p>
            <p className="col-[-2] hidden justify-self-center whitespace-nowrap text-overline uppercase text-black-900 lg:block">
              {String(app.id + 1).padStart(2, '0')}/{APPS.length}
            </p>
            <div aria-hidden="true" className="absolute inset-y-0 left-[calc(100%*11/12)] hidden lg:block">
              <DashedV />
            </div>
          </aside>
          <Hairline />
          {/* 2. AppHeader (282 tall at 1440, padding 48 0) */}
          <header className="relative grid grid-cols-12 py-12">
            <div className="col-[2/-2] grid grid-cols-[auto_1fr] items-center gap-x-4 lg:col-[2/8] lg:gap-x-5">
              <span className="relative block size-16 overflow-hidden rounded-[30%] shadow-app-icon lg:size-[84px]">
                <AppIcon seed={app.seed} size="100%" />
              </span>
              <h1 className="text-page-hero-sm max-xs:col-span-full lg:text-page-hero">{app.name}</h1>
              <p className="col-start-2 max-w-[28em] text-balance pb-7 pt-3 text-lg text-black-100 max-lg:col-span-full lg:text-xl">{d.subtitle}</p>
              <div className="col-start-2 max-lg:col-span-full">
                <Button as="a" href="#" variant="primary" className={mobileBtn}>
                  Install app
                </Button>
              </div>
            </div>
            <StripPattern />
          </header>
          <Hairline />
          {/* 3. Hairline row (48, >= xl) */}
          <div aria-hidden="true" className="relative hidden h-12 grid-cols-12 xl:grid" />
          <Hairline className="max-xl:hidden" />
          {/* 4. Body */}
          <div className="relative flex flex-col lg:grid lg:grid-cols-12">
            <aside className="relative bg-white-200 lg:col-[1/4]">
              <div className="flex flex-col gap-6 px-[calc(100%/12)] py-12 lg:sticky lg:top-[var(--site-header-height)] lg:px-[58px] lg:pb-[88px] lg:pt-[88px]">
                <div className="-ml-2 flex w-fit items-center gap-2 rounded-10 border border-solid border-white-500 py-1 pl-2 pr-2.5 text-sm text-black-600">
                  <VerifiedBadge size={18} />
                  Official app
                </div>
                <div>
                  <h3 className="truncate text-base font-semibold text-black-300">Built by</h3>
                  <p className="mt-1.5 flex items-center text-sm text-black-600">
                    <AppIcon seed={app.seed + 40} size={18} className="-ml-0.5" rounded="rounded-full" />
                    <span className="ml-2 mr-1.5 truncate">{dev}</span>
                  </p>
                </div>
                <div>
                  <h3 className="truncate text-base font-semibold text-black-300">Category</h3>
                  <Link to={`/apps#${cat.slug}`} className="group mt-1.5 flex w-fit items-center text-sm text-black-600 hover:text-black-300">
                    <span className="ml-0 mr-1.5 truncate">{cat.name}</span>
                    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" className="arrow-shift text-black-900" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </Link>
                </div>
                <div>
                  <h3 className="font-semibold text-black-300">Resources</h3>
                  <ul className="mt-1.5 flex flex-col gap-2">
                    {['Website', 'Privacy policy', 'Support'].map((l) => (
                      <li key={l}>
                        <a href="#" className="group flex w-fit items-center text-sm text-black-600 hover:text-black-300">
                          <span className="ml-0 mr-1.5 truncate">{l}</span>
                          <ArrowUpRightIcon size={16} className="text-black-900 transition-colors duration-200 group-hover:text-black-300" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Button as="a" href="#" variant="outline" className={mobileBtn}>
                    Read the docs
                  </Button>
                </div>
              </div>
            </aside>
            <div className="grid grid-cols-12 py-12 lg:col-[4/-1] lg:pb-20 lg:pt-20">
              <div className="relative col-[2/-2] flex flex-col gap-y-12 lg:gap-y-[72px]">
                <Gallery seed={app.seed} name={app.name} />
                <article className="flex flex-col">
                  {d.sections.map((s, si) => (
                    <section key={s.title} className={si ? 'mt-12' : ''}>
                      <h2 className="relative mb-5 font-display text-2xl font-semibold text-black-100">{s.title}</h2>
                      {s.blocks.map((b, bi) => {
                        const first = bi === 0
                        if (b.kind === 'ul')
                          return (
                            <ul key={bi} className="mt-1.5 max-w-[41em] list-disc pl-3.5 marker:text-black-800">
                              {b.items.map((it, li) => (
                                <li key={li} className="pb-1.5 pl-1.5 pt-1 text-list-400 text-black-100 first:pt-1.5">
                                  {it.lead && <strong className="font-semibold">{it.lead}: </strong>}
                                  {it.text}
                                </li>
                              ))}
                            </ul>
                          )
                        if (b.kind === 'b')
                          return (
                            <p key={bi} className={`max-w-[41em] text-article font-semibold text-black-100 ${first ? '' : 'mt-[13px]'}`}>
                              {b.text}
                            </p>
                          )
                        return (
                          <p key={bi} className={`max-w-[41em] text-pretty text-article text-black-300 ${first ? '' : 'mt-[13px]'}`}>
                            {b.text}
                          </p>
                        )
                      })}
                    </section>
                  ))}
                </article>
              </div>
            </div>
          </div>
          <Hairline />
          {/* 5. Related apps */}
          <div className="relative grid grid-cols-12 gap-y-10 bg-white-100 py-20">
            <h3 className="col-[2/-2] text-overline uppercase text-black-900">More apps in {cat.name.toLowerCase()}</h3>
            <div className="col-[2/-2] grid gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
              {d.related.map((a) => (
                <AppCard key={a.slug} app={a} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
