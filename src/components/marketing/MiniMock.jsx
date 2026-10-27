import { Avatar, Bar } from '../ui.jsx'
import { Chip, Company, Icon, Initials, Sparkline } from '../mock.jsx'

// Small original product-UI illustrations (fictional "Corvale" CRM) used inside media boxes on
// the secondary pages. Neutral fills, invented companies and people only.

function Card({ className = '', children }) {
  return <div className={`rounded-12 border border-solid border-white-500 bg-white-100 shadow-mock-card ${className}`}>{children}</div>
}

const VARIANTS = [
  // 0: a pipeline board with three columns of deal cards
  () => (
    <div className="flex h-full items-center justify-center gap-3 px-4">
      {[
        ['Lead', 'blue', ['halcyon', 'kettle']],
        ['Qualified', 'amber', ['brightwater', 'orchard', 'tidewell']],
        ['Won', 'green', ['lumenaut']],
      ].map(([label, tone, cos]) => (
        <div key={label} className="flex w-[30%] flex-col gap-2 rounded-12 bg-white-300 p-2">
          <Chip tone={tone}>{label}</Chip>
          {cos.map((c) => (
            <Card key={c} className="flex flex-col gap-1.5 p-2">
              <Company id={c} size={16} textClass="text-mock-sm text-black-100" />
              <Bar w="70%" h={5} />
            </Card>
          ))}
        </div>
      ))}
    </div>
  ),
  // 1: record card with fields
  () => (
    <div className="flex h-full items-center justify-center">
      <Card className="flex w-[70%] flex-col gap-3 p-4">
        <Company id="pinecrest" size={24} textClass="text-mock-lg font-semibold text-black-100" />
        {[
          ['globe', 'pinecrest.health'],
          ['users', '120 people'],
          ['coin', '$2.4M pipeline'],
          ['pin', 'Lisbon, Portugal'],
        ].map(([i, t]) => (
          <div key={t} className="flex items-center gap-2 text-mock-base text-black-600">
            <Icon name={i} size={14} className="text-black-800" />
            {t}
          </div>
        ))}
      </Card>
    </div>
  ),
  // 2: chart card
  () => (
    <div className="flex h-full items-center justify-center">
      <Card className="flex w-[78%] flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <span className="text-mock-md text-black-600">Revenue this quarter</span>
          <Chip tone="green">+18%</Chip>
        </div>
        <span className="text-mock-2xl text-black-100">$482,900</span>
        <Sparkline values={[0.2, 0.3, 0.25, 0.45, 0.4, 0.6, 0.55, 0.75, 0.9]} width={300} height={70} className="w-full text-blue-500" />
      </Card>
    </div>
  ),
  // 3: list of people with stages
  () => (
    <div className="flex h-full items-center justify-center">
      <Card className="flex w-[74%] flex-col divide-y divide-white-400 px-3 py-1">
        {[
          ['Nadia Brooks', 'blue', 'Intro call'],
          ['Theo Laurent', 'teal', 'Proposal'],
          ['Ines Varga', 'iris', 'Negotiation'],
          ['Sam Okafor', 'amber', 'Closed'],
        ].map(([n, t, s]) => (
          <div key={n} className="flex items-center justify-between gap-3 py-2">
            <span className="flex items-center gap-2">
              <Initials name={n} tone={t} size={20} />
              <span className="text-mock-base text-black-100">{n}</span>
            </span>
            <Chip tone={t} dot={false}>
              {s}
            </Chip>
          </div>
        ))}
      </Card>
    </div>
  ),
  // 4: flow / automation nodes
  () => (
    <div className="flex h-full items-center justify-center gap-3">
      {['bolt', 'filter', 'mail'].map((i, k) => (
        <div key={i} className="flex items-center gap-3">
          <Card className="flex items-center gap-2 px-3 py-2">
            <Icon name={i} size={14} className="text-blue-500" />
            <Bar w={52} h={6} />
          </Card>
          {k < 2 && <span className="h-px w-6 bg-white-800" />}
        </div>
      ))}
    </div>
  ),
  // 5: avatars + notes
  () => (
    <div className="flex h-full items-center justify-center">
      <Card className="flex w-[66%] flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          <Avatar size={22} className="bg-art-periwinkle" />
          <Bar w="40%" h={7} className="bg-white-600" />
        </div>
        <Bar w="92%" h={6} />
        <Bar w="84%" h={6} />
        <Bar w="60%" h={6} />
      </Card>
    </div>
  ),
]

export default function MiniMock({ variant = 0, className = '' }) {
  const V = VARIANTS[variant % VARIANTS.length]
  return (
    <div role="img" aria-label="Product illustration" className={`relative overflow-hidden ${className}`}>
      <V />
    </div>
  )
}
