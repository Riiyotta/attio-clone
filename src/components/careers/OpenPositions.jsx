import { useMemo, useState } from 'react'
import { SelectField } from '../forms/Fields.jsx'
import { Arrow, CenteredHead, DashedV, Hatch, HoverWash } from '../marketing/primitives.jsx'

// T2-c.6 OpenPositions (#open-positions). Filters col 4/-4: grid 1fr 1fr 2fr gap 8 (two 42px
// selects + search with a 14px icon at left 13, padding-left 36). 6 department groups (header
// bar 70, #f3f4f6) and 30 rows (63 incl. hairline). Live filtering, no pagination; empty state.

// Invented roles: [department, title, location]
const ROLES = [
  ['Engineering', 'Senior Product Engineer', 'London, UK'],
  ['Engineering', 'Staff Backend Engineer', 'London, UK'],
  ['Engineering', 'Frontend Engineer', 'Remote (Europe)'],
  ['Engineering', 'Platform Engineer, Data', 'New York, US'],
  ['Engineering', 'Site Reliability Engineer', 'London, UK'],
  ['Engineering', 'Engineering Manager, Core', 'London, UK'],
  ['Engineering', 'Security Engineer', 'Remote (Europe)'],
  ['Engineering', 'Mobile Engineer', 'London, UK'],
  ['Engineering', 'Machine Learning Engineer', 'San Francisco, US'],
  ['Engineering', 'Developer Tools Engineer', 'London, UK'],
  ['Engineering', 'Integrations Engineer', 'New York, US'],
  ['Engineering', 'Search Infrastructure Engineer', 'London, UK'],
  ['Engineering', 'Product Engineer, Automations', 'Remote (Europe)'],
  ['Engineering', 'Graduate Software Engineer', 'London, UK'],
  ['Engineering', 'Data Engineer', 'London, UK or Remote (Europe)'],
  ['Design', 'Senior Product Designer', 'London, UK'],
  ['Design', 'Brand Designer', 'London, UK'],
  ['Design', 'Design Engineer', 'Remote (Europe)'],
  ['Design', 'Content Designer', 'London, UK'],
  ['Design', 'User Researcher', 'New York, US'],
  ['Design', 'Product Designer, Mobile', 'London, UK'],
  ['Design', 'Illustrator and Motion Designer', 'Remote (Europe)'],
  ['Design', 'Design Systems Lead', 'London, UK'],
  ['Sales', 'Account Executive, Mid-Market', 'New York, US'],
  ['Sales', 'Enterprise Account Executive', 'San Francisco, US'],
  ['Sales', 'Sales Development Representative', 'London, UK'],
  ['Sales', 'Solutions Engineer', 'New York, US'],
  ['Customer Success', 'Customer Success Manager', 'London, UK'],
  ['Marketing', 'Product Marketing Manager', 'London, UK'],
  ['Operations', 'People Partner', 'London, UK'],
]
const DEPARTMENTS = ['All teams', ...new Set(ROLES.map((r) => r[0]))]
const LOCATIONS = ['All locations', ...new Set(ROLES.map((r) => r[2]))]

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" className="pointer-events-none absolute left-[13px] top-1/2 -translate-y-1/2 text-black-700" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="7" cy="7" r="4.75" />
      <path d="m10.5 10.5 3 3" />
    </svg>
  )
}

