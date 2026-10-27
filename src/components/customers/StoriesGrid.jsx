import StoryArt from '../StoryArt.jsx'
import { LOGO_MARKS } from '../marketing/art.jsx'
import { Arrow, DashedH, DotPattern, HoverWash } from '../marketing/primitives.jsx'

// T2-a.4 CustomerStoriesGrid: feature (1388x460) / 2-up / feature / 2-up / feature = 7 stories.
// Text column padding 64 56 (24 below xl); logo, overline (mt-auto mb-16), two-tone title 32/36
// (28/34 below lg), "Read case study" link. Feature media frame 579.3x332 radius 12, padding 8.

// [logo index, logo w, logo h, company, category, lead, continuation]
const STORIES = [
  [0, 124, 27, '2025', 'Product-led growth', 'Pellora doubled its pipeline', 'by moving every sales signal into one shared view.', 0],
  [3, 126, 32, 'Quillfold Publishing', 'Venture-backed team', 'Quillfold closed its first round', 'with a pipeline built in an afternoon.'],
  [5, 143, 36, '2024', 'Series B platform', 'Tesselio cut setup time', 'from weeks to a single focused afternoon.'],
  [7, 133, 32, 'Halverstone', 'Creator platform', 'Halverstone scaled outreach', 'without hiring another operations lead.', 2],
  [2, 112, 36, 'Oxmere Capital', 'Seed investors', 'Oxmere tracks every founder', 'from the first call to the final memo.'],
  [8, 143, 36, '2025', 'Food delivery app', 'Ostra unified its partner data', 'so local teams act on the same numbers.'],
  [1, 324, 48, '2024', 'Home services group', 'Brindlecove runs ops in one place', 'and gives every region a live view of demand.', 3],
]

function Logo({ i, w, h }) {
  const Mark = LOGO_MARKS[i]
  return (
    <div className="flex min-h-[32px] items-center text-black-300">
      <div className="max-h-12 max-w-full" style={{ width: w, height: h }}>
        <Mark w={w} h={h} />
      </div>
    </div>
  )
}

function StoryText({ s, full = false }) {
  const [li, lw, lh, company, cat, lead, cont] = s
  return (
    <div className={`flex h-full w-full flex-col px-6 py-16 xl:px-14 xl:py-16 ${full ? '' : 'lg:basis-1/2'}`}>
      <Logo i={li} w={lw} h={lh} />
      <p className="mb-4 mt-12 flex flex-wrap gap-x-3 lg:mt-auto text-overline uppercase text-black-800 mix-blend-multiply">
        <span>{company}</span>
        <span aria-hidden="true">·</span>
        <span className="whitespace-nowrap">{cat}</span>
      </p>
      <p className="text-head-sm-md lg:text-head-sm">
        <span className="font-semibold text-black-100">{lead}</span>{' '}
        <span className="text-black-800 transition-colors duration-[400ms] ease-in-out group-hover:text-black-600">{cont}</span>
      </p>
      <div className="mt-5 flex items-center gap-1.5 text-base text-black-100 mix-blend-multiply">
        Read the story
        <Arrow className="arrow-shift" />
      </div>
    </div>
  )
}

function StoryMedia({ variant }) {
  return (
    <div className="relative hidden h-full basis-1/2 items-center justify-center py-16 lg:flex">
      <div aria-hidden="true" className="absolute inset-x-0 top-16 mix-blend-multiply [mask-image:linear-gradient(to_right,transparent,#000_12px)]">
        <DashedH />
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-16 mix-blend-multiply [mask-image:linear-gradient(to_right,transparent,#000_12px)]">
        <DashedH />
      </div>
      <div className="relative -mx-px flex h-full w-[calc(100%+1px)] items-center justify-center rounded-12 border border-solid border-white-700 bg-white-100 p-2 shadow-story-frame">
        <div className="relative size-full overflow-hidden rounded-[5px]">
          <div className="absolute inset-0 transition-transform duration-[400ms] ease-in-out group-hover:scale-[1.02]">
            <StoryArt variant={variant} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Feature({ s, mediaLeft, borders }) {
  return (
    <div className={`col-span-full border-solid border-white-500 px-px ${borders}`}>
      <a href="#" className="group relative grid grid-cols-12 items-center overflow-hidden bg-white-100 lg:h-[460px]">
        <HoverWash />
        <div className={`relative col-span-full flex h-full lg:col-span-10 lg:col-start-2 ${mediaLeft ? 'lg:flex-row-reverse' : ''}`}>
          <StoryText s={s} />
          <StoryMedia variant={s[7]} />
        </div>
      </a>
    </div>
  )
}

function HalfRow({ items }) {
  return (
    <div className="col-span-full grid gap-px bg-white-500 lg:col-[2/-2] lg:grid-cols-2 lg:px-px">
      {items.map((s) => (
        <a key={s[5]} href="#" className="group relative flex bg-white-100 lg:h-[460px]">
          <HoverWash />
          <div className="relative flex w-full">
            <StoryText s={s} full />
          </div>
        </a>
      ))}
    </div>
  )
}

export default function StoriesGrid() {
  return (
    <section className="container" data-section="customer-stories">
      <div className="relative grid border-x border-solid border-white-500 lg:grid-cols-12">
        <DotPattern />
        <Feature s={STORIES[0]} borders="border-y" />
        <HalfRow items={[STORIES[1], STORIES[2]]} />
        <Feature s={STORIES[3]} mediaLeft borders="border-y" />
        <HalfRow items={[STORIES[4], STORIES[5]]} />
        <Feature s={STORIES[6]} borders="border-t" />
      </div>
    </section>
  )
}
