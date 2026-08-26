import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { faq } from '../../data/content.js'
import SectionHead from './SectionHead.jsx'
import { AnimatedContent } from '../reactbits/index.js'

export default function Faq() {
  const [open, setOpen] = useState(null)

  return (
    <section className="relative border-b border-ink/10 py-[clamp(64px,9vw,140px)]">
      <div className="shell grid gap-[clamp(28px,4vw,72px)] lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
        <SectionHead
          eyebrow={faq.eyebrow}
          lines={faq.headline}
          size="clamp(28px, 4.4vw, 62px)"
          accentLast
          className="lg:sticky lg:top-28 lg:self-start"
        />

        <div className="border-t border-ink/12">
          {faq.items.map((item, i) => {
            const isOpen = open === i
            return (
              <AnimatedContent key={item.q} delay={i * 0.06} distance={28}>
                <div className="border-b border-ink/12">
                  <button
                    type="button"
                    data-cursor={isOpen ? 'close' : 'read'}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group grid w-full grid-cols-[24px_minmax(0,1fr)_30px] items-center gap-4 py-[clamp(16px,2vw,24px)] text-left"
                  >
                    <span className="font-mono text-[9.5px] uppercase tracking-label text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[15px] font-medium transition-transform duration-500 group-hover:translate-x-1.5">
                      {item.q}
                    </span>
                    <span
                      className={`justify-self-end flex h-[26px] w-[26px] items-center justify-center rounded-full border border-ink/30 text-[14px] transition-all duration-500 ${
                        isOpen ? 'rotate-45 border-accent bg-accent text-cream' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[56ch] pb-[22px] pl-[40px] text-pretty text-[13.5px] leading-[1.65] text-ink/70">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedContent>
            )
          })}
        </div>
      </div>
    </section>
  )
}
