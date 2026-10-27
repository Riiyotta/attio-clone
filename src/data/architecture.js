// T8 architecture page copy. Invented editorial text, sized to the measured c / line counts.

// Hero typewriter: 4 two-line phrases (lines ~c18 + c13), c114 in total, typed through 300svh.
export const HERO_PHRASES = [
  ['Every team keeps', 'its own notes.'],
  ['Every tool holds', 'a fragment.'],
  ['The context stays', 'scattered.'],
  ['Until one system', 'holds it all.'],
]

export const CHAPTERS = {
  story: { label: '[The story]', title: 'How work outgrew the tools built to hold it' },
  architecture: { label: '[The architecture]', title: 'A single model for every record' },
  launch: { label: '[The launch]', title: 'What ships today' },
}

export const STORY = {
  introLabel: 'Where we began',
  intro: [
    'For years, the systems that held customer knowledge were built around forms. Someone typed a note, picked a stage from a dropdown and moved on. The record captured a moment, not the relationship, and everything that happened between meetings lived somewhere else entirely.',
    'Email held the tone of a deal. Calendars held its rhythm. Spreadsheets held the numbers nobody trusted. Each tool was useful on its own, yet none of them could tell you what was actually going on with an account.',
  ],
  pull: 'The record was never the work itself.',
  h3: 'We started from a simple question: what if the system could see everything your team already does?',
  body1:
    'Instead of asking people to describe their work after the fact, the workspace listens to the places where work already happens. Messages, meetings, documents and product events are read as they arrive, linked to the right people and companies, and kept in step without a single manual update. The result is a record that reflects reality rather than memory, and that stays current without anyone chasing it.',
  body2: 'Each signal is stored once, linked everywhere it matters and kept with its source, so any answer can be traced back to where it came from.',
  chips: [
    ['Inbound', 'mail, calls, chats'],
    ['Records', 'people and companies'],
  ],
  statement: 'Context is the raw material of every good decision.',
  statementBody: [
    'Most teams already have the information they need. It is simply spread across tools that do not talk to each other.',
    'When context is scattered, every handoff loses something. A renewal call starts cold. A support ticket repeats a question that was answered last quarter. A forecast leans on guesses because the evidence is buried in threads nobody can search. These gaps are small on their own and expensive together.',
    'Bringing context into one place changes the shape of the work. People stop re-asking and start building on what is known.',
    'It also changes what software can do on its own. When a system holds the full picture, it can draft the follow-up, flag the risk and suggest the next step, while the people on the team stay in control of every decision that matters to the customer.',
  ],
  reasonsLabel: 'Five reasons the old model breaks',
  reasons: [
    ['Forms', 'Data only exists if someone remembers to type it in, so the record is always one step behind what actually happened with the customer.'],
    ['Silos', 'Each tool keeps its own copy of the truth, and every copy drifts a little further from the others with each passing week of busy work.'],
    ['Lag', 'Reports arrive after decisions are made, so leaders steer with a view of the pipeline that is already several days out of date.'],
    ['Handoffs', 'Context leaks every time an account moves between teams, and the customer feels it in every repeated question.'],
    ['Guesswork', 'Without a complete picture, forecasts and priorities rest on instinct rather than evidence, and nobody can explain why a number moved.'],
  ],
}

export const PROBLEM = {
  label: 'The problem',
  words:
    'Software for revenue teams was designed to be filled in, not to understand. It waits for input, forgets context and leaves people stitching together the story by hand every single day of the week.',
  big: 'Stitched',
}

export const STORY_TAIL = {
  h3: 'So we rebuilt the foundation around the work itself, not the form.',
  bullets: [
    'Signals from every connected tool flow into one model, linked to the people and companies they describe.',
    'Records update themselves as the work moves.',
    'Every answer points back to its source.',
  ],
  chips: [
    ['Signal graph', 'linked in real time'],
    ['Workspace', 'one shared model'],
  ],
}

export const ARCH = {
  h3: 'One model, many views.',
  body: [
    'Underneath every list, report and agent sits the same graph of records, relationships and events, stored once and shared by all.',
    'Because there is only one model, a change made anywhere is visible everywhere. A note added in a meeting updates the account, the deal and the forecast at once. Permissions follow the record, not the tool, so people see exactly what they should. And because every event is kept with its timestamp and source, the history of an account can be replayed, audited and explained long after the fact.',
  ],
  rings: ['Capture', 'Connect', 'Reason', 'Act'],
  tags: ['inbound signal', 'record update', 'agent action', 'sync event', 'new relation', 'score change'],
  statement: 'Built on four layers that work as one.',
  pillars: [
    ['Capture layer', 'Every message, meeting and event is read the moment it lands and filed against the right record.'],
    ['Relationship graph', 'People, companies and deals are linked automatically, so context travels with every record.'],
    ['Reasoning engine', 'Agents draw on the full history to draft, flag and suggest, with every step explained.'],
  ],
}

export const LAUNCH = {
  features: [
    {
      h3: 'Live records',
      overline: 'Profiles that update themselves as work moves',
      body: [
        'Every person and company profile assembles itself from the signals your team already produces, so the record is current the moment you open it.',
        'Fields fill in from mail, meetings and product data. Changes are tracked with their source and time, and nothing is overwritten without a trace. When two signals disagree, the record shows both and lets the team decide which one wins.',
      ],
    },
    {
      h3: 'Ask the workspace',
      overline: 'Plain questions, answers you can trace back',
      body: [
        'Ask about any account, deal or trend in your own words and get an answer grounded in your own data, with links to the sources.',
        'Answers cite the meetings, threads and records they draw on, so anyone can check the reasoning. Follow-up questions keep the context, and useful answers can be pinned to a record for the rest of the team.',
      ],
    },
    {
      h3: 'Quiet agents',
      overline: 'Routine steps handled, decisions left to you',
      body: [
        'Agents draft follow-ups, update stages and flag risks in the background.',
        'Each action is proposed with its reasoning and waits for approval until you choose to let it run on its own. Every step is logged, every change can be undone and every rule is written in plain language your team can read.',
      ],
    },
  ],
  beta: {
    h3: 'Open beta',
    overline: 'Rolling out to every workspace over the season',
    body: [
      'The new foundation is available today for teams that want to try it first. Existing data moves across automatically, and nothing changes in the tools you already use until you decide to switch the new views on for your team.',
      'Early access includes live records, the question bar and a starter set of agents. More layers arrive every month, shaped by the teams already using them.',
    ],
  },
  codeH3: 'Trusted by teams who run their whole business in one place.',
}

export const CLOSING = {
  line: 'The record finally keeps up with the work. Come and see it run.',
  nav: [
    ['Talk to our team', 'Book a demo'],
    ['Start for free', 'Open a workspace'],
  ],
}
