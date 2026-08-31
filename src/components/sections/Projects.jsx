import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { projects } from '../../data/content.js'
import { projectLogos } from '../../data/projectLogos.js'
import { projectGalleries } from '../../data/projectGalleries.js'
import pineApp from '../../assets/pine-app.webp'
import kwathuChatApp from '../../assets/kwathuchat-app.webp'
import ctechSite from '../../assets/ctech-site.webp'
// Also on disk: ophunzila-home.webp (landing page) and ophunzila-dark.webp
// (the same dashboard in dark mode) — swap either in by changing this import.
import ophunzilaApp from '../../assets/ophunzila-app.webp'
import chakudyaSite from '../../assets/chakudya-site.webp'
import kwathuHotelSite from '../../assets/kwathu-hotel-site.webp'
import kwathuSite from '../../assets/kwathu-site.webp'
import thelmerSite from '../../assets/thelmer-site.webp'
import SectionHead from './SectionHead.jsx'
import {
  AnimatedContent,
  TiltedCard,
  Magnet,
  MagnetLines,
  LogoLoop,
  AccordionGallery,
} from '../reactbits/index.js'

/** Real screenshots, keyed by `image` on the project. */
const images = {
  pine: pineApp,
  kwathuchat: kwathuChatApp,
  ctech: ctechSite,
  ophunzila: ophunzilaApp,
  chakudya: chakudyaSite,
  kwathuhotel: kwathuHotelSite,
  kwathusite: kwathuSite,
  thelmer: thelmerSite,
}

/**
 * Module scope, not built during render — LogoLoop keys its measurement effect
 * off this array, and a fresh one each render would re-measure every frame.
 */
/** Anything flagged `hidden` stays in the data but never renders. */
const visibleProjects = projects.items.filter((p) => !p.hidden)

const tickerLogos = visibleProjects
  // Not every project has a wordmark — client work travels under the client's
  // brand, which isn't mine to put on a belt.
  .filter((p) => projectLogos[p.id])
  .map((p) => ({ key: p.id, alt: p.name, ...projectLogos[p.id] }))

