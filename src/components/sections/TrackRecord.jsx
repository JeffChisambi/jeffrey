import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { trackRecord } from '../../data/content.js'
import SectionHead from './SectionHead.jsx'
import { AnimatedContent, MagnetLines } from '../reactbits/index.js'

export default function TrackRecord() {
  const [open, setOpen] = useState(0)

  return (
    <section
      id="track-record"
      className="relative border-b border-cream/10 bg-ink py-[clamp(64px,9vw,140px)] text-cream"
    >
      <div className="shell">
        <SectionHead
          eyebrow={trackRecord.eyebrow}
          lines={trackRecord.headline}
          size="clamp(30px, 5.4vw, 78px)"
          accentLast
          dark
          className="mb-[clamp(36px,5vw,72px)]"
        />

        <div className="border-t border-cream/15">
          {trackRecord.roles.map((r, i) => {
            const isOpen = open === i
            return (
              <AnimatedContent key={r.org} delay={i * 0.07} distance={40}>
                <div className="border-b border-cream/15">
                  <button
                    type="button"
                    data-cursor={isOpen ? 'close' : 'expand'}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group grid w-full items-center gap-x-6 gap-y-2 py-[clamp(20px,2.6vw,34px)] text-left md:grid-cols-[minmax(0,220px)_minmax(0,1fr)_40px]"
                  >
                    <span className="font-mono text-[9.5px] uppercase tracking-label text-cream/50">
                      {r.period}
                    </span>
                    <span
                      className="display transition-all duration-500 group-hover:translate-x-2 group-hover:text-accent"
                      style={{ fontSize: 'clamp(26px,3.4vw,46px)', lineHeight: 1 }}
                    >
                      {r.org}
                    </span>
                    <span
                      className={`ml-auto flex h-[30px] w-[30px] items-center justify-center rounded-full border border-cream/30 text-[15px] transition-all duration-500 ${
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
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-[clamp(20px,3vw,44px)] pb-[clamp(24px,3vw,42px)] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
                          <div className="grid gap-6 sm:grid-cols-3">
                            {[
                              { label: 'Role', body: r.role },
                              { label: 'What I did', body: r.did },
                              { label: 'Result', body: r.result },
                            ].map((f, k) => (
                              <motion.div
                                key={f.label}
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.12 + k * 0.08, duration: 0.5 }}
                              >
                                <div className="font-mono text-[9.5px] uppercase tracking-label text-accent">
                                  {f.label}
                                </div>
                                <p className="mt-2 text-pretty text-[13.5px] leading-[1.65] text-cream/70">
                                  {f.body}
                                </p>
                              </motion.div>
                            ))}
                          </div>

                          <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.18, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-[3px] bg-cream/[0.06]"
                          >
                            <MagnetLines rows={6} cols={8} className="absolute inset-0 p-5 text-cream/20" />
                            <span className="relative font-mono text-[9.5px] uppercase tracking-label text-cream/45">
                              {r.caption}
                            </span>
                          </motion.div>
                        </div>
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
