import { Icon } from '../mock.jsx'
import { DashedH, DotWell, GuideRow, GuideStub, Hairline, HatchFill, LegacyBlock, LegacyHeader, LegacyHeading, Overline, V2Block, V2Heading, V2Spacer } from './shell.jsx'

/* ------------------------------------------------------------------ */
/* S-GRID3 (3.4): v2 three-up media cards (3 or 6 cards)                 */
/* ------------------------------------------------------------------ */
export function MediaGrid3({ lead, cont, cards, className = '' }) {
  return (
    <V2Block className={className} data-section="media-grid-three">
      <div className="px-8 pb-10 pt-20 lg:px-[4.167%] lg:pt-[120px]">
        <V2Heading lead={lead} cont={cont} className="max-w-[768px]" />
      </div>
      <div className="grid border-t border-solid border-white-500 lg:grid-cols-3">
        {cards.map((c, i) => (
          <article
            key={c.title}
            className={`flex min-w-0 flex-col gap-8 border-solid border-white-500 p-8 ${i > 0 ? 'border-t' : ''} ${i % 3 ? 'lg:border-l' : ''} ${i < 3 ? 'lg:border-t-0' : 'lg:border-t'}`}
          >
            <div className="relative aspect-[400/316] w-full overflow-hidden max-lg:mx-auto max-lg:max-w-[400px]">
              <div className="absolute inset-0">{c.media}</div>
            </div>
            <div>
              <h3 className="text-lg text-black-300">{c.title}</h3>
              <p className="mt-1 text-base text-black-800">{c.body}</p>
            </div>
          </article>
        ))}
      </div>
    </V2Block>
  )
}

/* ------------------------------------------------------------------ */
/* Legacy card frame shared by S-GRID-L3 / S-GRID-L2Q (3.5 / 3.6)        */
/* ------------------------------------------------------------------ */
function LegacyFrame({ children }) {
  return (
    <div className="relative grid grid-cols-12">
      <GuideStub />
      <HatchFill className="absolute inset-0" />
      <DashedH className="absolute inset-x-0 top-0" />
      <div className="relative col-[2/-2]">{children}</div>
      <DashedH className="absolute inset-x-0 bottom-0" />
    </div>
  )
}

/**
 * S-GRID-L3: legacy three-up cards in a dashed, hatched frame. variant 'media' (321 square dot
 * well + artwork) or 'icon' (text + 20px icon, no media).
 */
