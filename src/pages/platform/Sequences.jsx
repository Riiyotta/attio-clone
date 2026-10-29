import PageShell from '../../components/marketing/PageShell.jsx'
import { LayoutArt } from '../../components/platform/layoutArt.jsx'
import { Icon } from '../../components/mock.jsx'
import { LegacyGrid2Q, LegacyGrid3, LinksGrid, PanelArt, PlatformCta, ScrollQuote, SectionDivider, SplitAccordionLegacy, TileArt } from '../../components/platform/index.js'
import { HeroSequences, Showcase } from '../../components/platform/legacy.jsx'
import { LINKS_HEAD, PLATFORM_LINKS } from './_links.js'

// /platform/sequences (CLONE_SPEC_PLATFORM T2 legacy). Invented copy sized to Appendix A counts.
const TIMING = { dur: 1000, pill: 4100, title: 4200, sub: 4300, cta: 4400 } // M-P1, waits for the mock

const HERO = {
  pill: 'Sequences', // c9
  title: 'From first touch to signature.', // c25
  sub: 'Move from the first hello to the signed order with timely emails that go out at the right moment.', // c92
}
const STEPS = [
  { subject: 'Welcome to your trial', when: '3 days ago', wait: 'After 2 business days', lines: 9, height: 269 },
  { subject: 'Next steps', when: 'Yesterday', wait: 'Completed', lines: 2, height: 101 },
]

const SHOWCASE = { lead: 'Tour the sequence editor.', cont: 'Turn buyer interest into emails that send themselves.' }

const GRID3 = {
  lead: 'Replies chase themselves.', // c22
  cont: 'Corvale keeps every thread alive while your team works on closing deals.', // c68
  cards: [
    { title: 'Enrol people on a signal.', body: 'Choose the cue, a signup, a form or an event, and the contact joins.', media: <LayoutArt box={[321, 321]} contained blocks={[{ k: 'frame', x: 36, y: 45, w: 248, h: 78 }, { k: 'row', x: 51, y: 56, w: 160, h: 20, glyph: true, text: 'Trial started', seed: 3 }, { k: 'pill', x: 226, y: 56, w: 48, h: 20, text: 'Cue' }, { k: 'row', x: 47, y: 96, w: 120, h: 18, text: 'Nadia Brooks', text_cls: 'text-[12px]' }, { k: 'fill', x: 159, y: 123, w: 1, h: 35, cls: 'bg-white-600' }, { k: 'frame', x: 36, y: 158, w: 248, h: 117 }, { k: 'row', x: 52, y: 169, w: 160, h: 20, icon: 'send', text: 'Add to sequence' }, { k: 'frame', x: 48, y: 198, w: 224, h: 64, cls: 'bg-white-200' }, { k: 'row', x: 59, y: 205, w: 160, h: 18, icon: 'checkCircle', text: 'First email sent today', text_cls: 'text-[11px]' }, { k: 'row', x: 59, y: 238, w: 190, h: 18, text: 'A quick hello from Northwind', text_cls: 'text-[12px]' }]} /> },
    { title: 'One sequence, many senders.', body: 'Build a single sequence and send it from the right owner.', media: <LayoutArt box={[321, 321]} contained blocks={[{ k: 'frame', x: 63, y: 62, w: 188, h: 188, cls: 'rounded-full border-dashed border-white-700 bg-transparent' }, { k: 'frame', x: 97, y: 96, w: 120, h: 120, cls: 'rounded-full border-white-600 bg-transparent' }, { k: 'frame', x: 127, y: 126, w: 60, h: 60, cls: 'rounded-8 bg-white-100 shadow-mock-card' }, { k: 'pill', x: 196, y: 50, w: 52, h: 22, text: 'Robin', round: 'rounded-6 !bg-traffic-green !text-white-100' }, { k: 'row', x: 199, y: 74, w: 60, h: 14, text: 'Success', text_cls: 'text-[11px] !text-traffic-green' }, { k: 'pill', x: 30, y: 192, w: 48, h: 22, text: 'Tess', round: 'rounded-6 !bg-art-iris !text-white-100' }, { k: 'row', x: 38, y: 216, w: 50, h: 14, text: 'Sales', text_cls: 'text-[11px] !text-art-iris' }, { k: 'pill', x: 236, y: 202, w: 54, h: 22, text: 'Owen', round: 'rounded-6 !bg-art-ember !text-white-100' }, { k: 'row', x: 236, y: 226, w: 60, h: 14, text: 'Product', text_cls: 'text-[11px] !text-art-ember' }]} /> },
    { title: 'Sending runs on schedule.', body: 'No exports, no manual syncs. Win back hours every week.', media: <LayoutArt box={[321, 321]} contained blocks={[{ k: 'frame', x: 22, y: 10, w: 276, h: 48, cls: 'bg-white-100 opacity-50' }, { k: 'frame', x: 22, y: 68, w: 276, h: 52 }, { k: 'avatar', x: 30, y: 78, w: 28, h: 28, seed: 1 }, { k: 'card', x: 62, y: 74, w: 230, h: 40, pad: 'px-1 py-0 !border-0 !shadow-none', lines: 2, lineH: 17, seed: 4 }, { k: 'frame', x: 22, y: 136, w: 276, h: 52 }, { k: 'avatar', x: 29, y: 146, w: 28, h: 28, seed: 2 }, { k: 'card', x: 62, y: 142, w: 230, h: 40, pad: 'px-1 py-0 !border-0 !shadow-none', lines: 2, lineH: 17, seed: 5 }, { k: 'frame', x: 22, y: 204, w: 276, h: 52 }, { k: 'avatar', x: 29, y: 214, w: 28, h: 28, seed: 3 }, { k: 'card', x: 62, y: 210, w: 230, h: 40, pad: 'px-1 py-0 !border-0 !shadow-none', lines: 2, lineH: 17, seed: 6 }]} />, maskWell: true },
  ],
}

