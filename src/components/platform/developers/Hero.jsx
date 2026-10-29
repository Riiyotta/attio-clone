import { Block, DevButton, GridLines, Overline, u } from './Blueprint.jsx'
import { HeroArt } from './Illustrations.jsx'

function Copy({ data }) {
  return (
    <>
      <Overline className="relative text-black-800">{data.overline}</Overline>
      <h2 className="relative mt-6 font-display text-page-hero-sm text-white-100 lg:text-page-hero">{data.title}</h2>
      <p className="relative mt-4 max-w-[28em] text-balance text-lg text-white-100">{data.sub}</p>
      <div className="relative mt-6 flex w-full items-center gap-2.5">
        <DevButton variant="primary">{data.primary}</DevButton>
        <DevButton>{data.secondary}</DevButton>
      </div>
    </>
  )
}

/**
 * D-HERO (B0). Desktop: 12 unit rows of the 24-col line grid; copy col 3/14 vertically centred
 * (static at first paint, no entrance motion on live); right panel col 15/-1 opaque with the
 * 579x579 line art at rows 2/-2 and dashed lines at its top/bottom.
 * Below lg: art in the first 12 rows (col 2/-2, rows 2/12), copy centred in the remaining rows
 * (8 at md, 12 below md), measured 956.7 / 680 tall.
 * Text shadows (`text-shadow-md` / `-lg` on live) were not measured and are omitted.
 */
export default function Hero({ data }) {
  return (
    <Block>
      <div className="relative max-lg:hidden" style={{ height: u(12) }}>
        <GridLines cols={24} rows={12} />
        <div className="absolute flex flex-col justify-center" style={{ left: u(2), width: u(11), top: 0, bottom: 0 }}>
          <Copy data={data} />
        </div>
        <div className="absolute inset-y-0 right-0 bg-primary-background" style={{ left: u(14) }}>
          <span aria-hidden="true" className="dev-dash-h absolute inset-x-0 h-px text-black-300" style={{ top: u(1) }} />
          <span aria-hidden="true" className="dev-dash-h absolute inset-x-0 h-px text-black-300" style={{ top: u(11) }} />
          <div className="absolute inset-x-0" style={{ top: u(1), height: u(10) }}>
            <HeroArt />
          </div>
        </div>
      </div>
      <div className="relative h-[calc(var(--u)*24)] md:h-[calc(var(--u)*20)] lg:hidden">
        <GridLines cols={12} rows={24} className="md:hidden" />
        <GridLines cols={12} rows={20} className="max-md:hidden" />
        <div className="absolute bg-primary-background" style={{ left: u(1), top: u(1), width: u(10), height: u(10) }}>
          <HeroArt />
        </div>
        <div className="absolute inset-x-0 bottom-0 flex flex-col justify-center" style={{ top: u(12), paddingInline: u(1) }}>
          <Copy data={data} />
        </div>
      </div>
    </Block>
  )
}
