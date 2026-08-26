import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Magnet — ReactBits
 * Element is attracted to the cursor within `padding` px of its bounds.
 */
export default function Magnet({
  children,
  padding = 90,
  strength = 0.42,
  className = '',
  as: Tag = 'div',
  ...rest
}) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.35 })

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const withinX = Math.abs(dx) < r.width / 2 + padding
    const withinY = Math.abs(dy) < r.height / 2 + padding
    if (withinX && withinY) {
      x.set(dx * strength)
      y.set(dy * strength)
    } else {
      x.set(0)
      y.set(0)
    }
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const MotionTag = motion[Tag] || motion.div

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

/**
 * MagnetLines — a grid of small bars that all point at the cursor.
 */
export function MagnetLines({ rows = 7, cols = 7, className = '' }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    el.querySelectorAll('span[data-bar]').forEach((bar) => {
      const r = bar.getBoundingClientRect()
      const angle =
        (Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) *
          180) /
        Math.PI
      bar.style.transform = `rotate(${angle}deg)`
    })
  }

  const reset = () => {
    const el = ref.current
    if (!el) return
    el.querySelectorAll('span[data-bar]').forEach((bar) => {
      bar.style.transform = 'rotate(-25deg)'
    })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
      aria-hidden="true"
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <span key={i} className="flex items-center justify-center">
          <span
            data-bar
            className="block h-[2px] w-[56%] origin-center rounded-full bg-current transition-transform duration-500 ease-out"
            style={{ transform: 'rotate(-25deg)' }}
          />
        </span>
      ))}
    </div>
  )
}
