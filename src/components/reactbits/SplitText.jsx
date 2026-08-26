import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// A trailing normal space inside an inline-block collapses at the line-box
// edge, which would run every token together. Use a non-breaking space.
const NBSP = String.fromCharCode(160)

/**
 * SplitText — ReactBits
 * Splits text into chars / words and staggers them into view.
 */
export default function SplitText({
  text = '',
  className = '',
  delay = 32,
  duration = 0.85,
  splitType = 'chars',
  from = { opacity: 0, y: 60, rotateX: -70 },
  to = { opacity: 1, y: 0, rotateX: 0 },
  threshold = 0.25,
  once = true,
  tag: Tag = 'span',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount: threshold })

  const tokens = useMemo(() => {
    if (splitType === 'words') {
      return text.split(' ').map((w) => ({ value: w, space: true }))
    }
    return text.split('').map((c) => ({ value: c === ' ' ? NBSP : c, space: false }))
  }, [text, splitType])

  const MotionTag = motion[Tag] || motion.span

  return (
    <MotionTag
      ref={ref}
      className={`inline-block ${className}`}
      style={{ perspective: 800 }}
      aria-label={text}
    >
      {tokens.map((t, i) => (
        <motion.span
          key={`${t.value}-${i}`}
          aria-hidden="true"
          className="inline-block will-change-transform"
          initial={from}
          animate={inView ? to : from}
          transition={{
            duration,
            delay: (i * delay) / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {t.space && i < tokens.length - 1 ? t.value + NBSP : t.value}
        </motion.span>
      ))}
    </MotionTag>
  )
}

/**
 * SplitLines — line-by-line mask reveal. Ideal for large display headlines.
 */
export function SplitLines({ lines = [], className = '', delay = 0.09, duration = 1.05 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <span ref={ref} className={`block ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block will-change-transform"
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{ duration, delay: i * delay, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/**
 * TypedText — small terminal-style typing effect used for mono labels.
 */
export function TypedText({ text = '', speed = 38, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [out, setOut] = useState('')

  useEffect(() => {
    if (!inView) return undefined
    let i = 0
    const id = setInterval(() => {
      i += 1
      setOut(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [inView, text, speed])

  return (
    <span ref={ref} className={className} aria-label={text}>
      {out}
      <span className="ml-[2px] inline-block h-[0.9em] w-[1px] animate-pulse bg-current align-middle" />
    </span>
  )
}
