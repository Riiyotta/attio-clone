// Invented plans, prices and comparison rows for the fictional "Corvale" product. Lengths follow
// the character counts in CLONE_SPEC_PAGES.md T1 / the raw dump (role + c only, no source copy).

export const HERO = {
  title: 'Grow at your pace', // c17 w4
  lead: 'Every plan ships with the core workspace, so you only pay more as the team grows.', // c79 l2
}

// price: [monthly, annual] digits (string) or null for a non-numeric plan.
export const PLANS = [
  {
    name: 'Solo', // c4
    price: ['0', '0'],
    caption: 'Per seat a month, paid ', // + monthly|annually (c38)
    desc: 'For individuals who want to try it alone.', // c41 l2
    features: ['Live contact syncing tool', 'Shared mailbox reading', 'Basic reports', 'Notes and tags'],
    cta: 'Start for free', // c14
  },
  {
    name: 'Crew', // c4
    price: ['35', '28'],
    save: '20% less', // c8
    caption: 'Per seat a month, paid ',
    desc: 'For small groups that share one sales list.', // c43 l2
    features: ['Private lists', 'Seats without limit', 'Call recording'],
    cta: 'Try the Crew plan', // c17
  },
  {
    name: 'Max', // c3
    price: ['85', '68'],
    save: '20% less',
    featured: true,
    caption: 'Per seat a month, paid ',
    desc: 'For teams that run a repeatable sales motion today.', // c51 l2
    features: ['Advanced run builder tools', 'Priority support', 'Granular access'],
    cta: 'Continue with Max', // c17
  },
  {
    name: 'Commercial', // c10
    price: null,
    custom: 'Custom', // c6
    customCaption: 'Tailored terms.', // c15
    desc: 'For larger organisations with review and security needs.', // c56 l2
    features: ['Unlimited reports', 'Dedicated helper', 'Single sign-on with audits'],
    cta: 'Talk to sales', // c13
  },
]
// The spec counts 3 features per card (12 total); trim to 3 per card.
PLANS.forEach((p) => (p.features = p.features.slice(0, 3)))

export const TABLE = {
  caption: ['Pick a preferred', 'billing period'], // c30, 2 lines
  mobileTitle: 'Compare plans.', // c14
  mobileLead: 'See what each plan includes, side by side, and switch billing to compare the costs.', // c84 l2
}

