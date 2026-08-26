import { credentials } from '../../data/content.js'
import SectionHead from './SectionHead.jsx'
import { AnimatedContent, GlareHover, ShinyText } from '../reactbits/index.js'

export default function Credentials() {
  return (
    <section className="relative border-b border-ink/10 py-[clamp(56px,7vw,110px)]">
      <div className="shell grid gap-[clamp(28px,4vw,64px)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <SectionHead
          eyebrow={credentials.eyebrow}
          lines={['Formal training,', 'real constraints']}
          size="clamp(26px, 3.4vw, 46px)"
          accentLast
        />

        <div>
          <p className="mb-8 max-w-[54ch] text-pretty text-[14px] leading-[1.7] text-ink/70">
            {credentials.intro}
          </p>

          <div className="grid gap-px border border-ink/12 bg-ink/12 md:grid-cols-2">
            <AnimatedContent distance={30}>
              <GlareHover className="h-full bg-cream" glareColor="#C4472B" glareOpacity={0.18}>
                <div className="p-6">
                  <div className="font-mono text-[10px] uppercase tracking-label text-ink/45">
                    Education
                  </div>
                  <div className="mt-3 display text-[20px] leading-[1.15]">
                    {credentials.degree.title}
                  </div>
                  <div className="mt-2 text-[13.5px] text-ink/65">{credentials.degree.school}</div>
                </div>
              </GlareHover>
            </AnimatedContent>

            <AnimatedContent distance={30} delay={0.1}>
              <GlareHover className="h-full bg-cream" glareColor="#C4472B" glareOpacity={0.18}>
                <div className="p-6">
                  <div className="font-mono text-[10px] uppercase tracking-label text-ink/45">
                    {credentials.skills.label}
                  </div>
                  <div className="mt-3 display text-[20px] leading-[1.15]">
                    <ShinyText text={credentials.skills.title} speed={5} />
                  </div>
                  <div className="mt-2 text-[13.5px] text-ink/65">{credentials.skills.body}</div>
                </div>
              </GlareHover>
            </AnimatedContent>
          </div>
        </div>
      </div>
    </section>
  )
}
