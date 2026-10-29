import { Block, Corners, DevButton, Edges, Guides, Overline, RowLine, u } from './Blueprint.jsx'

const pad = (n) => String(n).padStart(2, '0')

/**
 * D-SECTION header: 48-col grid, text at col 6/-6 (2.5u inset), flex-col gap 28, pt 160 / pb 80
 * (100 / 60 below lg, col 2/-2). Two-tone H2 32/36 (28/34 below lg): #fff w600 + #8f99a8 w500.
 */
export function SectionHeader({ lead, cont, button, guides = true }) {
  return (
    <div className="relative">
      {guides && (
        <div className="max-lg:hidden">
          <Guides xs={[u(2), u(22)]} />
        </div>
      )}
      <header className="relative flex flex-col gap-7 pb-[60px] pt-[100px] lg:pb-20 lg:pt-40" style={{ paddingLeft: 'var(--hx)', paddingRight: 'var(--hx)' }}>
        <div className="max-w-[20em] text-pretty font-display text-head-sm-md lg:text-head-sm">
          <h2 className="inline text-pretty font-semibold text-white-100">{lead}</h2>{' '}
          <p className="inline text-pretty font-medium text-black-800">{cont}</p>
        </div>
        <div className="flex items-center gap-2.5">
          <DevButton>{button}</DevButton>
        </div>
      </header>
    </div>
  )
}

/** Masked illustration well (mask-* utilities from the live classes, see .dev-fade). */
export function Fade({ fade = {}, className = '', style, children }) {
  const vars = Object.fromEntries(Object.entries(fade).map(([k, v]) => [`--${k}`, v]))
  return (
    <div className={`dev-fade flex items-center justify-center overflow-hidden ${className}`} style={{ ...vars, ...style }}>
      {children}
    </div>
  )
}

/**
 * Card body: inner grid of `cols` columns, content col 2/-2 (inset = width / cols), py 28.
 * Illustration area flex-1 with the `[ 0n ]` overline top-left and the art well 16px below it.
 */
function CardBody({ card, cols, variant = 'abs' }) {
  const Art = card.art
  return (
    <div className="flex size-full flex-col py-7" style={{ paddingInline: `calc(100% / ${cols})` }}>
      <div className={`relative w-full flex-1 ${card.gap12 ? 'mb-3' : 'mb-6'}`}>
        <Overline className="absolute left-0 top-0 text-black-600">[ {pad(card.n)} ]</Overline>
        {variant === 'flow' ? (
          <div className="pt-4">
            <Fade fade={card.fade} className="mx-auto aspect-[306/254] w-[calc(100%-16px)]">
              {Art && <Art />}
            </Fade>
          </div>
        ) : (
          <Fade
            fade={card.fade}
            className={`absolute top-4 h-[calc(100%-16px)] w-[calc(100%-16px)] ${card.center ? 'left-1/2 -translate-x-1/2' : 'left-0'}`}
          >
            {Art && <Art />}
          </Fade>
        )}
      </div>
      <p className="text-balance text-base text-black-800 lg:max-xl:text-sm max-md:text-sm">{card.text}</p>
    </div>
  )
}

/** Desktop card row: `h` unit rows, cards absolutely placed at x/w units, dashed row lines. */
function CardRow({ row }) {
  return (
    <div className="relative" style={{ height: u(row.h) }}>
      <RowLine top={0} />
      <RowLine top="calc(100% - 1px)" />
      {row.cards.map((c) => (
        <div key={c.n} className="absolute bg-primary-background" style={{ left: u(c.x), width: u(c.w), top: 0, bottom: 0 }}>
          <CardBody card={c} cols={c.cols} />
          <Edges />
          <Corners />
        </div>
      ))}
    </div>
  )
}

/** Desktop content-sized row of three (B4 second row): col 3/-3, grid-cols-3, art aspect 306x254. */
function AutoRow({ row }) {
  return (
    <div className="relative">
      <RowLine top={0} />
      <RowLine top="calc(100% - 1px)" />
      <div className="grid grid-cols-3" style={{ marginInline: u(2) }}>
        {row.cards.map((c) => (
          <div key={c.n} className="relative bg-primary-background">
            <CardBody card={{ ...c, gap12: true }} cols={12} variant="flow" />
            <Edges />
            <Corners />
          </div>
        ))}
      </div>
    </div>
  )
}

/** Quote strip: col 3/-3, 4u tall, 6px stripe field; quote 28/34 #b5bdc9 + right attribution. */
function Strip({ strip, mobile = false }) {
  if (mobile)
    return (
      <div className="relative bg-primary-background" style={{ height: u(9) }}>
        <div className="dev-stripes absolute inset-0 text-black-100" />
        <Edges sides="tb" />
        <Corners />
        <div className="relative flex h-full flex-col justify-between" style={{ padding: u(1) }}>
          <p className="max-w-[28em] text-balance text-xl text-white-900">{strip.quote}</p>
          <p className="whitespace-pre-line font-display text-overline uppercase text-black-600">{strip.by}</p>
        </div>
      </div>
    )
  return (
    <div className="relative" style={{ height: u(4) }}>
      <div className="absolute inset-y-0 bg-primary-background" style={{ left: u(2), right: u(2) }}>
        <div className="dev-stripes absolute inset-0 text-black-100" />
        <Edges sides="tb" />
        <Corners />
        <div className="absolute flex items-end justify-between" style={{ left: u(0.5), right: u(0.5), top: u(0.5), bottom: u(0.5) }}>
          <p className="max-w-[28em] text-balance font-display text-head-sm-md font-medium text-white-900">{strip.quote}</p>
          <p className="whitespace-pre text-end font-display text-overline uppercase text-black-600">{strip.by}</p>
        </div>
      </div>
    </div>
  )
}

/** Trailing 3u spacer with faint dashed guides at the given x (units). */
function Tail({ xs, h = 3 }) {
  return (
    <div className="relative" style={{ height: u(h) }}>
      <Guides xs={xs.map((x) => u(x))} />
    </div>
  )
}

/** Mobile card: col 2/-2 (10u) x 9u, inner grid-cols-12. */
function MobileCard({ card }) {
  return (
    <div className="relative bg-primary-background" style={{ marginInline: u(1), height: u(9) }}>
      <CardBody card={{ ...card, gap12: false }} cols={12} />
      <Edges />
      <Corners />
    </div>
  )
}

/**
 * D-SECTION (B1 / B3 / B4): header, desktop rows (max-lg:hidden), stacked mobile twin (lg:hidden).
 * `rows` items: { type: 'cards' | 'auto' | 'strip', ... }; `tail` = x units of the trailing guides.
 */
export default function CardSection({ data }) {
  const cards = data.rows.flatMap((r) => (r.type === 'strip' ? [{ strip: r.strip }] : r.cards))
  return (
    <Block innerClassName="[--hx:var(--u)] lg:[--hx:calc(var(--u)*2.5)]">
      <SectionHeader lead={data.lead} cont={data.cont} button={data.button} />
      <div className="max-lg:hidden">
        {data.rows.map((r, i) =>
          r.type === 'strip' ? <Strip key={i} strip={r.strip} /> : r.type === 'auto' ? <AutoRow key={i} row={r} /> : <CardRow key={i} row={r} />
        )}
        <Tail xs={data.tail} />
      </div>
      <div className="lg:hidden">
        {cards.map((c, i) => (c.strip ? <Strip key={i} strip={c.strip} mobile /> : <MobileCard key={i} card={c} />))}
        <div style={{ height: u(1.5) }} />
      </div>
    </Block>
  )
}