// Cell value: string (text), true (included), false (not included), or { tip } (info only).
// Row: { label, tip?, values: [v0..v3], subs?: [{ label, values: [v0..v3] | prices: [[m,a],..] }] }
const Y = true
const N = false
export const GROUPS = [
  {
    title: 'Metered', // c7
    rows: [
      { label: 'Monthly runs', tip: 'Runs reset on the first day of each billing month.', values: ['120 per seat/mo', '400 per seat/mo', '1,200 per seat/mo', '2,500 per seat/mo'] },
      { label: 'Shared run budget', tip: 'A pool that every seat in the workspace can draw on.', values: ['1,000 shared monthly', '5,000 shared per month', '15,000 shared per month', 'Custom'] },
      {
        label: 'Extra run pack prices',
        tip: 'Top up when a busy month needs more runs.',
        values: [null, null, null, null],
        subs: [
          { label: '2,000 runs/mo', prices: [null, ['$18/mo', '$15/mo'], ['$18/mo', '$15/mo'], ['$18/mo', '$15/mo']] },
          { label: '10,000 runs/mo', prices: [null, ['$84/mo', '$70/mo'], ['$84/mo', '$70/mo'], ['$84/mo', '$70/mo']] },
          { label: '25,000 runs/mo', prices: [null, ['$198/mo', '$165/mo'], ['$198/mo', '$165/mo'], ['$198/mo', '$165/mo']] },
          { label: '50,000 runs/mo', prices: [null, ['$384/mo', '$320/mo'], ['$384/mo', '$320/mo'], ['$384/mo', '$320/mo']] },
        ],
      },
    ],
  },
  {
    title: 'Your data', // c9
    rows: [
      { label: 'Users', tip: 'People who can sign in to the workspace.', values: ['Up to 3', 'Up to 10', 'Unlimited', 'Unlimited'] },
      {
        label: 'Schemas',
        tip: 'Kinds of record you can model.',
        values: ['3 types', '6 types', '12 types', 'Unlimited'],
        subs: [
          { label: 'People, company records', values: [Y, Y, Y, Y] },
          { label: 'Deals, projects and more types', values: [N, Y, Y, Y] },
          { label: 'Your own types', values: [N, N, Y, Y] },
        ],
      },
      { label: 'Records', tip: 'Total records stored across every schema.', values: ['50,000', '250,000', '1,000,000', 'Custom'] },
      { label: 'Linked fields across lists', tip: 'Link any record to any other.', values: [Y, Y, Y, Y] },
      { label: 'Profile enrichment', tip: 'Fill company details from public sources.', values: [Y, Y, Y, Y] },
      { label: 'Duplicate merging', tip: 'Spot records that describe the same thing.', values: [N, Y, Y, Y] },
      { label: 'Bulk edit', tip: 'Change many records in one step.', values: [Y, Y, Y, Y] },
      { label: 'Importing', tip: 'Bring in data from a spreadsheet.', values: [Y, Y, Y, Y] },
      { label: 'Saved filter', tip: 'Keep filters and sorts for later.', values: [Y, Y, Y, Y] },
      { label: 'Field-level edit trail', tip: 'See who changed what, and when.', values: [N, Y, Y, Y] },
      { label: 'Uploads', tip: 'Store files on any record.', values: [Y, Y, Y, Y] },
      { label: 'Calculated', tip: 'Compute values from other fields.', values: [N, N, Y, Y] },
      { label: 'Data history', tip: 'How far back you can restore.', values: ['1 day', '1 wk.', '30 days', 'Unlimited'] },
    ],
  },
  {
    title: 'Connections', // c11
    rows: [
      { label: 'Mail sync', tip: 'Two-way sync with your inbox.', values: [Y, Y, Y, Y] },
      { label: 'Calendar and notes', tip: 'Meetings land on the right record.', values: [Y, Y, Y, Y] },
      { label: 'App store', tip: 'Install apps built by partners.', values: [Y, Y, Y, Y] },
    ],
  },
  {
    title: 'Automation & tools', // c18
    rows: [
      { label: 'Flow steps per workflow', tip: 'Steps allowed in a single flow.', values: ['Up to 5 steps each', 'Up to 25 steps each', 'Up to 100 steps each', 'No step limit at all'] },
      {
        label: 'Run schedules',
        tip: 'How often scheduled flows may run.',
        values: [
          'Daily schedules for one flow at a time.',
          'Hourly schedules for up to ten active flows in the space.',
          'Schedules every fifteen minutes for every flow in the workspace, with retry rules included.',
          'Schedules every five minutes for every flow in the workspace, with priority queueing included.',
        ],
      },
      { label: 'Webhook listeners', tip: 'Start a flow from an outside event.', values: [N, Y, Y, Y] },
      { label: 'Conditional flow branches', tip: 'Split a flow on any field.', values: [N, Y, Y, Y] },
      { label: 'Approval steps in any flows', tip: 'Pause a flow until someone signs off.', values: [N, N, Y, Y] },
      { label: 'Run log days', tip: 'How long run logs are kept.', values: ['7 day history', '30 day history', 'Unlimited', 'Unlimited'] },
      { label: 'Sequences per seat', tip: 'Outreach sequences each seat may run.', values: ['1 live sequence', '5 live sequences', '20 live sequences', 'No live seq. limit'] },
      { label: 'Writing aid in each note', tip: 'Draft and tidy text in place.', values: [Y, Y, Y, Y] },
      { label: 'Meeting notes', tip: 'Summaries for recorded calls.', values: [N, Y, Y, Y] },
      { label: 'Call summaries', tip: 'Searchable text for each call.', values: [N, Y, Y, Y] },
    ],
  },
  {
    title: 'Extensions', // c10
    rows: [
      {
        label: 'Apps built by our own team',
        values: [null, null, null, null],
        subs: [
          { label: 'Shared mailbox reader', values: [Y, Y, Y, Y] },
          { label: 'Website form intake', values: [Y, Y, Y, Y] },
          { label: 'Billing data connector', values: [N, Y, Y, Y] },
          { label: 'Product usage connector', values: [N, Y, Y, Y] },
          { label: 'Support ticket importer tool', values: [N, Y, Y, Y] },
          { label: 'Video call note taker app', values: [N, Y, Y, Y] },
          { label: 'Contract and signature sync', values: [N, N, Y, Y] },
          { label: 'Warehouse export pipeline', values: [N, N, Y, Y] },
          { label: 'Chat workspace alert bot', values: [Y, Y, Y, Y] },
        ],
      },
      {
        label: 'Developer platform',
        values: [null, null, null, null],
        subs: [
          { label: 'REST', values: [Y, Y, Y, Y] },
          { label: 'Webhook API', values: [Y, Y, Y, Y] },
          { label: 'SDKs', values: [N, Y, Y, Y] },
          { label: 'App kits', values: [N, Y, Y, Y] },
          { label: 'Custom cards', values: [N, Y, Y, Y] },
          { label: 'Sandbox', values: [N, N, Y, Y] },
          { label: 'OAuth for apps', values: [N, Y, Y, Y] },
          { label: 'CLI', values: [Y, Y, Y, Y] },
          { label: 'Rate limit tier', values: ['Base', 'Base', 'High', 'Custom'] },
        ],
      },
      {
        label: 'Partner directory',
        values: [null, null, null, null],
        subs: [
          { label: 'Apps', values: [Y, Y, Y, Y] },
          { label: 'Expert help', values: [Y, Y, Y, Y] },
          { label: 'Paid templates', values: [N, Y, Y, Y] },
          { label: 'Private apps', values: [N, N, Y, Y] },
          { label: 'Reviews', values: [Y, Y, Y, Y] },
        ],
      },
    ],
  },
  {
    title: 'Reporting', // c9
    rows: [
      { label: 'Dashboards in use', tip: 'Dashboards per workspace.', values: ['3 dashboards', '10 dashboards', '50 dashboards', 'No limit set'] },
      { label: 'Funnel analysis', tip: 'Stage-to-stage conversion.', values: [N, Y, Y, Y] },
      { label: 'Value snapshot', tip: 'Report on past field values.', values: [N, Y, Y, Y] },
      { label: 'Projection', tip: 'Project revenue by period.', values: [N, N, Y, Y] },
      { label: 'Targets', tip: 'Targets for people and teams.', values: [N, Y, Y, Y] },
      { label: 'Report email schedule', tip: 'Send reports on a schedule.', values: [N, Y, Y, Y] },
      { label: 'Embedded widgets', tip: 'Show a chart on a record page.', values: [N, N, Y, Y] },
    ],
  },
  {
    title: 'Admin and security', // c18
    rows: [
      { label: 'Roles', tip: 'Group permissions into roles.', values: [null, null, '3 roles', 'Unlimited'] },
      {
        label: 'Scoped list access',
        tip: 'Limit who can see each list.',
        values: [{ tip: 'Workspace-wide only.' }, { tip: 'Per list access.' }, { tip: 'Per list and per view.' }, { tip: 'Per list, view and field.' }],
        subs: [
          { label: 'Read-only membership', values: [N, Y, Y, Y] },
          { label: 'Guest view link', values: [N, N, Y, Y] },
          { label: 'Field hiding per role', values: [N, N, N, Y] },
        ],
      },
      { label: 'Federated sign-ins', tip: 'Sign in with your identity provider.', values: [N, N, N, Y] },
      { label: 'Automatic user setup', tip: 'Add and remove people automatically.', values: [N, N, N, Y] },
      { label: 'Audit log exports', tip: 'Track sensitive changes.', values: [N, N, Y, Y] },
      { label: 'Two-step login', tip: 'Require a second factor.', values: [Y, Y, Y, Y] },
      { label: 'Data', tip: 'Choose where data is stored.', values: [N, N, N, Y] },
    ],
  },
  {
    title: 'Support', // c7
    rows: [
      { label: 'Help center', tip: 'Guides and how-tos.', values: [Y, Y, Y, Y] },
      { label: 'Support emails', tip: 'Reply within two working days.', values: [Y, Y, Y, Y] },
      { label: 'Priority answers', tip: 'Jump the queue.', values: [N, N, Y, Y] },
      { label: 'Guided onboarding', tip: 'Guided setup calls.', values: [null, 'Self-serve only', 'One-time kickoff', 'Ongoing program'] },
    ],
  },
]