export default function OpenPositions() {
  const [loc, setLoc] = useState('All locations')
  const [dept, setDept] = useState('All teams')
  const [q, setQ] = useState('')
  const groups = useMemo(() => {
    const term = q.trim().toLowerCase()
    const hits = ROLES.filter(
      ([d, t, l]) =>
        (dept === 'All teams' || d === dept) && (loc === 'All locations' || l === loc) && (!term || `${t} ${d} ${l}`.toLowerCase().includes(term))
    )
    const map = new Map()
    hits.forEach((r) => map.set(r[0], [...(map.get(r[0]) ?? []), r]))
    return [...map.entries()]
  }, [loc, dept, q])
  const count = groups.reduce((n, [, rows]) => n + rows.length, 0)

  return (
    <section className="container" id="open-positions">
      <div className="flex flex-col overflow-hidden border-x border-solid border-white-500">
        <div className="grid grid-cols-12 pb-[60px] pt-[100px] lg:pb-16 lg:pt-[120px] xl:pb-20 xl:pt-40">
          <div className="col-[2/-2] mix-blend-multiply">
            <CenteredHead title="Roles open now." sub="Every team is hiring. Filter by location or team, or search for the kind of work you want to do next." />
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-[2/-2] grid items-center gap-2 max-lg:grid-cols-2 max-lg:gap-y-2.5 lg:col-[4/-4] lg:grid-cols-[1fr_1fr_2fr]">
            <SelectField compact hideLabel label="Filter by location" options={LOCATIONS} value={loc} onChange={setLoc} />
            <SelectField compact hideLabel label="Filter by team" options={DEPARTMENTS} value={dept} onChange={setDept} />
            <div className="relative max-lg:col-span-2">
              <label htmlFor="role-search" className="sr-only">
                Search open roles
              </label>
              <SearchIcon />
              <input id="role-search" type="search" placeholder="Search roles" value={q} onChange={(e) => setQ(e.target.value)} className="field h-[42px] py-2 pl-9 pr-3" />
            </div>
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          {count} open positions match the current filters
        </p>
        <div className="relative mt-5 grid h-5 grid-cols-12 max-lg:hidden" aria-hidden="true">
          <div className="col-[2/-2] flex justify-between">
            <DashedV />
            <DashedV />
          </div>
        </div>
        <div className="relative grid grid-cols-12 max-lg:mt-5">
          <Hatch className="absolute inset-0 size-full" />
          <div className="relative col-[1/-1] bg-white-100 xl:col-[2/-2] xl:border-x xl:border-solid xl:border-white-500">
            {groups.length === 0 && (
              <div className="flex h-[215px] items-center justify-center">
                <p className="text-base text-black-600">No open roles match your search just yet.</p>
              </div>
            )}
            {groups.map(([dname, rows]) => (
              <div key={dname} className="relative flex flex-col pb-[73px] last:pb-[72px]">
                <div className="relative grid grid-cols-12 bg-white-300 py-5 xl:grid-cols-10">
                  <div className="col-[2/-2] flex gap-1">
                    <h3 className="font-display text-xl font-medium text-black-100 xl:text-2xl">{dname}</h3>
                    <p className="align-super text-overline uppercase text-black-700">[{rows.length}]</p>
                  </div>
                </div>
                <div className="flex flex-col gap-px bg-white-500 py-px">
                  {rows.map(([, title, location], i) => (
                    <a key={title} href="#" className="group relative grid grid-cols-12 items-baseline gap-y-1 bg-white-100 py-4 md:gap-y-[5px] md:py-[18px] lg:py-5 xl:grid-cols-10">
                      <HoverWash />
                      <p className="relative col-[1/2] row-start-1 mb-0.5 text-sm tabular-nums tracking-[-0.35px] text-black-900 max-xl:hidden xl:mb-0 xl:text-center">
                        {String(i + 1).padStart(2, '0')}
                      </p>
                      <h4 className="relative col-[2/-2] row-start-1 truncate pr-6 text-sm text-black-100 md:text-base xl:col-[2/7] xl:row-start-1">{title}</h4>
                      <p className="relative col-[2/-3] row-start-2 text-sm text-black-700 max-md:line-clamp-2 md:truncate md:text-base xl:col-[7/-2] xl:row-start-1">{location}</p>
                      <span className="relative col-[-2/-1] row-start-1 flex justify-center self-center xl:row-start-1">
                        <Arrow className="arrow-shift text-black-900 group-hover:text-black-300" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
