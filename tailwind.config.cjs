/** @type {import('tailwindcss').Config} */

// Every value below comes from CLONE_SPEC.md section 0 (Global tokens).
// The default Tailwind palette is replaced (not extended) so only spec colors exist.

const L1 = '0 1px 3px 0 rgba(0,0,0,0.01)'
const L2 = '0 2px 4px -1px rgba(0,0,0,0.02)'
const L3 = '0 4px 8px -2px rgba(0,0,0,0.03)'
const L4 = '0 8px 16px -4px rgba(0,0,0,0.04)'
const L5 = '0 16px 32px -8px rgba(0,0,0,0.05)'
const L6 = '0 32px 64px -16px rgba(0,0,0,0.06)'
const L7 = '0 64px 128px -32px rgba(0,0,0,0.07)'
const attio = (n) => [L1, L2, L3, L4, L5, L6, L7].slice(0, n).join(', ')

// fontSize helper: [size, { lineHeight, letterSpacing, fontWeight }]
const t = (size, lineHeight, letterSpacing, fontWeight = '500') => [
  size,
  { lineHeight, letterSpacing, fontWeight },
]

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    // 0.7 breakpoints in use on the site
    screens: {
      xs: '375px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1400px',
      '3xl': '1536px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      // 0.2 raw palette
      black: {
        0: '#000000',
        50: '#101010',
        100: '#1c1d1f',
        200: '#202124',
        300: '#232529',
        400: '#2e3238',
        500: '#383e47',
        600: '#505967',
        700: '#6f7988',
        800: '#8f99a8',
        900: '#a4adba',
      },
      white: {
        100: '#ffffff',
        200: '#fafafb',
        300: '#f3f4f6',
        400: '#edeff3',
        500: '#e4e7ec',
        600: '#dee2e7',
        700: '#d3d8df',
        800: '#cad0d9',
        900: '#b5bdc9',
      },
      blue: {
        100: '#e8f0ff',
        200: '#c8dcff',
        300: '#94b9ff',
        400: '#709ff5',
        450: '#538bf3',
        500: '#266df0',
        600: '#245bc2',
        800: '#1a2233',
      },
      // 0.2 semantic tokens (CSS vars flip inside `.dark`, see index.css)
      'primary-background': 'var(--primary-background)',
      'secondary-background': 'var(--secondary-background)',
      'surface-subtle': 'var(--surface-subtle)',
      'subtle-stroke': 'var(--subtle-stroke)',
      'default-stroke': 'var(--default-stroke)',
      'strong-stroke': 'var(--strong-stroke)',
      'accent-stroke': 'var(--accent-stroke)',
      'primary-foreground': 'var(--primary-foreground)',
      'secondary-foreground': 'var(--secondary-foreground)',
      'tertiary-foreground': 'var(--tertiary-foreground)',
      'accent-foreground': 'var(--accent-foreground)',
      'caption-foreground': 'var(--caption-foreground)',
      'disabled-foreground': 'var(--disabled-foreground)',
      'eyebrow-foreground': 'var(--eyebrow-foreground)',
      'eyebrow-background': 'var(--eyebrow-background)',
      // 0.2 one-offs + measured translucent surfaces (sections 1, 2, 5)
      traffic: { red: '#ff5b59', yellow: '#f5b900', green: '#0fc27b' },
      'header-glass': 'rgba(255,255,255,0.95)', // header + dropdown panel bg
      'window-shell': 'rgba(243,244,246,0.8)', // hero window shell
      'window-shell-dark': 'rgba(0,0,0,0.8)', // hero terminal shell
      'window-hairline': 'rgba(0,0,0,0.05)', // hero content-area border, record card grid cells
      'frost': 'rgba(255,255,255,0.6)', // self-building frame
      'dark-primary-border': 'rgba(80,90,104,0.5)', // primary button inside dark sections
      // Neutral mock-UI fills (measured on the site's mock frames: #fbfbfb surfaces, #eeeff1 hairlines)
      mock: { surface: '#fbfbfb', stroke: '#eeeff1' },
      // Measured on the live site (pixel audit): hero badge inner pill hover, self-building tick line
      'badge-hover': '#fbfbfc',
      tick: 'rgba(230,231,234,0.85)', // #E6E7EA @ .85 stroke-opacity
      // Original artwork accents (mock UI chips/avatars, story art). Aliases of colours already in the
      // spec (hero glow 2a, planet rim 6a); no new hues.
      // CLONE_SPEC_PAGES 0.1 extra tokens (secondary pages)
      red: { 500: '#ff5b59', 600: '#f65351', 700: '#ce2e4b' }, // invalid border / error text / invalid focus border (measured class)
      'select-ring': 'rgba(36,109,238,0.30)', // select focus ring
      'error-ring': 'rgba(246,83,81,0.30)', // invalid input focus ring (red-600/30, measured class)
      'name-pill': 'rgba(228,232,237,0.6)', // creator slide name pill
      'tile-ring': 'rgba(20,20,39,0.05)', // perks orbit token ring
      'media-ring': 'rgba(29,29,29,0.1)', // avatar/photo inset ring
      'player-btn': 'rgba(0,0,0,0.12)', // careers video control buttons
      'quote-ring': 'rgba(0,0,0,0.15)', // creator slide avatar ring
      'tag-pill': '#f4f5f6', // app-partners mock tag pill bg
      careers: { violet: '#9162f9', orange: '#fd9038', plus: '#75777c', bubble: '#fbfbfb' }, // careers hero avatar rings / +N bubble
      art: {
        haze: '#e6ecff',
        periwinkle: '#bccbff',
        iris: '#86a0ee',
        mist: '#eef1ea',
        teal: '#6cbdb0',
        navy: '#161e69',
        ember: '#bb2a1e',
        citron: '#ccc427',
      },
      // CLONE_SPEC_PAGES T4-T9 (apps / blog / changelog / architecture / help), measured
      green: { 600: '#0db472' }, // official-app verified badge
      'hover-row': '#f5f6f8', // help sidebar link hover
      'sidebar-text': '#717a88', // help sidebar link text (literal #717A88)
      'help-muted': '#727b84', // help get-started heading continuation
      'lightbox-overlay': 'rgba(202,207,217,0.4)',
      'dialog-overlay': 'rgba(110,120,135,0.4)',
      ascii: '#cfd4dc', // engineering blog ASCII table text
      'dim-white': 'rgba(255,255,255,0.2)', // architecture scroll-lit words (unlit)
      'tag-line': 'rgba(255,255,255,0.4)', // architecture dark-scene tag border
      'code-glyph': '#3f4855', // architecture launch diagram glyph
      arch: {
        story: '#e0d9cc',
        architecture: '#e4ebe4',
        launch: '#e3d6c8',
      },
      // CLONE_SPEC_PLATFORM section 4 (developers, dark blueprint): card diagram stroke + well fill
      dev: {
        dash: '#23252a', // dashed connector stroke in card diagrams
        well: '#131416', // inner node fill in card diagrams
      },
      // CLONE_SPEC_PLATFORM 0.2 one-offs (platform v2 / legacy library)
      platform: {
        'status-bg': '#ddf9e4', // "Completed" pill
        'status-border': '#c7f4d3',
        'status-text': '#0b935d',
        'tile-blue': '#e5eeff', // agent icon tiles (bg / border pairs)
        'tile-blue-border': '#d6e5ff',
        'tile-cyan': '#ddf7ff',
        'tile-cyan-border': '#d0eff7',
        'tile-yellow': '#fff3cc',
        'tile-yellow-border': '#ffe59e',
        'card-title': '#242629', // marquee card title
        'card-desc': 'rgba(0,0,0,0.4)', // marquee card desc
        'card-label': '#505155', // marquee card footer label
        'card-border': 'rgba(28,29,31,0.05)', // marquee card / strip tile 1px border
        'chip-text': 'rgba(80,89,104,0.55)', // web-agent domain chips
        'chip-border': 'rgba(227,231,235,0.5)',
        'uc-stripe': 'rgba(228,231,235,0.45)', // UC hero stripe field
      },
    },
    fontFamily: {
      // `inter` text cut + `interDisplay` (opsz 32 cut) are kept as distinct families
      sans: ['Inter', '"inter Fallback"', 'sans-serif'],
      display: ['InterDisplay', '"interDisplay Fallback"', 'sans-serif'],
      mono: ['"JetBrains Mono"', '"JetBrains Mono Fallback"', 'monospace'],
      serif: ['"Source Serif 4"', '"tiemposText Fallback"', 'serif'],
    },
    fontSize: {
      // Site text utilities (0.3, last paragraph)
      xs: t('12px', '18px', '0px'),
      sm: t('14px', '20px', '-0.07px'),
      base: t('16px', '22px', '-0.16px'),
      lg: t('18px', '24px', '-0.18px'),
      xl: t('20px', '26px', '-0.2px'),
      '2xl': t('24px', '30px', '-0.24px'),
      // 0.3 roles
      'hero': t('64px', '60.8px', '-1.28px', '600'),
      'hero-md': t('70.61px', '67.08px', '-1.743px', '600'),
      'hero-sm': t('40px', '38px', '-0.4px', '600'),
      'mega': t('96px', '96px', '-2.304px', '600'),
      'section': t('40px', '44px', '-0.4px'),
      'section-sm': t('32px', '36px', '-0.32px'),
      'final-cta': t('56px', '56px', '-0.84px'),
      'showcase-h3': t('24px', '27.6px', '-0.24px'),
      'story': t('32px', '36.8px', '-0.8px'),
      'stat': t('32px', '32px', '-0.32px'),
      'newsletter': t('24px', '30px', '-0.24px'),
      'overline': t('12px', '14px', '0.72px', '600'),
      'subhead': t('18px', '23.4px', '-0.18px'),
      'subhead-sm': t('15px', '19.5px', '-0.17px'),
      'card-title': t('18px', '22px', '-0.18px'),
      'changelog-title': t('18px', '24px', '-0.18px'),
      'body': t('16px', '22px', '-0.16px'),
      'stat-label': t('16px', '16px', '-0.16px'),
      'showcase-nav': t('18px', '21.6px', '-0.16px'),
      'nav': t('15px', '22px', '-0.16px'),
      'button': t('14px', '20px', '-0.07px'),
      'eyebrow': t('14px', '20px', '-0.14px'),
      'small-button': t('12px', '18px', '0px'),
      'banner': t('13px', '20px', '-0.16px'),
      'badge': t('13px', '18px', '-0.16px'),
      'dropdown': t('14px', '20px', '-0.07px'),
      'dropdown-label': t('12px', '18px', '0px'),
      'time': t('12px', '14px', '0px'),
      'quote': t('48px', '52px', '-0.72px', '400'),
      'quote-sm': t('32px', '36px', '-0.48px', '400'), // measured at 768 / 390
      'mega-md': t('56px', '56px', '-1.344px', '600'),
      'mega-sm': t('40px', '40px', '-0.96px', '600'),
      'final-cta-md': t('45.2px', '45.2px', '-0.5808px'),
      'final-cta-sm': t('36px', '36px', '-0.36px'),
      'story-sm': t('28px', '32.2px', '-0.7px'),
      'stat-sm': t('28px', '28px', '-0.32px'),
      'uc-tab': t('18px', '25.2px', '-0.18px'),
      'uc-body': t('16px', '22.4px', '-0.16px'),
      'uc-feature': t('16px', '22.4px', '-0.16px'),
      'uc-feature-desc': t('14px', '20.3px', '-0.14px'),
      'connect-body': t('16px', '20px', '-0.16px'),
      'footer-link': t('14px', '20px', '-0.07px', '400'),
      'legal': t('12px', '18px', '0px', '400'),
      'badge-new': t('10px', '7px', '0px', '400'),
      // CLONE_SPEC_PAGES 0.2 type roles
      'page-hero': t('56px', '60px', '-0.84px', '600'),
      'page-hero-sm': t('40px', '44px', '-0.4px', '600'),
      'hero-badge': t('13px', '18.2px', '-0.16px'),
      'heading-md': t('40px', '44px', '-0.4px', '600'), // FAQ/directory H2, plan price
      'heading-md-sm': t('32px', '36px', '-0.32px', '600'),
      'head-sm': t('32px', '36px', '-0.32px', '600'), // two-tone small section heading / story title
      'head-sm-md': t('28px', '34px', '-0.28px', '600'),
      'card-h3': t('28px', '34px', '-0.28px', '600'),
      'serif-quote': t('28px', '36.4px', '-0.42px'),
      'serif-quote-sm': t('24px', '31.2px', '-0.36px'),
      'serif-cta': t('40px', '44px', '-0.6px', '400'),
      'serif-sm': t('16px', '22px', '-0.16px'),
      'input': t('16px', '24px', '-0.16px'),
      'body-400': t('16px', '22px', '-0.16px', '400'),
      'error': t('12px', '18px', '0px', '400'),
      // Hero terminal mock (JetBrains Mono 10/15, measured in s1 dump)
      'terminal': t('10px', '15px', '-0.16px'),
      // Mock-UI type ramp for the original product artwork (inside placeholder boxes only)
      'mock-2xs': t('9px', '12px', '0px'),
      'mock-xs': t('10px', '14px', '0px'),
      'mock-sm': t('11px', '15px', '-0.04px'),
      'mock-base': t('12px', '16px', '-0.06px'),
      'mock-md': t('13px', '18px', '-0.08px'),
      'mock-lg': t('15px', '20px', '-0.15px'),
      'mock-xl': t('20px', '24px', '-0.3px', '600'),
      'mock-2xl': t('28px', '32px', '-0.56px', '600'),
      // CLONE_SPEC_PAGES T4-T9 roles
      'article': t('16px', '26px', '-0.16px', '400'), // app detail body
      'list-400': t('16px', '22px', '-0.16px', '400'), // app detail bullets
      'mono-label': t('12px', '15.6px', '0.6px'), // JetBrains Mono uppercase labels
      'mono-chip': t('15px', '19.5px', '-0.16px'), // architecture diagram chip title
      'mono-tag': t('11px', '16px', '1px'), // architecture dark-scene tags
      'code-glyph': t('16px', '20.8px', '-0.16px', '400'), // architecture code band
      'arch-body': t('16px', '22.4px', '0px', '400'),
      'statement': t('28px', '32.2px', '-0.56px', '600'),
      'serif-chapter': t('58px', '63.8px', '-1.16px', '400'),
      'serif-chapter-sm': t('28px', '30.8px', '-0.56px', '400'),
      'serif-pull': t('38px', '45.6px', '-0.76px', '400'),
      'serif-pull-sm': t('20px', '24px', '-0.4px', '400'),
      'serif-h3': t('48px', '52.8px', '-0.96px', '400'),
      'serif-h3-sm': t('24px', '26.4px', '-0.48px', '400'),
      'serif-problem': t('80px', '80px', '-2.4px', '400'),
      'serif-problem-sm': t('40px', '40px', '-1.2px', '400'),
      'serif-statement': t('49.76px', '22px', '-0.995px', '400'),
      'serif-pillar': t('96.09px', '22px', '-2.883px', '400'),
      'ascii': t('18.18px', '18.18px', '-1px'),
      'help-pill': t('13px', '18px', '-0.16px'),
      'search-hint': t('12px', '18px', '0.6px'),
      // CLONE_SPEC_PLATFORM 0.3 type roles
      'v2-head': t('40px', '46px', '-0.4px'), // v2 two-tone H2 (split / grid / quad)
      'v2-head-sm': t('32px', '36.8px', '-0.32px'), // v2 H2 below lg
      'panel-title': t('24px', '30px', '-0.24px', '600'), // legacy tab-panel title
      'mono-chip-sm': t('11px', '15.4px', '-0.16px'), // web-agent domain chips
      'marquee-title': t('14px', '20px', '-0.14px'), // marquee card title
      'marquee-desc': t('12px', '16px', '0px'), // marquee card desc / footer label
      'agent-title': t('14px', '20px', '-0.07px'), // agent card title (custom-agents hero)
      'agent-desc': t('13px', '22px', '-0.07px'), // agent card desc
      'kanban-label': t('13px', '18px', '-0.26px', '600'), // enrichment column header
      'kanban-count': t('11px', '14px', '0px'),
      'prompt': t('20.96px', '29.34px', '-0.21px'), // mcp prompt placeholder
      'uc-band-sm': t('14px', '20px', '-0.07px'), // UC band cell copy below 3xl (measured 3L x 20)
    },
    borderRadius: {
      none: '0px',
      2: '2px',
      4: '4px',
      6: '6px',
      8: '8px',
      10: '10px',
      12: '12px',
      13: '13px',
      16: '16px',
      20: '20px', // pricing plan card (computed radius; spec text says 24)
      23: '23px',
      24: '24px',
      full: '9999px',
    },
    boxShadow: {
      none: 'none',
      'attio-1': attio(1),
      'attio-2': attio(2),
      'attio-3': attio(3),
      'attio-4': attio(4),
      'attio-5': attio(5),
      'attio-6': attio(6),
      'attio-7': attio(7),
      'dropdown': `0 0 0 1px rgba(26,26,26,0.08), ${attio(5)}`,
      'hero-window':
        '0 0 0 1px rgba(11,13,24,0.06), 0 1px 2px rgba(11,13,24,0.024), 0 3px 6px rgba(11,13,24,0.03), 0 8px 14px rgba(11,13,24,0.035), 0 16px 28px rgba(11,13,24,0.04)',
      'mock-card':
        '0 0 1px 1px rgba(0,0,85,0.01), 0 4px 12px -1px rgba(0,26,51,0.04), 0 1px 3px -1px rgba(0,22,61,0.18)',
      'mock-chip': '0 1px 3px 0 rgba(0,0,0,0.04), 0 0 2px 0 rgba(28,39,67,0.18)',
      'integration-tile':
        'inset 0.2px 0.2px 2px 0 rgba(255,255,255,0.1), 0 1.5px 1.5px 0 rgba(0,0,0,0.25)',
      // Form input states (measured): hover shadow, focus-visible 3px blue-300 ring
      'input-hover': '0 1px 4px rgba(56,62,71,0.1)',
      'focus-ring': '0 0 0 3px #94b9ff',
      // CLONE_SPEC_PAGES (secondary pages), measured
      'select-ring': '0 0 0 3px rgba(36,109,238,0.3)',
      'error-ring': '0 0 0 3px rgba(246,83,81,0.3)',
      'select-popup': '0 4px 8px rgba(56,64,72,0.25)',
      'toggle-thumb': '0 4px 4px -2px rgba(17,34,68,0.06), 0 2px 4px -2px rgba(0,51,51,0.02), 0 0 2px #e0e0e0',
      tooltip: '0 4px 4px -2px rgba(17,34,68,0.06), 0 2px 4px -2px rgba(0,51,51,0.02), 0 0 2px #e0e0e0',
      'plan-card': '0 1px 2px -1px rgba(26,38,64,0.08), 0 2px 4px rgba(26,51,77,0.04)',
      'plan-card-featured': '0 0 0 4px rgba(78,137,245,0.1), 0 1px 2px -1px rgba(29,39,69,0.1), 0 2px 4px rgba(34,34,68,0.06)',
      'story-frame': '0 6px 20px -2px rgba(26,38,64,0.08), 0 2px 6px rgba(34,34,68,0.06)',
      'segment-pill': '0 0 0 1px rgba(26,26,26,0.04), 0 1px 1px -0.5px rgba(26,26,26,0.04), 0 3px 3px -1.5px rgba(26,26,26,0.04)',
      'media-ring': 'inset 0 0 0 1px rgba(29,29,29,0.1)',
      'quote-ring': 'inset 0 0 0 1px rgba(0,0,0,0.15)',
      'app-tile': '0 0 0 4px rgba(166,179,191,0.08), 0 6px 20px -2px rgba(26,38,64,0.08), 0 2px 6px rgba(34,34,68,0.06)',
      'creator-slide':
        '0 0 0 1px rgba(28,29,31,0.05), 0 1px 1px -0.5px rgba(28,29,31,0.05), 0 3px 3px -1.5px rgba(28,29,31,0.05), 0 6px 6px -3px rgba(28,29,31,0.05), 0 0 0 4px rgba(164,173,186,0.08), 0 0 0 8px #fff',
      'tier-card': `${attio(5)}, 0 0 0 1px rgba(28,29,31,0.05)`,
      // CLONE_SPEC_PAGES T5 / T9 (measured)
      'app-icon': '0 1px 1px -0.5px rgba(34,34,68,0.06), 0 2px 2px -1px rgba(26,38,64,0.08), 0 4px 4px -2px rgba(34,34,68,0.06), 0 8px 8px -4px rgba(34,34,68,0.06)',
      gallery: '0 1px 1px -0.5px rgba(29,39,69,0.1), 0 4px 4px -1px rgba(26,38,64,0.08), 0 4px 8px -2px rgba(34,34,68,0.06), 0 16px 16px -8px rgba(26,38,64,0.08)',
      'number-badge': '0 2px 4px rgba(26,51,77,0.04), 0 1px 2px -1px rgba(26,38,64,0.08)',
      // CLONE_SPEC_PLATFORM (measured)
      'agent-card': '0 1px 2px rgba(0,0,0,0.05)', // shadow-xs on agent cards
      'well-card': '0 0 2px rgba(28,40,64,0.22), 0 1px 3px rgba(24,41,75,0.04), 0 2px 4px -2px rgba(24,39,75,0.02), 0 4px 4px -2px rgba(24,39,75,0.04)', // legacy media-well floating card
      'prompt-box': '0 2px 8px rgba(0,0,0,0.05)', // mcp hero prompt box
    },
    extend: {
      // CLONE_SPEC_PAGES T6 / T9: 24-col (blog, help docs shell) and 16-col (blog list row) grids
      gridTemplateColumns: {
        16: 'repeat(16, minmax(0, 1fr))',
        24: 'repeat(24, minmax(0, 1fr))',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0,0,0,1)',
        in: 'cubic-bezier(.3,0,1,1)',
        'in-out': 'cubic-bezier(.2,0,0,1)',
        emphasized: 'cubic-bezier(.2,0,0,1)',
        reveal: 'cubic-bezier(0,0,.58,1)',
        'out-cubic': 'cubic-bezier(.33,1,.68,1)',
        'in-cubic': 'cubic-bezier(.32,0,.67,0)',
        'in-out-cubic': 'cubic-bezier(.65,0,.35,1)',
        'in-out-quad': 'cubic-bezier(.45,.05,.55,.95)',
        header: 'cubic-bezier(.4,0,.2,1)',
        drawer: 'cubic-bezier(.32,.72,0,1)', // mobile drawer transform 500ms (measured)
      },
      zIndex: {
        header: '92',
        'drawer-overlay': '90', // mobile nav drawer (measured)
        drawer: '91',
      },
      backgroundImage: {
        // 2a hero background layers
        'hero-glow': 'radial-gradient(90% 80% at 50% 100%, #e6ecff 0%, #bccbff 45%, #86a0ee 100%)',
        'hero-pinstripe':
          'repeating-linear-gradient(90deg, rgba(255,255,255,0.78) 0 1px, transparent 1px 8px)',
        'hero-white-fade': 'radial-gradient(70% 106.667% at 50% 0%, #ffffff 32%, transparent 64%)',
        // 6a / 11 dark stripe background (for the next build pass)
        'dark-stripes':
          'repeating-linear-gradient(to right, rgba(255,255,255,0.035) 0 1px, transparent 1px 8px)',
        // 6a horizon: planet rim (conic) + its alpha mask, atmospheric glow (rest state)
        'planet-rim':
          'conic-gradient(from 0deg at 50% 50%, #eef1ea 0deg, #6cbdb0 10deg, #161e69 60deg, #161e69 180deg, #bb2a1e 180deg, #bb2a1e 300deg, #ccc427 350deg, #eef1ea 360deg)',
        'planet-rim-mask':
          'conic-gradient(rgba(0,0,0,0.4) 0deg, #000 35deg, #000 325deg, rgba(0,0,0,0.4) 360deg)',
        'horizon-glow':
          'radial-gradient(circle closest-side, transparent 64%, rgba(255,255,255,0.04) 71%, rgba(255,255,255,0.12) 74.5%, rgba(255,255,255,0.16) 75.5%, rgba(255,255,255,0.125) 77.5%, rgba(255,255,255,0.07) 80.5%, rgba(255,255,255,0.035) 85%, rgba(255,255,255,0.016) 91%, transparent 98%)',
        // 6a integration tile
        'integration-tile': 'linear-gradient(-30.12deg, #1c1d1f 25.6%, #2e3238 163%)',
        // 7 scale-stats: centre hairline + blue wash
        'center-hairline':
          'linear-gradient(to right, transparent calc(50% - 0.5px), #e4e7ec calc(50% - 0.5px), #e4e7ec calc(50% + 0.5px), transparent calc(50% + 0.5px))',
        'scale-wash': 'linear-gradient(rgba(150,183,255,0.18), transparent 85%)',
        // Falling streaks (measured in dumps): UC title region, scale-stats, final CTA (M16)
        'streak-uc': 'linear-gradient(transparent, rgba(255,255,255,0.5) 50%, transparent)',
        'streak-scale': 'linear-gradient(transparent, #a4adba 50%, transparent)',
        'streak-cta': 'linear-gradient(transparent, #8a93a1 50%, transparent)',
        // 10 changelog edge fades (only visible on the < lg scroll row)
        'fade-right': 'linear-gradient(to right, #ffffff 0%, transparent 100%)',
        'fade-left': 'linear-gradient(to left, #ffffff 0%, transparent 100%)',
        // CLONE_SPEC_PAGES 0.3 hatched gutter (light / dark) and avatar placeholder tile
        hatch: 'repeating-linear-gradient(125deg, transparent, transparent 6px, #f3f4f6 6px, #f3f4f6 7px)',
        'hatch-dark': 'repeating-linear-gradient(125deg, transparent, transparent 6px, #2e3238 6px, #2e3238 7px)',
        'avatar-tile': 'linear-gradient(to left top, #a4adba, #e4e7ec)',
        'wall-fade': 'linear-gradient(90deg, #fff, transparent 20%, transparent 80%, #fff)',
        // T1.1 pricing frame lines
        'pricing-line-h': 'linear-gradient(to left, rgba(237,239,243,0) 0%, #cad0d9 6.52%, #cad0d9 93.22%, rgba(237,239,243,0) 100%)',
        'pricing-line-v': 'linear-gradient(to bottom, rgba(237,239,243,0) 0%, #cad0d9 10.87%, #cad0d9 89.55%, rgba(237,239,243,0) 100%)',
        'app-tile-ring': 'linear-gradient(#709ff5, #a3ece9)',
        // 11 final-CTA stripe mask (measured --cta-pattern-mask)
        'cta-pattern-mask': 'radial-gradient(ellipse 70% 50% at 50% 50%, transparent 35%, #000 75%)',
        // CLONE_SPEC_PLATFORM P7 vertical-stripe field (8px tile) and S-CTA dome mask
        'stripe-field': 'linear-gradient(to right, transparent calc(50% - 0.5px), #edeff3 calc(50% - 0.5px), #edeff3 calc(50% + 0.5px), transparent calc(50% + 0.5px))',
        'stripe-field-uc': 'linear-gradient(to right, transparent calc(50% - 0.5px), rgba(228,231,235,0.45) calc(50% - 0.5px), rgba(228,231,235,0.45) calc(50% + 0.5px), transparent calc(50% + 0.5px))',
        'platform-cta-mask': 'radial-gradient(50% 57.63% at 50% 0%, transparent 55%, #000 100%)',
        'agent-dots': 'radial-gradient(circle, #d3d8df 0.8px, transparent 0.8px)', // custom-agents hero dot field
      },
    },
  },
  corePlugins: {
    container: false, // custom .container rules live in index.css (spec 0.7)
  },
  plugins: [],
}
