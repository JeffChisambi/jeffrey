import { useRef } from 'react'
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useAnimationFrame,
  useMotionValue,
} from 'framer-motion'
import useCoarsePointer from '../../hooks/useCoarsePointer.js'

const wrap = (min, max, v) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

// Soft fade at both edges so items enter and leave instead of being sliced off.
// Doubles as the "there is more over here" affordance on the swipe strips.
const EDGE_MASK =
  'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'

const maskStyle = (on) =>
  on ? { maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK } : undefined

/**
 * ScrollVelocity — ReactBits
 *
 * Desktop: infinite marquee whose speed reacts to scroll velocity. The boost is
 * clamped so it can never outrun the eye, and pointing at the track eases the
 * row down to a crawl so the content is readable.
 *
 * Touch / coarse pointer: no auto-scroll at all. The same content becomes a
 * swipeable, snapping strip the reader drives themselves.
 */
export default function ScrollVelocity({
  texts = [],
  baseVelocity = 18,
  className = '',
  itemClassName = '',
  separator = '·',
  /** Speed multiplier while the pointer is over the track. 0 = full stop. */
  hoverSpeed = 0.06,
  /** Largest extra multiplier the scroll boost may add. */
  maxBoost = 1.6,
  /** When false, scrolling only changes speed — the track never turns around. */
  reverseOnScroll = true,
  fadeEdges = true,
  /** Items shown on touch devices. Defaults to `texts`. */
  touchItems,
  /** Item styling on touch. Defaults to `itemClassName` — override when the
   *  pointer styling depends on hover, which touch never gets. */
  touchItemClassName,
}) {
  const coarse = useCoarsePointer()

  // One shared multiplier for every row, eased so slowing down feels physical.
  // Driven entirely through the motion value — no React state, so hovering the
  // track never triggers a re-render.
  const speed = useMotionValue(1)
  const smoothSpeed = useSpring(speed, { stiffness: 90, damping: 22, mass: 0.5 })

  const slow = () => speed.set(hoverSpeed)
  const resume = () => speed.set(1)

  // ── Touch: user-driven swipe strip, nothing moves on its own ──
  if (coarse) {
    const items = touchItems ?? texts
    const itemClass = touchItemClassName ?? itemClassName
    return (
      <div className={`relative ${className}`} style={maskStyle(fadeEdges)}>
        <ul className="no-scrollbar flex snap-x snap-mandatory items-center gap-8 overflow-x-auto overscroll-x-contain scroll-smooth px-[8%] [scroll-padding-inline:8%]">
          {items.map((t, i) => (
            <li
              key={i}
              className={`flex flex-shrink-0 snap-center items-center whitespace-nowrap ${itemClass}`}
            >
              {t}
              {i < items.length - 1 && <span className="pl-8 text-accent">{separator}</span>}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // ── Pointer: velocity-reactive marquee with a hover brake ──
  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      style={maskStyle(fadeEdges)}
      onPointerEnter={slow}
      onPointerLeave={resume}
      onPointerCancel={resume}
    >
      {texts.map((t, i) => (
        <Row
          key={i}
          velocity={i % 2 === 0 ? baseVelocity : -baseVelocity}
          className={itemClassName}
          multiplier={smoothSpeed}
          maxBoost={maxBoost}
          reverseOnScroll={reverseOnScroll}
        >
          {t} <span className="text-accent">{separator}</span>{' '}
        </Row>
      ))}
    </div>
  )
}

function Row({ children, velocity, className, multiplier, maxBoost, reverseOnScroll }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })

  // Clamped: past ~2000px/s of scroll the marquee stops accelerating, so a
  // flick of the wheel can't blur the text into nothing.
  const factor = useTransform(smooth, [-2000, 0, 2000], [-maxBoost, 0, maxBoost], {
    clamp: true,
  })

  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`)
  const dir = useRef(1)

  useAnimationFrame((_, delta) => {
    const step = Math.min(delta, 50) / 1000 // guard against tab-switch jumps
    let moveBy = dir.current * velocity * step

    const f = factor.get()
    // Flipping direction mid-loop reads as a glitch on a logo band, so it's
    // opt-out: with `reverseOnScroll` off, scroll only adds speed.
    if (reverseOnScroll) {
      if (f < 0) dir.current = -1
      else if (f > 0) dir.current = 1
    }
    moveBy += dir.current * moveBy * Math.abs(f)

    // Hover slowdown scales everything, boost included.
    moveBy *= multiplier.get()

    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="flex flex-nowrap overflow-hidden whitespace-nowrap">
      <motion.div className={`flex flex-nowrap whitespace-nowrap ${className}`} style={{ x }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="block flex-shrink-0 pr-6">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/**
 * Marquee — thin capability strip.
 *
 * Desktop: CSS ticker that pauses under the pointer.
 * Touch / coarse pointer: a swipeable, snapping strip with no auto-scroll.
 */
export function Marquee({
  items = [],
  className = '',
  speed = 32,
  pauseOnHover = true,
  fadeEdges = true,
}) {
  const coarse = useCoarsePointer()

  if (coarse) {
    return (
      <div className={`relative ${className}`} style={maskStyle(fadeEdges)}>
        <ul className="no-scrollbar flex snap-x snap-mandatory items-center gap-10 overflow-x-auto overscroll-x-contain scroll-smooth px-6 [scroll-padding-inline:1.5rem]">
          {items.map((it, i) => (
            <li key={i} className="flex flex-shrink-0 snap-center items-center whitespace-nowrap">
              {it}
              {i < items.length - 1 && <span className="pl-10 text-accent">◆</span>}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // Two identical tracks side by side; translating the wrapper by exactly -50%
  // lands track B where track A started, so the seam is invisible. Spacing lives
  // on each item (pr-10) rather than a flex gap, which would break that maths.
  const track = (key) => (
    <div key={key} className="flex flex-shrink-0 items-center" aria-hidden={key === 'b'}>
      {items.map((it, i) => (
        <span key={i} className="flex flex-shrink-0 items-center whitespace-nowrap pr-10">
          {it}
          <span className="pl-10 text-accent">◆</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className={`group relative flex overflow-hidden ${className}`} style={maskStyle(fadeEdges)}>
      <div
        className={`flex w-max animate-marquee ${
          pauseOnHover
            ? 'group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]'
            : ''
        }`}
        style={{ animationDuration: `${speed}s` }}
      >
        {track('a')}
        {track('b')}
      </div>
    </div>
  )
}