const ans = (...p) => p
export const FAQ_TITLE = 'Questions we often get asked.' // c29 (spec c27)
export const FAQ = [
  { q: 'How do I choose the right plan?', a: ans('Every plan includes the same core workspace. The higher tiers add more seats, longer histories and stronger admin tools, so pick the one that matches how many people need access today.') },
  { q: 'Can I change plans later on?', a: ans('Yes. You can move up or down at any time from the billing settings, and any unused time on the current plan is credited to the next invoice.') },
  { q: 'Is there a free trial?', a: ans('The Solo plan is free forever. Paid plans include a fourteen day trial with every feature unlocked, and no card is needed to start.') },
  { q: 'How do seats get billed?', a: ans('Seats are billed for each person with full access. Guests and read-only members are free on every plan, and seats can be added or removed at any time from settings.', 'When you add a seat part way through a cycle we charge only for the remaining days, and removing a seat stops billing at the end of the current period.') },
  { q: 'What happens when runs run out?', a: ans('Flows pause until the next cycle starts. You can buy a run pack to keep them going, or move to a plan with a larger shared budget.', 'Pack prices are listed in the table above and are billed on the same cycle as your plan.') },
  { q: 'Do you offer discounts?', a: ans('Paying yearly saves about a fifth on every paid plan.') },
  { q: 'Are there limits on records?', a: ans('Each plan includes a record allowance across all schemas. If you get close to it we will let you know well before anything stops working.') },
  { q: 'Can I export all of my data?', a: ans('Yes, at any time and on every plan.') },
  { q: 'Which payment methods are accepted?', a: ans('We accept major cards on every plan. Yearly plans can also be paid by bank transfer.') },
  { q: 'Do you offer startup pricing?', a: ans('Early teams can apply for a discount. Read more on the startup program page.') },
  { q: 'How does tax work on invoices for my region?', a: ans('Tax is added where required.') },
  { q: 'Who do I talk to with questions?', a: ans('Our team is happy to help. Send a note to the sales desk any time.') },
]
