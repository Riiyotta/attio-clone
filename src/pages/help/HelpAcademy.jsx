import DocsShell, { Crumbs } from '../../components/help/DocsShell.jsx'
import CourseArt from '../../components/help/CourseArt.jsx'
import { COURSES } from '../../data/help.js'

// T9-b /help/academy: breadcrumb, H1, lead, course grid (5).
export default function HelpAcademy() {
  return (
    <DocsShell title="Academy" crumb="Help / Academy">
      <div className="mt-2">
        <Crumbs items={[['Help', '/help'], ['Academy']]} />
      </div>
      <h1 className="mt-12 text-balance text-page-hero-sm text-black-100 lg:text-page-hero">Video courses</h1>
      <p className="mt-5 max-w-[36em] text-balance text-base text-black-300 lg:mt-6 lg:text-lg">
        Step-by-step courses that walk you through setting up records, pipelines, reports and automations, at your own pace and in any order.
      </p>
      <div className="mt-[60px] grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 xl:mt-[100px] xl:gap-x-10 xl:gap-y-[60px]">
        {COURSES.map((c, i) => (
          <a key={c.title} href="#" className="group relative isolate flex flex-col gap-4 xl:gap-5">
            <span aria-hidden="true" className="pointer-events-none absolute -inset-2 -z-10 rounded-16 bg-white-200 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
            <div className="aspect-[5/3] overflow-hidden rounded-12 border border-solid border-white-500">
              <CourseArt seed={i} />
            </div>
            <div className="px-2">
              <h3 className="w-fit text-balance text-lg font-semibold text-black-300 xl:text-xl">
                <span className="underline-anim">{c.title}</span>
              </h3>
              <p className="mt-2 line-clamp-3 text-balance text-sm text-black-700 md:max-xl:text-xs">{c.desc}</p>
              <div className="mt-3 flex items-center gap-x-2 text-sm text-black-900 md:max-xl:text-xs">
                <span>{c.lessons}</span>
                <span aria-hidden="true">·</span>
                <p>{c.duration}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </DocsShell>
  )
}
