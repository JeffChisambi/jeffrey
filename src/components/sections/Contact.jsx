import { contact, profile, footerTag, nav } from '../../data/content.js'
import {
  SplitLines,
  Magnet,
  Aurora,
  Noise,
  DotGrid,
  ShinyText,
  AnimatedContent,
} from '../reactbits/index.js'

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink text-cream">
      <Aurora colorStops={['#C4472B', '#E0714F', '#C4472B']} intensity={0.22} />
      <div className="pointer-events-none absolute inset-0 opacity-45">
        <DotGrid
          gap={40}
          baseColor="rgba(243,240,234,0.14)"
          activeColor="#C4472B"
          proximity={180}
          shockRadius={260}
        />
      </div>
      <Noise opacity={0.06} blend="screen" />

      <div className="shell relative z-10 py-[clamp(64px,10vw,160px)]">
        <div className="mb-4 flex items-center gap-3">
          <span className="block h-px w-[42px] bg-accent" />
          <span className="font-mono text-[10px] uppercase tracking-label text-cream/55">
            {contact.eyebrow}
          </span>
        </div>

        <h2 className="display mb-[clamp(24px,3vw,44px)]" style={{ fontSize: 'clamp(48px, 7vw, 116px)', lineHeight: 0.88 }}>
          <SplitLines lines={[contact.headline[0]]} />
          <span className="block text-accent">
            <SplitLines lines={[contact.headline[1]]} delay={0.12} />
          </span>
        </h2>

        <div className="grid gap-[clamp(28px,4vw,72px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <p className="mb-8 max-w-[52ch] text-pretty text-[15px] leading-[1.7] text-cream/70">
              {contact.body}
            </p>

            <AnimatedContent distance={30}>
              <Magnet padding={80} strength={0.3} className="inline-block">
                <a
                  href={`mailto:${profile.email}`}
                  data-cursor="write to me"
                  className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-cream px-7 py-4 text-ink"
                >
                  <span className="absolute inset-0 translate-y-full bg-accent transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0" />
                  <span className="relative z-10 font-mono text-[11px] uppercase tracking-label transition-colors duration-500 group-hover:text-cream">
                    {profile.email}
                  </span>
                  <span className="relative z-10 text-[16px] transition-all duration-500 group-hover:translate-x-1 group-hover:text-cream">
                    →
                  </span>
                </a>
              </Magnet>
            </AnimatedContent>

            <div className="mt-6 font-mono text-[10.5px] uppercase tracking-label text-cream/45">
              Or call {profile.phone}
            </div>
          </div>

          <AnimatedContent distance={40} delay={0.12}>
            <div className="rounded-[3px] border border-cream/15 bg-cream/[0.04] p-[clamp(20px,2.6vw,34px)]">
              <div className="font-mono text-[9.5px] uppercase tracking-label text-accent">
                Before you write
              </div>
              <p className="mt-4 display text-[clamp(20px,2.2vw,30px)] leading-[1.15]">
                <ShinyText
                  text={contact.question}
                  base="rgba(243,240,234,0.45)"
                  shine="#F3F0EA"
                  speed={5}
                />
              </p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="font-mono text-[9.5px] uppercase tracking-label text-cream/45">
                    Based
                  </div>
                  <div className="mt-2 text-[13.5px] text-cream/80">
                    {profile.location}
                    <br />
                    {profile.country}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[9.5px] uppercase tracking-label text-cream/45">
                    Response time
                  </div>
                  <div className="mt-2 text-[13.5px] text-cream/80">Within two working days</div>
                </div>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-cream/15">
        <div className="shell flex flex-wrap items-end justify-between gap-8 py-[clamp(28px,4vw,56px)]">
          <div>
            <div className="display text-[clamp(30px,5vw,72px)] leading-[0.9]">
              {profile.name}
            </div>
            <div className="mt-3 font-mono text-[10px] uppercase tracking-label text-cream/45">
              {profile.role} · {profile.title}
            </div>
          </div>

          <div className="flex flex-wrap items-end gap-x-10 gap-y-6">
            <div>
              <div className="font-mono text-[9.5px] uppercase tracking-label text-cream/40">
                Sections
              </div>
              <ul className="mt-3 grid gap-1.5">
                {nav.map((n) => (
                  <li key={n.href}>
                    <a
                      href={n.href}
                      className="font-mono text-[10.5px] uppercase tracking-label text-cream/70 transition-colors hover:text-accent"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#contact"
                    className="font-mono text-[10.5px] uppercase tracking-label text-cream/70 transition-colors hover:text-accent"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="font-mono text-[9.5px] uppercase tracking-label text-cream/40">
                Elsewhere
              </div>
              <ul className="mt-3 grid gap-1.5">
                <li>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[10.5px] uppercase tracking-label text-cream/70 transition-colors hover:text-accent"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={profile.thelmer}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[10.5px] uppercase tracking-label text-cream/70 transition-colors hover:text-accent"
                  >
                    Thelmer
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="shell flex flex-wrap items-center justify-between gap-4 border-t border-cream/10 py-5 font-mono text-[9.5px] uppercase tracking-label text-cream/40">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span className="text-accent">{footerTag}</span>
        </div>
      </footer>
    </section>
  )
}
