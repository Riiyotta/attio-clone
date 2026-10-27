import DocsShell, { Crumbs } from '../../components/help/DocsShell.jsx'
import CourseArt from '../../components/help/CourseArt.jsx'
import { LESSONS } from '../../data/help.js'

// T9-c /help/reference/attio-101: breadcrumb (3 levels), H1, lead, lesson list (10).
export default function HelpReference() {
  return (
    <DocsShell title="Basics 101" crumb="Help / Reference / Basics 101">
      <div className="mt-2">
        <Crumbs items={[['Help', '/help'], ['Reference', '/help/reference/attio-101'], ['Basics 101']]} />
      </div>
      <h1 className="mt-12 text-balance text-page-hero-sm text-black-100 lg:text-page-hero">Basics 101</h1>
      <p className="mt-5 max-w-[36em] text-balance text-base text-black-300 lg:mt-6 lg:text-lg">Ten short lessons covering the core ideas behind the workspace.</p>
      <ul className="mt-20 flex flex-col">
        {LESSONS.map(([t, d], i) => (
          <li key={t} className="group/row flex gap-x-6">
            <div className="flex flex-col items-center">
              <div className={`flex size-9 shrink-0 items-center justify-center rounded-12 border border-solid border-white-400 text-sm text-black-700 shadow-number-badge transition-colors duration-150 group-hover/row:border-black-700 ${i ? 'mt-5' : ''}`}>{i + 1}</div>
              {i < LESSONS.length - 1 && <span aria-hidden="true" className="mt-2 w-px flex-1 bg-white-400" />}
            </div>
            <div className={`flex w-full flex-col justify-between gap-x-10 gap-y-8 pb-5 xl:flex-row ${i ? 'pt-5' : ''}`}>
              <a href="#" className="group block xl:w-[349px]">
                <p className="text-balance text-lg font-semibold text-black-300">{t}</p>
                <p className="mt-1 text-balance text-black-700 transition-colors duration-150 ease-out group-hover:text-black-600">{d}</p>
                <p className="-m-px mt-[18px] inline-block rounded-2 p-px text-black-900 transition-colors duration-150 group-hover:text-black-600">Read more</p>
              </a>
              <div className="aspect-[381/181.5] w-full self-start overflow-hidden rounded-16 border border-solid border-white-400 lg:max-w-[340px] lg:rounded-24 xl:max-w-[381px]">
                <CourseArt seed={i + 5} wide />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </DocsShell>
  )
}