export default function Projects() {
  return (
    <section id="projects" className="relative border-b border-ink/10 py-[clamp(64px,9vw,140px)]">
      <div className="shell">
        <div className="mb-[clamp(32px,4.5vw,68px)] flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow={projects.eyebrow}
            lines={projects.headline}
            size="clamp(30px, 5.4vw, 78px)"
            accentLast
          />
          <p className="max-w-[34ch] text-pretty font-mono text-[11px] uppercase leading-[1.7] tracking-label text-ink/50">
            {projects.kicker}
          </p>
        </div>
      </div>

      {/* Wordmark belt on a full-bleed black band. Constant speed, one
          direction, measured wrap — it should read as a physical loop turning
          past the viewport, not as a strip that resets. */}
      <div className="mb-[clamp(28px,4vw,56px)] bg-ink py-[clamp(22px,3vw,34px)]">
        <LogoLoop
          logos={tickerLogos}
          speed={42}
          gap="clamp(44px,6vw,88px)"
          logoHeight="clamp(24px,3vw,40px)"
          hoverSpeed={0.12}
          ariaLabel="Projects"
          itemClassName="opacity-75 transition-opacity duration-500 hover:opacity-100"
        />
      </div>

      <div className="shell space-y-[clamp(18px,2.4vw,32px)]">
        {/* The card number is positional, not the `index` in the data — hiding
            a project would otherwise leave gaps like 01, 04, 06 on the page. */}
        {visibleProjects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])
  const dark = project.theme === 'ink'
  const wide = project.imageLayout === 'wide'
  const gallery = project.gallery ? projectGalleries[project.gallery] : null

  return (
    <AnimatedContent distance={80} blur={6} delay={0.05} threshold={0.1}>
      <motion.article
        ref={ref}
        data-cursor={project.name}
        className={`group relative overflow-hidden rounded-[4px] ${
          dark ? 'bg-ink text-cream' : 'border border-ink/12 bg-cream text-ink'
        }`}
      >
        <div className="h-full">
          <div
            className={`grid gap-[clamp(20px,3vw,52px)] p-[clamp(20px,3vw,52px)] ${
              // A gallery gets the full card width — three landscape screenshots
              // squeezed into the half-width visual column would be unreadable.
              gallery ? '' : `lg:grid-cols-2 ${index % 2 === 1 ? 'lg:[direction:rtl]' : ''}`
            }`}
          >
            {/* Copy column */}
            <div className="[direction:ltr]">
              <div className="mb-5 flex items-center gap-4">
                <span
                  className={`display text-[clamp(30px,3.4vw,52px)] leading-none ${
                    dark ? 'text-cream/25' : 'text-ink/15'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className={`font-mono text-[9.5px] uppercase tracking-label ${
                    dark ? 'text-cream/55' : 'text-ink/50'
                  }`}
                >
                  {project.kind}
                </span>
              </div>

              <h3 className="display mb-4" style={{ fontSize: 'clamp(28px,3.8vw,56px)', lineHeight: 0.94 }}>
                <span className="relative inline-block">
                  {project.name}
                  <span className="absolute -bottom-1 left-0 h-[3px] w-0 bg-accent transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:w-full" />
                </span>
              </h3>

              <p
                className={`mb-6 max-w-[52ch] text-pretty text-[13.5px] leading-[1.65] ${
                  dark ? 'text-cream/70' : 'text-ink/70'
                }`}
              >
                {project.body}
              </p>

              <div className="mb-6 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className={`whitespace-nowrap rounded-full border px-3 py-[7px] font-mono text-[9.5px] uppercase tracking-label transition-colors duration-300 ${
                      dark
                        ? 'border-cream/30 text-cream/75 group-hover:border-accent'
                        : 'border-ink/20 text-ink/65 group-hover:border-accent'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {project.metrics && (
                <div className="mb-6 grid grid-cols-2 gap-6">
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="display text-[28px] leading-none text-accent">{m.value}</div>
                      <div
                        className={`mt-1.5 font-mono text-[9.5px] uppercase tracking-label ${
                          dark ? 'text-cream/55' : 'text-ink/55'
                        }`}
                      >
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {project.facts && (
                <div className="mb-6 grid gap-4 sm:grid-cols-3">
                  {project.facts.map((f) => (
                    <div key={f.label}>
                      <div
                        className={`font-mono text-[9.5px] uppercase tracking-label ${
                          dark ? 'text-cream/50' : 'text-ink/50'
                        }`}
                      >
                        {f.label}
                      </div>
                      <div className="mt-2 text-[13.5px]">{f.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {project.note && (
                <div
                  className={`mb-6 border-l-2 border-accent pl-4 ${dark ? 'text-cream/70' : 'text-ink/70'}`}
                >
                  <div className="font-mono text-[9.5px] uppercase tracking-label opacity-60">
                    {project.note.label}
                  </div>
                  <p className="mt-2 max-w-[48ch] text-pretty text-[13.5px] leading-[1.6]">
                    {project.note.body}
                  </p>
                </div>
              )}

              {project.link && (
                <Magnet padding={44} strength={0.28} className="inline-block">
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="visit"
                    className={`inline-flex items-center gap-3 rounded-full px-5 py-3 font-mono text-[10.5px] uppercase tracking-label transition-colors duration-500 ${
                      dark
                        ? 'bg-cream text-ink hover:bg-accent hover:text-cream'
                        : 'bg-ink text-cream hover:bg-accent'
                    }`}
                  >
                    {project.link.label}
                    <span>→</span>
                  </a>
                </Magnet>
              )}

              {/* Stands in for the link when there is nothing to visit yet. */}
              {project.status && (
                <span
                  className={`inline-flex items-center gap-2.5 rounded-full border px-5 py-3 font-mono text-[10.5px] uppercase tracking-label ${
                    dark ? 'border-cream/25 text-cream/60' : 'border-ink/20 text-ink/55'
                  }`}
                >
                  <span className="inline-block h-[6px] w-[6px] animate-pulse rounded-full bg-accent" />
                  {project.status}
                </span>
              )}
            </div>

            {/* Visual column */}
            {gallery ? (
              <AccordionGallery
                items={gallery}
                height="clamp(260px,32vw,440px)"
                defaultIndex={1}
                gap={8}
                radius={3}
                expandRatio={0.58}
                tilt={7}
                panelColor={dark ? '#0F0D0C' : '#131110'}
              />
            ) : (
            <motion.div style={{ y }} className="[direction:ltr]">
              <TiltedCard caption={project.caption} rotateAmplitude={7}>
                <div
                  className={`relative flex w-full items-center justify-center overflow-hidden rounded-[3px] ${
                    // Device shots are portrait, so they get a taller frame — a
                    // 4:3 well would crop them to a sliver. Web screenshots are
                    // the opposite problem and want a landscape one.
                    wide ? 'aspect-[16/11]' : project.image ? 'aspect-[4/5]' : 'aspect-[4/3]'
                  } ${dark ? 'bg-cream/[0.06]' : 'bg-ink'}`}
                >
                  {project.image ? (
                    wide ? (
                      /* Default is a page cropped at the fold, the way a real
                         browser shows it. `imageFit: 'contain'` opts out and
                         shows the whole capture, matted on the panel. */
                      <img
                        src={images[project.image]}
                        alt={project.imageAlt}
                        loading="lazy"
                        decoding="async"
                        className={`h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03] ${
                          project.imageFit === 'contain'
                            ? 'object-contain p-[3%]'
                            : 'object-cover object-top'
                        }`}
                      />
                    ) : (
                      /* `contain`, not `cover` — the asset is a cut-out device
                         on transparency, so it should sit on the panel whole. */
                      <img
                        src={images[project.image]}
                        alt={project.imageAlt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain p-[6%] drop-shadow-[0_18px_40px_rgba(0,0,0,.45)]"
                      />
                    )
                  ) : (
                    <>
                      <MagnetLines
                        rows={7}
                        cols={9}
                        className="absolute inset-0 p-6 text-cream/20"
                      />
                      {project.logo ? (
                        /* Wordmark over the field, with the caption demoted to
                           a subtitle — the mark carries the identity, so the
                           label no longer has to do that work alone. */
                        <span className="relative flex flex-col items-center gap-5 px-[10%]">
                          <img
                            src={projectLogos[project.logo].src}
                            alt={project.name}
                            width={projectLogos[project.logo].w}
                            height={projectLogos[project.logo].h}
                            loading="lazy"
                            decoding="async"
                            className="h-auto w-[min(58%,240px)] max-w-none object-contain"
                          />
                          <span className="font-mono text-[9.5px] uppercase tracking-label text-cream/40">
                            {project.caption}
                          </span>
                        </span>
                      ) : (
                        <span
                          className={`relative font-mono text-[9.5px] uppercase tracking-label ${
                            dark ? 'text-cream/45' : 'text-cream/40'
                          }`}
                        >
                          {project.caption}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </TiltedCard>
            </motion.div>
            )}
          </div>
        </div>
      </motion.article>
    </AnimatedContent>
  )
}
