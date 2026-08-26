import { useCallback, useEffect, useRef } from 'react'

/**
 * ClickSpark — ReactBits
 * Emits a burst of radial sparks at every click, anywhere in the wrapped tree.
 */
export default function ClickSpark({
  children,
  sparkColor = '#C4472B',
  sparkSize = 11,
  sparkRadius = 26,
  sparkCount = 9,
  duration = 420,
}) {
  const canvasRef = useRef(null)
  const sparks = useRef([])
  const raf = useRef(null)

  const resize = useCallback(() => {
    const c = canvasRef.current
    if (!c) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    c.width = window.innerWidth * dpr
    c.height = window.innerHeight * dpr
    c.style.width = `${window.innerWidth}px`
    c.style.height = `${window.innerHeight}px`
    const ctx = c.getContext('2d')
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }, [])

  useEffect(() => {
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [resize])

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')

    const draw = (now) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      sparks.current = sparks.current.filter((s) => now - s.start < duration)

      sparks.current.forEach((s) => {
        const t = (now - s.start) / duration
        const eased = 1 - Math.pow(1 - t, 3)
        const dist = sparkRadius * eased
        const len = sparkSize * (1 - eased)
        const x1 = s.x + dist * Math.cos(s.angle)
        const y1 = s.y + dist * Math.sin(s.angle)
        const x2 = x1 + len * Math.cos(s.angle)
        const y2 = y1 + len * Math.sin(s.angle)

        ctx.globalAlpha = 1 - eased
        ctx.strokeStyle = sparkColor
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      })
      ctx.globalAlpha = 1
      raf.current = requestAnimationFrame(draw)
    }

    raf.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf.current)
  }, [sparkColor, sparkSize, sparkRadius, duration])

  useEffect(() => {
    const onClick = (e) => {
      const now = performance.now()
      for (let i = 0; i < sparkCount; i += 1) {
        sparks.current.push({
          x: e.clientX,
          y: e.clientY,
          angle: (2 * Math.PI * i) / sparkCount,
          start: now,
        })
      }
    }
    window.addEventListener('pointerdown', onClick)
    return () => window.removeEventListener('pointerdown', onClick)
  }, [sparkCount])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9998]"
        aria-hidden="true"
      />
      {children}
    </>
  )
}
