import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * TiltedCard — ReactBits
 * 3D perspective tilt with a floating caption that follows the cursor.
 */
export default function TiltedCard({
  children,
  className = '',
  rotateAmplitude = 11,
  scaleOnHover = 1.03,
  caption,
}) {
  const ref = useRef(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const s = useMotionValue(1)
  const cx = useMotionValue(0)
  const cy = useMotionValue(0)

  const spring = { stiffness: 300, damping: 26, mass: 0.6 }
  const srx = useSpring(rx, spring)
  const sry = useSpring(ry, spring)
  const ss = useSpring(s, spring)
  const scx = useSpring(cx, spring)
  const scy = useSpring(cy, spring)

  const [on, setOn] = useState(false)

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    const px = e.clientX - r.left
    const py = e.clientY - r.top
    const ox = px / r.width - 0.5
    const oy = py / r.height - 0.5
    ry.set(ox * rotateAmplitude * 2)
    rx.set(-oy * rotateAmplitude * 2)
    cx.set(px + 14)
    cy.set(py + 14)
  }

  return (
    <div
      ref={ref}
      className={`relative [perspective:1100px] ${className}`}
      onMouseMove={onMove}
      onMouseEnter={() => {
        s.set(scaleOnHover)
        setOn(true)
      }}
      onMouseLeave={() => {
        rx.set(0)
        ry.set(0)
        s.set(1)
        setOn(false)
      }}
    >
      <motion.div
        className="h-full w-full [transform-style:preserve-3d]"
        style={{ rotateX: srx, rotateY: sry, scale: ss }}
      >
        {children}
      </motion.div>

      {caption ? (
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-40 hidden rounded-full bg-ink px-3 py-1.5 font-mono text-[9.5px] uppercase tracking-label text-cream md:block"
          style={{ x: scx, y: scy, opacity: on ? 1 : 0 }}
        >
          {caption}
        </motion.div>
      ) : null}
    </div>
  )
}