const QUOTE = { text: '“Our follow-ups finally go out on time, and they still sound like us.”', name: 'Priya Halvorsen', role: 'Head of Revenue Operations · Lumenaut' }

const SPLIT = {
  lead: 'Personal at scale.', // c19
  cont: 'Each email reads one-to-one, even as you cover 100 accounts.', // line-fit 1.3.0: 405/423/278 (live 385/403/310)
  items: [
    { title: 'Merge fields, filled for you.', desc: 'Pull any field from the record into the email so each person reads something written for them.', media: <LayoutArt box={[647, 490]} blocks={[{ k: 'frame', x: 116, y: 132, w: 415, h: 225 }, { k: 'row', x: 132, y: 142, w: 50, h: 20, text: 'Subject', text_cls: 'text-[12px] !text-black-800' }, { k: 'row', x: 186, y: 142, w: 40, h: 20, text: 'Quick', text_cls: 'text-[12px]' }, { k: 'pill', x: 226, y: 143, w: 82, h: 18, text: '{first name}', round: 'rounded-4 !bg-blue-100 !text-blue-600 !border-blue-200' }, { k: 'row', x: 312, y: 142, w: 150, h: 20, text: 'idea for your rollout', text_cls: 'text-[12px]' }, { k: 'fill', x: 116, y: 170, w: 415, h: 1, cls: 'bg-white-500' }, { k: 'row', x: 132, y: 187, w: 30, h: 20, text: 'Hello', text_cls: 'text-[12px]' }, { k: 'pill', x: 166, y: 188, w: 78, h: 18, text: '{first name}', round: 'rounded-4 !bg-blue-100 !text-blue-600 !border-blue-200' }, { k: 'row', x: 132, y: 222, w: 90, h: 20, text: 'I noticed that', text_cls: 'text-[12px]' }, { k: 'pill', x: 222, y: 223, w: 110, h: 18, text: '{company name}', round: 'rounded-4 !bg-blue-100 !text-blue-600 !border-blue-200' }, { k: 'row', x: 336, y: 222, w: 60, h: 20, text: 'works in', text_cls: 'text-[12px]' }, { k: 'pill', x: 396, y: 223, w: 118, h: 18, text: '{company sector}', round: 'rounded-4 !bg-blue-100 !text-blue-600 !border-blue-200' }, { k: 'lines', x: 132, y: 244, w: 330, h: 40, n: 2, lineH: 20, size: 12, seed: 3 }, { k: 'row', x: 132, y: 298, w: 60, h: 20, text: 'Thanks,', text_cls: 'text-[12px]' }, { k: 'row', x: 132, y: 322, w: 160, h: 20, icon: 'note', text: 'Owner signature', text_cls: 'text-[11px] !text-black-800' }]} /> },
    { title: 'Writing help.', desc: 'Draft a first version from the record, then edit it in your own voice.', media: <PanelArt variant={1} /> },
    { title: 'Always accurate.', desc: 'Values are read at send time, so nothing goes out stale.', media: <PanelArt variant={2} /> },
  ],
}

