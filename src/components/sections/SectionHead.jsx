import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SplitLines } from '../reactbits/index.js'

/**
 * Shared eyebrow + display headline treatment used across every section.
 */
export default function SectionHead({
  eyebrow,
  lines = [],
  size = 'clamp(36px, 4.4vw, 62px)',
  accentLast = false,
  className = '',
  dark = false,
  /** Centres the eyebrow row and the headline block. */
  center = false,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  const rendered = accentLast ? lines.slice(0, -1) : lines

  return (
    <div ref={ref} className={`${center ? 'text-center' : ''} ${className}`}>
      <div className={`mb-4 flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
        <motion.span
          className="block h-px bg-accent"
          initial={{ width: 0 }}
          animate={inView ? { width: 42 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.span
          initial={{ opacity: 0, x: -8 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={`font-mono text-[10px] uppercase tracking-label ${dark ? 'text-cream/55' : 'text-ink/50'}`}
        >
          {eyebrow}
        </motion.span>
        {/* Mirrored rule — a single left rule under a centred headline reads
            as a mistake rather than a flourish. */}
        {center && (
          <motion.span
            className="block h-px bg-accent"
            initial={{ width: 0 }}
            animate={inView ? { width: 42 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </div>

      <h2 className="display" style={{ fontSize: size, lineHeight: 0.92 }}>
        <SplitLines lines={rendered} />
        {accentLast && (
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className="block text-accent"
              initial={{ y: '110%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 1, delay: rendered.length * 0.09, ease: [0.16, 1, 0.3, 1] }}
            >
              {lines[lines.length - 1]}
            </motion.span>
          </span>
        )}
      </h2>
    </div>
  )
}
