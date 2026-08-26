import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/**
 * CountUp — ReactBits
 * Eases a number from `from` to `to` when it scrolls into view.
 */
export default function CountUp({
  to = 0,
  from = 0,
  duration = 1.9,
  className = '',
  prefix = '',
  suffix = '',
  separator = '',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [value, setValue] = useState(from)

  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - p, 4)
      setValue(Math.round(from + (to - from) * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, from, to, duration])

  const formatted = separator
    ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    : value.toString()

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
