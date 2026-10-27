// Single manifest of every image / logo / screenshot slot on the page.
// key -> { src, width, height, alt }. Sizes are the measured boxes from CLONE_SPEC.md (1440 unless noted).
// src is null everywhere: components render ORIGINAL artwork at the exact box (fictional "Corvale"
// brand, invented CRM mocks in JSX/SVG, invented company wordmarks in logos.jsx, abstract story art
// in StoryArt.jsx). Drop a licensed asset URL into `src` to replace the artwork.
// Do NOT point these at Attio logos, customer logos or product screenshots.

const slot = (width, height, alt) => ({ src: null, width, height, alt })

export const assets = {
  // 1b / 12: brand mark (neutral generic wordmark placeholder when src is null)
  brandMark: slot(103, 24, 'Company logo'),
  brandMarkFooter: slot(116, 26, 'Company logo'),

  // 2c hero product windows (inner content areas; canvas for the main window is 1152x626 before scale)
  heroAppScreen: slot(1152, 626, 'Product workspace screenshot'),
  heroChatWindow: slot(256, 154, 'Chat notification'), // "slack"-type, shell 268x192
  heroCallWindow: slot(260, 333, 'Call notes'), // "call"-type, shell 272x371
  heroTerminalWindow: slot(288, 277, 'Terminal session'), // "terminal"-type, shell 300x315
  heroMobileScreen: slot(504, 379, 'Product workspace screenshot (tablet)'), // 371x296 at 390

  // 3 customer logos (mask boxes, in grid order)
  customerLogo01: slot(108, 23, 'Customer logo 1'),
  customerLogo02: slot(123, 17, 'Customer logo 2'),
  customerLogo03: slot(123, 19, 'Customer logo 3'),
  customerLogo04: slot(123, 27, 'Customer logo 4'),
  customerLogo05: slot(132, 22, 'Customer logo 5'),
  customerLogo06: slot(118, 27, 'Customer logo 6'),
  customerLogo07: slot(95, 21, 'Customer logo 7'),
  customerLogo08: slot(133, 17, 'Customer logo 8'),
  customerLogo09: slot(75, 24, 'Customer logo 9'),
  customerLogo10: slot(127, 15, 'Customer logo 10'),

  // 4b platform showcase illustration panels (inner box, >= lg; 327 tall below lg, #3/#5 aspect 1044/654)
  showcaseIllustration1: slot(1043, 654, 'Feature illustration 1'),
  showcaseIllustration2: slot(1043, 654, 'Feature illustration 2'),
  showcaseIllustration3: slot(1043, 654, 'Feature illustration 3'),
  showcaseIllustration4: slot(1043, 654, 'Feature illustration 4'),
  showcaseIllustration5: slot(1043, 654, 'Feature illustration 5'),
  // 4b sub-card visual areas (flex-1 region: 521.25 cell - 2x32 px; 480 - 44 top - 70 text - 32 gap - 32 pb).
  // Derived, not directly measured.
  showcaseSubVisual1a: slot(457, 302, 'Detail illustration'),
  showcaseSubVisual1b: slot(457, 302, 'Detail illustration'),
  showcaseSubVisual3a: slot(457, 302, 'Detail illustration'),
  showcaseSubVisual3b: slot(457, 302, 'Detail illustration'),
  showcaseSubVisual5a: slot(457, 302, 'Detail illustration'),
  showcaseSubVisual5b: slot(457, 302, 'Detail illustration'),

  // 5 self-building record card
  selfBuildingRecord: slot(1149, 460, 'Record detail screenshot'),

  // ---- Slots for the next build pass (sections 6–12) ----
  universalContextCanvas: slot(695, 808, 'Wireframe illustration'),
  sdkIllustration: slot(695, 463, 'Line illustration'),
  integrationTiles: Array.from({ length: 12 }, (_, i) => slot(44, 44, `Integration ${i + 1}`)),
  storyLogos: Array.from({ length: 4 }, (_, i) => slot(120, 24, `Customer ${i + 1}`)),
  storyImages: Array.from({ length: 4 }, (_, i) => slot(696, 435, `Customer story photo ${i + 1}`)),
}
