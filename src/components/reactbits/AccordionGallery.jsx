import { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import './AccordionGallery.css'

/**
 * AccordionGallery — ReactBits
 *
 * A row of panels where the active one expands and the rest tilt away on a 3D
 * plane. Hover (or focus, or arrow keys) moves the active panel.
 *
 * Adapted from the stock component in two ways, both because these panels hold
 * screenshots rather than photographs:
 *
 *  1. The media box fills its panel and the image is `contain`ed, so the whole
 *     screenshot is visible. The original sized the media larger than the frame
 *     and `cover`ed it so it could pan on parallax — good for a photo wall,
 *     but it crops, and a cropped UI screenshot is unreadable.
 *  2. Parallax is applied as a small scale rather than a translation. Shifting
 *     a contained image sideways would push it out of its own frame.
 */
const AccordionGallery = ({
  items = [],
  defaultIndex = 0,
  accentColor = '#C4472B',
  textColor = '#F3F0EA',
  panelColor = '#0F0D0C',
  /** Number (px) or any CSS length — `100%` to fill a sized parent. */
  height = 460,
  gap = 10,
  radius = 4,
  expandRatio = 0.56,
  orientation = 'horizontal',
  duration = 0.6,
  ease = 'power3.out',
  tilt = 8,
  stagger = 0.06,
  trigger = 'hover',
  showLabels = true,
  grayscale = true,
  className = '',
}) => {
  const rootRef = useRef(null)
  const panelRefs = useRef([])
  const mediaRefs = useRef([])
  const barRefs = useRef([])
  const textRefs = useRef([])
  const tlRef = useRef(null)
  const firstRunRef = useRef(true)

  const vertical = orientation === 'vertical'
  const count = items.length
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), Math.max(count - 1, 0)))

  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const applyLayout = useCallback(
    (animate) => {
      const panels = panelRefs.current
      if (!panels.length) return

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9)
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1

      tlRef.current?.kill()
      const dur = animate && !reduced ? duration : 0
      const tl = gsap.timeline()

      panels.forEach((panel, i) => {
        if (!panel) return
        const isActive = i === active
        const media = mediaRefs.current[i]
        const bar = barRefs.current[i]
        const text = textRefs.current[i]

        const rot = isActive ? 0 : i < active ? tilt : -tilt
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot }
        tl.to(panel, { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease }, 0)

        if (media) {
          tl.to(
            media,
            {
              scale: isActive ? 1 : 0.94,
              '--ag-gray': grayscale ? (isActive ? 0 : 1) : 0,
              '--ag-dim': isActive ? 0 : 0.4,
              duration: dur,
              ease,
            },
            0
          )
        }

        if (showLabels && bar && text) {
          if (isActive) {
            tl.to(
              [bar, text],
              { opacity: 1, x: 0, duration: dur, ease, stagger: reduced ? 0 : stagger },
              0
            )
          } else {
            tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease }, 0)
          }
        }
      })

      tlRef.current = tl
    },
    [active, count, expandRatio, duration, ease, vertical, tilt, grayscale, showLabels, stagger, reduced]
  )

  useEffect(() => {
    applyLayout(!firstRunRef.current)
    firstRunRef.current = false
  }, [applyLayout])

  useEffect(() => () => tlRef.current?.kill(), [])

  const handleKeyDown = (i, e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i + 1) % count)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i - 1 + count) % count)
    }
  }

  if (!count) return null

  return (
    <div
      ref={rootRef}
      className={`accordion-gallery${vertical ? ' accordion-gallery--vertical' : ''}${
        className ? ` ${className}` : ''
      }`}
      style={{
        '--ag-accent': accentColor,
        '--ag-text': textColor,
        '--ag-panel': panelColor,
        '--ag-gap': `${gap}px`,
        '--ag-radius': `${radius}px`,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      role="list"
      aria-label="Screens"
    >
      {items.map((item, i) => {
        const isActive = i === active
        return (
          <div
            key={item.label ?? i}
            ref={(el) => (panelRefs.current[i] = el)}
            className={`ag-panel${isActive ? ' ag-panel--active' : ''}`}
            onClick={() => setActive(i)}
            onMouseEnter={() => trigger === 'hover' && setActive(i)}
            onFocus={() => setActive(i)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? 'true' : undefined}
            aria-label={item.label}
            data-cursor={item.label}
          >
            <span className="ag-panel__frame">
              <span className="ag-panel__media" ref={(el) => (mediaRefs.current[i] = el)}>
                <img
                  src={item.image}
                  alt={item.alt || item.label || ''}
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                />
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
            </span>

            {showLabels && (
              <span className="ag-panel__label" aria-hidden="true">
                <span className="ag-panel__bar" ref={(el) => (barRefs.current[i] = el)} />
                <span className="ag-panel__text" ref={(el) => (textRefs.current[i] = el)}>
                  {item.label}
                </span>
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default AccordionGallery
