import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Arrow, CellGrid, DashedV, Hairline, HoverWash } from '../marketing/primitives.jsx'
import BlogArt from './BlogArt.jsx'

// T6 editorial listing, shared by /blog (light) and /engineering/blog (dark). `dark` swaps the
// measured dark palette: cells #101010 on #2e3238 hairlines, wash #1c1d1f, overline #505967,
// title #fff, excerpt #8f99a8, author #b5bdc9 + role #505967.
const TONE = {
  light: {
    box: 'border-white-500',
    grid: 'bg-white-500',
    cell: 'bg-white-100',
    overline: 'text-black-900',
    title: 'text-black-100',
    excerpt: 'text-black-700',
    author: 'text-black-600',
    role: 'text-black-900',
    h2: 'text-black-100',
    rowBg: 'bg-white-200',
    rowWash: 'bg-white-300',
    filterActive: 'text-black-100',
    filterIdle: 'text-black-700',
    filterHover: 'hover:bg-white-300',
    count: 'text-black-900',
    arrow: 'text-black-900 group-hover:text-black-300',
  },
  dark: {
    box: 'border-black-400',
    grid: 'bg-black-400',
    cell: 'bg-black-50',
    overline: 'text-black-600',
    title: 'text-white-100',
    excerpt: 'text-black-800',
    author: 'text-white-900',
    role: 'text-black-600',
    h2: 'text-white-100',
    rowBg: 'bg-black-50',
    rowWash: 'bg-black-100',
    filterActive: 'text-white-100',
    filterIdle: 'text-black-800',
    filterHover: 'hover:bg-black-400',
    count: 'text-black-600',
    arrow: 'text-black-600 group-hover:text-white-100',
  },
}

/* ------------------------------------------------------------------ */
/* Secondary cards row (3 cards, CellGrid, 462.7 wide)                 */
/* ------------------------------------------------------------------ */
export function SecondaryCards({ posts, dark = false, className = '' }) {
  const t = TONE[dark ? 'dark' : 'light']
  return (
    <CellGrid className={`grid-cols-1 !px-0 lg:grid-cols-2 xl:grid-cols-3 ${t.grid} ${className}`}>
      {posts.map((p, i) => (
        <a
          key={p.id}
          href="#"
          className={`group relative grid grid-cols-12 py-11 xl:grid-cols-8 ${t.cell} ${i === 2 ? 'lg:max-xl:hidden' : ''}`}
        >
          <span aria-hidden="true" className={`hover-wash ${dark ? '!bg-black-100' : ''}`} />
          <div className="relative col-[2/-2] flex size-full flex-col justify-between">
            <div>
              <div className="flex justify-between">
                <p className={`text-overline uppercase ${t.overline}`}>[{p.category}]</p>
                <time className={`text-overline uppercase ${t.overline}`}>{p.date}</time>
              </div>
              <h3 className={`mt-8 text-2xl font-semibold ${t.title}`}>
                <span className="underline-anim">{p.title}</span>
              </h3>
              <p className={`mt-4 line-clamp-3 max-w-[28em] text-pretty text-sm lg:line-clamp-2 ${t.excerpt}`}>{p.excerpt}</p>
            </div>
            <div className="mt-5">
              {p.authors.map(([name, role]) => (
                <p key={name} className="text-sm leading-5">
                  <span className={t.author}>{name}</span> <span className={t.role}>{role}</span>
                </p>
              ))}
            </div>
          </div>
        </a>
      ))}
    </CellGrid>
  )
}

