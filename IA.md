# Corvale (attio.com design clone): information architecture

Source: Design-faithful clone of attio.com's nav-bar scope (React + Vite + Tailwind, react-router). Brand, copy and artwork are invented placeholders.
Status: **built: all 32 routes (21 templates) mounted in src/App.jsx and rendering** · production approved: **false**
32 routes · 21 templates · 121 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 3 templates (Platform v2 (modern shell), Platform v1 (legacy shell), App detail) account for 14 of 32 routes (44%). The remaining 18 routes span 18 templates.

| template | routes | share |
|---|---:|---:|
| Platform v2 (modern shell) | 6 | 19% |
| Platform v1 (legacy shell) | 5 | 16% |
| App detail | 3 | 9% |
| Homepage | 1 | 3% |
| Pricing | 1 | 3% |
| Customers | 1 | 3% |
| Startups program | 1 | 3% |
| Careers | 1 | 3% |
| App partners | 1 | 3% |
| Creator partners | 1 | 3% |
| Expert partners | 1 | 3% |
| Contact sales (split hero + form) | 1 | 3% |
| App directory | 1 | 3% |
| Blog (editorial listing, light) | 1 | 3% |
| Engineering blog (editorial listing, dark) | 1 | 3% |
| Changelog (year listing) | 1 | 3% |
| Architecture (scrollytelling) | 1 | 3% |
| Help landing (docs shell) | 1 | 3% |
| Help academy (docs shell) | 1 | 3% |
| Help reference guide (docs shell) | 1 | 3% |
| Platform developers (dark blueprint) | 1 | 3% |

## Page chrome

**26 routes carry chrome = `full`** — Homepage, Pricing, Customers, Startups program, Careers, App partners, Creator partners, Expert partners, Contact sales (split hero + form), App directory, App detail, Blog (editorial listing, light), Changelog (year listing), Platform v2 (modern shell), Platform v1 (legacy shell).

**2 routes carry chrome = `full-dark`** — Engineering blog (editorial listing, dark), Platform developers (dark blueprint).

**1 routes carry chrome = `reduced`** — Architecture (scrollytelling).

