// Invented placeholder copy for /platform/developers (invented "Corvale" product), sized to the
// CLONE_SPEC_PLATFORM Appendix A counts (target c/w noted per line).
import {
  AgentFlowArt,
  ComponentsArt,
  ConnectionArt,
  EntryPointsArt,
  FormArt,
  FunctionsArt,
  McpClientArt,
  OAuthArt,
  OAuthRingsArt,
  RestArt,
  TableAgentsArt,
  ToolCallsArt,
  WebhookArt,
} from './Illustrations.jsx'

const x80y80 = { l1: '20%', r1: '80%', t1: '20%', b1: '80%' }
const x60y80 = { l1: '40%', r1: '60%', t1: '20%', b1: '80%' }

export const HERO = {
  overline: '[ CORVALE DEVELOPERS ]', // c22
  title: 'Draft. Test. Ship.', // c18 w3
  sub: 'Connect your sales tools through the HTTP API, the app kit or the hub.', // c69
  primary: 'Read docs', // c9
  secondary: 'App gallery', // c11
}

export const API = {
  lead: 'Wire Corvale into any toolset.', // c30
  cont: 'Start with a straightforward REST API that is secure and made to scale.', // c70 w13
  button: 'Read docs',
  rows: [
    {
      type: 'cards',
      h: 7,
      cards: [
        { n: 1, x: 2, w: 8, cols: 16, art: RestArt, fade: { r1: '70%', b1: '50%', b0: '80%' }, text: 'Ship custom integrations that can both read and edit any record.' }, // c59
        { n: 2, x: 10, w: 6, cols: 12, art: WebhookArt, fade: x80y80, text: 'Subscribe to webhooks and react to events in code.' }, // c52
        { n: 3, x: 16, w: 6, cols: 12, art: OAuthArt, fade: { l1: '40%', r1: '60%' }, text: 'Grant scoped access to apps through OAuth 2.0 flows.' }, // c49
      ],
    },
  ],
  tail: [2, 10, 16, 22],
}

export const SDK = {
  lead: 'Make Corvale fit your team.', // c27 w5
  cont: 'Extend it with TypeScript and React using the App SDK.', // c54 w10
  button: 'Read docs',
  rows: [
    {
      type: 'cards',
      h: 7,
      cards: [
        { n: 1, x: 2, w: 8, cols: 16, art: EntryPointsArt, fade: { l1: '40%', b1: '50%', b0: '80%' }, text: 'Pick where your app appears: record actions, side panels, or highlighted text inside Corvale.' }, // c97
        { n: 2, x: 10, w: 6, cols: 12, art: FormArt, fade: { b1: '50%', b0: '90%' }, text: 'Build forms, then declare the fields and validation rules your data needs.' }, // c73
        { n: 3, x: 16, w: 6, cols: 12, art: FunctionsArt, fade: { t1: '20%', b1: '80%' }, text: 'Call server functions to read, write, or clean up data held by third parties.' }, // c73
      ],
    },
    {
      type: 'strip',
      strip: {
        quote: 'Typed end to end, fast to deploy, and easy to reason about — what our team needed.', // c82 w16
        by: 'PRIYA NANDAN\n/ FOLDLINE', // c23
      },
    },
    {
      type: 'cards',
      h: 7,
      cards: [
        { n: 4, x: 2, w: 6, cols: 12, art: ConnectionArt, fade: x60y80, text: 'Manage credentials for single users or whole workspaces when talking to outside services.' }, // c91
        { n: 5, x: 8, w: 6, cols: 12, art: () => <WebhookArt chip={null} />, fade: x60y80, text: 'Accept inbound requests through webhooks to sync records or send data back.' }, // c75
        { n: 6, x: 14, w: 8, cols: 12, art: ComponentsArt, fade: x60y80, text: 'Drop in prebuilt UI components to give your app a finished, native look.' }, // c70
      ],
    },
  ],
  tail: [2, 8, 14, 22],
}

export const MCP = {
  lead: 'Open Corvale to AI agents.', // c27 w5
  cont: 'Connect coding agents and automation tools to the MCP server, or build it into your product.', // c91 w15
  button: 'Read docs',
  rows: [
    {
      type: 'cards',
      h: 8,
      cards: [
        { n: 1, x: 2, w: 10, cols: 16, gap12: true, center: true, art: AgentFlowArt, fade: x80y80, text: 'Let agents run automations with the same access a teammate has.' }, // c62
        { n: 2, x: 12, w: 10, cols: 16, gap12: true, art: TableAgentsArt, fade: { l1: '50%', b1: '50%', b0: '85%' }, text: 'Query, create, and update records in Corvale through structured tool calls.' }, // c71
      ],
    },
    {
      type: 'auto',
      cards: [
        { n: 3, art: ToolCallsArt, fade: { l1: '10%', r1: '90%', t1: '5%', b1: '95%' }, text: 'Combine Corvale with other systems using dynamic, multi-step tool execution.' }, // c73
        { n: 4, art: OAuthRingsArt, fade: x80y80, text: 'Sign in safely with OAuth and permissions scoped per user.' }, // c61
        { n: 5, art: McpClientArt, fade: { l1: '15%', r1: '85%', t0: '10%', t1: '15%', b1: '85%', b0: '90%' }, text: 'Works with any MCP client next to your other MCP servers.' }, // c58
      ],
    },
    {
      type: 'strip',
      strip: {
        quote: 'With the Corvale MCP we reached the full data model on day one, with no glue code needed.', // c88 w16
        by: 'OSKAR BRENNIG\n/ TALLWATER', // c25
      },
    },
  ],
  tail: [2, 22],
}

export const TESTIMONIALS = [
  {
    name: 'RUTH ADEYO', // c10
    role: '// PLATFORM LEAD', // c16
    quote:
      'I gravitate toward platforms that trust their builders — frameworks that hand you sturdy parts instead of a sealed box. The Corvale SDK hands the decisions and the control back to engineers.', // c180 w32 (c190 here so the wrap matches live: 4L / 6L / 10L at 1440 / 768 / 390)
  },
  {
    name: 'JONAH PELLOW', // c12
    role: '// INDIE BUILDER', // c16
    quote: 'With the SDK, server logic and interface components stay seamlessly aligned. It really feels good to ship.', // c95 w18 (c106 w17 here so the wrap matches live: 2L / 3L / 6L)
  },
]

export const HEAT = {
  lead: 'By engineers, for engineers.', // c30 w4
  cont: 'We run on what we ship and push code daily.', // c44 w10
  button: 'How we work', // c12
  caption: '9,417 CHANGES SHIPPED TO PRODUCTION THIS YEAR', // c44
}

export const APPS = {
  lead: 'Polished apps, shipped on the SDK.', // c35 w6
  cont: 'Teams already build on the App SDK. Keep apps inside your workspace or publish them to the gallery.', // c103 w18
  button: 'App gallery', // c11
  apps: [
    { name: 'Halcyon', seed: 2 }, // c7
    { name: 'Dovetel', seed: 5 }, // c7
    { name: 'Ferrum', seed: 0 }, // c6
    { name: 'Tidewell', seed: 9 }, // c8
    { name: 'Brackett', seed: 11 }, // c8
  ],
  link: 'Explore the open source Ferrum app repo', // c40 w8
  linkMobile: 'Explore the Ferrum app repository', // c34 (390 variant)
}

export const CTA = {
  title: 'Start building.', // c15
  chip: ['https://', 'dev.corvale.io', '/sdk/'], // chip length not counted in spec
}
