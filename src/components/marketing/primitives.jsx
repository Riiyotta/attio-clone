import { useId } from 'react'

// Shared section shell pieces for the secondary pages (CLONE_SPEC_PAGES.md §0.3).

/** `container` -> inner box with border-x #e4e7ec. */
export function Section({ as: Tag = 'div', className = '', boxClassName = '', children, ...rest }) {
  return (
    <Tag className={`container ${className}`} {...rest}>
      <div className={`relative border-x border-solid border-white-500 ${boxClassName}`}>{children}</div>
    </Tag>
  )
}

/** 1px full-width hairline between sections (same as the homepage section-divider). */
export function Hairline({ className = '' }) {
  return (
    <svg aria-hidden="true" width="100%" height="1" preserveAspectRatio="none" className={`block h-px w-full text-white-500 ${className}`}>
      <rect width="100%" height="1" fill="currentColor" />
    </svg>
  )
}

/** Vertical dashed 1px line (stroke #e4e7ec, dasharray 4 6, round caps). */
export function DashedV({ className = '' }) {
  return (
    <svg aria-hidden="true" width="1" height="100%" preserveAspectRatio="none" className={`block h-full w-px shrink-0 overflow-visible text-white-500 ${className}`}>
      <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
    </svg>
  )
}

/** Horizontal dashed 1px line. */
export function DashedH({ className = '' }) {
  return (
    <svg aria-hidden="true" width="100%" height="1" preserveAspectRatio="none" className={`block h-px w-full overflow-visible text-white-500 ${className}`}>
      <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
    </svg>
  )
}

/**
 * GuideRow: decorative spacer, 160 (>=1200) / 120 (992-1199) / 100 (<992). Col 2/-2 flex
 * justify-between with dashed vertical lines. `lines=3` adds a centre line.
 */
export function GuideRow({ lines = 2, heightClass = 'h-[100px] lg:h-[120px] xl:h-40', className = '', hideBelowLg = false }) {
  return (
    <div aria-hidden="true" className={`grid grid-cols-12 ${heightClass} ${hideBelowLg ? 'max-lg:hidden' : ''} ${className}`}>
      <div className="col-[2/-2] flex justify-between">
        {Array.from({ length: lines }, (_, i) => (
          <DashedV key={i} />
        ))}
      </div>
    </div>
  )
}

/** Hatched gutter fill (125deg, 6px gap, 1px #f3f4f6 / dark #2e3238). */
export function Hatch({ className = '', dark = false }) {
  return <div aria-hidden="true" className={`${dark ? 'bg-hatch-dark' : 'bg-hatch'} ${className}`} />
}

/** DotPattern: 10x10 tile, 1x1 dot at (5.5,5.5) #d3d8df. `masked` fades it out toward the top. */
export function DotPattern({ masked = false, className = '', motion }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg
      aria-hidden="true"
      data-motion={motion}
      className={`pointer-events-none absolute inset-0 h-full w-full text-white-700 ${masked ? 'dot-mask-top' : ''} ${className}`}
    >
      <defs>
        <pattern id={`dots-${id}`} width="10" height="10" patternUnits="userSpaceOnUse">
          <rect x="5.5" y="5.5" width="1" height="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#dots-${id})`} />
    </svg>
  )
}

/** CellGrid: gap 1px on #e4e7ec with 1px padding, white cells (cells supply their own bg). */
export function CellGrid({ className = '', children, ...rest }) {
  return (
    <div className={`grid gap-px bg-white-500 p-px ${className}`} {...rest}>
      {children}
    </div>
  )
}

export function HoverWash() {
  return <span aria-hidden="true" className="hover-wash" />
}

/** Hero badge pill (h1 inside): radius 13, 1px #edeff3, padding 6 12, 13/18.2. */
export function HeroBadge({ children, as: Tag = 'h1', className = '', ...rest }) {
  return (
    <div className={`inline-block w-fit rounded-13 border border-solid border-white-400 bg-white-100 px-3 py-1.5 ${className}`} {...rest}>
      <Tag className="text-hero-badge text-black-300">{children}</Tag>
    </div>
  )
}

/**
 * C2 SectionHead: two-tone heading, H2 lead (600 #1c1d1f) + P continuation (500 #8f99a8) inline.
 * pt/pb 160/80 (>=1200), 120/64 (992-1199), 100/60 (<992). Text block col 2/-2, max-width 20em.
 */
export function SectionHead({ lead, cont, center = false, className = '', padClass = 'pb-[60px] pt-[100px] lg:pb-16 lg:pt-[120px] xl:pb-20 xl:pt-40', children }) {
  return (
    <div className={`grid grid-cols-12 ${padClass} ${className}`}>
      <div className={`col-[2/-2] ${center ? 'flex flex-col items-center text-center' : ''}`}>
        <div className={`max-w-[20em] text-head-sm-md mix-blend-multiply lg:text-head-sm ${center ? 'mx-auto' : ''}`}>
          <TwoTone lead={lead} cont={cont} />
        </div>
        {children}
      </div>
    </div>
  )
}

export function TwoTone({ lead, cont, as: Lead = 'h2' }) {
  return (
    <>
      <Lead className="inline text-pretty font-semibold text-black-100">{lead}</Lead>{' '}
      <p className="inline text-pretty font-medium text-black-800">{cont}</p>
    </>
  )
}

/** Centered stack head: H2 40/44 600 + P 20/26 #1c1d1f, gap 16, max-width 512 (or custom). */
export function CenteredHead({ title, sub, maxW = 'max-w-[512px]', titleClass = 'text-black-100', className = '' }) {
  return (
    <div className={`mx-auto flex ${maxW} flex-col items-center gap-4 text-center ${className}`}>
      <h2 className={`text-balance text-heading-md-sm lg:text-heading-md ${titleClass}`}>{title}</h2>
      {sub && <p className="text-balance text-lg text-black-100 lg:text-xl">{sub}</p>}
    </div>
  )
}

/** 14px arrow-right (generic stroke). */
export function Arrow({ className = '' }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

/** Generic check (14px, used in plan feature chips). */
export function Check({ size = 14, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden="true" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7.4 5.4 10 11 3.6" />
    </svg>
  )
}
