import { useEffect, useMemo, useRef, useState } from 'react'
import StoryArt from '../StoryArt.jsx'
import { SubscribeForm } from '../forms/Fields.jsx'
import { ResourceCards } from '../marketing/Blocks.jsx'
import { AbstractAvatar, LogoMark } from '../marketing/art.jsx'
import { CellGrid, DashedV, DotPattern, GuideRow, Hatch, Section, SectionHead } from '../marketing/primitives.jsx'

/* ------------------------------------------------------------------ */
/* T2-c.2 InterviewVideo: 1150.3x647 player, radius 16, 1px #d3d8df, bg #000; control bar.       */
/* ------------------------------------------------------------------ */
function PlayerButton({ label, onClick, children }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="flex size-8 shrink-0 items-center justify-center rounded-8 bg-player-btn text-white-100">
      {children}
    </button>
  )
}
const s = { width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }

export function InterviewVideo() {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [t, setT] = useState(0)
  const [show, setShow] = useState(true)
  const raf = useRef(0)
  const DURATION = 94 // seconds (placeholder clip length)
  useEffect(() => {
    if (!playing) return
    let last = performance.now()
    const tick = (now) => {
      setT((v) => {
        const n = v + (now - last) / 1000
        return n >= DURATION ? 0 : n
      })
      last = now
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [playing])
  return (
    <section className="relative" data-section="interview-video">
      <div className="container">
        <div className="grid grid-cols-12 lg:relative lg:border-x lg:border-solid lg:border-white-500">
          <div className="col-[1/-1] px-1 py-20 lg:col-[2/-2]">
            <div
              className="relative grid aspect-video w-full overflow-hidden rounded-16 bg-black-0"
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => playing && setShow(false)}
            >
              {/* Original poster art (no video asset), dimmed like the live brightness(.6) */}
              <div className="absolute inset-0 brightness-[0.6]">
                <StoryArt variant={2} />
              </div>
              {!playing && (
                <button type="button" aria-label="Play video" onClick={() => setPlaying(true)} className="absolute inset-0 grid place-items-center">
                  <span className="flex size-16 items-center justify-center rounded-full bg-player-btn text-white-100 backdrop-blur-[4px]">
                    <svg width="22" height="22" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
                      <path d="M5 3.5v9l7-4.5z" />
                    </svg>
                  </span>
                </button>
              )}
              <div className={`absolute inset-x-0 bottom-0 flex gap-x-2 p-4 transition-opacity duration-[250ms] ${show ? 'opacity-100' : 'opacity-0'}`}>
                <PlayerButton label={playing ? 'Pause' : 'Play'} onClick={() => setPlaying((p) => !p)}>
                  {playing ? (
                    <svg {...s}>
                      <path d="M5.5 3.5v9M10.5 3.5v9" />
                    </svg>
                  ) : (
                    <svg {...s} fill="currentColor" stroke="none">
                      <path d="M5 3.5v9l7-4.5z" />
                    </svg>
                  )}
                </PlayerButton>
                <div className="relative flex h-8 flex-1 items-center rounded-8 bg-player-btn px-3" role="slider" aria-label="Seek" aria-valuemin={0} aria-valuemax={DURATION} aria-valuenow={Math.round(t)}>
                  <div className="relative h-1 w-full overflow-hidden rounded-full bg-white-100/30">
                    <div className="absolute inset-y-0 left-0 rounded-full bg-white-100" style={{ width: `${(t / DURATION) * 100}%` }} />
                  </div>
                </div>
                <PlayerButton label={muted ? 'Unmute' : 'Mute'} onClick={() => setMuted((m) => !m)}>
                  <svg {...s}>
                    <path d="M3 6.5h2.5L9 3.5v9l-3.5-3H3z" />
                    {muted ? <path d="m11 6.5 3 3M14 6.5l-3 3" /> : <path d="M11.5 6a3 3 0 0 1 0 4" />}
                  </svg>
                </PlayerButton>
                <PlayerButton label="Fullscreen">
                  <svg {...s}>
                    <path d="M3 6V3h3M13 6V3h-3M3 10v3h3M13 10v3h-3" />
                  </svg>
                </PlayerButton>
              </div>
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-16 border border-solid border-white-700" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* T2-c.3 TeamIntro: centered head, 1158x352 avatar dot-matrix (25.6 circles, pitch 32) with a  */
/* serif testimonial in the middle.                                                              */
/* ------------------------------------------------------------------ */
function useDotMatrix(cols, rows, holeX, holeY, photos, seed0) {
  return useMemo(() => {
    const out = []
    let seed = seed0
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
    for (let y = 0; y < rows; y++)
      for (let x = 0; x < cols; x++) {
        const nx = (x - (cols - 1) / 2) / (cols / 2)
        const ny = (y - (rows - 1) / 2) / (rows / 2)
        // hollow centre for the quote, soft ragged outer edge
        const inner = Math.abs(nx) < holeX && Math.abs(ny) < holeY
        const outer = nx * nx + ny * ny * 0.35 > 0.95 + rnd() * 0.12
        if (inner || outer) continue
        out.push({ x, y, k: rnd() })
      }
    const ranked = [...out].sort((a, b) => a.k - b.k)
    ranked.slice(0, photos).forEach((d, i) => {
      d.photo = true
      d.size = i % 9 === 0 ? 32 : i % 7 === 0 ? 26.9 : 25.6
    })
    return out
  }, [cols, rows, holeX, holeY, photos, seed0])
}

function DotMatrix({ dots, className }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 ${className}`}>
      {dots.map((d) => {
        const size = d.size ?? 25.6
        const left = d.x * 32 + (32 - size) / 2
        const top = d.y * 32 + (32 - size) / 2
        return d.photo ? (
          <div key={`${d.x}-${d.y}`} className="absolute overflow-hidden rounded-full shadow-media-ring" style={{ left, top, width: size, height: size }}>
            <AbstractAvatar size={size} seed={d.x * 11 + d.y} />
          </div>
        ) : (
          <div key={`${d.x}-${d.y}`} className="absolute rounded-full bg-white-700" style={{ left, top, width: size, height: size }} />
        )
      })}
    </div>
  )
}

export function TeamIntro() {
  // 1158x352 at >= lg (36 x 11 cells of 32); 478x520 below lg (15 x 16).
  const desktop = useDotMatrix(36, 11, 0.62, 0.5, 63, 9)
  const mobile = useDotMatrix(15, 16, 0.86, 0.34, 30, 13)
  return (
    <Section as="section">
      <div aria-hidden="true" className="absolute inset-0 grid grid-cols-12">
        <div className="col-[2/-2] flex justify-between">
          <DashedV />
          <DashedV />
        </div>
      </div>
      <SectionHead center lead="People make the product." cont="We hire thoughtful generalists and give them room to own real problems from start to finish." />
      <div className="relative grid grid-cols-12 pb-24">
        <div className="relative col-[2/-2] flex h-[520px] flex-col items-center justify-center overflow-hidden bg-white-100 lg:h-[352px]">
          <DotMatrix dots={desktop} className="max-lg:hidden" />
          <DotMatrix dots={mobile} className="lg:hidden" />
          <p className="relative mb-2 max-w-[672px] text-pretty text-center font-quote text-xl text-black-100 max-lg:px-6">
            “The best part of the job is the people. Everyone here sweats the details and still finds time to help you get unstuck.”
          </p>
          <div className="relative flex items-center justify-center gap-1 text-sm text-black-300">
            <span className="font-semibold">Rafa Lindqvist</span>
            <span>· Design Lead</span>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* T2-c.4 TeamPhotos: header + 10-col grid of 6 photo boxes (320 tall) + investor logos.         */
/* ------------------------------------------------------------------ */
export function TeamPhotos() {
  const boxes = [
    ['col-span-3', 0],
    ['col-span-3', 1],
    ['col-span-4', 2],
    ['col-span-4', 3],
    ['col-span-3', 0],
    ['col-span-3', 2],
  ]
  return (
    <section className="container">
      <div className="flex flex-col items-center overflow-hidden border-x border-solid border-white-500 pt-px">
        <div className="relative grid w-full grid-cols-12 gap-y-[60px] py-20">
          <DotPattern />
          <div className="relative col-[2/-2] flex max-w-md flex-col gap-y-3 md:col-[2/9]">
            <h2 className="text-balance text-base text-black-300">Life around the studio</h2>
            <p className="text-balance text-base text-black-700">Offsites, demo days and long lunches with the people who build it.</p>
          </div>
          <div className="relative col-[2/-2] grid grid-cols-10 gap-2.5 md:gap-3">
            {boxes.map(([span, v], i) => (
              <div key={i} role="img" aria-label="Team photo illustration" className={`relative h-[200px] overflow-hidden max-md:col-span-10 md:h-[320px] ${span}`}>
                <StoryArt variant={(v + i) % 4} />
              </div>
            ))}
          </div>
        </div>
        <div className="grid w-full grid-cols-12 gap-y-8 py-[100px] lg:py-[120px]">
          <p className="col-[2/-2] text-center text-sm text-black-700">Backed by investors who build too</p>
          <div className="col-[2/-2] mx-auto grid w-full max-w-[926.7px] grid-cols-3 items-center justify-items-center gap-x-6 gap-y-5 md:gap-y-6 lg:grid-cols-6 lg:gap-x-8">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} role="img" aria-label={`Investor logo ${i + 1}`} className="h-9 w-full md:h-10 lg:h-12">
                <LogoMark i={i + 6} scale={0.95} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* T2-c.5 Values: SectionHead + hatch + 2x2 CellGrid (577.7x208), pixel art + text.               */
/* ------------------------------------------------------------------ */
// 4x6 pixel patterns (1 = filled). Original simple glyphs.
const PIXELS = [
  '0110 1001 1001 0110 0110 0000',
  '0100 1110 0100 0100 0110 0000',
  '1001 1001 1111 1001 1001 0000',
  '0010 0110 1111 0110 0010 0000',
]
const PIXEL_TONES = ['bg-blue-400', 'bg-art-teal', 'bg-traffic-yellow', 'bg-art-iris']
function PixelArt({ i }) {
  const cells = PIXELS[i].replace(/ /g, '').split('')
  return (
    <div className="absolute inset-0 grid grid-cols-4 gap-px bg-white-300 pr-px max-md:hidden" aria-hidden="true">
      {cells.map((c, k) => (
        <div key={k} className={`size-full ${c === '1' ? PIXEL_TONES[i] : 'bg-white-100'}`} />
      ))}
    </div>
  )
}

const VALUES = [
  ['Care about craft', 'Small details add up. We polish the work until it feels obvious, then we polish it once more.'],
  ['Write it down first', 'Clear writing makes clear thinking. Decisions live in docs so anyone can catch up later.'],
  ['Own the whole problem', 'Everyone ships end to end, from the first sketch to the support reply after launch.'],
  ['Stay kind and direct', 'Honest feedback, given with care, is how we all get better at what we do each week.'],
]

export function Values() {
  return (
    <Section as="section">
      <SectionHead
        lead="What we value"
        cont="A handful of habits shape how we work together, how we make decisions and how we treat the people who rely on what we build every day."
        padClass="pb-[60px] pt-[100px] lg:pb-16 lg:pt-[120px] xl:pb-[99px] xl:pt-40"
      />
      <div className="relative">
        <div aria-hidden="true" className="absolute inset-x-0 -top-5 grid h-[150px] grid-cols-12 max-lg:hidden">
          <div className="col-[2/-2] flex justify-between">
            <DashedV />
            <DashedV />
            <DashedV />
          </div>
        </div>
        <div className="relative grid grid-cols-12">
          <Hatch className="absolute inset-0 size-full" />
          <CellGrid className="relative col-[2/-2] grid-cols-1 lg:grid-cols-2">
            {VALUES.map(([h, p], i) => (
              <div key={h} className="grid h-fit grid-cols-12 items-center bg-white-100 md:h-[208px] md:grid-cols-[140.6px_1fr]">
                <div className="relative col-[2/6] hidden aspect-square size-full overflow-hidden md:col-[1/2] md:flex">
                  <PixelArt i={i} />
                </div>
                <div className="col-[2/-2] flex flex-col gap-y-1.5 py-8 md:col-[2/3] md:grid md:grid-cols-12 md:gap-y-2 md:py-0">
                  <h3 className="text-base font-semibold text-black-100 md:col-[2/-2] md:text-lg lg:text-base xl:text-lg">{h}</h3>
                  <p className="text-pretty text-sm text-black-600 md:col-[2/-2] md:text-base lg:text-sm xl:text-base">{p}</p>
                </div>
              </div>
            ))}
          </CellGrid>
        </div>
        <GuideRow lines={3} />
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* T2-c.7 NewsletterBand (#fafafb, 428) and T2-c.8 KeepUpToDate (612)                             */
/* ------------------------------------------------------------------ */
export function NewsletterBand() {
  const band = (
    <div className="relative grid grid-cols-12 overflow-hidden border-b border-solid border-white-500 max-lg:hidden">
      <div className="col-[8/-2] flex h-8 justify-between">
        <span className="h-full w-px bg-white-500" />
        <span className="h-full w-px bg-white-500" />
      </div>
    </div>
  )
  return (
    <section className="w-full bg-white-200">
      <div className="container">
        <div className="flex flex-col border-x border-solid border-white-500">
          {band}
          <div className="grid grid-cols-12">
            <div className="col-[2/-2] grid grid-cols-6 content-center gap-y-7 py-24 lg:col-[2/8]">
              <div className="col-[1/-1] max-w-[20em] text-head-sm-md lg:text-head-sm">
                <h2 className="inline text-pretty font-semibold text-black-100">Hear when roles open up.</h2>{' '}
                <p className="inline text-pretty font-medium text-black-800">One short note a month, with new roles and team news.</p>
              </div>
              <div className="col-[1/-1]">
                <SubscribeForm placeholder="Your email address" buttonLabel="Subscribe" className="min-h-16 w-full max-w-sm" />
              </div>
            </div>
            <div className="relative col-[2/-2] border-x border-solid border-white-500 max-lg:mb-10 lg:col-[8/-2]">
              <div className="relative grid grid-cols-5 grid-rows-[repeat(11,24px)] gap-px bg-white-400 md:grid-cols-7 lg:grid-cols-5 lg:grid-rows-[repeat(11,32px)]">
                {Array.from({ length: 77 }, (_, i) => (
                  <div key={i} className={`h-6 w-full bg-white-200 lg:h-8 ${i >= 55 ? 'md:max-lg:block hidden' : ''}`} />
                ))}
                <svg aria-hidden="true" viewBox="0 0 230 181" className="absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2" fill="none">
                  <rect x="20" y="22" width="190" height="137" rx="14" className="fill-white-100 stroke-white-700" />
                  <path d="m22 30 93 70 93-70" className="stroke-white-800" strokeWidth="2" />
                  <circle cx="186" cy="38" r="16" className="fill-blue-500" />
                  <path d="M180 38h12M186 32v12" className="stroke-white-100" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="col-[-2/-1] grid grid-rows-[repeat(11,32px)] gap-px bg-white-400 max-lg:hidden">
              {Array.from({ length: 11 }, (_, i) => (
                <div key={i} className="bg-white-200" />
              ))}
            </div>
          </div>
          {band}
        </div>
      </div>
    </section>
  )
}

export function KeepUpToDate() {
  const cards = [
    { icon: 'users', title: 'Network', desc: 'Follow the team for news, launches and new roles.' },
    { icon: 'at', title: 'Updates', desc: 'Short posts from the people building the product.' },
    { icon: 'note', title: 'Journal', desc: 'Long reads on how we design, build and ship.' },
    { icon: 'inbox', title: 'Inbox', desc: 'Get role alerts sent straight to your inbox.' },
  ]
  return (
    <Section as="section">
      <header className="grid grid-cols-12 justify-items-start pb-[60px] pt-[100px] lg:pb-16 lg:pt-[120px] xl:pb-[60px] xl:pt-40">
        <div className="col-[2/-2]">
          <h2 className="text-pretty text-head-sm-md text-black-100 lg:text-head-sm">Stay in the loop</h2>
          <p className="mt-5 text-balance text-lg text-black-300 lg:text-xl">Follow along for launches, stories and new roles.</p>
        </div>
      </header>
      <div className="grid grid-cols-12 pb-[100px] lg:pb-[120px] xl:pb-40">
        <ResourceCards cards={cards} gridClass="md:grid-cols-2 xl:grid-cols-4" className="col-[2/-2]" />
      </div>
    </Section>
  )
}