export function LegacyGrid3({ lead, cont, cards, variant = 'media', className = '' }) {
  return (
    <LegacyBlock className={className} data-section="legacy-card-grid-three">
      <LegacyHeader lead={lead} cont={cont} />
      <LegacyFrame>
        <div className="grid grid-cols-1 gap-px bg-white-500 p-px lg:grid-cols-3">
          {cards.map((c) => (
            <div key={c.title} className="grid grid-cols-12 bg-white-100">
              <div className="col-[2/-2] flex flex-col py-7">
                {variant === 'media' && (
                  <div className="relative mb-6 aspect-square w-full md:max-lg:aspect-[1.618/1]">
                    <DotWell className={c.maskWell ? 'pl-mask-well' : ''} />
                    <div className="absolute inset-0">{c.media}</div>
                  </div>
                )}
                <div className="flex flex-1 flex-col justify-between">
                  <h3 className={`text-balance text-lg font-semibold text-black-300 ${variant === 'icon' ? 'flex items-center gap-2' : ''}`}>
                    {variant === 'icon' && <Icon name={c.icon} size={20} className="text-black-700" />}
                    {c.title}
                  </h3>
                  <p className="mt-1.5 text-balance text-black-700 lg:max-xl:text-sm">{c.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </LegacyFrame>
      <GuideRow />
    </LegacyBlock>
  )
}

/**
 * S-GRID-L2Q: legacy 2x2 indexed media cards; optional inline serif quote row after the first
 * two cards (moved to the end below lg). quote = { text, name, role } | undefined.
 */
export function LegacyGrid2Q({ lead, cont, cards, quote, className = '' }) {
  const card = (c, i) => (
    <div key={c.title} className="grid grid-cols-12 bg-white-100">
      <div className="col-[2/-2] py-10">
        <Overline>{`[${String(i + 1).padStart(2, '0')}]`}</Overline>
        <div className="relative mb-9 mt-8 aspect-[5/3]">
          <div className="absolute inset-0">{c.media}</div>
        </div>
        <h3 className="text-lg font-semibold text-black-300 max-md:text-base">{c.title}</h3>
        <p className="mt-1 max-w-[24em] text-balance text-black-700 max-md:text-sm">{c.body}</p>
      </div>
    </div>
  )
  return (
    <LegacyBlock as="section" className={className} data-section="legacy-card-grid-quad">
      <LegacyHeader lead={lead} cont={cont} />
      <LegacyFrame>
        <div className="grid grid-cols-1 gap-px bg-white-500 p-px lg:grid-cols-2">
          {card(cards[0], 0)}
          {card(cards[1], 1)}
          {quote && (
            <div className="relative grid grid-cols-12 bg-white-100 max-lg:order-last lg:col-span-2">
              <DotWell />
              <div className="relative col-[2/-2] flex flex-col items-center py-24 lg:py-32">
                <p className="max-w-[20em] text-pretty text-center font-quote text-serif-quote-sm text-black-100 lg:text-serif-quote">{quote.text}</p>
                <p className="mt-10 text-center text-sm font-semibold text-black-300">{quote.name}</p>
                <p className="mt-1 text-center text-sm text-black-300">{quote.role}</p>
              </div>
            </div>
          )}
          {cards.slice(2).map((c, i) => card(c, i + 2))}
        </div>
      </LegacyFrame>
      <GuideRow />
    </LegacyBlock>
  )
}

/* ------------------------------------------------------------------ */
/* S-QUAD (3.11): heading + 2x2 tagged cards                             */
/* ------------------------------------------------------------------ */
const QUAD_BORDERS = ['', 'border-t md:border-l md:border-t-0', 'border-t', 'border-t md:border-l']
export function TaggedQuad({ lead, cont, cards, className = '' }) {
  return (
    <V2Block className={className} data-section="tagged-quad">
      <div className="grid grid-cols-12 lg:grid-cols-[13fr_11fr]">
        <div className="col-[2/-2] pb-[60px] pt-[100px] lg:col-[1/2] lg:px-[7.692%] lg:py-[58px]">
          <V2Heading lead={lead} cont={cont} className="max-w-[520px]" />
        </div>
        <div className="col-[1/-1] grid border-t border-solid border-white-500 md:grid-cols-2 lg:col-[2/3] lg:border-l lg:border-t-0">
          {cards.map((c, i) => (
            <article key={c.title} className={`grid grid-cols-12 border-solid border-white-500 py-8 md:min-h-64 md:p-8 lg:min-h-[319px] lg:max-xl:p-6 ${QUAD_BORDERS[i % 4]}`}>
              <div className="col-[2/-2] flex flex-col justify-between gap-6 md:col-span-full md:gap-12">
                <Overline>{c.tag}</Overline>
                <div className="mt-auto flex flex-col gap-1">
                  <h3 className="text-lg text-black-100">{c.title}</h3>
                  <p className="text-base text-black-700">{c.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Hairline />
      <V2Spacer />
    </V2Block>
  )
}

/* ------------------------------------------------------------------ */
/* S-ICON-ROW / S-SPLIT-ICONS (3.10)                                     */
/* ------------------------------------------------------------------ */
export function IconRow({ lead, cont, items, className = '' }) {
  return (
    <V2Block className={className} data-section="icon-row">
      <header className="grid grid-cols-12 px-[4.167%] pb-[60px] pt-[100px] lg:pb-16 lg:pt-[120px] xl:py-14">
        <div className="col-span-full lg:min-h-[208px]">
          <V2Heading lead={lead} cont={cont} lh={44} className="max-w-[520px] mix-blend-multiply" />
        </div>
      </header>
      <div className="grid grid-cols-1 border-y border-solid border-white-500 lg:grid-cols-3">
        {items.map((it, i) => (
          <div key={it.title} className={`flex min-h-[222px] flex-col gap-16 border-solid border-white-500 p-8 ${i ? 'border-t lg:border-l lg:border-t-0' : ''}`}>
            <Icon name={it.icon} size={24} className="text-black-500" />
            <div>
              <h3 className="text-lg text-black-300">{it.title}</h3>
              <p className="max-w-80 text-base text-black-700">{it.body}</p>
            </div>
          </div>
        ))}
      </div>
      <V2Spacer />
    </V2Block>
  )
}

export function SplitIcons({ lead, cont, items, className = '' }) {
  return (
    <V2Block className={className} data-section="split-icons">
      <div className="grid lg:grid-cols-[13fr_11fr]">
        <div className="px-8 py-14 lg:px-[7.692%] lg:py-[58px]">
          <V2Heading lead={lead} cont={cont} className="max-w-[672px]" />
        </div>
        <div className="border-t border-solid border-white-500 lg:border-l lg:border-t-0">
          {items.map((it, i) => (
            <article key={it.title} className={`flex flex-col gap-16 border-solid border-white-500 p-8 ${i ? 'border-t' : ''}`}>
              <Icon name={it.icon} size={24} className="text-black-500" />
              <div>
                <h3 className="text-lg text-black-300">{it.title}</h3>
                <p className="mt-0.5 text-base text-black-700">{it.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Hairline />
    </V2Block>
  )
}

/* ------------------------------------------------------------------ */
/* S-BENTO (3.21): legacy centred header + 8-col bento of 4 cards        */
/* ------------------------------------------------------------------ */
export function Bento({ lead, cont, cards, className = '' }) {
  const spans = ['md:col-span-5', 'md:col-span-3', 'md:col-span-3', 'md:col-span-5']
  return (
    <V2Block spacer={false} className={className} data-section="bento-grid">
      <header className="grid grid-cols-12 pb-[60px] pt-[100px] lg:pb-16 lg:pt-[120px] xl:pb-20 xl:pt-40">
        <div className="col-[2/-2] flex justify-center text-center">
          <LegacyHeading lead={lead} cont={cont} className="mx-auto" />
        </div>
      </header>
      <div className="grid grid-cols-1 gap-px border-t border-solid border-white-500 bg-white-500 md:grid-cols-8">
        {cards.map((c, i) => (
          <div key={c.title} className={`grid min-w-0 grid-cols-12 bg-white-100 py-8 lg:block lg:p-8 ${spans[i % 4]}`}>
            <div className="col-[2/-2] flex h-full flex-col gap-8">
              <div className="relative aspect-[3/2] overflow-hidden lg:aspect-auto lg:h-[316px]">
                <div className="absolute inset-0">{c.media}</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black-300 max-md:text-base">{c.title}</h3>
                <p className="mt-1.5 text-black-600 max-md:text-sm">{c.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </V2Block>
  )
}
