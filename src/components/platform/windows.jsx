import { useEffect, useRef, useState } from 'react'
import { Company, Icon, Initials } from '../mock.jsx'
import { DotWell } from './shell.jsx'

// Large product-window artwork for S-CENTER-MEDIA boxes (CLONE_SPEC_PLATFORM 3.7). Each window
// is drawn at the live image's design size (1158 wide) and scaled to its container, so regions
// (sidebar, canvas, panels, chat column) sit where the live screenshot puts them. Every label,
// company, person and number is invented ("Corvale" CRM, fictional accounts); no live imagery.

/** Renders children at a fixed design size and scales the box to the container width. */
export function FitBox({ w, h, children, className = '' }) {
  const ref = useRef(null)
  const [s, setS] = useState(1)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setS(el.clientWidth / w || 1)
    update()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [w])
  return (
    <div ref={ref} className={`relative w-full overflow-hidden ${className}`} style={{ aspectRatio: `${w} / ${h}` }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: w, height: h, transform: `scale(${s})` }}>
        {children}
      </div>
    </div>
  )
}

const frame = 'absolute inset-0 overflow-hidden rounded-12 border border-solid border-white-500 bg-white-100'

/* ------------------------------------------------------------------ */
/* Workflow run canvas (agent builder, 1158x693)                         */
/* ------------------------------------------------------------------ */
const NAV = [
  ['home', 'Home'],
  ['inbox', 'Inbox'],
  ['task', 'Tasks'],
  ['note', 'Notes'],
  ['phone', 'Calls'],
  ['chart', 'Reports'],
  ['chart', 'Dashboards'],
  ['flow', 'Automations'],
]
const SUB = ['Sequences', 'Workflows']
const FAV = ['Renewal plays', 'Pilot pipeline', 'Inbound outreach', 'Lead triage', 'Churn watch', 'Upsell review']
const RECORDS = [
  ['users', 'People', 'bg-blue-500'],
  ['building', 'Companies', 'bg-blue-450'],
  ['board', 'Deals', 'bg-traffic-yellow'],
  ['list', 'Workspaces', 'bg-art-iris'],
  ['users', 'Users', 'bg-art-teal'],
]
const NODES = [
  [77, 237, 'Record created', 'When a new contact is added', 'Trigger'],
  [330, 237, 'Research agent', 'Look up the new company'],
  [128, 429, 'Scoring agent', 'Rate the company against your ICP'],
  [401, 429, 'Filter', 'Keep only strong matches'],
]
const LOG = [
  ['User', '0:00:00', 'Research the new record and list the factors we use to rank it, then estimate the deal size and open a ticket.'],
  ['Tool', '0:00:43', 'Web fetch: https://tidewell.example/products/heat-pumps'],
  ['Agent', '0:00:46', 'Found the product page. Now checking the company size and the latest funding round for Tidewell Bank.'],
  ['Tool', '0:00:46', 'Web search: Tidewell heat pump range specs'],
]

