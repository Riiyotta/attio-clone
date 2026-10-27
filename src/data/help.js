import { sentence, slugify, title } from './copy.js'

// T9 help docs content (invented). Sidebar: 2 groups (Academy c7 / Reference c9); item label
// lengths follow the measured c counts (group 1: 13/9/9/7/28, group 2: 14 rows).

const nested = (n, seed) => Array.from({ length: n }, (_, i) => title(18 + ((seed * 7 + i * 11) % 30), seed * 13 + i))

export const LESSONS = [
  ['Welcome to the workspace', 'Take a quick tour of the main screens.'],
  ['Records, lists and views', 'See how data is stored in one place.'],
  ['Importing your first data', 'Bring a spreadsheet in and map columns.'],
  ['Custom attributes', 'Add the fields that matter most to your team.'],
  ['Building a pipeline', 'Track deals from first call to signed contract.'],
  ['Notes and tasks', 'Capture context and follow-ups on any record.'],
  ['Syncing mail and calendar', 'Connect inboxes so every touchpoint is logged.'],
  ['Sharing and permissions', 'Choose who can see and edit each part of the data.'],
  ['Reports that answer questions', 'Turn records into charts your whole team can read.'],
  ['Automating routine steps', 'Run simple workflows when a record changes stage.'],
]

export const HELP_NAV = [
  {
    label: 'Academy',
    icon: 'star',
    to: '/help/academy',
    items: [
      { label: 'Getting going', children: nested(3, 1) },
      { label: 'Video tour', children: nested(2, 2) },
      { label: 'Workshops', children: nested(3, 3) },
      { label: 'Courses', to: '/help/academy', children: nested(4, 4) },
      { label: 'Guided projects for new teams', children: nested(2, 5) },
    ],
  },
  {
    label: 'Reference',
    icon: 'note',
    to: '/help/reference/attio-101',
    items: [
      { label: 'Basics 101', to: '/help/reference/attio-101', children: LESSONS.map((l) => l[0]) },
      { label: 'Records', children: nested(3, 6) },
      { label: 'Lists and pipelines', children: nested(3, 7) },
      { label: 'Data and imports', children: nested(2, 8) },
      { label: 'Mail and calendar', children: nested(3, 9) },
      { label: 'Automations and sequences', children: nested(4, 10) },
      { label: 'Reporting', children: nested(2, 11) },
      { label: 'API', children: nested(3, 12) },
      { label: 'Billing and plans', children: nested(2, 13) },
      { label: 'Admin settings', children: nested(3, 14) },
      { label: 'Security and compliance', children: nested(2, 15) },
      { label: 'Integrations', children: nested(3, 16) },
      { label: 'Troubleshooting', children: nested(2, 17) },
      { label: 'Glossary', children: nested(2, 18) },
    ],
  },
]

/** Flat list for the help search dialog. */
export const HELP_SEARCH = HELP_NAV.flatMap((g) =>
  g.items.flatMap((it) => [
    { id: `${g.label}-${it.label}`, label: it.label, group: g.label, to: it.to ?? `/help#${slugify(it.label)}` },
    ...it.children.map((c, i) => ({ id: `${g.label}-${it.label}-${i}`, label: c, sub: it.label, group: g.label, to: it.to ?? `/help#${slugify(it.label)}` })),
  ])
)

export const COURSES = [
  ['Starter basics', 98, '12 lessons', '48 min'],
  ['Pipelines', 95, '9 lessons', '36 min'],
  ['Reporting', 53, '9 lessons', '41 min'],
  ['Imports', 126, '9 lessons', '27 min'],
  ['Automating routine team work', 110, '11 lessons', '52 min'],
].map(([t, dc, lessons, dur], i) => ({ title: t, desc: sentence(dc, 90 + i), lessons, duration: dur }))
