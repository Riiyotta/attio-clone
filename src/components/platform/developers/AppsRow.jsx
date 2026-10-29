import AppIcon from '../../apps/AppIcon.jsx'
import { Block, Corners, Edges, Guides, RowLine, u } from './Blueprint.jsx'
import { SectionHeader } from './CardSection.jsx'

function RepoGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0 fill-current">
      <path d="M8 1.2a6.8 6.8 0 0 0-2.15 13.25c.34.06.46-.15.46-.33v-1.2c-1.9.41-2.3-.8-2.3-.8-.31-.79-.76-1-.76-1-.62-.42.05-.41.05-.41.68.05 1.04.7 1.04.7.61 1.04 1.6.74 1.99.57.06-.44.24-.74.43-.91-1.51-.17-3.1-.76-3.1-3.37 0-.74.27-1.35.7-1.83-.07-.17-.3-.86.07-1.8 0 0 .57-.18 1.87.7a6.5 6.5 0 0 1 3.4 0c1.3-.88 1.87-.7 1.87-.7.37.94.14 1.63.07 1.8.44.48.7 1.09.7 1.83 0 2.62-1.6 3.2-3.11 3.36.25.21.46.62.46 1.26v1.87c0 .18.12.4.47.33A6.8 6.8 0 0 0 8 1.2" />
    </svg>
  )
}

function ArrowR() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" className="arrow-shift shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

/** App tile content: icon box (59x51 desktop; 38x22 / 77x54 below lg) + 14/20-16/22 label. */
function AppTile({ app, i }) {
  return (
    <a href="#" className="group flex size-full flex-col items-center" style={{ paddingTop: 'var(--app-pt)' }}>
      <span className="relative flex h-[22px] w-[38px] items-center justify-center md:h-[54px] md:w-[77px] lg:h-[51px] lg:w-[59px]">
        <span aria-hidden="true" className="dev-app-well pointer-events-none absolute -inset-2.5 bg-black-100" />
        <span className="relative block aspect-square h-full">
          <AppIcon seed={app.seed} size="100%" className="!size-full" />
        </span>
      </span>
      <p className="underline-anim mt-[22px] text-balance text-center text-sm text-black-800 md:mt-[54px] md:text-base lg:mt-[51px]">{app.name}</p>
    </a>
  )
}

/**
 * D-APPS (B7). Desktop: 5 tiles of 4u x 4u at col 3/-3 (12-col 2/4 ... 10/12), 2u stripe strip,
 * 1u link row (h3 16/22 right-aligned + repo glyph + arrow), 3u tail.
 * Mobile: 2x2 tiles of 6u x 5u (5th app hidden), 3u strip, 3u link row, 1.5u tail.
 */
export default function AppsRow({ data }) {
  return (
    <Block innerClassName="[--hx:var(--u)] lg:[--hx:calc(var(--u)*2.5)] [--app-pt:calc(var(--u)*1.73)] lg:[--app-pt:calc(var(--u)*79/57.917)]">
      <SectionHeader lead={data.lead} cont={data.cont} button={data.button} />
      <div className="max-lg:hidden">
        <div className="relative" style={{ height: u(4) }}>
          <RowLine top={0} />
          <RowLine top="calc(100% - 1px)" />
          {data.apps.map((a, i) => (
            <div key={a.name} className="absolute inset-y-0 bg-primary-background" style={{ left: u(2 + i * 4), width: u(4) }}>
              <AppTile app={a} i={i} />
              <Edges />
              <Corners />
            </div>
          ))}
        </div>
        <div className="relative" style={{ height: u(2) }}>
          <div className="absolute inset-y-0 overflow-hidden bg-primary-background" style={{ left: u(2), right: u(2) }}>
            <div className="dev-stripes absolute inset-0 text-black-100" />
            <Edges sides="lr" />
          </div>
        </div>
        <div className="relative" style={{ height: u(1) }}>
          <RowLine top={0} />
          <RowLine top="calc(100% - 1px)" />
          <div className="absolute inset-y-0 bg-primary-background" style={{ left: u(2), right: u(2) }}>
            <Edges />
            <Corners />
            <a href="#" className="group absolute inset-y-0 right-0 flex items-center gap-1.5 text-black-800" style={{ paddingRight: u(0.5) }}>
              <RepoGlyph />
              <h3 className="underline-anim max-w-full truncate text-pretty text-base">{data.link}</h3>
              <ArrowR />
            </a>
          </div>
        </div>
        <div className="relative" style={{ height: u(3) }}>
          <Guides xs={[u(2), u(22)]} />
        </div>
      </div>
      <div className="lg:hidden">
        <div className="grid grid-cols-2">
          {data.apps.slice(0, 4).map((a, i) => (
            <div key={a.name} className="relative bg-primary-background" style={{ height: u(5) }}>
              <AppTile app={a} i={i} />
              <Edges sides={i < 2 ? 'tb' : 'b'} />
              <Corners />
            </div>
          ))}
        </div>
        <div className="relative overflow-hidden" style={{ height: u(3) }}>
          <div className="dev-stripes absolute inset-0 text-black-100" />
        </div>
        <div className="relative bg-primary-background" style={{ height: u(3) }}>
          <Edges sides="tb" />
          <Corners />
          <a href="#" className="group flex h-full items-center gap-1.5 text-black-800 md:justify-end" style={{ paddingInline: u(1) }}>
            <span className="max-md:hidden">
              <RepoGlyph />
            </span>
            <h3 className="underline-anim text-pretty text-base">{data.linkMobile}</h3>
            <ArrowR />
          </a>
        </div>
        <div style={{ height: u(1.5) }} />
      </div>
    </Block>
  )
}
