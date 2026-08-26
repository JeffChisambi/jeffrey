import { useLayoutEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Non-breaking space: a trailing normal space inside an inline-block collapses,
// which would run every word/character together.
const NBSP = ' '

/**
 * ScrollFloat — ReactBits
 * Characters float up, scale and fade in, scrubbed to scroll position.
 */
export default function ScrollFloat({
  children = '',
  className = '',
  containerClassName = '',
  scrollStart = 'center bottom+=40%',
  scrollEnd = 'bottom bottom-=32%',
  stagger = 0.028,
  as: Tag = 'h2',
}) {
  const ref = useRef(null)
  const text = typeof children === 'string' ? children : ''

  const chars = useMemo(
    () =>
      text.split('').map((c, i) => (
        <span data-item className="inline-block will-change-transform" key={i}>
          {c === ' ' ? NBSP : c}
        </span>
      )),
    [text]
  )

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = el.querySelectorAll('span[data-item]')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          willChange: 'opacity, transform',
          opacity: 0,
          yPercent: 118,
          scaleY: 2.4,
          scaleX: 0.7,
          transformOrigin: '50% 0%',
        },
        {
          duration: 1,
          ease: 'back.inOut(2)',
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger,
          scrollTrigger: {
            trigger: el,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
          },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [scrollStart, scrollEnd, stagger, text])

  const Comp = Tag

  return (
    <Comp ref={ref} className={`${containerClassName} ${className}`} aria-label={text}>
      <span aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em]">
        {chars}
      </span>
    </Comp>
  )
}

/**
 * ScrollReveal — ReactBits
 * Word-by-word opacity + blur lift, scrubbed to scroll. Use on paragraphs.
 */
export function ScrollReveal({
  children = '',
  className = '',
  baseOpacity = 0.12,
  baseRotation = 2.5,
  blurStrength = 4,
}) {
  const ref = useRef(null)
  const text = typeof children === 'string' ? children : ''

  const words = useMemo(
    () =>
      text.split(' ').map((w, i) => (
        <span data-item className="inline-block will-change-[opacity,filter]" key={i}>
          {w + NBSP}
        </span>
      )),
    [text]
  )

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { transformOrigin: '0% 50%', rotate: baseRotation },
        {
          rotate: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom bottom-=18%',
            scrub: true,
          },
        }
      )
      gsap.fromTo(
        el.querySelectorAll('span[data-item]'),
        { opacity: baseOpacity, filter: `blur(${blurStrength}px)` },
        {
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'none',
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom-=8%',
            end: 'bottom bottom-=22%',
            scrub: true,
          },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [baseOpacity, baseRotation, blurStrength, text])

  return (
    <p ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{words}</span>
    </p>
  )
}
