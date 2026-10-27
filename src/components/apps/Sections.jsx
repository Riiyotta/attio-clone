import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui.jsx'
import { Icon } from '../mock.jsx'
import { mobileBtn } from '../marketing/Blocks.jsx'
import { CenteredHead, DashedH, DashedV, DotPattern, GuideRow, Hatch, HeroBadge, Section, SectionHead } from '../marketing/primitives.jsx'
import { SearchDialog, SearchTrigger, useSearchHotkey } from '../marketing/SearchDialog.jsx'
import { APPS, CATEGORIES, FEATURED } from '../../data/apps.js'
import AppCard from './AppCard.jsx'
import AppIcon from './AppIcon.jsx'
import AppScreen, { FitBox } from './AppScreen.jsx'

/* ------------------------------------------------------------------ */
/* T4.1 AppsHero + icon band                                           */
/* ------------------------------------------------------------------ */
export function AppsHero() {
  const browse = () => document.getElementById('apps')?.scrollIntoView({ behavior: 'smooth' })
  return (
    <Section boxClassName="isolate overflow-hidden !border-white-700 pb-16 md:pb-20 lg:pb-24" data-entrance>
      <DotPattern masked motion="hero-dots-in" />
      <div className="relative grid grid-cols-12">
        <header className="col-[2/-2] flex w-full flex-col items-center pb-[60px] pt-20 lg:pt-[100px] xl:pt-[120px]">
          <HeroBadge className="mb-6" data-motion="hero-badge-in">
            Apps for every team
          </HeroBadge>
          <h2 data-motion="hero-title-in" className="max-w-[15em] text-balance text-center text-page-hero-sm lg:text-page-hero">
            Connect the apps your team relies on
          </h2>
          <p data-motion="hero-lead-in" className="mt-4 max-w-xl text-balance text-center text-lg text-black-300 lg:text-xl">
            Bring data from each tool into one workspace and keep it synced.
          </p>
          <div className="mt-8 flex gap-2 max-md:flex-col">
            <Button as="button" type="button" variant="primary" onClick={browse} className={mobileBtn}>
              Browse apps
            </Button>
            <Button as={Link} to="/partners/app-partners" variant="outline" className={mobileBtn}>
              Become an app partner
            </Button>
          </div>
        </header>
      </div>
      {/* Icon band: hatch across the box, white 115.8 cells (10 x 2 >= lg, 6 cols below) */}
      <div className="relative mt-5 grid grid-cols-12">
        <Hatch className="absolute inset-0" />
        <div className="relative col-span-full grid grid-cols-6 bg-white-100 lg:col-[2/-2] lg:grid-cols-10">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className={`relative flex aspect-square items-center justify-center bg-white-100 ${i >= 18 ? 'hidden lg:flex' : i >= 12 ? 'md:hidden lg:flex' : ''}`}>
              <span className="block size-1/4">
                <AppIcon seed={i * 5 + 2} size="100%" ring={false} rounded="rounded-none" crop className="bg-transparent" />
              </span>
            </div>
          ))}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex justify-between lg:hidden">
            {Array.from({ length: 7 }, (_, i) => (
              <DashedV key={i} />
            ))}
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden justify-between lg:flex">
            {Array.from({ length: 11 }, (_, i) => (
              <DashedV key={i} />
            ))}
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -inset-y-px flex flex-col justify-between">
            {[0, 1, 2, 3].map((i) => (
              <DashedH key={i} className={i === 3 ? 'md:hidden' : ''} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* T4.2 FeaturedApps: 5 chip tabs + panel                              */
/* ------------------------------------------------------------------ */
export function FeaturedApps() {
  const [active, setActive] = useState(0)
  const f = FEATURED[active]
  const app = APPS[f.app]
  return (
    <Section boxClassName="overflow-hidden">
      <SectionHead lead="Popular integrations" cont="Hand-picked apps that teams install on day one." className="max-lg:text-center" />
      <div className="grid grid-cols-12">
        <div role="tablist" aria-label="Featured apps" className="col-[2/-2] flex gap-2 pb-5 max-lg:flex-wrap max-lg:justify-center">
          {FEATURED.map((t, i) => (
            <button
              key={t.label}
              type="button"
              role="tab"
              aria-selected={i === active}
              data-state={i === active ? 'active' : 'inactive'}
              onClick={() => setActive(i)}
              className="feature-chip inline-flex h-8 items-center gap-1.5 rounded-10 border border-solid pl-1.5 pr-2.5 text-sm"
            >
              <AppIcon seed={APPS[t.app].seed} size={16} className="chip-icon" rounded="rounded-[30%]" />
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="relative grid w-full grid-cols-12 lg:mt-5">
        <div aria-hidden="true" className="absolute inset-x-0 -top-5 hidden h-5 grid-cols-12 lg:grid">
          <div className="col-[2/-2] flex justify-between">
            <DashedV />
            <DashedV />
          </div>
        </div>
        <div className="relative col-span-full flex aspect-video w-full border-y border-solid border-white-500 max-sm:aspect-[5/4] lg:col-[2/-2] lg:aspect-[2.39/1] lg:border-x">
          <DotPattern className="text-white-700" />
          <div key={`t${active}`} data-motion="featured-enter" className="relative my-px hidden w-2/5 bg-white-100 lg:block">
            <div className="absolute left-[30px] top-[60px] flex items-center gap-2 xl:left-10">
              <AppIcon seed={app.seed} size={32} />
              <h3 className="font-display text-2xl font-semibold text-black-100">{f.title}</h3>
            </div>
            <div className="absolute inset-x-[30px] bottom-16 xl:inset-x-10">
              <div className="relative">
                <p className="absolute -top-16 max-w-sm text-balance text-base text-black-600 max-xl:-top-24">{f.desc}</p>
                <Button as={Link} to={`/apps/${app.slug}`} variant="outline">
                  Learn more
                </Button>
              </div>
            </div>
          </div>
          <Link to={`/apps/${app.slug}`} aria-label={f.title} className="relative flex flex-1 items-center justify-center lg:p-[3%]">
            <div key={`m${active}`} data-motion="featured-enter" className="h-full w-full">
              <FitBox w={624} h={413}>
                <AppScreen seed={app.seed} />
              </FitBox>
            </div>
          </Link>
        </div>
      </div>
      <GuideRow />
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* T4.3 Directory: search + sticky categories + 272 cards              */
/* ------------------------------------------------------------------ */
export function Directory() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(CATEGORIES[0].slug)
  const blocks = useRef({})
  const openSearch = useCallback(() => setOpen(true), [])
  useSearchHotkey(openSearch)

  const groups = useMemo(() => CATEGORIES.map((c, ci) => ({ ...c, apps: APPS.filter((a) => a.category === ci) })), [])
  const items = useMemo(
    () =>
      APPS.map((a) => ({
        id: a.slug,
        label: a.name,
        sub: a.by.replace(/^By /, ''),
        group: CATEGORIES[a.category].name,
        to: `/apps/${a.slug}`,
        icon: <AppIcon seed={a.seed} size={20} />,
      })),
    []
  )

  // Scroll-spy: the active category is the last block whose top passed the header + 30%.
  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.3
      let cur = CATEGORIES[0].slug
      for (const c of CATEGORIES) {
        const el = blocks.current[c.slug]
        if (el && el.getBoundingClientRect().top <= line) cur = c.slug
      }
      setCurrent(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Initial /apps#category deep link
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id && blocks.current[id]) requestAnimationFrame(() => blocks.current[id].scrollIntoView())
  }, [])

  const go = (slug) => {
    setCurrent(slug)
    window.history.replaceState(null, '', `#${slug}`)
    blocks.current[slug]?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="apps" className="relative max-md:container xl:container">
      <div className="relative border-solid border-white-500 max-md:border-x xl:border-x">
        <header className="grid grid-cols-12 justify-items-center pb-[60px] pt-[100px] lg:pb-16 lg:pt-[120px] xl:pb-20 xl:pt-40">
          <div className="col-[2/-2] flex flex-col items-center">
            <CenteredHead title="Every app here" sub="Browse the whole catalog of integrations built by our own teams and partners worldwide." className="gap-3 mix-blend-multiply lg:gap-4" />
            <SearchTrigger placeholder="Search apps" onOpen={openSearch} className="mt-10" />
          </div>
        </header>
        <div className="relative isolate grid grid-cols-12">
          {/* < lg: sticky horizontal chip row */}
          <div className="no-scrollbar sticky top-[var(--site-header-height)] z-50 col-span-full flex items-center gap-2 overflow-x-auto bg-white-100 px-[22px] py-1.5 lg:hidden">
            {CATEGORIES.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => go(c.slug)}
                data-active={current === c.slug || undefined}
                className="category-chip inline-flex h-8 shrink-0 items-center gap-1.5 rounded-10 border border-solid border-transparent pl-1.5 pr-2.5 text-xs text-black-400"
              >
                <Icon name={CATEGORY_ICONS[CATEGORIES.indexOf(c)]} size={14} className="text-black-700" />
                <span className="shrink-0 truncate">{c.name}</span>
              </button>
            ))}
          </div>
          {/* >= lg: sticky sidebar (col 1-3, inset 1/4 col) */}
          <aside className="col-[1/4] hidden lg:block">
            <div className="sticky top-[var(--site-header-height)] mx-[calc(100%/12)] py-[52px]">
              <h3 className="px-3 pb-8 text-overline uppercase text-black-700">Categories</h3>
              <div className="flex flex-col gap-y-px">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => go(c.slug)}
                    data-active={current === c.slug || undefined}
                    className="category-btn inline-flex h-9 max-w-full items-center rounded-10 border border-solid border-transparent px-3 text-sm text-black-400"
                  >
                    <span className="truncate">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
          <div className="col-[2/-2] lg:col-[5/-2]">
            {groups.map((g, gi) => (
              <div key={g.slug} id={g.slug} ref={(el) => (blocks.current[g.slug] = el)} className="scroll-mt-[calc(var(--site-header-height)+45px)] lg:scroll-mt-[var(--site-header-height)]">
                {gi > 0 && <DashedH />}
                <div className="pb-14 pt-[52px]">
                  <h3 className="relative pb-10 text-overline uppercase text-black-700">{g.name}</h3>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4">
                    {g.apps.map((a) => (
                      <AppCard key={a.slug} app={a} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SearchDialog open={open} onClose={() => setOpen(false)} placeholder="Search apps" items={items} emptyLabel="No apps match your search." />
    </section>
  )
}

const CATEGORY_ICONS = ['chart', 'flow', 'phone', 'coin', 'mail', 'sparkle', 'terminal', 'list', 'trend', 'users', 'heart']

/* ------------------------------------------------------------------ */
/* T4.4 BuildWithUs                                                    */
/* ------------------------------------------------------------------ */
const PLUS_CELLS = new Set([1, 7, 13])
export function BuildWithUs() {
  return (
    <section className="relative w-full overflow-hidden bg-white-200">
      <div className="container">
        <div className="overflow-hidden border-x border-solid border-white-500 py-20">
          <div className="relative grid grid-cols-12">
            <div className="col-[2/-2] flex flex-col justify-center pb-16 pt-14 lg:col-[2/7] lg:py-0 lg:pr-8">
              <div className="max-w-[20em] text-head-sm-md lg:text-head-sm">
                <h2 className="inline font-semibold text-black-100">Build with us.</h2>{' '}
                <p className="inline font-medium text-black-800">Put your app in front of thousands of new teams.</p>
              </div>
              <div className="mt-6">
                <Button as={Link} to="/partners/app-partners" variant="primary" className={mobileBtn}>
                  Become an app partner
                </Button>
              </div>
            </div>
            <div className="relative col-[2/-2] grid grid-cols-5 grid-rows-3 lg:col-[7/-2] xl:col-[8/-2]">
              {Array.from({ length: 15 }, (_, i) => (
                <div key={i} className="relative flex aspect-square items-center justify-center bg-white-100">
                  {PLUS_CELLS.has(i) && <PlusSquare />}
                </div>
              ))}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex justify-between">
                {Array.from({ length: 6 }, (_, i) => (
                  <DashedV key={i} />
                ))}
              </div>
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex flex-col justify-between">
                {Array.from({ length: 4 }, (_, i) => (
                  <DashedH key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PlusSquare() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className="text-black-900" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="3" y="3" width="14" height="14" rx="4" />
      <path d="M10 7v6M7 10h6" />
    </svg>
  )
}
