import { Button } from '../ui.jsx'
import { DashedH, DashedV, DotPattern, GuideRow, Hairline, Hatch } from '../marketing/primitives.jsx'
import SectionDivider from '../SectionDivider.jsx'

// Page-shell primitives for the platform section library (CLONE_SPEC_PLATFORM.md 0.4 P1-P8).
// Dashed lines, guide rows, dot wells and hatch are the shared marketing primitives re-exported
// under platform names so platform pages import everything from one place.

export { DashedH, DashedV, DotPattern as DotWell, GuideRow, Hairline, Hatch as HatchFill, SectionDivider }

/** P1 v2 block: container + border-x box; full-bleed (display: contents, no borders) below lg. */
export function V2Block({ children, spacer = true, className = '', boxClassName = '', ...rest }) {
  return (
    <div className={`container flex flex-1 flex-col max-lg:contents ${className}`} {...rest}>
      <div className={`flex w-full flex-1 flex-col border-x border-solid border-white-500 max-lg:border-none ${boxClassName}`}>
        {spacer && <V2Spacer />}
        {spacer && <Hairline />}
        {children}
      </div>
    </div>
  )
}

/** 128 (64 below lg) spacer row used at the top / bottom of v2 blocks. */
export function V2Spacer() {
  return <div aria-hidden="true" className="h-16 lg:h-32" />
}

/** Between-block hairline: 1px line inside the container (1392 at 1440, 576 at 768). */
export function BlockDivider() {
  return (
    <div className="container">
      <Hairline />
    </div>
  )
}

/** P2 legacy block: container + border-x box (stays bordered below lg). */
export function LegacyBlock({ as: Tag = 'div', children, className = '', boxClassName = '', ...rest }) {
  return (
    <Tag className={`container ${className}`} {...rest}>
      <div className={`relative border-x border-solid border-white-500 ${boxClassName}`}>{children}</div>
    </Tag>
  )
}

/** P3 20px dashed stub above a legacy frame (absolute, col-2 and col-(-2) edges). */
export function GuideStub() {
  return (
    <div aria-hidden="true" className="absolute inset-x-0 -top-5 grid h-5 grid-cols-12 overflow-hidden">
      <div className="col-[2/-2] flex justify-between">
        <DashedV />
        <DashedV />
      </div>
    </div>
  )
}

/**
 * P7 vertical-stripe field (8px tile, centred 1px line) masked to fade in from the top.
 * variant: 'default' (#edeff3) | 'uc' (rgba(228,231,235,.45)); mask: 't' | 't20'.
 */