/* ------------------------------------------------------------------ */
/* /blog FeaturedPost                                                  */
/* ------------------------------------------------------------------ */
export function FeaturedPost({ data }) {
  const f = data.featured
  const guides = (
    <div aria-hidden="true" className="hidden h-[100px] grid-cols-24 lg:grid">
      <div className="col-[2/-2] flex justify-between">
        <DashedV />
        <DashedV />
      </div>
    </div>
  )
  return (
    <div className="container">
      <div className="border-x border-solid border-white-500">
        <div aria-hidden="true" className="h-20 lg:h-28" />
        <Hairline />
        <a href="#" className="group relative flex flex-col">
          <HoverWash />
          <div className="relative order-2 grid grid-cols-12 gap-y-8 pb-12 pt-8 lg:order-1 lg:grid-cols-24">
            <p className="col-[1/3] hidden justify-self-center text-overline uppercase text-black-900 xl:block">{f.kicker}</p>
            <div className="col-[2/-2] flex justify-between gap-8 lg:col-[3/10]">
              <p className="text-overline uppercase text-black-900">{f.category}</p>
              <p className="text-overline uppercase text-black-900 xl:hidden">{f.date}</p>
            </div>
            <p className="col-[21/23] hidden justify-self-end text-overline uppercase text-black-900 xl:block">{f.date}</p>
            <div className="col-[2/-2] flex flex-col gap-8 lg:col-[3/-3] lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-[684px] text-page-hero-sm text-black-100 lg:text-page-hero">
                <span className="underline-anim">{f.title}</span>
              </h2>
              <p className="shrink-0 text-base">
                <span className="text-black-600">{f.author[0]}</span> <span className="text-black-900">{f.author[1]}</span>
              </p>
            </div>
          </div>
          {/* Hero image 1158.3x651.5 (16:9, no radius) at col 2/-2 (full width < lg), dashed guides beside it */}
          <div className="relative order-1 grid grid-cols-12 lg:order-2">
            <div aria-hidden="true" className="absolute inset-x-0 -inset-y-5 hidden grid-cols-24 lg:grid">
              <div className="col-[2/-2] flex justify-between">
                <DashedV />
                <DashedV />
              </div>
            </div>
            <div className="relative col-span-full aspect-video w-full lg:col-[2/-2]">
              <BlogArt seed={7} />
            </div>
          </div>
        </a>
        {guides}
        <SecondaryCards posts={data.secondary} />
        {guides}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* LatestArticles (filters via ?category=)                             */
/* ------------------------------------------------------------------ */
export function LatestArticles({ data, dark = false }) {
  const t = TONE[dark ? 'dark' : 'light']
  const [params, setParams] = useSearchParams()
  const all = data.filters[0][0]
  const active = data.filters.some(([n]) => n === params.get('category')) ? params.get('category') : all
  const rows = useMemo(() => (active === all ? data.rows : data.rows.filter((r) => r.category === active)), [active, all, data.rows])
  const choose = (name) => {
    const next = new URLSearchParams(params)
    if (name === all) next.delete('category')
    else next.set('category', name)
    setParams(next, { preventScrollReset: true })
  }
  return (
    <section className={dark ? 'dark eng-dark bg-black-50' : 'bg-white-200'}>
      <div className="container">
        <div className={`border-x border-solid ${t.box}`}>
          <div className="grid grid-cols-12 pb-12 pt-[100px] lg:grid-cols-24 lg:pt-[120px] xl:pt-40">
            <div className="col-[2/-2]">
              <h2 className={`inline text-pretty text-head-sm-md lg:text-head-sm ${t.h2}`}>{data.heading}</h2>
            </div>
          </div>
          <div className="relative grid grid-cols-12 lg:grid-cols-24">
            <div className="col-[2/-2] max-lg:pb-8 lg:col-[2/9] lg:pt-12">
              <ul className="no-scrollbar -mx-[13px] flex w-[calc(100%+26px)] gap-0.5 overflow-x-auto lg:flex-col lg:overflow-visible">
                {data.filters.map(([name, n]) => {
                  const on = name === active
                  return (
                    <li key={name} className="shrink-0">
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => choose(name)}
                        className={`inline-flex h-10 max-w-full items-center gap-1 whitespace-nowrap rounded-12 px-[13px] transition-colors duration-300 ease-in-out ${t.filterHover} ${on ? 'pointer-events-none' : ''}`}
                      >
                        <span className={`shrink truncate text-lg lg:text-xl ${on ? t.filterActive : t.filterIdle}`}>{name}</span>
                        <span className={`align-super text-overline ${t.count} -translate-y-1.5`}>[{n}]</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div key={active} data-motion="blog-list" className={`col-span-full flex flex-col gap-px ${t.grid} lg:col-[9/-1]`}>
              {rows.map((r) => (
                <a key={r.id} href="#" className={`group relative grid grid-cols-12 items-baseline py-7 lg:grid-cols-16 ${t.rowBg}`}>
                  <span aria-hidden="true" className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-hover:duration-[50ms] ${t.rowWash}`} />
                  <p className={`relative col-[2/7] row-start-1 truncate text-overline uppercase lg:col-[13/15] ${t.overline}`}>{r.category}</p>
                  <p className={`relative col-[-6/-2] row-start-1 justify-self-end text-overline uppercase lg:col-[11/13] lg:justify-self-start ${t.overline}`}>{r.date}</p>
                  <h3 className={`relative col-[2/-2] row-start-2 text-balance pt-6 text-lg lg:col-[2/10] lg:row-start-1 lg:pt-0 ${t.title}`}>{r.title}</h3>
                  <Arrow className={`arrow-shift relative col-[15/16] row-start-1 hidden justify-self-end lg:block ${t.arrow}`} />
                  <p className={`relative col-[2/-2] line-clamp-3 max-w-[28em] text-pretty pt-2 text-sm lg:line-clamp-2 ${t.excerpt}`}>{r.excerpt}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
