import { useCallback, useEffect, useRef } from 'react'

/**
 * DotGrid — ReactBits
 * A canvas dot field that repels and re-colours around the cursor.
 * Rendered as a fixed, non-interactive background layer.
 */
export default function DotGrid({
  dotSize = 2,
  gap = 34,
  baseColor = 'rgba(19,17,16,0.16)',
  activeColor = '#C4472B',
  proximity = 150,
  shockRadius = 240,
  shockStrength = 5,
  className = '',
}) {
  const canvasRef = useRef(null)
  const dots = useRef([])
  const pointer = useRef({ x: -9999, y: -9999 })
  const raf = useRef(null)

  const build = useCallback(() => {
    const c = canvasRef.current
    if (!c) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = c.clientWidth
    const h = c.clientHeight
    c.width = w * dpr
    c.height = h * dpr
    const ctx = c.getContext('2d')
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const cols = Math.floor(w / gap) + 1
    const rows = Math.floor(h / gap) + 1
    const offsetX = (w - (cols - 1) * gap) / 2
    const offsetY = (h - (rows - 1) * gap) / 2

    const next = []
    for (let r = 0; r < rows; r += 1) {
      for (let col = 0; col < cols; col += 1) {
        const x = offsetX + col * gap
        const y = offsetY + r * gap
        next.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 })
      }
    }
    dots.current = next
  }, [gap])

  useEffect(() => {
    build()
    window.addEventListener('resize', build)
    return () => window.removeEventListener('resize', build)
  }, [build])

  useEffect(() => {
    const onMove = (e) => {
      const c = canvasRef.current
      if (!c) return
      const r = c.getBoundingClientRect()
      pointer.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onLeave = () => {
      pointer.current = { x: -9999, y: -9999 }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')

    const render = () => {
      const w = c.clientWidth
      const h = c.clientHeight
      ctx.clearRect(0, 0, w, h)
      const { x: px, y: py } = pointer.current

      dots.current.forEach((d) => {
        const dx = d.ox - px
        const dy = d.oy - py
        const dist = Math.hypot(dx, dy)

        // repulsion
        let tx = d.ox
        let ty = d.oy
        if (dist < shockRadius && dist > 0.001) {
          const force = (1 - dist / shockRadius) * shockStrength
          tx = d.ox + (dx / dist) * force * 6
          ty = d.oy + (dy / dist) * force * 6
        }

        d.vx += (tx - d.x) * 0.12
        d.vy += (ty - d.y) * 0.12
        d.vx *= 0.78
        d.vy *= 0.78
        d.x += d.vx
        d.y += d.vy

        const near = Math.max(0, 1 - dist / proximity)
        const size = dotSize + near * 2.4

        ctx.beginPath()
        ctx.fillStyle = near > 0.04 ? activeColor : baseColor
        ctx.globalAlpha = near > 0.04 ? 0.25 + near * 0.75 : 1
        ctx.arc(d.x, d.y, size / 2, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1
      raf.current = requestAnimationFrame(render)
    }

    raf.current = requestAnimationFrame(render)
    return () => cancelAnimationFrame(raf.current)
  }, [dotSize, baseColor, activeColor, proximity, shockRadius, shockStrength])

  return <canvas ref={canvasRef} className={`h-full w-full ${className}`} aria-hidden="true" />
}