**3 routes carry chrome = `docs`** — Help landing (docs shell), Help academy (docs shell), Help reference guide (docs shell).

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `shell.site-footer` | SHELL | 18 | 29 | `SiteFooter.jsx` | Every route except the three help routes. |
| `shell.site-header` | SHELL | 15 | 26 | `SiteHeader.jsx` | Every full-chrome template: homepage, pricing, all marketing long-form pages, contact, apps, blog, changelog and the modern and legacy platform templates. Not on architecture, help, engineering blog or developers. |
| `proof.logo-cell-grid` | PROOF | 3 | 12 | `CustomerLogos.jsx` | Homepage plus the platform pages that carry it: custom-agents, mcp, reporting, universal-context, web-agent (modern) and workflows (legacy). |
| `proof.quote-scroll-lit` | PROOF | 2 | 11 | `platform/Sections.jsx > ScrollQuote` | Platform pages: enrichment (modern) and ask, call-intelligence, sequences, workflows (legacy). |
| `features.card-marquee` | FEATURES | 2 | 11 | `platform/Sections.jsx > CardMarquee` | Platform pages: custom-agents (modern) and workflows, ask (legacy). |
| `features.integration-arc-strip` | FEATURES | 2 | 11 | `platform/Sections.jsx > IntegrationStrip` | Platform pages: mcp (modern) and call-intelligence (legacy). |
| `conversion.platform-final-cta` | CONVERSION | 2 | 11 | `platform/Sections.jsx > PlatformCta` | Every modern and legacy platform page (not developers). |
| `wayfinding.platform-link-grid` | WAYFINDING | 2 | 11 | `platform/Sections.jsx > LinksGrid` | Platform pages: enrichment (modern) and call-intelligence, data, sequences (legacy). |
| `conversion.newsletter-inline` | CONVERSION | 2 | 7 | `Changelog.jsx (newsletter row)` | Homepage (under the changelog cards) and the mcp platform page. |
| `hero.platform-centered` | HERO | 1 | 6 | `platform/heroes.jsx > HeroWebAgent, HeroCustomAgents, HeroEnrichment` | Modern platform template: web-agent, custom-agents and enrichment. |
| `hero.platform-horizon` | HERO | 1 | 6 | `platform/heroes.jsx > HeroHorizon` | Modern platform template: universal-context only. |
| `hero.platform-radar` | HERO | 1 | 6 | `platform/heroes.jsx > HeroRadar` | Modern platform template: reporting only. |
| `hero.platform-mcp-grid` | HERO | 1 | 6 | `platform/heroes.jsx > HeroMcp` | Modern platform template: mcp only. |
| `proof.stat-headline` | PROOF | 1 | 6 | `platform/Sections.jsx > Stat` | Modern platform template: custom-agents and mcp. |
| `features.split-accordion` | FEATURES | 1 | 6 | `platform/SplitAccordion.jsx > SplitAccordion` | Modern platform template: web-agent, custom-agents, universal-context, enrichment and reporting (not mcp). |
| `features.split-icons` | FEATURES | 1 | 6 | `platform/Grids.jsx > SplitIcons` | Modern platform template: mcp only. |
| `features.media-grid-three` | FEATURES | 1 | 6 | `platform/Grids.jsx > MediaGrid3` | Modern platform template: web-agent, universal-context, mcp, enrichment and reporting (not custom-agents). |
| `features.center-media` | FEATURES | 1 | 6 | `platform/Sections.jsx > CenterMedia` | Modern platform template: custom-agents, universal-context, mcp and enrichment. |
| `features.text-columns` | FEATURES | 1 | 6 | `platform/Sections.jsx > TextColumns` | Modern platform template: universal-context, enrichment and mcp (steps variant). |
| `features.orbit-illustration` | FEATURES | 1 | 6 | `platform/Sections.jsx > Orbit` | Modern platform template: web-agent only. |
| `features.icon-row` | FEATURES | 1 | 6 | `platform/Grids.jsx > IconRow` | Modern platform template: custom-agents only. |
| `features.tagged-quad` | FEATURES | 1 | 6 | `platform/Grids.jsx > TaggedQuad` | Modern platform template: web-agent and universal-context. |
| `features.bento-grid` | FEATURES | 1 | 6 | `platform/Grids.jsx > Bento` | Modern platform template: reporting only. |
| `conversion.faq-accordion` | CONVERSION | 5 | 5 | `marketing/Faq.jsx` | Pricing, startups, and the three partner pages. |
| `hero.platform-ask-canvas` | HERO | 1 | 5 | `platform/legacy.jsx > HeroAsk` | Legacy platform template: ask only. |
| `hero.platform-split-legacy` | HERO | 1 | 5 | `platform/legacy.jsx > HeroCallIntel, HeroWorkflows` | Legacy platform template: call-intelligence and workflows. |
| `hero.platform-data-perspective` | HERO | 1 | 5 | `platform/legacy.jsx > HeroData` | Legacy platform template: data only. |
| `hero.platform-sequence-mock` | HERO | 1 | 5 | `platform/legacy.jsx > HeroSequences` | Legacy platform template: sequences only. |
| `features.split-accordion-legacy` | FEATURES | 1 | 5 | `platform/SplitAccordion.jsx > SplitAccordionLegacy` | Legacy platform template: call-intelligence, data, sequences and workflows (not ask). |
| `features.legacy-card-grid-three` | FEATURES | 1 | 5 | `platform/Grids.jsx > LegacyGrid3` | Legacy platform template: call-intelligence, data, sequences and workflows (data and workflows also use the text + icon variant). |
| `features.legacy-card-grid-quad` | FEATURES | 1 | 5 | `platform/Grids.jsx > LegacyGrid2Q` | Legacy platform template: call-intelligence, data and sequences (sequences without the quote). |
| `features.product-showcase-legacy` | FEATURES | 1 | 5 | `platform/legacy.jsx > Showcase` | Legacy platform template: sequences only. |
| `features.tabbed-showcase` | FEATURES | 1 | 5 | `platform/Sections.jsx > Tabs` | Legacy platform template: call-intelligence and data. |
| `features.ask-tab-carousel` | FEATURES | 1 | 5 | `platform/legacy.jsx > AskTabs` | Legacy platform template: ask only. |
| `features.uc-band` | FEATURES | 1 | 5 | `platform/Sections.jsx > UcBand` | Legacy platform template: ask and workflows. |
| `features.ask-intelligence` | FEATURES | 1 | 5 | `platform/legacy.jsx > AskIntel` | Legacy platform template: ask only. |
| `features.agent-columns` | FEATURES | 1 | 5 | `platform/legacy.jsx > AgentColumns` | Legacy platform template: workflows only. |
| `shell.docs-header` | SHELL | 3 | 3 | `help/DocsShell.jsx (docs bar below lg)` | All three help routes. |
| `shell.docs-sidebar` | SHELL | 3 | 3 | `help/DocsShell.jsx (aside + SidebarNav)` | All three help routes. |
| `shell.site-footer-light` | SHELL | 3 | 3 | `SiteFooter.jsx (variant="light")` | All three help routes. |
| `proof.quote-reveal` | PROOF | 3 | 3 | `marketing/Blocks.jsx > QuoteReveal` | Customers, app partners and creator partners. |
| `wayfinding.partner-cross-links` | WAYFINDING | 3 | 3 | `marketing/Blocks.jsx > PartnerCrossLinks` | The three partner pages. |
| `wayfinding.resource-cards` | WAYFINDING | 3 | 3 | `marketing/Blocks.jsx > ResourceCards` | Careers (four cards), expert partners (three) and help landing (three, larger icons). |
| `hero.app-header` | HERO | 1 | 3 | `pages/AppDetail.jsx (inline) + apps/AppIcon.jsx` | The app detail template (three app routes). |
| `content.app-detail-body` | CONTENT | 1 | 3 | `pages/AppDetail.jsx (inline) + apps/Gallery.jsx` | The app detail template (three app routes). |
| `listing.related-apps` | LISTING | 1 | 3 | `pages/AppDetail.jsx (inline) + apps/AppCard.jsx` | The app detail template (three app routes). |
| `wayfinding.app-breadcrumb` | WAYFINDING | 1 | 3 | `pages/AppDetail.jsx (inline)` | The app detail template (three app routes). |
| `shell.site-header-dark` | SHELL | 2 | 2 | `SiteHeader.jsx (forceDark, via PageShell headerDark)` | The engineering blog and the developers platform page only. |
| `hero.docs-page-head` | HERO | 2 | 2 | `help/DocsShell.jsx > Crumbs + pages/help/HelpAcademy.jsx, HelpReference.jsx` | Help academy and the help reference guide. |
| `proof.logo-wall` | PROOF | 2 | 2 | `marketing/Blocks.jsx > LogoGrid` | Pricing and customers. |
| `listing.article-list` | LISTING | 2 | 2 | `blog/Listing.jsx > LatestArticles` | Blog (light) and engineering blog (dark). |
| `shell.site-header-bannerless` | SHELL | 1 | 1 | `SiteHeader.jsx (via PageShell; renders 68px tall without the banner on /architecture)` | The architecture page only. |
| `hero.home-scroll-scene` | HERO | 1 | 1 | `Hero.jsx` | Homepage only. |
| `hero.pricing-plans` | HERO | 1 | 1 | `pricing/PricingHero.jsx` | Pricing only. |
| `hero.page-hero` | HERO | 1 | 1 | `marketing/Blocks.jsx > PageHero` | Customers only (other long-form pages use their own hero variants). |
| `hero.startups-logo-hero` | HERO | 1 | 1 | `startups/Sections.jsx > StartupsHero` | Startups only. |
| `hero.careers-hero` | HERO | 1 | 1 | `careers/Hero.jsx` | Careers only. |
| `hero.app-partners-hero` | HERO | 1 | 1 | `partners/Sections.jsx > AppPartnersHero` | App partners only. |
| `hero.creator-video-hero` | HERO | 1 | 1 | `partners/Sections.jsx > CreatorHero` | Creator partners only. |
| `hero.expert-hero` | HERO | 1 | 1 | `partners/Sections.jsx > ExpertHero` | Expert partners only. |
| `hero.contact-split-form` | HERO | 1 | 1 | `pages/ContactSales.jsx (page-local Header/Testimonial/Panel) + forms/Fields.jsx > LeadForm` | Contact sales only; this one section is the whole page body. |
| `hero.apps-hero` | HERO | 1 | 1 | `apps/Sections.jsx > AppsHero` | App directory only. |
| `hero.blog-featured-post` | HERO | 1 | 1 | `blog/Listing.jsx > FeaturedPost` | The blog only. |
| `hero.engineering-ascii-hero` | HERO | 1 | 1 | `blog/Engineering.jsx > EngHero` | The engineering blog only. |
| `hero.changelog-hero` | HERO | 1 | 1 | `pages/ChangelogYear.jsx (inline) + forms/Fields.jsx > SubscribeForm` | Changelog only. |
| `hero.architecture-typewriter` | HERO | 1 | 1 | `architecture/Sections.jsx > ArchHero` | Architecture only. |
| `hero.help-landing` | HERO | 1 | 1 | `pages/help/HelpHome.jsx` | Help landing only. |
| `hero.developer-blueprint` | HERO | 1 | 1 | `platform/developers/Hero.jsx` | Developers only. |
| `proof.program-partners` | PROOF | 1 | 1 | `startups/Sections.jsx > ProgramPartners` | Startups only. |
| `proof.quote-curtain` | PROOF | 1 | 1 | `UniversalContext.jsx > QuoteReveal (internal)` | Homepage only. |
| `proof.scale-stats` | PROOF | 1 | 1 | `ScaleStats.jsx` | Homepage only. |
| `proof.customer-stories-tabs` | PROOF | 1 | 1 | `CustomerStories.jsx` | Homepage only. |
| `proof.customer-stories-grid` | PROOF | 1 | 1 | `customers/StoriesGrid.jsx` | Customers only. |
| `proof.developer-testimonial` | PROOF | 1 | 1 | `platform/developers/Testimonial.jsx` | Developers only (appears twice on the page). |
| `features.platform-showcase` | FEATURES | 1 | 1 | `PlatformShowcase.jsx` | Homepage only. |
| `features.self-building` | FEATURES | 1 | 1 | `SelfBuilding.jsx` | Homepage only. |
| `features.context-dark-stack` | FEATURES | 1 | 1 | `UniversalContext.jsx > BrandSection (internal)` | Homepage only. |
| `features.sdk-block` | FEATURES | 1 | 1 | `UniversalContext.jsx > SdkSection (internal)` | Homepage only. |
| `features.startup-feature-cells` | FEATURES | 1 | 1 | `startups/Sections.jsx > FeatureCells` | Startups only. |
| `features.perks-orbit-band` | FEATURES | 1 | 1 | `startups/Sections.jsx > PerksBand` | Startups only. |
| `features.two-paths` | FEATURES | 1 | 1 | `partners/Sections.jsx > TwoPaths` | App partners only. |
| `features.build-steps-tabbed` | FEATURES | 1 | 1 | `partners/StepList.jsx > StartBuilding` | App partners only. |
| `features.directory-path-steps` | FEATURES | 1 | 1 | `partners/StepList.jsx > Steps (inline in pages/ExpertPartners.jsx)` | Expert partners only. |
| `features.explore-apps` | FEATURES | 1 | 1 | `partners/Sections.jsx > ExploreApps` | App partners only. |
| `features.creator-audience-cells` | FEATURES | 1 | 1 | `partners/Sections.jsx > WhoYouAre` | Creator partners only. |
| `features.creator-perks` | FEATURES | 1 | 1 | `partners/Sections.jsx > Perks` | Creator partners only. |
| `features.expert-criteria-columns` | FEATURES | 1 | 1 | `partners/Sections.jsx > WhoWereLookingFor` | Expert partners only. |
| `features.expert-tiers` | FEATURES | 1 | 1 | `partners/Sections.jsx > Tiers` | Expert partners only. |
| `features.featured-apps-tabs` | FEATURES | 1 | 1 | `apps/Sections.jsx > FeaturedApps` | App directory only. |
| `features.developer-card-section` | FEATURES | 1 | 1 | `platform/developers/CardSection.jsx` | Developers only (three instances on the page). |
| `content.interview-video` | CONTENT | 1 | 1 | `careers/Sections.jsx > InterviewVideo` | Careers only. |
| `content.team-intro` | CONTENT | 1 | 1 | `careers/Sections.jsx > TeamIntro` | Careers only. |
| `content.team-photos` | CONTENT | 1 | 1 | `careers/Sections.jsx > TeamPhotos` | Careers only. |
| `content.values-grid` | CONTENT | 1 | 1 | `careers/Sections.jsx > Values` | Careers only. |
| `content.engineering-heatmap` | CONTENT | 1 | 1 | `blog/Engineering.jsx > Heatmap` | The engineering blog only. |
| `content.developer-heatmap` | CONTENT | 1 | 1 | `platform/developers/Heatmap.jsx` | Developers only. |
| `content.architecture-chapter-band` | CONTENT | 1 | 1 | `architecture/Sections.jsx > Chapter` | Architecture only (three instances introduce the page's three chapters). |
| `content.architecture-story-body` | CONTENT | 1 | 1 | `pages/Architecture.jsx (inline) + architecture/Diagrams.jsx > FlowFigure` | Architecture only. |
| `content.five-reasons-index` | CONTENT | 1 | 1 | `architecture/FiveReasons.jsx` | Architecture only. |
| `content.problem-dark-scene` | CONTENT | 1 | 1 | `architecture/Sections.jsx > LitWords (composed in pages/Architecture.jsx)` | Architecture only. |
| `content.architecture-diagram-scene` | CONTENT | 1 | 1 | `architecture/Sections.jsx > DarkScene + architecture/Diagrams.jsx > RingRow` | Architecture only. |
| `content.launch-feature-blocks` | CONTENT | 1 | 1 | `pages/Architecture.jsx (inline) + architecture/Diagrams.jsx > LaunchDiagram + architecture/Sections.jsx > CodeBand` | Architecture only. |
| `content.help-get-started` | CONTENT | 1 | 1 | `pages/help/HelpHome.jsx (inline)` | Help landing only. |
| `listing.changelog-preview` | LISTING | 1 | 1 | `Changelog.jsx` | Homepage only. |
| `listing.open-positions` | LISTING | 1 | 1 | `careers/OpenPositions.jsx` | Careers only. |
| `listing.app-directory` | LISTING | 1 | 1 | `apps/Sections.jsx > Directory` | App directory only. |
| `listing.changelog-entries` | LISTING | 1 | 1 | `pages/ChangelogYear.jsx (inline)` | Changelog only. |
| `listing.course-grid` | LISTING | 1 | 1 | `pages/help/HelpAcademy.jsx (inline) + help/CourseArt.jsx` | Help academy only. |
| `listing.lesson-list` | LISTING | 1 | 1 | `pages/help/HelpReference.jsx (inline) + help/CourseArt.jsx` | Help reference guide only. |
| `conversion.plan-comparison-table` | CONVERSION | 1 | 1 | `pricing/ComparisonTable.jsx` | Pricing only. |
| `conversion.avatar-wall-cta` | CONVERSION | 1 | 1 | `marketing/Blocks.jsx > CtaAvatarWall` | Customers only. |
| `conversion.startup-apply-form` | CONVERSION | 1 | 1 | `startups/Sections.jsx > ApplyBlock` | Startups only. |
| `conversion.newsletter-band` | CONVERSION | 1 | 1 | `careers/Sections.jsx > NewsletterBand` | Careers only. |
| `conversion.apply-closed-notice` | CONVERSION | 1 | 1 | `partners/Sections.jsx > ApplyNotice` | Creator partners only. |
| `conversion.expert-apply-embed` | CONVERSION | 1 | 1 | `partners/Sections.jsx > ExpertApply` | Expert partners only. |
| `conversion.build-with-us` | CONVERSION | 1 | 1 | `apps/Sections.jsx > BuildWithUs` | App directory only. |
| `conversion.home-final-cta` | CONVERSION | 1 | 1 | `FinalCta.jsx` | Homepage only. |
| `conversion.developer-cta` | CONVERSION | 1 | 1 | `platform/developers/ReadyCta.jsx` | Developers only. |
| `conversion.architecture-closing-nav` | CONVERSION | 1 | 1 | `architecture/Sections.jsx > Closing` | Architecture only. |
| `wayfinding.year-timeline` | WAYFINDING | 1 | 1 | `pages/ChangelogYear.jsx > YearTimeline (page-local)` | Changelog only. |
| `wayfinding.developer-apps` | WAYFINDING | 1 | 1 | `platform/developers/AppsRow.jsx` | Developers only. |

**20 shared sections** appear in more than one template and belong in a component library.

**101 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

## Templates

### Homepage — `template.home`

1 route · `/` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.site-header` | shared ×15 |
| 2 | HERO | `hero.home-scroll-scene` | page-local |
| 3 | PROOF | `proof.logo-cell-grid` | shared ×3 |
| 4 | FEATURES | `features.platform-showcase` | page-local |
| 5 | FEATURES | `features.self-building` | page-local |
| 6 | FEATURES | `features.context-dark-stack` | page-local |
| 7 | FEATURES | `features.sdk-block` | page-local |
| 8 | PROOF | `proof.quote-curtain` | page-local |
| 9 | PROOF | `proof.scale-stats` | page-local |
| 10 | PROOF | `proof.customer-stories-tabs` | page-local |
| 11 | LISTING | `listing.changelog-preview` | page-local |
| 12 | CONVERSION | `conversion.newsletter-inline` | shared ×2 |
| 13 | CONVERSION | `conversion.home-final-cta` | page-local |
| 14 | SHELL | `shell.site-footer` | shared ×18 |

### Pricing — `template.pricing`

1 route · `/pricing` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.site-header` | shared ×15 |
| 2 | HERO | `hero.pricing-plans` | page-local |
| 3 | PROOF | `proof.logo-wall` | shared ×2 |
| 4 | CONVERSION | `conversion.plan-comparison-table` | page-local |
| 5 | CONVERSION | `conversion.faq-accordion` | shared ×5 |
| 6 | SHELL | `shell.site-footer` | shared ×18 |

### Customers — `template.customers`

1 route · `/customers` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.site-header` | shared ×15 |
| 2 | HERO | `hero.page-hero` | page-local |
| 3 | PROOF | `proof.logo-wall` | shared ×2 |
| 4 | PROOF | `proof.customer-stories-grid` | page-local |
| 5 | PROOF | `proof.quote-reveal` | shared ×3 |
| 6 | CONVERSION | `conversion.avatar-wall-cta` | page-local |
| 7 | SHELL | `shell.site-footer` | shared ×18 |

### Startups program — `template.startups`

1 route · `/startups` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.site-header` | shared ×15 |
| 2 | HERO | `hero.startups-logo-hero` | page-local |
| 3 | CONVERSION | `conversion.startup-apply-form` | page-local |
| 4 | FEATURES | `features.startup-feature-cells` | page-local |
| 5 | PROOF | `proof.program-partners` | page-local |
| 6 | FEATURES | `features.perks-orbit-band` | page-local |
| 7 | CONVERSION | `conversion.faq-accordion` | shared ×5 |
| 8 | SHELL | `shell.site-footer` | shared ×18 |

### Careers — `template.careers`

1 route · `/careers` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.site-header` | shared ×15 |
| 2 | HERO | `hero.careers-hero` | page-local |
| 3 | CONTENT | `content.interview-video` | page-local |
| 4 | CONTENT | `content.team-intro` | page-local |
| 5 | CONTENT | `content.team-photos` | page-local |
| 6 | CONTENT | `content.values-grid` | page-local |
| 7 | LISTING | `listing.open-positions` | page-local |
| 8 | CONVERSION | `conversion.newsletter-band` | page-local |
| 9 | WAYFINDING | `wayfinding.resource-cards` | shared ×3 |
| 10 | SHELL | `shell.site-footer` | shared ×18 |

### App partners — `template.partner-app`

1 route · `/partners/app-partners` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.site-header` | shared ×15 |
| 2 | HERO | `hero.app-partners-hero` | page-local |
| 3 | FEATURES | `features.two-paths` | page-local |
| 4 | FEATURES | `features.build-steps-tabbed` | page-local |
| 5 | FEATURES | `features.explore-apps` | page-local |
| 6 | PROOF | `proof.quote-reveal` | shared ×3 |
| 7 | CONVERSION | `conversion.faq-accordion` | shared ×5 |
| 8 | WAYFINDING | `wayfinding.partner-cross-links` | shared ×3 |
| 9 | SHELL | `shell.site-footer` | shared ×18 |

### Creator partners — `template.partner-creator`

1 route · `/partners/creator-partners` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.site-header` | shared ×15 |
| 2 | HERO | `hero.creator-video-hero` | page-local |
| 3 | FEATURES | `features.creator-audience-cells` | page-local |
| 4 | FEATURES | `features.creator-perks` | page-local |
| 5 | CONVERSION | `conversion.apply-closed-notice` | page-local |
| 6 | PROOF | `proof.quote-reveal` | shared ×3 |
| 7 | CONVERSION | `conversion.faq-accordion` | shared ×5 |
| 8 | WAYFINDING | `wayfinding.partner-cross-links` | shared ×3 |
| 9 | SHELL | `shell.site-footer` | shared ×18 |

### Expert partners — `template.partner-expert`

1 route · `/partners/expert-partners` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.site-header` | shared ×15 |
| 2 | HERO | `hero.expert-hero` | page-local |
| 3 | FEATURES | `features.expert-criteria-columns` | page-local |
| 4 | FEATURES | `features.expert-tiers` | page-local |
| 5 | FEATURES | `features.directory-path-steps` | page-local |
| 6 | CONVERSION | `conversion.expert-apply-embed` | page-local |
| 7 | WAYFINDING | `wayfinding.resource-cards` | shared ×3 |
| 8 | CONVERSION | `conversion.faq-accordion` | shared ×5 |
| 9 | WAYFINDING | `wayfinding.partner-cross-links` | shared ×3 |
| 10 | SHELL | `shell.site-footer` | shared ×18 |

### Contact sales (split hero + form) — `template.contact-sales`

1 route · `/contact/sales` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.site-header` | shared ×15 |
| 2 | HERO | `hero.contact-split-form` | page-local |
| 3 | SHELL | `shell.site-footer` | shared ×18 |

### App directory — `template.app-directory`

1 route · `/apps` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.site-header` | shared ×15 |
| 2 | HERO | `hero.apps-hero` | page-local |
| 3 | FEATURES | `features.featured-apps-tabs` | page-local |
| 4 | LISTING | `listing.app-directory` | page-local |
| 5 | CONVERSION | `conversion.build-with-us` | page-local |
| 6 | SHELL | `shell.site-footer` | shared ×18 |

### App detail — `template.app-detail`

3 routes · `/apps/chatgpt`, `/apps/claude`, `/apps/slack` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.site-header` | shared ×15 |
| 2 | WAYFINDING | `wayfinding.app-breadcrumb` | page-local |
| 3 | HERO | `hero.app-header` | page-local |
| 4 | CONTENT | `content.app-detail-body` | page-local |
| 5 | LISTING | `listing.related-apps` | page-local |
| 6 | SHELL | `shell.site-footer` | shared ×18 |

### Blog (editorial listing, light) — `template.blog`

1 route · `/blog` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.site-header` | shared ×15 |
| 2 | HERO | `hero.blog-featured-post` | page-local |
| 3 | LISTING | `listing.article-list` | shared ×2 |
| 4 | SHELL | `shell.site-footer` | shared ×18 |

### Engineering blog (editorial listing, dark) — `template.engineering-blog`

1 route · `/engineering/blog` · chrome: **full-dark**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.site-header-dark` | shared ×2 |
| 2 | HERO | `hero.engineering-ascii-hero` | page-local |
| 3 | LISTING | `listing.article-list` | shared ×2 |
| 4 | CONTENT | `content.engineering-heatmap` | page-local |
| 5 | SHELL | `shell.site-footer` | shared ×18 |

### Changelog (year listing) — `template.changelog`

1 route · `/changelog` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.site-header` | shared ×15 |
| 2 | HERO | `hero.changelog-hero` | page-local |
| 3 | WAYFINDING | `wayfinding.year-timeline` | page-local |
| 4 | LISTING | `listing.changelog-entries` | page-local |
| 5 | SHELL | `shell.site-footer` | shared ×18 |

### Architecture (scrollytelling) — `template.architecture`

1 route · `/architecture` · chrome: **reduced**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.site-header-bannerless` | page-local |
| 2 | HERO | `hero.architecture-typewriter` | page-local |
| 3 | CONTENT | `content.architecture-chapter-band` | page-local |
| 4 | CONTENT | `content.architecture-story-body` | page-local |
| 5 | CONTENT | `content.five-reasons-index` | page-local |
| 6 | CONTENT | `content.problem-dark-scene` | page-local |
| 7 | CONTENT | `content.architecture-diagram-scene` | page-local |
| 8 | CONTENT | `content.launch-feature-blocks` | page-local |
| 9 | CONVERSION | `conversion.architecture-closing-nav` | page-local |
| 10 | SHELL | `shell.site-footer` | shared ×18 |

### Help landing (docs shell) — `template.help-home`

1 route · `/help` · chrome: **docs**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.docs-header` | shared ×3 |
| 2 | SHELL | `shell.docs-sidebar` | shared ×3 |
| 3 | HERO | `hero.help-landing` | page-local |
| 4 | WAYFINDING | `wayfinding.resource-cards` | shared ×3 |
| 5 | CONTENT | `content.help-get-started` | page-local |
| 6 | SHELL | `shell.site-footer-light` | shared ×3 |

### Help academy (docs shell) — `template.help-academy`

1 route · `/help/academy` · chrome: **docs**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.docs-header` | shared ×3 |
| 2 | SHELL | `shell.docs-sidebar` | shared ×3 |
| 3 | HERO | `hero.docs-page-head` | shared ×2 |
| 4 | LISTING | `listing.course-grid` | page-local |
| 5 | SHELL | `shell.site-footer-light` | shared ×3 |

### Help reference guide (docs shell) — `template.help-reference`

1 route · `/help/reference/attio-101` · chrome: **docs**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.docs-header` | shared ×3 |
| 2 | SHELL | `shell.docs-sidebar` | shared ×3 |
| 3 | HERO | `hero.docs-page-head` | shared ×2 |
| 4 | LISTING | `listing.lesson-list` | page-local |
| 5 | SHELL | `shell.site-footer-light` | shared ×3 |

### Platform v2 (modern shell) — `template.platform-v2`

6 routes · `/platform/web-agent`, `/platform/custom-agents`, `/platform/universal-context`, `/platform/mcp`, `/platform/enrichment`, `/platform/reporting` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.site-header` | shared ×15 |
| 2 | HERO | `hero.platform-centered` | page-local |
| 3 | HERO | `hero.platform-horizon` | page-local |
| 4 | HERO | `hero.platform-radar` | page-local |
| 5 | HERO | `hero.platform-mcp-grid` | page-local |
| 6 | PROOF | `proof.logo-cell-grid` | shared ×3 |
| 7 | FEATURES | `features.integration-arc-strip` | shared ×2 |
| 8 | FEATURES | `features.split-icons` | page-local |
| 9 | FEATURES | `features.bento-grid` | page-local |
| 10 | FEATURES | `features.split-accordion` | page-local |
| 11 | FEATURES | `features.card-marquee` | shared ×2 |
| 12 | FEATURES | `features.center-media` | page-local |
| 13 | FEATURES | `features.media-grid-three` | page-local |
| 14 | PROOF | `proof.stat-headline` | page-local |
| 15 | PROOF | `proof.quote-scroll-lit` | shared ×2 |
| 16 | FEATURES | `features.text-columns` | page-local |
| 17 | FEATURES | `features.orbit-illustration` | page-local |
| 18 | FEATURES | `features.icon-row` | page-local |
| 19 | FEATURES | `features.tagged-quad` | page-local |
| 20 | WAYFINDING | `wayfinding.platform-link-grid` | shared ×2 |
| 21 | CONVERSION | `conversion.newsletter-inline` | shared ×2 |
| 22 | CONVERSION | `conversion.platform-final-cta` | shared ×2 |
| 23 | SHELL | `shell.site-footer` | shared ×18 |

### Platform v1 (legacy shell) — `template.platform-legacy`

5 routes · `/platform/ask`, `/platform/call-intelligence`, `/platform/data`, `/platform/sequences`, `/platform/workflows` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.site-header` | shared ×15 |
| 2 | HERO | `hero.platform-ask-canvas` | page-local |
| 3 | HERO | `hero.platform-split-legacy` | page-local |
| 4 | HERO | `hero.platform-data-perspective` | page-local |
| 5 | HERO | `hero.platform-sequence-mock` | page-local |
| 6 | PROOF | `proof.logo-cell-grid` | shared ×3 |
| 7 | FEATURES | `features.product-showcase-legacy` | page-local |
| 8 | FEATURES | `features.ask-tab-carousel` | page-local |
| 9 | FEATURES | `features.uc-band` | page-local |
| 10 | FEATURES | `features.ask-intelligence` | page-local |
| 11 | FEATURES | `features.card-marquee` | shared ×2 |
| 12 | FEATURES | `features.agent-columns` | page-local |
| 13 | FEATURES | `features.legacy-card-grid-three` | page-local |
| 14 | FEATURES | `features.legacy-card-grid-quad` | page-local |
| 15 | PROOF | `proof.quote-scroll-lit` | shared ×2 |
| 16 | FEATURES | `features.split-accordion-legacy` | page-local |
| 17 | FEATURES | `features.integration-arc-strip` | shared ×2 |
| 18 | FEATURES | `features.tabbed-showcase` | page-local |
| 19 | WAYFINDING | `wayfinding.platform-link-grid` | shared ×2 |
| 20 | CONVERSION | `conversion.platform-final-cta` | shared ×2 |
| 21 | SHELL | `shell.site-footer` | shared ×18 |

### Platform developers (dark blueprint) — `template.platform-developers`

1 route · `/platform/developers` · chrome: **full-dark**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.site-header-dark` | shared ×2 |
| 2 | HERO | `hero.developer-blueprint` | page-local |
| 3 | FEATURES | `features.developer-card-section` | page-local |
| 4 | PROOF | `proof.developer-testimonial` | page-local |
| 5 | CONTENT | `content.developer-heatmap` | page-local |
| 6 | WAYFINDING | `wayfinding.developer-apps` | page-local |
| 7 | CONVERSION | `conversion.developer-cta` | page-local |
| 8 | SHELL | `shell.site-footer` | shared ×18 |

## Section reference

### SHELL

_Page chrome outside <main>: site header variants, help docs bar/sidebar, footer variants._

**`shell.site-header`** — Sticky marketing header: dismissible black announcement banner over a nav row (logo, two dropdown triggers with mega-panels, three plain links, sign-in + primary buttons; hamburger below lg). Light at load, swaps to its dark theme while over dark sections.

· Every full-chrome template: homepage, pricing, all marketing long-form pages, contact, apps, blog, changelog and the modern and legacy platform templates. Not on architecture, help, engineering blog or developers. · appears on 26 routes · implemented by `SiteHeader.jsx`

**`shell.site-header-dark`** — Same header component held in its dark theme from first paint (opaque near-black bar, dark stroke border), because the whole page wrapper is dark.

· The engineering blog and the developers platform page only. · appears on 2 routes · implemented by `SiteHeader.jsx (forceDark, via PageShell headerDark)`

**`shell.site-header-bannerless`** — Header with the announcement banner removed (nav row only), with the page hero pulled up underneath it; still toggles dark over dark scenes.

· The architecture page only. · appears on 1 routes · implemented by `SiteHeader.jsx (via PageShell; renders 68px tall without the banner on /architecture)`

**`shell.docs-header`** — Marketing header plus, below 992px, an extra docs bar holding a breadcrumb/menu trigger for the help sidebar.

· All three help routes. · appears on 3 routes · implemented by `help/DocsShell.jsx (docs bar below lg)`

**`shell.docs-sidebar`** — Sticky left docs sidebar: compact command-K search trigger, then a masked scroll area with group headers and Radix accordion items whose carets rotate and whose nested links sit on a left guide line. Hidden below 992px.

· All three help routes. · appears on 3 routes · implemented by `help/DocsShell.jsx (aside + SidebarNav)`

**`shell.site-footer`** — Dark footer: 12-column link grid of grouped columns, then a bottom bar with legal links.

· Every route except the three help routes. · appears on 29 routes · implemented by `SiteFooter.jsx`

**`shell.site-footer-light`** — Light variant of the footer with the same geometry: white ground, grey headings and links, pale bottom-bar band.

· All three help routes. · appears on 3 routes · implemented by `SiteFooter.jsx (variant="light")`

### HERO

_The page-opening block: first thing under the header, carries the page's H1/display line._

**`hero.home-scroll-scene`** — Homepage hero: sticky gradient/pinstripe background and sticky headline + CTA stack over a sticky product-window scene that plays as the section scrolls.

· Homepage only. · appears on 1 routes · implemented by `Hero.jsx`

**`hero.pricing-plans`** — Pricing hero with a monthly/annual billing toggle and a row of four plan cards.

· Pricing only. · appears on 1 routes · implemented by `pricing/PricingHero.jsx`

**`hero.page-hero`** — Plain centered marketing hero: badge pill, display headline, lead, optional CTA row, over a top-masked dot pattern; static (no entrance).

· Customers only (other long-form pages use their own hero variants). · appears on 1 routes · implemented by `marketing/Blocks.jsx > PageHero`

**`hero.startups-logo-hero`** — Centered marketing hero followed by a two-row strip of program logos.

· Startups only. · appears on 1 routes · implemented by `startups/Sections.jsx > StartupsHero`

**`hero.careers-hero`** — Left-aligned hero with primary CTA beside a ringed avatar stack, ending in a hoverable commit-style square grid with a caption that updates on hover.

· Careers only. · appears on 1 routes · implemented by `careers/Hero.jsx`

**`hero.app-partners-hero`** — Static row of framed app tiles above a centered hero with staggered entrance.

· App partners only. · appears on 1 routes · implemented by `partners/Sections.jsx > AppPartnersHero`

**`hero.creator-video-hero`** — Centered hero with CTA and entrance, followed by a continuously auto-scrolling carousel of 16:9 video slides with avatar and name pill.

· Creator partners only. · appears on 1 routes · implemented by `partners/Sections.jsx > CreatorHero`

**`hero.expert-hero`** — Centered hero with two CTAs, an edge-masked avatar cloud, and two crossfading testimonials stacked in place.

· Expert partners only. · appears on 1 routes · implemented by `partners/Sections.jsx > ExpertHero`

**`hero.contact-split-form`** — Single split section: left column of badge, headline, lead and a serif testimonial pinned to the bottom; right tinted panel holding the lead form (name row, email, two selects, textarea, submit, small print). Stacks below lg.

· Contact sales only; this one section is the whole page body. · appears on 1 routes · implemented by `pages/ContactSales.jsx (page-local Header/Testimonial/Panel) + forms/Fields.jsx > LeadForm`

**`hero.apps-hero`** — Centered hero with browse + secondary CTAs, followed by a hatched band of white cells holding app icons.

· App directory only. · appears on 1 routes · implemented by `apps/Sections.jsx > AppsHero`

**`hero.app-header`** — App detail header: large rounded app icon beside H1, subtitle and primary CTA, with a hatched decorative strip in the last column.

· The app detail template (three app routes). · appears on 3 routes · implemented by `pages/AppDetail.jsx (inline) + apps/AppIcon.jsx`

**`hero.blog-featured-post`** — Featured article block: overline row, large underlined title, author line, full-width 16:9 image, then a cell-grid row of three secondary article cards.

· The blog only. · appears on 1 routes · implemented by `blog/Listing.jsx > FeaturedPost`

**`hero.engineering-ascii-hero`** — Dark engineering hero: monospace uppercase H1, a wide generated ASCII-art panel (hidden below lg), then three dark featured article cards.

· The engineering blog only. · appears on 1 routes · implemented by `blog/Engineering.jsx > EngHero`

**`hero.changelog-hero`** — Changelog hero: breadcrumb overline row, centered H1 and lead, inline email subscribe form.

· Changelog only. · appears on 1 routes · implemented by `pages/ChangelogYear.jsx (inline) + forms/Fields.jsx > SubscribeForm`

**`hero.architecture-typewriter`** — Very tall scroll hero pulled up under the header: sticky full-viewport canvas field, centered serif headline typed progressively by scroll with a blinking caret, and a scroll-cue pill.

· Architecture only. · appears on 1 routes · implemented by `architecture/Sections.jsx > ArchHero`

**`hero.help-landing`** — Help landing head in the docs main column: animated conic-border announcement pill, H1, lead, large search trigger and a row of popular-topic tag buttons.

· Help landing only. · appears on 1 routes · implemented by `pages/help/HelpHome.jsx`

**`hero.docs-page-head`** — Docs page head: small slash breadcrumb, H1 and lead in the docs main column.

· Help academy and the help reference guide. · appears on 2 routes · implemented by `help/DocsShell.jsx > Crumbs + pages/help/HelpAcademy.jsx, HelpReference.jsx`

**`hero.platform-centered`** — Viewport-height centered platform hero: eyebrow pill, display headline, subhead, two CTAs, over route-specific original artwork (line grid with chips, agent canvas, or kanban board).

· Modern platform template: web-agent, custom-agents and enrichment. · appears on 6 routes · implemented by `platform/heroes.jsx > HeroWebAgent, HeroCustomAgents, HeroEnrichment`

**`hero.platform-horizon`** — Platform hero with centered copy above a wide 3:1 horizon box of concentric arcs and glow, over a top-masked stripe field.

· Modern platform template: universal-context only. · appears on 6 routes · implemented by `platform/heroes.jsx > HeroHorizon`

**`hero.platform-radar`** — Platform hero with copy centered inside a radar of concentric rings, a rotating beam and pinging dots.

· Modern platform template: reporting only. · appears on 6 routes · implemented by `platform/heroes.jsx > HeroRadar`

**`hero.platform-mcp-grid`** — Platform hero laid on a square-cell grid with client-logo cells and a prompt box under the copy.

· Modern platform template: mcp only. · appears on 6 routes · implemented by `platform/heroes.jsx > HeroMcp`

**`hero.platform-ask-canvas`** — Viewport-height hero over an animated canvas field with a chat widget mock under the copy, closed by a hairline-separated strip.

· Legacy platform template: ask only. · appears on 5 routes · implemented by `platform/legacy.jsx > HeroAsk`

**`hero.platform-split-legacy`** — Left-aligned legacy platform hero with copy in the left columns and a product mock (table or flow diagram) beside or above it.

· Legacy platform template: call-intelligence and workflows. · appears on 5 routes · implemented by `platform/legacy.jsx > HeroCallIntel, HeroWorkflows`

**`hero.platform-data-perspective`** — Full-bleed tall hero: copy above a perspective-tilted wireframe of schema diagrams and a product window, with a sticky tab bar.

· Legacy platform template: data only. · appears on 5 routes · implemented by `platform/legacy.jsx > HeroData`

**`hero.platform-sequence-mock`** — Hero with a stacked email-step sequence mock between dashed rules above the copy.

· Legacy platform template: sequences only. · appears on 5 routes · implemented by `platform/legacy.jsx > HeroSequences`

**`hero.developer-blueprint`** — Dark blueprint hero on a 24-column line grid: bracketed overline, display headline, docs + outline buttons, artwork on the right.

· Developers only. · appears on 1 routes · implemented by `platform/developers/Hero.jsx`

### PROOF

_Social proof: customer logos, testimonials and quotes, customer stories, stats._

**`proof.logo-cell-grid`** — Customer logo grid drawn as bordered cells (five columns by two rows with 1px gridlines; two columns on mobile), some cells linking with a corner arrow; logos fade in.

· Homepage plus the platform pages that carry it: custom-agents, mcp, reporting, universal-context, web-agent (modern) and workflows (legacy). · appears on 12 routes · implemented by `CustomerLogos.jsx`

**`proof.logo-wall`** — Borderless wall of twelve monochrome logos in a six-column grid (fewer columns on smaller screens).

· Pricing and customers. · appears on 2 routes · implemented by `marketing/Blocks.jsx > LogoGrid`

**`proof.program-partners`** — Centered section head, an inset logo wall of program partners, and a centered note.

· Startups only. · appears on 1 routes · implemented by `startups/Sections.jsx > ProgramPartners`

**`proof.quote-curtain`** — White sticky quote panel on a dot grid that is revealed as the dark section above scrolls away like a curtain; serif quote with scroll-driven word reveal, text-only attribution.

· Homepage only. · appears on 1 routes · implemented by `UniversalContext.jsx > QuoteReveal (internal)`

**`proof.quote-reveal`** — Portrait-plus-quote row: cut-out portrait art on the left, serif quote with hanging open-quote whose words slide up once in view, attribution; partner pages add an overline and a favorite-features chip row.

· Customers, app partners and creator partners. · appears on 3 routes · implemented by `marketing/Blocks.jsx > QuoteReveal`

**`proof.quote-scroll-lit`** — Large centered serif testimonial on a dot field whose words change from grey to ink as the block scrolls through; attribution below; dashed guide rows above and below in the legacy shell.

· Platform pages: enrichment (modern) and ask, call-intelligence, sequences, workflows (legacy). · appears on 11 routes · implemented by `platform/Sections.jsx > ScrollQuote`

**`proof.scale-stats`** — Stats section over an exponential-curve chart background: eyebrow, two-tone heading, two-by-two grid of numbers with blue left rules.

· Homepage only. · appears on 1 routes · implemented by `ScaleStats.jsx`

**`proof.customer-stories-tabs`** — Section head, a four-tab logo strip with timed progress fill, and one large story card (text left, saturating image right) that rotates with the tabs.

· Homepage only. · appears on 1 routes · implemented by `CustomerStories.jsx`

**`proof.customer-stories-grid`** — Grid of seven story cards over a dot pattern, alternating full-width feature cards (text + framed media) with two-up half cards.

· Customers only. · appears on 1 routes · implemented by `customers/StoriesGrid.jsx`

**`proof.stat-headline`** — Split block: two-tone heading on the left, one very large container-scaled number with label on the right.

· Modern platform template: custom-agents and mcp. · appears on 6 routes · implemented by `platform/Sections.jsx > Stat`

**`proof.developer-testimonial`** — Dark blueprint testimonial: mono name label, halftone portrait canvas, quote box whose words brighten.

· Developers only (appears twice on the page). · appears on 1 routes · implemented by `platform/developers/Testimonial.jsx`

### FEATURES

_Product or program explanation modules: split accordions, card grids, media showcases, step lists, tiers._

**`features.platform-showcase`** — Long homepage product showcase: intro block then a tall bordered grid of feature panels with product mocks.

· Homepage only. · appears on 1 routes · implemented by `PlatformShowcase.jsx`

**`features.self-building`** — Centered eyebrow, heading and button over a tick-pattern band, ending in a record-detail product card cut off by the section bottom.

· Homepage only. · appears on 1 routes · implemented by `SelfBuilding.jsx`

**`features.context-dark-stack`** — First dark section of the homepage context group: striped title region with mega headline, animated horizon/planet, feature row, auto-cycling tabs and a connectivity row.

· Homepage only. · appears on 1 routes · implemented by `UniversalContext.jsx > BrandSection (internal)`

**`features.sdk-block`** — Dark graph-paper panel with a two-tone heading and button on the left and a line illustration on the right.

· Homepage only. · appears on 1 routes · implemented by `UniversalContext.jsx > SdkSection (internal)`

**`features.startup-feature-cells`** — Section head, then a two-by-two cell grid of indexed media cards split by a full-width static centered quote cell, hatched gutters.

· Startups only. · appears on 1 routes · implemented by `startups/Sections.jsx > FeatureCells`

**`features.perks-orbit-band`** — Tinted band with a centered two-part statement over an orbit illustration of floating circular app tokens.

· Startups only. · appears on 1 routes · implemented by `startups/Sections.jsx > PerksBand`

**`features.two-paths`** — Two-up cell grid of path cards (title, body, outline button) on a hatched ground.

· App partners only. · appears on 1 routes · implemented by `partners/Sections.jsx > TwoPaths`

**`features.build-steps-tabbed`** — Section head, a segmented two-tab switch, and a numbered step list (connector lines, per-character titles, descriptions) per tab, with a footer link row.

· App partners only. · appears on 1 routes · implemented by `partners/StepList.jsx > StartBuilding`

**`features.directory-path-steps`** — Section head plus the numbered step list without tabs (four steps) and a footer link row.

· Expert partners only. · appears on 1 routes · implemented by `partners/StepList.jsx > Steps (inline in pages/ExpertPartners.jsx)`

**`features.explore-apps`** — Section head and a bordered frame: text cell with a discover link on the left, original app-store mock illustration on the right.

· App partners only. · appears on 1 routes · implemented by `partners/Sections.jsx > ExploreApps`

**`features.creator-audience-cells`** — Centered section head and a three-up cell grid of labelled audience cards.

· Creator partners only. · appears on 1 routes · implemented by `partners/Sections.jsx > WhoYouAre`

**`features.creator-perks`** — Centered head with outline CTA, then a cell grid of perks: a row of three illustrated cards over a row of three text-only cards.

· Creator partners only. · appears on 1 routes · implemented by `partners/Sections.jsx > Perks`

**`features.expert-criteria-columns`** — Section head and a five-column row of left-bordered criteria with edge fades.

· Expert partners only. · appears on 1 routes · implemented by `partners/Sections.jsx > WhoWereLookingFor`

**`features.expert-tiers`** — Section head, three tilting tier cards (light, grey, dark) with ring emblems, patterned art and bullet lists, and a bordered footer strip with CTA.

· Expert partners only. · appears on 1 routes · implemented by `partners/Sections.jsx > Tiers`

**`features.featured-apps-tabs`** — Section head, five chip tabs (click only), and a panel with app icon/title/description on the left and a media box on the right that blurs in on change.

· App directory only. · appears on 1 routes · implemented by `apps/Sections.jsx > FeaturedApps`

**`features.split-accordion`** — Modern split accordion: two-tone heading and three progress-tracked items on the left, cross-fading media panel on the right; full-bleed and stacked below lg.

· Modern platform template: web-agent, custom-agents, universal-context, enrichment and reporting (not mcp). · appears on 6 routes · implemented by `platform/SplitAccordion.jsx > SplitAccordion`

**`features.split-accordion-legacy`** — Legacy split accordion: heading with expandable items pinned to the bottom-left, dotted media well on the right, seam ticks between.

· Legacy platform template: call-intelligence, data, sequences and workflows (not ask). · appears on 5 routes · implemented by `platform/SplitAccordion.jsx > SplitAccordionLegacy`

**`features.split-icons`** — Two-column block: heading on the left, three stacked icon + text articles on the right.

· Modern platform template: mcp only. · appears on 6 routes · implemented by `platform/Grids.jsx > SplitIcons`

**`features.media-grid-three`** — Modern three-up media cards under a two-tone heading, artwork above title and body (one or two rows).

· Modern platform template: web-agent, universal-context, mcp, enrichment and reporting (not custom-agents). · appears on 6 routes · implemented by `platform/Grids.jsx > MediaGrid3`

**`features.legacy-card-grid-three`** — Legacy three-up cards in a dashed, hatched frame with square dotted media wells; a text + icon variant drops the media.

· Legacy platform template: call-intelligence, data, sequences and workflows (data and workflows also use the text + icon variant). · appears on 5 routes · implemented by `platform/Grids.jsx > LegacyGrid3`

**`features.legacy-card-grid-quad`** — Legacy two-by-two indexed media cards in a hatched frame, optionally split by a full-width inline serif quote row.

· Legacy platform template: call-intelligence, data and sequences (sequences without the quote). · appears on 5 routes · implemented by `platform/Grids.jsx > LegacyGrid2Q`

**`features.center-media`** — Centered two-tone heading above one large product image on a fading stripe field.

· Modern platform template: custom-agents, universal-context, mcp and enrichment. · appears on 6 routes · implemented by `platform/Sections.jsx > CenterMedia`

**`features.card-marquee`** — Two rows of small task cards moving in opposite directions with scroll, over a line or stripe field; centered heading (modern or legacy stacked style).

· Platform pages: custom-agents (modern) and workflows, ask (legacy). · appears on 11 routes · implemented by `platform/Sections.jsx > CardMarquee`

**`features.text-columns`** — Heading then a horizontally snapping row of left-bordered text columns with ruler feet; numbered-steps variant adds a docs button.

· Modern platform template: universal-context, enrichment and mcp (steps variant). · appears on 6 routes · implemented by `platform/Sections.jsx > TextColumns`

**`features.orbit-illustration`** — Centered illustration on a horizon hairline, centered heading, three text columns.

· Modern platform template: web-agent only. · appears on 6 routes · implemented by `platform/Sections.jsx > Orbit`

**`features.icon-row`** — Heading then a three-up row of tall icon + text cells.

· Modern platform template: custom-agents only. · appears on 6 routes · implemented by `platform/Grids.jsx > IconRow`

**`features.tagged-quad`** — Heading on the left, two-by-two grid of bracket-tagged cards on the right.

· Modern platform template: web-agent and universal-context. · appears on 6 routes · implemented by `platform/Grids.jsx > TaggedQuad`

**`features.bento-grid`** — Legacy-style centered header over an eight-column bento of four media cards in alternating wide/narrow rows.

· Modern platform template: reporting only. · appears on 6 routes · implemented by `platform/Grids.jsx > Bento`

**`features.integration-arc-strip`** — Short tinted strip with a centered two-part line and app tiles placed along a large arc, masked at the bottom.

· Platform pages: mcp (modern) and call-intelligence (legacy). · appears on 11 routes · implemented by `platform/Sections.jsx > IntegrationStrip`

**`features.product-showcase-legacy`** — Legacy header then a full-width product screenshot in a tinted, horizontally scrollable box.

· Legacy platform template: sequences only. · appears on 5 routes · implemented by `platform/legacy.jsx > Showcase`

**`features.tabbed-showcase`** — Legacy tabbed showcase: block heading, outline pill tabs (click only), panel with title, body and media.

· Legacy platform template: call-intelligence and data. · appears on 5 routes · implemented by `platform/Sections.jsx > Tabs`

**`features.ask-tab-carousel`** — Centered heading, five text tabs over a draggable tick ruler, and the selected panel.

· Legacy platform template: ask only. · appears on 5 routes · implemented by `platform/legacy.jsx > AskTabs`

**`features.uc-band`** — Viewport-height dark band: terrain canvas, small kicker above a large white headline, dashed guides, and a five-up row of dark corner-marked cells.

· Legacy platform template: ask and workflows. · appears on 5 routes · implemented by `platform/Sections.jsx > UcBand`

**`features.ask-intelligence`** — Centered header, a bottom-masked product window mock, then a three-up cell row of icon + text + floating mini-UI media.

· Legacy platform template: ask only. · appears on 5 routes · implemented by `platform/legacy.jsx > AskIntel`

**`features.agent-columns`** — Legacy five-column snapping row of bordered text columns with a dark title marker, ruler below and edge fades.

· Legacy platform template: workflows only. · appears on 5 routes · implemented by `platform/legacy.jsx > AgentColumns`

**`features.developer-card-section`** — Dark blueprint section: header with docs button, then grid-placed illustrated cards, sometimes with an inline quote strip between rows.

· Developers only (three instances on the page). · appears on 1 routes · implemented by `platform/developers/CardSection.jsx`

### CONTENT

_Substantive editorial or company body content that is not a product pitch (detail-page body, careers story, docs body, scrollytelling chapters)._

**`content.interview-video`** — Large rounded video player with poster and custom control bar.

· Careers only. · appears on 1 routes · implemented by `careers/Sections.jsx > InterviewVideo`

**`content.team-intro`** — Centered head, avatar dot-matrix shape, and a short testimonial.

· Careers only. · appears on 1 routes · implemented by `careers/Sections.jsx > TeamIntro`

**`content.team-photos`** — Short head then a grid of six team photos and an investor logo caption row.

· Careers only. · appears on 1 routes · implemented by `careers/Sections.jsx > TeamPhotos`

**`content.values-grid`** — Section head and a two-by-two cell grid pairing pixel-art tiles with value statements.

· Careers only. · appears on 1 routes · implemented by `careers/Sections.jsx > Values`

**`content.app-detail-body`** — Two-column app body: sticky tinted meta aside (official pill, meta groups, outline CTA) and a main column with image gallery (thumbnails + lightbox) and three overview sections of prose and bullet lists.

· The app detail template (three app routes). · appears on 3 routes · implemented by `pages/AppDetail.jsx (inline) + apps/Gallery.jsx`

**`content.engineering-heatmap`** — Dark contribution-style heat grid of small squares in five shades with a stats line, followed by a heading and a ghost link.

· The engineering blog only. · appears on 1 routes · implemented by `blog/Engineering.jsx > Heatmap`

**`content.developer-heatmap`** — Dark blueprint header with outline button over a lined box holding a contribution-style grid and a mono caption.

· Developers only. · appears on 1 routes · implemented by `platform/developers/Heatmap.jsx`

**`content.architecture-chapter-band`** — Chapter divider band: tinted base with drifting radial-gradient blobs and a noise overlay, centered mono label and per-word serif title.

· Architecture only (three instances introduce the page's three chapters). · appears on 1 routes · implemented by `architecture/Sections.jsx > Chapter`

**`content.architecture-story-body`** — Two-column editorial body: mono/sans paragraphs with square bullets beside serif pull text, plus captioned chip diagrams.

· Architecture only. · appears on 1 routes · implemented by `pages/Architecture.jsx (inline) + architecture/Diagrams.jsx > FlowFigure`

**`content.five-reasons-index`** — Interactive index of five rows with oversized serif words, mono indices and hairlines that shift under the pointer.

· Architecture only. · appears on 1 routes · implemented by `architecture/FiveReasons.jsx`

**`content.problem-dark-scene`** — Dark full-height scene whose words brighten from faint to white as it scrolls.

· Architecture only. · appears on 1 routes · implemented by `architecture/Sections.jsx > LitWords (composed in pages/Architecture.jsx)`

**`content.architecture-diagram-scene`** — Ring-diagram row, then a tall sticky dark canvas stage with mono tags and pulsing dots, then numbered serif pillars with brightening words.

· Architecture only. · appears on 1 routes · implemented by `architecture/Sections.jsx > DarkScene + architecture/Diagrams.jsx > RingRow`

**`content.launch-feature-blocks`** — Four two-column feature blocks (serif heading, mono overline, paragraphs, SVG diagram), a tinted beta block and a dark code-art band.

· Architecture only. · appears on 1 routes · implemented by `pages/Architecture.jsx (inline) + architecture/Diagrams.jsx > LaunchDiagram + architecture/Sections.jsx > CodeBand`

**`content.help-get-started`** — Split block: multi-tone heading and short paragraphs on the left, numbered list of three steps with badge numbers on the right, see-all link.

· Help landing only. · appears on 1 routes · implemented by `pages/help/HelpHome.jsx (inline)`

### LISTING

_Collections of many like items: directories, article/entry lists, job listings, course and lesson lists._

**`listing.changelog-preview`** — Section head and four changelog cards (date, title, excerpt, tick strip with staggered hover recolor); horizontal snap row below lg.

· Homepage only. · appears on 1 routes · implemented by `Changelog.jsx`

**`listing.open-positions`** — Centered head, filter row (two selects + search), and department-grouped job rows with live filtering and an empty state.

· Careers only. · appears on 1 routes · implemented by `careers/OpenPositions.jsx`

**`listing.app-directory`** — Centered head with command-K search trigger, sticky category sidebar (chip row on tablet), and every app card rendered in category blocks with anchor scrolling (no pagination).

· App directory only. · appears on 1 routes · implemented by `apps/Sections.jsx > Directory`

**`listing.related-apps`** — Bordered aside with overline and a three-column grid of six app cards.

· The app detail template (three app routes). · appears on 3 routes · implemented by `pages/AppDetail.jsx (inline) + apps/AppCard.jsx`

**`listing.article-list`** — Latest-articles block: heading, vertical category filter column (horizontal row on small screens) driving a query param, and a list of article rows with blur transition on filter; light or dark tone.

· Blog (light) and engineering blog (dark). · appears on 2 routes · implemented by `blog/Listing.jsx > LatestArticles`

**`listing.changelog-entries`** — All entries for the selected year as hairline-separated rows: date, single-line title, two-line excerpt, tag lines, arrow; no pagination.

· Changelog only. · appears on 1 routes · implemented by `pages/ChangelogYear.jsx (inline)`

**`listing.course-grid`** — Two-column grid of course cards: rounded media, underlined title, description, lesson/duration meta.

· Help academy only. · appears on 1 routes · implemented by `pages/help/HelpAcademy.jsx (inline) + help/CourseArt.jsx`

**`listing.lesson-list`** — Vertical list of numbered lesson rows: badge number, title/description/read-more, rounded media on the right.

· Help reference guide only. · appears on 1 routes · implemented by `pages/help/HelpReference.jsx (inline) + help/CourseArt.jsx`

### CONVERSION

_Blocks whose job is to get the visitor to act: pricing tables, forms, CTA bands, newsletter sign-ups, FAQ._

**`conversion.plan-comparison-table`** — Long feature comparison table across plans: sticky plan header with billing toggle, grouped rows with tooltips and expandable sub-rows.

· Pricing only. · appears on 1 routes · implemented by `pricing/ComparisonTable.jsx`

**`conversion.faq-accordion`** — Centered FAQ: heading then an accordion of question rows with a bracketed plus-to-minus icon and height-animated answers.

· Pricing, startups, and the three partner pages. · appears on 5 routes · implemented by `marketing/Faq.jsx`

**`conversion.avatar-wall-cta`** — Closing CTA: dashed guide row, a wide wall of avatar tiles fading in at random delays, two-line heading that slides up, two buttons.

· Customers only. · appears on 1 routes · implemented by `marketing/Blocks.jsx > CtaAvatarWall`

**`conversion.startup-apply-form`** — Split apply block: heading, bullets and note on the left; tinted panel with the lead form (text inputs and selects) on the right.

· Startups only. · appears on 1 routes · implemented by `startups/Sections.jsx > ApplyBlock`

**`conversion.newsletter-band`** — Tinted band: section head and inline subscribe form on the left, tile illustration panel on the right.

· Careers only. · appears on 1 routes · implemented by `careers/Sections.jsx > NewsletterBand`

**`conversion.newsletter-inline`** — Single-row newsletter sign-up: two-line two-tone line on the left, email input + subscribe button (spinner while submitting) on the right.

· Homepage (under the changelog cards) and the mcp platform page. · appears on 7 routes · implemented by `Changelog.jsx (newsletter row)`

**`conversion.apply-closed-notice`** — Tinted anchor block with a dashed guide row and a single centered notice that applications are closed (no form).

· Creator partners only. · appears on 1 routes · implemented by `partners/Sections.jsx > ApplyNotice`

**`conversion.expert-apply-embed`** — Tinted anchor block: section head on the left, embedded application form box on the right (own form or placeholder instead of the third-party embed).

· Expert partners only. · appears on 1 routes · implemented by `partners/Sections.jsx > ExpertApply`

**`conversion.build-with-us`** — Tinted closing band: section head + primary CTA on the left, decorative grid of white squares on the right.

· App directory only. · appears on 1 routes · implemented by `apps/Sections.jsx > BuildWithUs`

**`conversion.home-final-cta`** — Homepage dark closing CTA: unmasked stripe field with falling light streaks, centered medium-weight headline, two dark buttons; email form on mobile.

· Homepage only. · appears on 1 routes · implemented by `FinalCta.jsx`

**`conversion.platform-final-cta`** — Platform dark closing CTA: shorter than the homepage CTA, stripe field masked to a dome at top center, bold one- or two-line headline, tighter gap and padding, same streaks.

· Every modern and legacy platform page (not developers). · appears on 11 routes · implemented by `platform/Sections.jsx > PlatformCta`

**`conversion.developer-cta`** — Dark blueprint closing block: centered heading with a mono command chip, surrounded by floating dark mock windows.

· Developers only. · appears on 1 routes · implemented by `platform/developers/ReadyCta.jsx`

**`conversion.architecture-closing-nav`** — Sticky canvas closing stage with a serif line and a two-card mono nav linking to the sales contact page, with corner marks.

· Architecture only. · appears on 1 routes · implemented by `architecture/Sections.jsx > Closing`

### WAYFINDING

_Navigation within the page body: breadcrumbs, cross-links to sibling pages, link grids, resource cards, year switchers._

**`wayfinding.partner-cross-links`** — Centered head and a two-up cell grid linking to the other partner programs (the current one excluded), over a dot pattern.

· The three partner pages. · appears on 3 routes · implemented by `marketing/Blocks.jsx > PartnerCrossLinks`

**`wayfinding.resource-cards`** — Short heading block plus a row of three or four bordered resource cards (icon, arrow, title, description) with hover wash.

· Careers (four cards), expert partners (three) and help landing (three, larger icons). · appears on 3 routes · implemented by `marketing/Blocks.jsx > ResourceCards`

**`wayfinding.app-breadcrumb`** — Tall breadcrumb bar ending at the bottom: directory / app overline on the left, counter overline on the right, dashed guide.

· The app detail template (three app routes). · appears on 3 routes · implemented by `pages/AppDetail.jsx (inline)`

**`wayfinding.year-timeline`** — Row of year links centered over a perspective ruler of compressed vertical lines; current year highlighted.

· Changelog only. · appears on 1 routes · implemented by `pages/ChangelogYear.jsx > YearTimeline (page-local)`

**`wayfinding.platform-link-grid`** — Grid of eight numbered link cells to other platform pages with hover wash and arrow; legacy stacked-header frame or modern split layout.

· Platform pages: enrichment (modern) and call-intelligence, data, sequences (legacy). · appears on 11 routes · implemented by `platform/Sections.jsx > LinksGrid`

**`wayfinding.developer-apps`** — Dark header with browse button, a row of app icons with labels, and a repository link row.

· Developers only. · appears on 1 routes · implemented by `platform/developers/AppsRow.jsx`