export function StripeField({ variant = 'default', mask = 't', className = '' }) {
  const m = { t: 'pl-mask-t', t20: 'pl-mask-t-20', none: '' }[mask]
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${variant === 'uc' ? 'pl-stripes-uc' : 'pl-stripes'} ${m} ${className}`}
    />
  )
}

/**
 * v2 two-tone heading: lead (h2, #1c1d1f) + inline continuation (p, #6f7988), interDisplay w500.
 * lh: 46 (split / grid / quad) | 44 (centered / stat / columns). Below lg 32/36.8.
 * `block` puts the lead on its own line (S-ORBIT).
 */
export function V2Heading({ lead, cont, lh = 46, as: Lead = 'h2', block = false, className = '' }) {
  const size = lh === 46 ? 'text-v2-head-sm lg:text-v2-head' : 'text-section-sm lg:text-section'
  return (
    <div className={`text-pretty font-display font-medium ${size} ${className}`}>
      <Lead className={`text-pretty text-black-100 ${block ? 'block' : 'inline'}`}>{lead}</Lead>
      {cont && (
        <>
          {block ? null : ' '}
          <p className="inline text-pretty font-medium text-black-700">{cont}</p>
        </>
      )}
    </div>
  )
}

/**
 * Legacy two-tone heading (text-heading-responsive-sm): lead w600 #1c1d1f + continuation w500
 * #8f99a8, 32/36 (28/34 below lg). `block` = lead on its own line at >= lg (S-TABS).
 */
export function LegacyHeading({ lead, cont, block = false, className = '' }) {
  return (
    <div className={`max-w-[20em] text-pretty font-display text-head-sm-md lg:text-head-sm ${className}`}>
      <h2 className={`text-pretty font-semibold text-black-100 ${block ? 'inline lg:block' : 'inline'}`}>{lead}</h2>{' '}
      <p className="inline text-pretty font-medium text-black-800">{cont}</p>
    </div>
  )
}

/** P2 legacy header row: grid 12, pt/pb 160/80 (120/64 below xl, 100/60 below lg), text col 2/-2. */
export function LegacyHeader({ lead, cont, block = false, center = false, className = '' }) {
  return (
    <header className={`grid grid-cols-12 pb-[60px] pt-[100px] lg:pb-16 lg:pt-[120px] xl:pb-20 xl:pt-40 ${className}`}>
      <div className={`col-[2/-2] ${center ? 'flex justify-center text-center' : ''}`}>
        <LegacyHeading lead={lead} cont={cont} block={block} className={center ? 'mx-auto' : ''} />
      </div>
    </header>
  )
}

/** Legacy stacked header: H2 40/44 w600 + p 20/26, centred column max-w 512, gap 16. */
export function StackedHeader({ title, sub, className = '' }) {
  return (
    <header className={`grid grid-cols-12 pb-[60px] pt-[100px] lg:pb-16 lg:pt-[120px] xl:pb-20 xl:pt-40 ${className}`}>
      <div className="col-[2/-2] mx-auto flex max-w-lg flex-col gap-4 text-center">
        <h2 className="text-pretty font-display text-heading-md-sm text-black-100 lg:text-heading-md">{title}</h2>
        {sub && <p className="text-pretty text-lg text-black-100 lg:text-xl">{sub}</p>}
      </div>
    </header>
  )
}

/** Overline `[ 01 ]` / `[ SALES ]`: interDisplay 12/14 w600 +0.72 uppercase tabular. */
export function Overline({ children, className = 'text-black-900' }) {
  return <p className={`font-display text-overline uppercase tabular-nums ${className}`}>{children}</p>
}

/**
 * Hero / CTA button pair (primary then outline). Below lg: h46 radius 12 16px text (px 14);
 * below md the row stacks. `dark` is only used inside .dark sections (variants come from CSS).
 */
export function CtaPair({ primary, secondary, className = '', motionStyle, motionClass = '' }) {
  const big = 'max-lg:h-[46px] max-lg:rounded-12 max-lg:px-3.5 max-lg:text-base'
  return (
    <div
      className={`flex w-full items-center gap-x-2.5 gap-y-2 max-md:flex-col ${className.includes('justify-start') ? '' : 'justify-center'} ${motionClass} ${className}`}
      style={motionStyle}
    >
      <Button variant="primary" className={big}>
        {primary}
      </Button>
      <Button variant="outline" className={big}>
        {secondary}
      </Button>
    </div>
  )
}

/**
 * HeroCopy (3.1): optional eyebrow pill (h1 inside) -> display headline -> subhead -> CTA row,
 * with the M-P1 entrance. `timing` = { dur, pill, title, sub, cta } in ms (spec section 5 table).
 * The display line is the h1 when there is no pill (UC) or the pill is a div (`pillAs="div"`, web-agent).
 */
export function HeroCopy({ pill, pillAs = 'h1', title, sub, primary = 'Start for free', secondary = 'Talk to sales', timing, align = 'center', className = '' }) {
  const m = (key) =>
    timing && timing[key] != null ? { style: { '--pl-dur': `${timing.dur}ms`, '--pl-delay': `${timing[key]}ms` } } : {}
  const c = (key) => (timing && timing[key] != null ? 'pl-enter' : '')
  const TitleTag = pill && pillAs === 'h1' ? 'h2' : 'h1'
  const PillTag = pillAs
  const items = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  return (
    <header className={`flex w-full flex-col ${items} ${className}`}>
      {pill && (
        <div className={`mb-6 inline-block w-fit rounded-13 border border-solid border-white-400 bg-white-100 px-3 py-1.5 ${c('pill')}`} {...m('pill')}>
          <PillTag className="text-hero-badge text-black-300">{pill}</PillTag>
        </div>
      )}
      <TitleTag className={`max-w-[15em] text-balance font-display text-page-hero-sm text-black-100 lg:text-page-hero ${c('title')}`} {...m('title')}>
        {title}
      </TitleTag>
      {sub && (
        <p className={`mt-4 max-w-xl text-balance text-lg text-black-300 lg:text-xl ${c('sub')}`} {...m('sub')}>
          {sub}
        </p>
      )}
      <CtaPair
        primary={primary}
        secondary={secondary}
        className={`mt-6 ${align === 'center' ? '' : 'justify-start'}`}
        motionClass={timing && timing.cta != null ? 'pl-enter-fade' : ''}
        motionStyle={m('cta').style}
      />
    </header>
  )
}
