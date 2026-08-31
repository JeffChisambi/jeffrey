import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { process } from '../../data/content.js'
import SectionHead from './SectionHead.jsx'
import { AnimatedContent, Magnet } from '../reactbits/index.js'

export default function Process() {
  const listRef = useRef(null)
  const inView = useInView(listRef, { once: true, amount: 0.12 })

  return (
    <section id="process" className="relative border-b border-ink/10 py-[clamp(64px,9vw,140px)]">
      <div className="shell">
        {/* Centred: the steps below run the full width, so a left-set headline
            in a 16ch column left most of the row empty. */}
        <SectionHead
          eyebrow={process.eyebrow}
          lines={process.headline}
          accentLast
          center
          size="clamp(32px, 5vw, 68px)"
          className="mx-auto mb-[clamp(36px,5vw,72px)] max-w-[22ch]"
        />

        <div ref={listRef} className="relative border-b border-ink/10">
          {/* Progress rail */}
          <motion.span
            className="absolute left-[27px] top-0 hidden w-px origin-top bg-accent/35 md:block"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: '100%' }}
          />

          {process.steps.map((step, i) => (
            <AnimatedContent key={step.n} delay={i * 0.08} distance={44} blur={5}>
              <div className="group relative overflow-hidden border-t border-ink/10">
                <div className="grid items-start gap-x-[clamp(16px,3vw,44px)] gap-y-3 py-[clamp(20px,2.6vw,34px)] md:grid-cols-[56px_minmax(0,1fr)_minmax(0,1.25fr)]">
                  <div className="font-mono text-[10px] uppercase tracking-label text-accent">
                    <span className="relative z-10 inline-flex h-[26px] w-[26px] items-center justify-center rounded-full border border-accent/40 bg-cream transition-colors duration-500 group-hover:bg-accent group-hover:text-cream">
                      {step.n}
                    </span>
                  </div>
                  <div
                    className="display transition-transform duration-500 group-hover:translate-x-2"
                    style={{ fontSize: 'clamp(15px,1.5vw,21px)', lineHeight: 1.1, letterSpacing: '0.01em' }}
                  >
                    {step.title}
                  </div>
                  <p className="max-w-[56ch] text-pretty text-[13.5px] leading-[1.6] text-ink/[0.68]">
                    {step.body}
                  </p>
                </div>
              </div>
            </AnimatedContent>
          ))}
        </div>

        <AnimatedContent delay={0.2} className="mt-[clamp(28px,4vw,52px)]">
          <div className="flex flex-wrap items-center justify-between gap-5 rounded-[3px] border border-ink/12 bg-ink/[0.03] px-[clamp(18px,2.4vw,32px)] py-[clamp(18px,2.4vw,28px)]">
            <p className="max-w-[46ch] text-pretty text-[13.5px] leading-[1.6] text-ink/70">
              {process.footnote}
            </p>
            <Magnet padding={50} strength={0.3}>
              <a
                href={process.footnoteCta.href}
                data-cursor="book"
                className="group inline-flex items-center gap-3 rounded-full border border-ink/25 px-5 py-3 font-mono text-[10.5px] uppercase tracking-label transition-colors duration-300 hover:border-transparent hover:bg-ink hover:text-cream"
              >
                {process.footnoteCta.label}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </Magnet>
          </div>
        </AnimatedContent>
      </div>
    </section>
  )
}
