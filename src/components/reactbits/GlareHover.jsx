import { useRef, useState } from 'react'

/**
 * GlareHover — ReactBits
 * A diagonal specular sweep that follows the pointer across the surface.
 */
export default function GlareHover({
  children,
  className = '',
  glareColor = '#ffffff',
  glareOpacity = 0.32,
  width = '58%',
  as: Tag = 'div',
}) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: -200, y: 0 })
  const [on, setOn] = useState(false)

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
  }

  return (
    <Tag
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={onMove}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
    >
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 z-20 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300"
        style={{
          left: pos.x,
          top: pos.y,
          width,
          opacity: on ? glareOpacity : 0,
          background: `radial-gradient(circle, ${glareColor} 0%, transparent 62%)`,
          mixBlendMode: 'overlay',
        }}
      />
    </Tag>
  )
}

/**
 * StarBorder — ReactBits
 * Conic sheen orbiting the border of a pill / card.
 */
export function StarBorder({ children, className = '', color = '#C4472B', radius = '100px' }) {
  return (
    <span className={`relative inline-flex overflow-hidden p-[1.5px] ${className}`} style={{ borderRadius: radius }}>
      <span
        aria-hidden="true"
        className="absolute inset-[-160%] animate-starBorder"
        style={{ background: `conic-gradient(from 0deg, transparent 0 62%, ${color} 78%, transparent 90%)` }}
      />
      <span
        className="relative inline-flex w-full items-center justify-center bg-ink text-cream"
        style={{ borderRadius: radius }}
      >
        {children}
      </span>
    </span>
  )
}
