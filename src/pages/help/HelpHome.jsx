import { Link } from 'react-router-dom'
import DocsShell from '../../components/help/DocsShell.jsx'
import { HoverWash, Arrow } from '../../components/marketing/primitives.jsx'
import { SearchTrigger } from '../../components/marketing/SearchDialog.jsx'
import AppIcon from '../../components/apps/AppIcon.jsx'
import { LESSONS } from '../../data/help.js'

const CARDS = [
  ['Academy', 'Short video courses for teams.', '/help/academy', 4],
  ['Reference', 'Detailed guides for every feature.', '/help/reference/attio-101', 9],
  ['Developers', 'Build on the platform with the API and app kit.', '/apps', 11],
]
const TAGS = ['Importing', 'Records', 'Mail syncing'] // c9 / c7 / c12

// T9-a /help: announcement pill, H1, search + popular tags, 3 cards, get-started list of 3.
export default function HelpHome() {
  return (
    <DocsShell title="Help center" crumb="Help center">
      {({ openSearch }) => (
        <div className="flex flex-col items-center pb-10 pt-10 lg:pt-[76px]">
          <div className="flex flex-col items-center text-center">
            <Link to="/changelog" className="help-pill group relative block rounded-13 border border-solid border-white-400 transition-colors duration-150 active:border-white-500">
              <span aria-hidden="true" className="help-pill-shine absolute -inset-px rounded-13" />
              <span className="relative flex items-center gap-x-1 rounded-13 bg-white-100 py-[5px] pl-[11px] pr-[7px] transition-colors duration-150 group-hover:bg-badge-hover">
                <span className="text-balance text-help-pill text-black-300">New this month: faster imports and bulk edits</span>
                <Arrow className="arrow-shift text-black-700" />
              </span>
            </Link>
            <h1 className="mt-6 text-page-hero-sm text-black-100 lg:text-page-hero">How can we help?</h1>
            <div className="mt-4 max-w-[18em] text-pretty text-lg text-black-300 lg:text-xl">Guides, courses and answers for every part of your work.</div>
          </div>
          <div className="mt-10 flex w-full max-w-[558px] flex-col items-center md:mt-8">
            <SearchTrigger placeholder="Search help…" onOpen={openSearch} />
            <div className="mt-4 flex items-center gap-x-2.5 gap-y-2 text-black-700 max-lg:flex-col md:mt-5">
              <p className="shrink-0 text-sm text-black-700">Popular searches:</p>
              <ul className="flex gap-1.5 text-xs">
                {TAGS.map((t) => (
                  <li key={t}>
                    <button type="button" onClick={openSearch} className="inline-flex h-7 items-center rounded-10 border border-solid border-white-800 bg-white-200 px-2.5 text-xs text-black-700 transition-colors duration-150 hover:bg-white-300">
                      {t}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-[60px] grid w-full grid-cols-1 gap-4 md:mt-[100px] lg:grid-cols-3 lg:gap-5">
            {CARDS.map(([t, d, to, seed]) => (
              <Link key={t} to={to} className="group relative flex flex-col gap-4 overflow-hidden rounded-16 border border-solid border-white-500 p-6 pt-[22px] max-md:flex-row max-md:items-center">
                <HoverWash />
                <div className="relative flex items-center justify-between max-md:contents">
                  <AppIcon seed={seed} size={44} rounded="rounded-12" />
                  <Arrow className="arrow-shift text-black-900 group-hover:text-black-300 max-md:order-last" />
                </div>
                <div className="relative flex flex-col gap-1 max-md:flex-1">
                  <h3 className="font-semibold text-black-300">{t}</h3>
                  <p className="text-balance text-sm text-black-600">{d}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-[200px] flex w-full flex-col justify-between gap-x-[clamp(24px,calc(33.8%-215.304px),105px)] gap-y-10 xl:flex-row">
            <div className="shrink-0">
              <p className="text-heading-md-sm lg:text-heading-md">
                <span className="text-black-100">Get started</span> <span className="text-help-muted">with</span>
                <br />
                <span className="text-help-muted">the basics</span>
              </p>
              <p className="mt-3 text-black-600">Three short lessons to set up your first workspace.</p>
            </div>
            <div className="w-full xl:w-[400px]">
              <ol>
                {LESSONS.slice(0, 3).map(([t, d], i) => (
                  <li key={t} className="border-b border-solid border-white-500 pb-[31px] pt-8 first-of-type:pt-0">
                    <Link to="/help/reference/attio-101" className="group -m-2 flex gap-x-8 rounded-12 p-2">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-12 border border-solid border-white-400 text-sm text-black-700 shadow-number-badge">{i + 1}</div>
                      <div>
                        <p className="text-balance font-semibold text-black-100">{t}</p>
                        <p className="mt-0.5 line-clamp-2 text-balance text-black-600 transition-colors duration-150 group-hover:text-black-300">{d}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>
              <Link to="/help/reference/attio-101" className="-m-px mt-7 inline-block rounded-2 p-px text-black-900 transition-colors duration-150 hover:text-black-600">
                Browse every lesson
              </Link>
            </div>
          </div>
        </div>
      )}
    </DocsShell>
  )
}
