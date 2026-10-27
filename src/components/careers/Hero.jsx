import { useMemo, useState } from 'react'
import { Button } from '../ui.jsx'
import { AbstractAvatar } from '../marketing/art.jsx'
import { mobileBtn } from '../marketing/Blocks.jsx'
import { HeroBadge } from '../marketing/primitives.jsx'

// T2-c.1 CareersHero (756 tall): left-aligned C1 variant inside a 12-col grid with 24px gutters.
// CTA + avatar stack; behind the copy (>= lg) a commit grid of 268 squares (22x22, radius 6,
// #d3d8df, pitch 24) in 53 bottom-aligned columns, then a caption that updates on hover.

const RINGS = ['border-blue-500', 'border-careers-violet', 'border-careers-orange']
const COLS = 53
const TOTAL = 268

// Deterministic column heights rising toward the right (sums to 268, max 21 rows).
function useColumns() {
  return useMemo(() => {
    let seed = 3
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
    const raw = Array.from({ length: COLS }, (_, i) => Math.pow(i / (COLS - 1), 2.4) * 16 + rnd() * 3)
    const sum = raw.reduce((a, b) => a + b, 0)
    const h = raw.map((v) => Math.max(1, Math.min(21, Math.round((v / sum) * TOTAL))))
    let diff = TOTAL - h.reduce((a, b) => a + b, 0)
    for (let i = COLS - 1; diff !== 0; i = (i - 1 + COLS) % COLS) {
      const step = diff > 0 ? 1 : -1
      if (h[i] + step >= 1 && h[i] + step <= 21) {
        h[i] += step
        diff -= step
      }
    }
    return h
  }, [])
}

const CAPTION = 'Pull requests merged by the team, week by week.' // c47 (spec c45)

export default function CareersHero() {
  const cols = useColumns()
  const [hover, setHover] = useState(null)
  return (
    <section className="container relative max-lg:overflow-hidden" data-section="careers-hero">
      <div className="relative grid w-full grid-cols-12 gap-x-6 lg:border-x lg:border-solid lg:border-white-500">
        <div className="col-[2/-1] row-start-1 hidden flex-col overflow-x-clip pb-16 pt-36 lg:flex" aria-hidden="true">
          <div className="flex h-[504px] justify-end">
            {cols.map((n, c) => (
              <div key={c} className="flex w-6 shrink-0 flex-col justify-end gap-0.5 pb-0.5" onMouseEnter={() => setHover(c)} onMouseLeave={() => setHover(null)}>
                {Array.from({ length: n }, (_, k) => (
                  <div key={k} className="relative z-[1] size-[22px] rounded-6 bg-white-700 before:absolute before:-inset-px before:content-['']" />
                ))}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-black-900 transition-opacity duration-[600ms]" key={hover ?? 'idle'}>
            {hover === null ? CAPTION : `Week ${hover + 1}: ${cols[hover] * 3} pull requests merged.`}
          </p>
        </div>
        <header className="relative col-[2/-2] row-start-1 flex w-full flex-col pb-20 pt-20 max-lg:items-center lg:pb-48 lg:pt-[100px] xl:pt-36">
          <HeroBadge className="mb-6">Join us</HeroBadge>
          <h2 className="max-w-[15em] text-balance text-page-hero-sm max-lg:text-center lg:text-page-hero">
            Help build the workspace revenue teams run on
          </h2>
          <p className="mt-4 max-w-xl text-balance text-lg text-black-300 max-lg:text-center lg:text-xl">
            We are a small, senior team shipping fast for thousands of companies. If you care about craft, clear thinking and the people you
            build with, there is a seat here.
          </p>
          <div className="mt-7 flex w-auto items-center gap-x-3 gap-y-4 max-lg:flex-col">
            <Button variant="primary" href="#open-positions" className={mobileBtn}>
              See the roles
            </Button>
            <div className="group flex items-center">
              {RINGS.map((ring, i) => (
                <div key={ring} className={`relative -mr-2 size-9 rounded-full border border-solid ${ring} transition-all duration-150 lg:size-7 lg:group-hover:mr-0.5`}>
                  <div className="size-full overflow-hidden rounded-full border border-solid border-white-100">
                    <AbstractAvatar size={26} seed={i * 3 + 1} className="max-lg:size-[34px]" />
                  </div>
                </div>
              ))}
              <div className="relative size-9 rounded-full border border-solid border-white-500 transition-transform duration-150 hover:scale-110 lg:size-7">
                <div className="flex size-full items-center justify-center rounded-full bg-careers-bubble text-[10px] font-semibold leading-none tracking-normal text-careers-plus">+48</div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </section>
  )
}