const GRID2 = {
  lead: 'One view for every step.', // line-fit 1.3.0 (live 3 lines: lead+238 / 440 / 197)
  cont: 'See who joined, who replied, who booked and where each contact stands.',
  cards: [
    { title: 'Follow the path.', body: 'See who moves through each step.', media: <LayoutArt box={[481, 289]} contained blocks={[{ k: 'pill', x: 160, y: 48, w: 173, h: 24, text: 'Step 1 · Welcome series', icon: 'mail' }, { k: 'avatar', x: 134, y: 51, w: 18, h: 18, seed: 1 }, { k: 'pill', x: 132, y: 101, w: 228, h: 24, text: 'Step 2 · Follow-up for Halcyon', icon: 'mail' }, { k: 'avatar', x: 106, y: 104, w: 18, h: 18, seed: 2 }, { k: 'pill', x: 122, y: 154, w: 248, h: 24, text: 'Step 3 · Re: Follow-up for Halcyon', icon: 'mail' }, { k: 'avatar', x: 96, y: 157, w: 18, h: 18, seed: 3 }, { k: 'fill', x: 234, y: 178, w: 1, h: 44, cls: 'bg-white-600' }, { k: 'pill', x: 163, y: 214, w: 144, h: 28, text: 'Call booked', icon: 'checkCircle', round: 'rounded-8 !border-traffic-green !text-traffic-green' }]} /> },
    { title: 'Results.', body: 'Opens, replies and exits at a glance.', media: <LayoutArt box={[481, 289]} contained blocks={[{ k: 'node', x: 24, y: 56, w: 212, h: 86, node: <span className="flex size-full flex-col justify-end rounded-8 border border-solid border-traffic-green bg-traffic-green/10 p-2.5"><span className="text-[22px] font-semibold text-black-100">131</span><span className="text-[11px] text-black-600">Opened</span></span> }, { k: 'node', x: 248, y: 56, w: 203, h: 86, node: <span className="flex size-full flex-col justify-end rounded-8 border border-solid border-white-500 bg-white-100 p-2.5"><span className="text-[22px] font-semibold text-black-100">149</span><span className="text-[11px] text-black-600">Delivered</span></span> }, { k: 'node', x: 24, y: 156, w: 140, h: 70, node: <span className="flex size-full flex-col justify-end rounded-8 border border-solid border-white-500 bg-white-100 p-2.5"><span className="text-[22px] font-semibold text-black-100">163</span><span className="text-[11px] text-black-600">Sent</span></span> }, { k: 'node', x: 170, y: 156, w: 140, h: 70, node: <span className="flex size-full flex-col justify-end rounded-8 border border-solid border-white-500 bg-white-100 p-2.5"><span className="text-[22px] font-semibold text-black-100">161</span><span className="text-[11px] text-black-600">Pending</span></span> }, { k: 'node', x: 316, y: 156, w: 135, h: 70, node: <span className="flex size-full flex-col justify-end rounded-8 border border-solid border-white-500 bg-white-100 p-2.5"><span className="text-[22px] font-semibold text-black-100">6</span><span className="text-[11px] text-black-600">Replied</span></span> }]} /> },
    { title: 'Quick controls.', body: 'Pause, resume or remove anyone in one click.', media: <LayoutArt box={[481, 289]} contained blocks={[{ k: 'frame', x: -10, y: 74, w: 84, h: 110, cls: 'bg-white-100 opacity-60' }, { k: 'frame', x: 410, y: 74, w: 90, h: 110, cls: 'bg-white-100 opacity-60' }, { k: 'frame', x: 103, y: 62, w: 280, h: 128 }, { k: 'avatar', x: 118, y: 74, w: 30, h: 30, seed: 6 }, { k: 'row', x: 320, y: 76, w: 56, h: 16, text: '3d ago', text_cls: 'text-[11px]' }, { k: 'row', x: 118, y: 140, w: 160, h: 20, text: 'Rhea Dalton', text_cls: 'text-[14px] font-semibold' }, { k: 'row', x: 118, y: 162, w: 160, h: 18, icon: 'clock', text: 'Paused by owner', text_cls: 'text-[11px]' }]} /> },
    { title: 'Timed sending.', body: 'Arrive in the inbox when they are reading.', media: <LayoutArt box={[481, 289]} contained blocks={[{ k: 'frame', x: 48, y: 106, w: 66, h: 66, cls: 'rounded-full border-blue-200 bg-blue-100/40' }, { k: 'node', x: 68, y: 126, w: 26, h: 26, node: <span className="flex size-full items-center justify-center text-blue-500"><Icon name="mail" size={18} /></span> }, { k: 'fill', x: 114, y: 139, w: 92, h: 1, cls: 'border-t border-dashed border-white-700' }, { k: 'pill', x: 190, y: 58, w: 173, h: 26, text: '9:15 AM · Owen Pike', icon: 'clock' }, { k: 'pill', x: 207, y: 126, w: 196, h: 26, text: '11:40 AM · Lena Ford', icon: 'clock' }, { k: 'pill', x: 247, y: 211, w: 183, h: 26, text: '4:05 PM · Arlo Chen', icon: 'clock' }]} /> },
  ],
}

export default function Sequences() {
  return (
    <PageShell title="Sequences">
      <HeroSequences copy={HERO} steps={STEPS} booked="Meeting booked with Nadia" timing={TIMING} />
      <SectionDivider />
      <Showcase {...SHOWCASE} />
      <SectionDivider />
      <LegacyGrid3 {...GRID3} />
      <SectionDivider />
      <ScrollQuote {...QUOTE} />
      <SectionDivider />
      <SplitAccordionLegacy {...SPLIT} />
      <SectionDivider />
      <LegacyGrid2Q {...GRID2} />
      <SectionDivider />
      <LinksGrid variant="legacy" {...LINKS_HEAD} links={PLATFORM_LINKS} />
      <PlatformCta lines={['Revenue that runs', 'while you sleep.']} />
    </PageShell>
  )
}
