import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\|<>[]{}#$%&*+='

/**
 * DecryptedText — ReactBits
 * Scrambles then resolves each character. Great on mono micro-labels.
 */
export default function DecryptedText({
  text = '',
  className = '',
  speed = 34,
  maxIterations = 12,
  animateOn = 'view',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [display, setDisplay] = useState(text)
  const [hovered, setHovered] = useState(false)

  const active = animateOn === 'hover' ? hovered : inView

  useEffect(() => {
    if (!active || !text.length) return undefined
    let frame = 0
    const id = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' '
            if (i < frame / (maxIterations / text.length || 1)) return ch
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )
      frame += 1
      if (frame > text.length * (maxIterations / text.length || 1) + text.length) {
        setDisplay(text)
        clearInterval(id)
      }
    }, speed)
    return () => clearInterval(id)
  }, [active, text, speed, maxIterations])

  return (
    <span
      ref={ref}
      className={className}
      aria-label={text}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {display}
    </span>
  )
}
