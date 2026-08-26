import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * TargetCursor — custom arrow pointer.
 *
 * Replaces the native cursor with a drawn arrow: accent fill, cream outline so
 * it stays legible on both the cream and the ink sections. Over any
 * [data-cursor] element the arrow tilts and grows and the element's label
 * prints beside the tip.
 *
 * Disabled on touch / coarse-pointer devices.
 */
export default function TargetCursor({ accent = '#C4472B', outline = '#F3F0EA' }) {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState(null)
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [hidden, setHidden] = useState(true)

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)

  // Just enough spring to take the jitter off raw pointer coordinates.
  const arrowX = useSpring(x, { stiffness: 1400, damping: 60, mass: 0.28 })
  const arrowY = useSpring(y, { stiffness: 1400, damping: 60, mass: 0.28 })

  const lastHit = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    setEnabled(fine)
    if (fine) document.body.classList.add('has-custom-cursor')
    return () => document.body.classList.remove('has-custom-cursor')
  }, [])

  useEffect(() => {
    if (!enabled) return undefined

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHidden(false)

      const el = document.elementFromPoint(e.clientX, e.clientY)
      const hit = el?.closest?.('[data-cursor]') || null
      const interactive = el?.closest?.('a, button, summary, [role="button"]') || null

      if (hit !== lastHit.current) {
        lastHit.current = hit
        setLabel(hit ? hit.getAttribute('data-cursor') || null : null)
      }
      setHovering(Boolean(hit || interactive))
    }

    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    const onLeave = () => setHidden(true)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const scale = pressed ? 0.82 : hovering ? 1.28 : 1
  const rotate = hovering ? -14 : 0

  return (
    <>
      {/* Arrow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] origin-top-left"
        style={{ x: arrowX, y: arrowY }}
        animate={{ scale, rotate, opacity: hidden ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 420, damping: 28, mass: 0.5 }}
      >
        <svg
          width="21"
          height="30"
          viewBox="0 0 13 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block', filter: 'drop-shadow(0 2px 6px rgba(19,17,16,0.28))' }}
        >
          {/* Tip sits at 0,0 so the arrow points exactly at the pointer. */}
          <path
            d="M0.6 0.6 L0.6 17.2 L4.6 13.5 L7.2 19.2 L9.9 18.0 L7.3 12.4 L12.4 12.3 Z"
            fill={accent}
            stroke={outline}
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Label chip beside the tip */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: arrowX, y: arrowY }}
        animate={{ opacity: label && !hidden ? 1 : 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        <motion.span
          className="ml-[22px] mt-[24px] block whitespace-nowrap rounded-full px-2.5 py-[4px] font-mono text-[8.5px] uppercase tracking-label text-cream"
          style={{ background: accent }}
          animate={{ y: label ? 0 : 6 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          {label}
        </motion.span>
      </motion.div>
    </>
  )
}
