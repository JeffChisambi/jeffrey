import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

/**
 * AnimatedContent — ReactBits
 * Generic directional reveal with distance / scale / blur controls.
 */
export default function AnimatedContent({
  children,
  distance = 70,
  direction = 'vertical',
  reverse = false,
  duration = 0.9,
  delay = 0,
  scale = 1,
  blur = 0,
  threshold = 0.15,
  className = '',
  once = true,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount: threshold })

  const axis = direction === 'horizontal' ? 'x' : 'y'
  const offset = reverse ? -distance : distance

  const hidden = {
    opacity: 0,
    [axis]: offset,
    scale,
    ...(blur ? { filter: `blur(${blur}px)` } : {}),
  }
  const shown = {
    opacity: 1,
    [axis]: 0,
    scale: 1,
    ...(blur ? { filter: 'blur(0px)' } : {}),
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={inView ? shown : hidden}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/**
 * FadeContent — ReactBits. Opacity + blur only, no displacement.
 */
export function FadeContent({ children, duration = 1, delay = 0, blur = true, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: blur ? 'blur(8px)' : 'none' }}
      animate={inView ? { opacity: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Parallax — vertical drift bound to scroll progress.
 */
export function Parallax({ children, speed = 60, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed])
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