export function WorkflowWindowArt() {
  return (
    <FitBox w={1158} h={693}>
      <div role="img" aria-label="Workflow run illustration" className={frame}>
        {/* sidebar */}
        <div className="absolute inset-y-0 left-0 w-[210px] border-r border-solid border-mock-stroke bg-mock-surface px-3 pt-2.5 text-[12px] text-black-300">
          <div className="flex h-7 items-center gap-2 font-semibold text-black-100">
            <span className="flex size-6 items-center justify-center rounded-6 bg-black-100 text-white-100">
              <Icon name="sparkle" size={13} />
            </span>
            Corvale
          </div>
          <div className="mt-3 flex h-7 items-center gap-2 rounded-8 border border-solid border-white-500 bg-white-100 px-2 text-black-600">
            <Icon name="bolt" size={13} /> Quick actions
          </div>
          <div className="mt-2 flex flex-col">
            {NAV.map(([i, l]) => (
              <span key={l} className="flex h-[19px] items-center gap-2">
                <Icon name={i} size={13} className="text-black-700" />
                {l}
              </span>
            ))}
            {SUB.map((l, k) => (
              <span key={l} className={`ml-4 flex h-[19px] items-center gap-2 rounded-6 px-1 ${k === 1 ? 'bg-white-400' : ''}`}>
                <Icon name="flow" size={13} className="text-black-700" />
                {l}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-black-800">Favorites</p>
          {FAV.map((l) => (
            <span key={l} className="flex h-[19px] items-center gap-2">
              <Icon name="flow" size={13} className="text-black-700" />
              {l}
            </span>
          ))}
          <p className="mt-3 text-[11px] text-black-800">Records</p>
          {RECORDS.map(([i, l, c]) => (
            <span key={l} className="flex h-[19px] items-center gap-2">
              <span className={`size-3 rounded-4 ${c}`} />
              {l}
            </span>
          ))}
          <p className="mt-3 text-[11px] text-black-800">Lists</p>
          {['Expansion targets', 'Q3 renewals', 'Partner leads', 'Board prep'].map((l) => (
            <span key={l} className="flex h-[19px] items-center gap-2">
              <Icon name="list" size={13} className="text-black-700" />
              {l}
            </span>
          ))}
        </div>
        {/* top bars */}
        <div className="absolute left-[210px] right-0 top-0 flex h-10 items-center justify-between border-b border-solid border-mock-stroke px-3 text-[13px]">
          <span className="flex items-center gap-2 text-black-600">
            <Icon name="flow" size={13} /> Workflows <span className="text-black-100">Inbound scoring</span>
          </span>
          <span className="flex items-center gap-3 text-black-600">
            <span className="flex -space-x-1">
              {['Ada Moss', 'Kai Rhee', 'Lu Park'].map((n, i) => (
                <Initials key={n} name={n} size={18} tone={['blue', 'amber', 'teal'][i]} ring />
              ))}
            </span>
            Share
            <span className="flex items-center gap-1 rounded-8 border border-solid border-white-500 px-2 py-0.5 text-black-300">Assistant</span>
          </span>
        </div>
        <div className="absolute left-[210px] right-0 top-10 flex h-9 items-center justify-between border-b border-solid border-mock-stroke px-3 text-[13px] text-black-600">
          <span className="flex gap-4">
            <span>Editor</span>
            <span className="text-black-100">Runs</span>
            <span>Settings</span>
          </span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-traffic-green">
              <span className="h-3 w-5 rounded-full bg-traffic-green" /> Live
            </span>
            <span className="text-black-300">Run manually</span>
          </span>
        </div>
        {/* canvas */}
        <div className="absolute bottom-0 left-[210px] right-0 top-[76px] bg-white-200">
          <DotWell />
          <svg aria-hidden="true" className="absolute inset-0 size-full" fill="none">
            <path d="M290 187H330M543 187H621V281H95V379H128M341 379H401M614 379H676" className="text-traffic-green" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          {NODES.map(([x, y, t, d, tab]) => (
            <div key={t} className="absolute" style={{ left: x, top: y - 76 }}>
              {tab && <span className="absolute -top-[18px] left-1 rounded-t-6 bg-platform-tile-blue px-1.5 text-[11px] text-blue-600">{tab}</span>}
              <span className="absolute -top-[18px] right-1 flex items-center gap-1 rounded-6 bg-platform-status-bg px-1.5 text-[11px] text-platform-status-text">
                <Icon name="check" size={10} /> Completed
              </span>
              <div className="flex h-[54px] w-[213px] flex-col justify-center gap-1 rounded-10 border border-solid border-white-500 bg-white-100 px-2.5 shadow-mock-chip">
                <span className="flex items-center gap-2 text-[13px] text-black-100">
                  <Icon name="sparkle" size={13} className="text-art-iris" /> {t}
                </span>
                <span className="text-[11px] text-black-700">{d}</span>
              </div>
            </div>
          ))}
          <div className="absolute bottom-3 left-[287px] flex h-9 items-center gap-3 rounded-10 border border-solid border-white-500 bg-white-100 px-3 text-[13px] text-black-300 shadow-mock-chip">
            100% <Icon name="chevronDown" size={12} /> <Icon name="users" size={13} />
            <span className="flex size-6 items-center justify-center rounded-6 bg-blue-500 text-white-100">
              <Icon name="arrowRight" size={12} />
            </span>
          </div>
          {/* run detail panel */}
          <div className="absolute bottom-3 right-3 top-3 w-[258px] overflow-hidden rounded-12 border border-solid border-white-500 bg-white-100 p-3 text-[12px] shadow-mock-card">
            <span className="flex items-center gap-2 text-[13px] text-black-100">
              <Icon name="sparkle" size={13} className="text-art-iris" /> Scoring agent <span className="text-black-800">Agents</span>
            </span>
            <div className="mt-3 grid grid-cols-4 gap-1 text-[10px] text-black-700">
              <span>Status</span>
              <span>Credits</span>
              <span>Runtime</span>
              <span>Runs</span>
              <span className="rounded-4 bg-platform-status-bg px-1 text-platform-status-text">Done</span>
              <span className="text-black-100">31</span>
              <span className="text-black-100">22s</span>
              <span className="text-black-100">4</span>
            </div>
            <div className="mt-4 border-t border-solid border-mock-stroke pt-3 text-[13px] text-black-100">Details</div>
            <div className="mt-2 flex h-2 gap-6">
              <span className="w-2 rounded-full bg-blue-500" />
              <span className="w-8 rounded-full bg-art-iris" />
              <span className="w-8 rounded-full bg-art-iris" />
            </div>
            {LOG.map(([k, t, body]) => (
              <div key={t + body} className="mt-4">
                <div className="flex justify-between text-[11px]">
                  <span className={`rounded-4 px-1.5 ${k === 'Agent' ? 'bg-art-haze text-art-iris' : 'bg-white-300 text-black-600'}`}>{k}</span>
                  <span className="text-black-700">{t}</span>
                </div>
                <p className="mt-1.5 line-clamp-3 text-[12px] leading-[16px] text-black-300">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FitBox>
  )
}

/* ------------------------------------------------------------------ */
/* Assistant chat window (hub page, 1158x672)                            */
/* ------------------------------------------------------------------ */
export function ChatWindowArt() {
  return (
    <FitBox w={1158} h={672}>
      <div role="img" aria-label="Assistant conversation illustration" className={frame}>
        <div className="absolute inset-y-0 left-0 flex w-12 flex-col items-center gap-4 border-r border-solid border-mock-stroke bg-mock-surface pt-4 text-black-600">
          <Icon name="sparkle" size={16} />
          <Icon name="note" size={14} />
          <Icon name="search" size={14} />
          <Icon name="inbox" size={14} />
          <span className="mt-auto mb-4">
            <Initials name="Robin Hale" size={22} tone="teal" />
          </span>
        </div>
        <div className="absolute left-12 right-0 top-0 flex h-11 items-center justify-between px-4 text-[15px]">
          <span className="font-semibold text-black-100">Assistant</span>
          <span className="flex items-center gap-4 text-[13px] text-black-300">
            <Icon name="send" size={13} /> Share <Icon name="dots" size={13} />
          </span>
        </div>
        <div className="absolute right-[238px] top-[46px] rounded-full bg-white-400 px-4 py-2.5 text-[14px] text-black-100">Update the Tidewell deal using today’s meeting notes.</div>
        <div className="absolute left-[284px] top-[106px] w-[640px] text-[14px] leading-[22px] text-black-300">
          <p className="text-black-700">
            Used the CRM app <Icon name="chevronDown" size={11} className="inline" />
          </p>
          <p className="mt-4 font-semibold text-black-100">Tidewell deal updated</p>
          <p className="mt-4">I updated the Tidewell deal with what came up in today’s meeting:</p>
          <ul className="mt-3 flex list-disc flex-col gap-1 pl-6">
            <li>
              <b>Stage</b> → moved to <i>Proposal</i>
            </li>
            <li>
              <b>Deal value</b> → set to <i>$140,000</i> after the budget was confirmed
            </li>
            <li>
              <b>Notes added</b> → The team agreed to widen the rollout to include data import and custom dashboards. Their leads liked the plan but asked for a new proposal that covers the wider scope. Their finance lead wants the numbers split by region before sign-off, and the decision is due at the end of the month.
            </li>
            <li>
              <b>Next steps</b> → Send the new proposal by Friday and book a follow-up call early next week with their buying team.
            </li>
          </ul>
          <p className="mt-4">Want me to tell the deal owner, or draft the new proposal now?</p>
          <span className="mt-3 flex gap-3 text-black-600">
            {['note', 'heart', 'alert', 'send', 'link', 'dots'].map((i) => (
              <Icon key={i} name={i} size={15} />
            ))}
          </span>
        </div>
        <div className="absolute bottom-7 left-[267px] flex h-[50px] w-[670px] items-center gap-3 rounded-full border border-solid border-white-500 bg-white-100 px-4 shadow-mock-card">
          <Icon name="plus" size={16} className="text-black-300" />
          <span className="flex-1 text-[15px] text-black-800">Ask the assistant</span>
          <Icon name="mic" size={15} className="text-black-300" />
          <span className="flex size-8 items-center justify-center rounded-full bg-black-100 text-white-100">
            <Icon name="arrowUp" size={14} />
          </span>
        </div>
        <p className="absolute bottom-1.5 left-0 right-0 text-center text-[11px] text-black-700">Answers can be wrong. Check what matters.</p>
      </div>
    </FitBox>
  )
}

/* ------------------------------------------------------------------ */
/* Enrichment question builder (centred variant, 1158x461)               */
/* ------------------------------------------------------------------ */
export function QuestionBuilderArt() {
  return (
    <FitBox w={1158} h={461}>
      <div role="img" aria-label="Research question builder illustration" className="absolute inset-0">
        <div className="absolute left-[12px] top-[80px] h-[182px] w-[1134px] rounded-12 border border-solid border-white-500 bg-white-100 shadow-mock-card">
          <p className="absolute left-[22px] top-[20px] text-[15px] text-black-700">Question 1</p>
          <div className="absolute left-[17px] right-[17px] top-[46px] flex h-[52px] items-center justify-between rounded-12 border-2 border-solid border-blue-450 px-4 text-[18px] text-black-100">
            <span>What does the company sell?</span>
            <span>Heat pumps for homes</span>
          </div>
          <div className="absolute inset-x-0 top-[114px] h-px bg-white-500" />
          <span className="absolute left-[11px] top-[128px] flex h-[42px] items-center gap-2 rounded-10 border border-solid border-white-500 px-3 text-[18px] text-black-100">
            <Icon name="plus" size={16} /> Add question
          </span>
        </div>
        <div className="absolute left-[227px] top-[2px] flex h-10 items-center gap-2 rounded-t-12 bg-platform-tile-blue px-3 text-[20px] text-blue-500">
          <Icon name="sparkle" size={18} /> AI researching...
        </div>
        <div className="absolute left-[227px] top-[42px] h-[255px] w-[706px] rounded-16 border-2 border-solid border-blue-450 bg-white-100 shadow-hero-window">
          <p className="absolute left-[33px] top-[30px] text-[22px] text-black-700">Question 2</p>
          <div className="absolute left-[25px] right-[25px] top-[68px] flex h-[72px] items-center rounded-16 border-2 border-solid border-blue-450 px-6 text-[28px] text-black-100">
            List the latest changes to the leadership team
            <span className="ml-0.5 h-8 w-px bg-blue-500" />
          </div>
          <div className="absolute inset-x-0 bottom-0 top-[164px] rounded-b-16 border-t border-solid border-white-500 bg-white-200">
            <span className="absolute left-[16px] top-[17px] flex h-[58px] items-center gap-3 rounded-12 border border-solid border-white-500 bg-white-100 px-4 text-[26px] text-black-100">
              <Icon name="plus" size={22} /> Add question
            </span>
          </div>
        </div>
      </div>
    </FitBox>
  )
}

/* ------------------------------------------------------------------ */
/* Assistant home window (ask intel 1158x640, unified knowledge 1158x647) */
/* ------------------------------------------------------------------ */
export function HomeWindowArt({ h = 640 }) {
  return (
    <FitBox w={1158} h={h}>
      <div role="img" aria-label="Assistant home illustration" className={frame}>
        <div className="flex h-10 items-center justify-between border-b border-solid border-mock-stroke px-3 text-[12px] text-black-100">
          <span className="flex items-center gap-1.5">
            <Icon name="home" size={13} /> Home
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="alert" size={13} /> Help
          </span>
        </div>
        <p className="absolute left-[247px] top-[86px] text-[19px] font-semibold text-black-100">Good morning, Robin</p>
        <div className="absolute left-[239px] top-[130px] h-[110px] w-[674px] rounded-12 border border-solid border-blue-200 bg-white-100 shadow-mock-card">
          <span className="absolute left-3 top-3 text-[14px] text-black-800">Ask or search for anything</span>
          <span className="absolute bottom-2.5 right-3 flex items-center gap-3 text-[13px] text-black-600">
            Auto <Icon name="hash" size={12} />
            <span className="flex size-6 items-center justify-center rounded-8 bg-blue-300 text-white-100">
              <Icon name="arrowUp" size={12} />
            </span>
          </span>
        </div>
        <div className="absolute left-[427px] top-[252px] flex gap-2 text-[13px] text-black-300">
          <span className="flex items-center gap-1.5 rounded-8 border border-solid border-white-500 px-2 py-1">
            <span className="size-3 rounded-4 bg-blue-500" /> Prep my next meeting
          </span>
          <span className="flex items-center gap-1.5 rounded-8 border border-solid border-white-500 px-2 py-1">
            <span className="size-3 rounded-4 bg-red-500" /> Recap the last call
          </span>
        </div>
        <div className="absolute left-[247px] top-[310px] flex w-[658px] items-center justify-between text-[13px] text-black-600">
          <span>Meetings</span>
          <span>Today, Nov 4</span>
        </div>
        {[
          ['Halcyon renewal check-in', '10:00 - 10:20', 'bg-traffic-yellow'],
          ['Kettle and Pinecrest', '10:20 - 10:40', 'bg-white-800'],
        ].map(([t, time, c], i) => (
          <div key={t} className="absolute left-[247px] flex w-[658px] items-center justify-between text-[13px]" style={{ top: 346 + i * 34 }}>
            <span className="flex items-center gap-2 text-black-700 line-through">
              <span className={`size-1.5 rounded-full ${c}`} /> {t}
            </span>
            <span className="text-black-600">{time}</span>
          </div>
        ))}
        <div className="absolute left-[239px] top-[408px] h-[280px] w-[674px] rounded-12 border border-solid border-white-500 bg-white-100 px-2 py-1 text-[12px] shadow-mock-card">
          <span className="flex items-center justify-between text-[13px] text-black-100">
            <span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-traffic-green" /><Company id="quarry" size={16} textClass="text-[13px] font-semibold text-black-100" /></span>
            <span className="text-black-600">13:00 - 13:30</span>
          </span>
          <p className="mt-2 text-black-600">Notes</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-black-300"><Icon name="note" size={12} /> Walk the Halcyon ops leads through the new routing rules before rollout.</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-black-300"><Icon name="link" size={12} /> meet.northwind.example/halcyon-ops</p>
          <p className="mt-2 text-black-600">People · 4</p>
          {[['Nadia Brooks', 'Head of IT · Halcyon'], ['Robin Hale', 'Account lead · Northwind'], ['Theo Laurent', 'Ops manager · Halcyon'], ['Ines Varga', 'Finance · Halcyon']].map(([n, r], i) => (
            <span key={n} className="mt-0.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-black-100">
                <Initials name={n} size={16} tone={['teal', 'iris', 'blue', 'amber'][i]} /> {n} <span className="text-black-600">{r}</span>
              </span>
              <span className="size-1.5 rounded-full bg-traffic-green" />
            </span>
          ))}
        </div>
      </div>
    </FitBox>
  )
}

/* ------------------------------------------------------------------ */
/* Sequence editor, recipients tab (sequences showcase, 1158x719)        */
/* ------------------------------------------------------------------ */
const RECIPIENTS = [
  ['Nadia Brooks', 'Next email in 1 day', 'just now', 'teal'],
  ['Theo Laurent', 'Next email in 1 day', '1h ago', 'blue'],
  ['Ines Varga', 'Next email in 1 day', '2h ago', 'iris'],
  ['Sam Okafor', 'Next email in 2 days', '2h ago', 'amber'],
  ['Mara Quist', 'Email bounced', '4h ago', 'teal'],
  ['Jun Ishida', 'Next email in 2 days', '4h ago', 'blue'],
  ['Rhea Dalton', 'Left after a manual run', 'Yesterday', 'iris'],
  ['Owen Pike', 'Paused', 'Yesterday', 'amber'],
  ['Lena Ford', 'Next email in 4 days', 'Yesterday', 'teal'],
  ['Arlo Chen', 'Unsubscribed', 'Yesterday', 'blue'],
]
const TIMELINE = [
  { y: 146, kind: 'note', text: 'Enrolled by Robin Hale', when: '6 days ago', done: true },
  { y: 184, kind: 'mail', title: 'Automated email', when: '6 days ago', subject: 'Welcome aboard, and a quick tip for week one', body: 'Hi Ines, hope the first days went smoothly. Here is one thing most teams set up early...', done: true },
  { y: 292, kind: 'wait', text: 'Wait 5 business days', sub: 'Auto-reply detected, holding until Nov 9' },
  { y: 350, kind: 'mail', title: 'Automated email', when: 'Tomorrow', subject: 'Re: Welcome aboard, and a quick tip for week one', body: 'Hi Ines, great to see the team growing so quickly over the past few weeks...', n: 3 },
  { y: 456, kind: 'wait', text: 'Wait 2 business days' },
  { y: 498, kind: 'mail', title: 'Automated email', when: 'Nov 11', subject: 'Re: Welcome aboard, and a quick tip for week one', body: 'Hi Ines, what would help most next? Happy to walk your team through reports...', n: 4 },
]

export function SequenceEditorArt() {
  return (
    <FitBox w={1158} h={719}>
      <div role="img" aria-label="Sequence editor illustration" className="absolute left-[18px] top-[12px] h-[684px] w-[1123px] overflow-hidden rounded-12 border border-solid border-white-500 bg-white-100 shadow-mock-card">
        <div className="flex h-10 items-center justify-between border-b border-solid border-mock-stroke px-3.5 text-[13px]">
          <span className="flex items-center gap-2 text-black-600">
            <Icon name="send" size={13} /> Sequences <span className="text-black-900">/</span> <span className="text-black-100">Trial welcome series</span>
          </span>
          <span className="flex items-center gap-4 text-black-600">
            Share <Icon name="alert" size={13} /> <Icon name="dots" size={13} />
          </span>
        </div>
        <div className="flex h-10 items-center justify-between border-b border-solid border-mock-stroke px-3.5 text-[13px] text-black-600">
          <span className="flex h-full items-center gap-5">
            <span>Editor</span>
            <span className="flex h-full items-center gap-1.5 border-b border-solid border-black-100 text-black-100">
              Recipients <span className="rounded-4 bg-white-300 px-1 text-[11px] text-black-600">142</span>
            </span>
          </span>
          <span className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-8 border border-solid border-white-500 px-2 py-1 text-black-300">
              <span className="h-3 w-5 rounded-full bg-blue-500" /> Sequence on
            </span>
            <span className="rounded-8 bg-blue-500 px-2.5 py-1 text-white-100">Add recipients</span>
          </span>
        </div>
        <div className="absolute bottom-0 left-0 top-20 w-[298px] border-r border-solid border-mock-stroke">
          <div className="flex h-[46px] items-center justify-between border-b border-solid border-mock-stroke px-3 text-[13px] text-black-800">
            <span className="flex items-center gap-2">
              <Icon name="search" size={13} /> Find a recipient
            </span>
            <span className="flex items-center gap-1 rounded-8 border border-dashed border-white-700 px-2 py-0.5 text-black-600">
              <Icon name="filter" size={12} /> Filter
            </span>
          </div>
          {RECIPIENTS.map(([n, st, t, tone], i) => (
            <div key={n} className={`flex h-[54.5px] items-center gap-2.5 border-b border-solid border-mock-stroke px-3 ${i === 2 ? 'bg-white-200' : ''}`}>
              <Initials name={n} size={20} tone={tone} />
              <span className="flex flex-1 flex-col">
                <span className="text-[13px] text-black-100">{n}</span>
                <span className="text-[11px] text-black-700">{st}</span>
              </span>
              <span className="self-start pt-2.5 text-[11px] text-black-800">{t}</span>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-[298px] right-0 top-20 bg-white-200">
          <div className="flex h-[46px] items-center justify-between border-b border-solid border-mock-stroke px-3">
            <span className="flex items-center gap-2">
              <Initials name="Ines Varga" size={24} tone="iris" />
              <span className="flex flex-col text-[12px] leading-4">
                <span className="text-black-100">
                  Ines Varga <span className="text-black-700">ines@kettle.example</span>
                </span>
                <span className="text-[11px] text-black-700">Next email in 1 day · Sender: Robin Hale</span>
              </span>
            </span>
            <span className="flex gap-2 text-[12px] text-black-300">
              <span className="rounded-8 border border-solid border-white-500 bg-white-100 px-2 py-1">Pause</span>
              <span className="rounded-8 border border-solid border-white-500 bg-white-100 px-2 py-1">Exit</span>
            </span>
          </div>
          <span className="absolute left-[159px] top-[66px] h-[284px] w-px bg-traffic-green/60" />
          <span className="absolute left-[159px] top-[350px] h-[160px] w-px border-l border-dashed border-white-700" />
          {TIMELINE.map((t) => (
            <div key={t.y} className="absolute left-[150px] right-[148px]" style={{ top: t.y - 80 }}>
              <span className={`absolute left-0 top-1 flex size-[18px] items-center justify-center rounded-full text-[10px] ${t.done ? 'bg-traffic-green text-white-100' : 'border border-solid border-white-700 bg-white-100 text-black-700'}`}>
                {t.done ? <Icon name="check" size={10} /> : t.n || ''}
              </span>
              {t.kind === 'mail' ? (
                <div className="ml-[30px] rounded-12 border border-solid border-white-500 bg-white-100 text-[12px]">
                  <div className="flex justify-between border-b border-solid border-mock-stroke px-2.5 py-2 text-black-100">
                    {t.title}
                    <span className="text-black-800">{t.when}</span>
                  </div>
                  <div className="px-2.5 py-2 leading-[18px]">
                    <p className="text-black-100">{t.subject}</p>
                    <p className="truncate text-black-700">{t.body}</p>
                  </div>
                </div>
              ) : (
                <div className="ml-[30px] flex justify-between pt-0.5 text-[12px]">
                  <span className="flex flex-col">
                    <span className="text-black-300">{t.text}</span>
                    {t.sub && <span className="text-black-800">{t.sub}</span>}
                  </span>
                  {t.when && <span className="text-black-800">{t.when}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </FitBox>
  )
}
