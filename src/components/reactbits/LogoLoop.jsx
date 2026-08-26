import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useAnimationFrame, useReducedMotion } from 'framer-motion'

/**
 * LogoLoop — a genuinely endless logo belt.
 *
 * The loop is measured, not guessed. One sequence is rendered and its real
 * pixel width read from `getBoundingClientRect()`; enough copies are then laid
 * end to end to overflow the container, and the track is translated with
 * `offset % sequenceWidth`. When the offset wraps back to zero, copy N+1 is
 * sitting exactly where copy N was, so there is no seam to see.
 *
 * Why not a percentage-based wrap: a percentage resolves against the track's
 * own width, which changes as images decode and as copy counts change on
 * resize. Any mismatch between "25% of the track" and "one sequence" shows up
 * as a jump every cycle. Measuring in pixels removes the whole class of bug.
 *
 * The trailing gap lives on each item (`marginRight`), so it's inside the
 * measured width and the spacing stays even across the join.
 */
export default function LogoLoop({
  logos = [],
  /** Pixels per second. */
  speed = 40,
  direction = 'left',
  gap = 64,
  logoHeight = 36,
  /** Speed multiplier while the pointer is over the belt. 0 = full stop. */
  hoverSpeed = 0.12,
  fadeEdges = true,
  className = '',
  itemClassName = '',
  ariaLabel = 'Logos',
}) {
  const containerRef = useRef(null)
  const seqRef = useRef(null)
  const trackRef = useRef(null)

  const [seqWidth, setSeqWidth] = useState(0)
  const [copies, setCopies] = useState(2)

  const offsetRef = useRef(0)
  const mulRef = useRef(1)
  const targetMulRef = useRef(1)
  const reduce = useReducedMotion()

  const measure = useCallback(() => {
    const seq = seqRef.current
    const container = containerRef.current
    if (!seq || !container) return
    const w = seq.getBoundingClientRect().width
    const cw = container.getBoundingClientRect().width
    if (w > 0) {
      setSeqWidth(w)
      // +2 so there's always a full sequence off each edge, whatever the phase.
      setCopies(Math.max(2, Math.ceil(cw / w) + 2))
    }
  }, [])

  useLayoutEffect(() => {
    measure()
  }, [measure, logos, gap, logoHeight])

  useEffect(() => {
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    if (seqRef.current) ro.observe(seqRef.current)
    return () => ro.disconnect()
  }, [measure])

  // Images without a decoded intrinsic size measure short, which would set the
  // wrap distance too small and pull the belt in on itself.
  useEffect(() => {
    const imgs = Array.from(seqRef.current?.querySelectorAll('img') ?? [])
    let pending = 0
    const done = () => {
      pending -= 1
      if (pending <= 0) measure()
    }
    imgs.forEach((img) => {
      if (img.complete) return
      pending += 1
      img.addEventListener('load', done, { once: true })
      img.addEventListener('error', done, { once: true })
    })
    if (pending === 0) measure()
  }, [measure, logos])

  useAnimationFrame((_, delta) => {
    const track = trackRef.current
    if (!track || !seqWidth || reduce) return

    const step = Math.min(delta, 50) / 1000 // guard against tab-switch jumps
    mulRef.current += (targetMulRef.current - mulRef.current) * (1 - Math.exp(-step / 0.25))

    const dir = direction === 'left' ? 1 : -1
    let next = offsetRef.current + dir * speed * mulRef.current * step
    next = ((next % seqWidth) + seqWidth) % seqWidth
    offsetRef.current = next
    track.style.transform = `translate3d(${-next}px, 0, 0)`
  })

  // Touch fires pointerenter on tap but frequently never fires pointerleave,
  // which would strand the belt at hover speed. Brake on mice only.
  const onEnter = (e) => {
    if (e.pointerType === 'mouse') targetMulRef.current = hoverSpeed
  }
  const onLeave = () => {
    targetMulRef.current = 1
  }

  const edge = fadeEdges
    ? {
        maskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)',
      }
    : undefined

  const sequence = (copyIndex) => (
    <ul
      key={copyIndex}
      ref={copyIndex === 0 ? seqRef : undefined}
      className="flex flex-none items-center"
      aria-hidden={copyIndex > 0 || undefined}
    >
      {logos.map((logo) => (
        <li
          key={logo.key ?? logo.alt}
          className={`flex flex-none items-center ${itemClassName}`}
          style={{ marginRight: gap }}
        >
          <img
            src={logo.src}
            alt={copyIndex === 0 ? (logo.alt ?? '') : ''}
            width={logo.w}
            height={logo.h}
            loading="eager"
            decoding="sync"
            draggable={false}
            style={{ height: logoHeight, width: 'auto' }}
            className="block max-w-none object-contain"
          />
        </li>
      ))}
    </ul>
  )

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={edge}
      role="group"
      aria-label={ariaLabel}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onPointerCancel={onLeave}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {Array.from({ length: copies }).map((_, c) => sequence(c))}
      </div>
    </div>
  )
}
