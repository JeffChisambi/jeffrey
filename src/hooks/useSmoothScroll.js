import { useEffect } from 'react'
import Lenis from 'lenis'
// Ships `html.lenis, html.lenis body { height: auto }` among others — without
// it Lenis can measure a short document and clip the last section.
import 'lenis/dist/lenis.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Momentum smooth scrolling, wired into GSAP's ScrollTrigger ticker so
 * scrubbed animations stay perfectly in sync with the virtual scroll position.
 */

// Module-level handle so components that need to freeze the page (the nav
// drawer) can stop the scroller. `body { overflow: hidden }` alone is not
// enough — Lenis preventDefaults the wheel and scrolls programmatically, which
// still works on an overflow-hidden viewport.
let instance = null

export function lockScroll() {
  instance?.stop()
}

export function unlockScroll() {
  instance?.start()
}

export default function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })
    instance = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // The page grows as lazy images and webfonts land, and Lenis caches the
    // scroll limit. Without these it can stop short of the real bottom.
    const resize = () => lenis.resize()
    const ro = new ResizeObserver(resize)
    ro.observe(document.body)
    window.addEventListener('load', resize)
    document.fonts?.ready.then(resize)

    // Anchor links route through Lenis so jumps stay eased.
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (!id || id === '#') return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      // `force` matters: the drawer stops Lenis while it's open, and its close
      // handler only unlocks on React's next commit — after this listener has
      // already run. Without it the menu would close and the page stay put.
      lenis.scrollTo(el, { offset: -70, duration: 1.4, force: true })
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('load', resize)
      ro.disconnect()
      gsap.ticker.remove(raf)
      lenis.destroy()
      instance = null
    }
  }, [])
}
