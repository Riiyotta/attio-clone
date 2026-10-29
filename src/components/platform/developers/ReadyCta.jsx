import { Block, GridLines, UBox, u } from './Blueprint.jsx'
import {
  ActionsMock,
  AvatarMock,
  ButtonMock,
  CalendarMock,
  ChecksMock,
  InputMock,
  ListMock,
  SelectMock,
  TogglesMock,
} from './Illustrations.jsx'

// Desktop cells (24-col units, measured grid-column / row placements at 1440).
const DESKTOP = [
  [CalendarMock, 2, 1, 4, 4],
  [InputMock, 7, 1, 3, 1],
  [TogglesMock, 13, 2, 3, 1],
  [SelectMock, 17, 2, 5, 3],
  [ChecksMock, 18, 6, 2, 1],
  [ListMock, 17, 8, 5, 2],
  [ActionsMock, 2, 8, 4, 3],
  [() => <AvatarMock kind="person" />, 8, 9, 1, 1],
  [() => <AvatarMock kind="letter" />, 9, 9, 1, 1],
  [() => <AvatarMock kind="cube" />, 10, 9, 1, 1],
  [ButtonMock, 14, 10, 2, 1],
]
// Mobile cells (12-col units, identical placements measured at 768 and 390).
const MOBILE = [
  [CalendarMock, 1, 7, 4, 4],
  [ButtonMock, 6, 7, 2, 1],
  [TogglesMock, 7, 9, 3, 1],
  [ChecksMock, 8, 11, 2, 1],
  [ActionsMock, 7, 13, 4, 3],
  [InputMock, 2, 13, 3, 1],
  [SelectMock, 1, 15, 5, 3],
]

/** Floating mock cell; plus-lighter overlay fades in on hover (150ms). */
function Cell({ Mock, x, y, w, h }) {
  return (
    <div className="group absolute z-10" style={{ left: u(x), top: u(y), width: u(w), height: u(h) }}>
      <Mock />
      <div aria-hidden="true" className="dev-mock-glow pointer-events-none absolute inset-0 bg-primary-background" />
    </div>
  )
}

function Heading({ data, mobile }) {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-4">
      <h2 className={`text-center font-display text-white-100 ${mobile ? 'text-2xl' : 'text-head-sm'}`}>{data.title}</h2>
      <a href="#" className="whitespace-nowrap border-b border-dotted border-black-600 font-mono text-base text-black-600">
        {data.chip[0]}
        <span className="text-white-400">{data.chip[1]}</span>
        {data.chip[2]}
      </a>
    </div>
  )
}

/**
 * D-CTA (B8): replaces the shared final CTA. 13u blueprint block, centred lined box col 9/17
 * rows 6/9 with H2 32/36 + mono command chip, floating dark mock windows on the grid.
 * Mobile: 19 rows of the 12-col grid, heading box rows 1/6 (H2 24/30 w500).
 */
export default function ReadyCta({ data }) {
  return (
    <Block divider={false}>
      <div className="relative max-lg:hidden" style={{ height: u(13) }}>
        <GridLines cols={24} rows={13} />
        <UBox x={8} y={5} w={8} h={3}>
          <Heading data={data} />
        </UBox>
        {DESKTOP.map(([Mock, x, y, w, h], i) => (
          <Cell key={i} Mock={Mock} x={x} y={y} w={w} h={h} />
        ))}
      </div>
      <div className="relative lg:hidden" style={{ height: u(19) }}>
        <GridLines cols={12} rows={19} />
        <UBox x={0} y={0} w={12} h={5} edges="b">
          <Heading data={data} mobile />
        </UBox>
        {MOBILE.map(([Mock, x, y, w, h], i) => (
          <Cell key={i} Mock={Mock} x={x} y={y} w={w} h={h} />
        ))}
      </div>
    </Block>
  )
}
