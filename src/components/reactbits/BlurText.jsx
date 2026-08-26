import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const NBSP = String.fromCharCode(160)

/**
 * BlurText — ReactBits
 * Words animate in from a blur with a directional offset.
 */
export default function BlurText({
  text = '',
  className = '',
  delay = 60,
  animateBy = 'words',
  direction = 'bottom',
  threshold = 0.2,
  as: Tag = 'p',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: threshold })
  const items = animateBy === 'words' ? text.split(' ') : text.split('')

  const offset = direction === 'top' ? -24 : 24
  const MotionTag = motion[Tag] || motion.p

  return (
    <MotionTag ref={ref} className={className} aria-label={text}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block will-change-[filter,transform,opacity]"
          initial={{ filter: 'blur(10px)', opacity: 0, y: offset }}
          animate={
            inView
              ? { filter: 'blur(0px)', opacity: 1, y: 0 }
              : { filter: 'blur(10px)', opacity: 0, y: offset }
          }
          transition={{ duration: 0.75, delay: (i * delay) / 1000, ease: [0.22, 1, 0.36, 1] }}
        >
          {animateBy === 'words' && i < items.length - 1 ? item + NBSP : item}
        </motion.span>
      ))}
    </MotionTag>
  )
}
