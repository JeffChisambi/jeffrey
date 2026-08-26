import { about, profile } from '../../data/content.js'
import SectionHead from './SectionHead.jsx'
import {
  ScrollReveal,
  AnimatedContent,
  Parallax,
  GlareHover,
  DecryptedText,
} from '../reactbits/index.js'

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden border-b border-ink/10 py-[clamp(64px,9vw,140px)]">
      <div className="shell">
        <div className="grid gap-[clamp(32px,5vw,80px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <div>
            <SectionHead
              eyebrow={about.eyebrow}
              lines={about.headline}
              size="clamp(30px, 4.6vw, 66px)"
              accentLast
              className="mb-[clamp(24px,3vw,44px)]"
            />

            <div className="max-w-[58ch] space-y-5">
              {about.paragraphs.map((p, i) => (
                <ScrollReveal key={i} className="text-[15px] leading-[1.7] text-ink/75">
                  {p}
                </ScrollReveal>
              ))}
            </div>

            <div className="mt-[clamp(28px,3.4vw,44px)] grid gap-8 sm:grid-cols-2">
              <AnimatedContent delay={0.1}>
                <div className="font-mono text-[10px] uppercase tracking-label text-ink/45">Based</div>
                <div className="mt-2 display" style={{ fontSize: '20px' }}>
                  <DecryptedText text={about.based} speed={30} />
                </div>
              </AnimatedContent>

              <AnimatedContent delay={0.18}>
                <div className="font-mono text-[10px] uppercase tracking-label text-ink/45">Links</div>
                <div className="mt-2 flex flex-col items-start gap-1.5">
                  {about.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="open"
                      className="group relative display text-[20px] transition-colors duration-300 hover:text-accent"
                    >
                      {l.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
                    </a>
                  ))}
                </div>
              </AnimatedContent>
            </div>
          </div>

          {/* Capability grid */}
          <Parallax speed={40}>
            <div className="font-mono text-[10px] uppercase tracking-label text-ink/45">
              Core capabilities
            </div>
            <div className="mt-4 grid grid-cols-1 gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2">
              {about.capabilities.map((c, i) => (
                <AnimatedContent key={c} delay={i * 0.06} distance={26}>
                  <GlareHover className="h-full bg-cream" glareColor="#C4472B" glareOpacity={0.2}>
                    <div className="group flex h-full items-start gap-3 px-5 py-6">
                      <span className="mt-[6px] block h-[6px] w-[6px] flex-none rounded-full bg-accent transition-transform duration-500 group-hover:scale-150" />
                      <span className="text-[13.5px] leading-[1.45] text-ink/80">{c}</span>
                    </div>
                  </GlareHover>
                </AnimatedContent>
              ))}
            </div>

            <AnimatedContent delay={0.3} className="mt-6">
              <a
                href={`mailto:${profile.email}`}
                data-cursor="email"
                className="group flex items-center justify-between rounded-[3px] bg-ink px-5 py-5 text-cream transition-colors duration-500 hover:bg-accent"
              >
                <span className="font-mono text-[11px] uppercase tracking-label">{profile.email}</span>
                <span className="text-[16px] transition-transform duration-500 group-hover:translate-x-1">→</span>
              </a>
            </AnimatedContent>
          </Parallax>
        </div>
      </div>
    </section>
  )
}
