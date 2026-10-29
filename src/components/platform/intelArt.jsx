import { Icon } from '../mock.jsx'
import { LayoutArt } from './layoutArt.jsx'

// 1.3.0: the three assistant-intel cell compositions (stale-record list, permission rings, approval
// cards), shared by /platform/universal-context (media grid) and /platform/ask (assistant intel).
// Block layout follows the live cells; all content is invented.

export function IntelListArt() {
  return <LayoutArt box={[416, 329]} blocks={[{ k: 'frame', x: 68, y: 33, w: 300, h: 58 }, { k: 'row', x: 84, y: 41, w: 200, h: 20, glyph: true, text: 'Quarrystone', seed: 2 }, { k: 'row', x: 88, y: 65, w: 220, h: 16, text: 'Waiting on legal sign-off', text_cls: 'text-[12px]' }, { k: 'frame', x: 68, y: 100, w: 300, h: 58 }, { k: 'row', x: 84, y: 108, w: 200, h: 20, glyph: true, text: 'Lumenaut', seed: 3 }, { k: 'row', x: 88, y: 132, w: 220, h: 16, text: 'Asked for a pilot in Q1', text_cls: 'text-[12px]' }, { k: 'frame', x: 68, y: 167, w: 300, h: 58 }, { k: 'row', x: 84, y: 175, w: 200, h: 20, avatar: 16, text: 'Theo Laurent', seed: 4 }, { k: 'row', x: 88, y: 199, w: 220, h: 16, text: 'No reply in two weeks', text_cls: 'text-[12px]' }, { k: 'frame', x: 68, y: 234, w: 300, h: 58 }, { k: 'row', x: 84, y: 242, w: 200, h: 20, glyph: true, text: 'Tidewell Bank', seed: 5 }, { k: 'row', x: 88, y: 266, w: 220, h: 16, text: 'Quarterly report not filed', text_cls: 'text-[12px]' }]} />
}

export function IntelRingsArt() {
  return <LayoutArt box={[416, 329]} blocks={[{ k: 'frame', x: 83, y: 36, w: 250, h: 250, cls: 'rounded-full border-dashed border-white-700 bg-transparent' }, { k: 'frame', x: 122, y: 75, w: 173, h: 173, cls: 'rounded-full border-white-700 bg-transparent' }, { k: 'frame', x: 172, y: 125, w: 73, h: 73, cls: 'rounded-full bg-white-100 shadow-mock-card' }, { k: 'node', x: 196, y: 149, w: 24, h: 24, node: <span className="flex size-full items-center justify-center text-black-600"><Icon name="pin" size={18} /></span> }, { k: 'fill', x: 140, y: 161, w: 24, h: 1, cls: 'bg-black-700' }, { k: 'fill', x: 254, y: 161, w: 24, h: 1, cls: 'bg-black-700' }]} />
}

export function IntelApprovalArt() {
  return <LayoutArt box={[416, 329]} blocks={[{ k: 'row', x: 55, y: 40, w: 160, h: 22, avatar: 18, seed: 0 }, { k: 'frame', x: 53, y: 72, w: 293, h: 54 }, { k: 'row', x: 65, y: 80, w: 120, h: 18, text: 'Change title', text_cls: 'text-[12px]' }, { k: 'row', x: 279, y: 80, w: 60, h: 18, icon: 'check', text: 'Approve', text_cls: 'text-[12px]' }, { k: 'row', x: 65, y: 106, w: 120, h: 18, text: 'VP Operations' }, { k: 'row', x: 55, y: 156, w: 160, h: 22, glyph: true, text: 'Brightwater Labs', seed: 1 }, { k: 'frame', x: 53, y: 186, w: 293, h: 56 }, { k: 'row', x: 65, y: 194, w: 120, h: 18, text: 'Last round', text_cls: 'text-[12px]' }, { k: 'row', x: 279, y: 194, w: 60, h: 18, icon: 'check', text: 'Approve', text_cls: 'text-[12px]' }, { k: 'pill', x: 65, y: 220, w: 104, h: 20, text: '$40M – $60M', round: 'rounded-4 !bg-art-haze !text-art-navy !border-art-haze' }, { k: 'row', x: 65, y: 282, w: 120, h: 18, text: 'Change owner', text_cls: 'text-[12px] opacity-40' }, { k: 'row', x: 279, y: 282, w: 60, h: 18, icon: 'check', text: 'Approve', text_cls: 'text-[12px] opacity-40' }]} />
}
