import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { nav, profile } from '../../data/content.js'
import { lockScroll, unlockScroll } from '../../hooks/useSmoothScroll.js'
import { Magnet, DecryptedText, Noise } from '../reactbits/index.js'

export default function Nav({ ready }) {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  const triggerRef = useRef(null)
  const closeRef = useRef(null)
  const panelRef = useRef(null)

  // Local time in Malawi. A small thing, but it says "there is a person here,
  // in a place" better than another line of copy would.
  const [clock, setClock] = useState('')
  useEffect(() => {
    if (!open) return undefined
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Blantyre',
      hour: '2-digit',
      minute: '2-digit',
    })
    const tick = () => setClock(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 20000)
    return () => clearInterval(id)
  }, [open])

  useEffect(() => {
    const ids = [...nav.map((n) => n.href.slice(1)), 'contact']
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      obs.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Freeze the page behind the drawer, and send focus into it.
  useEffect(() => {
    if (!open) return undefined

    document.body.style.overflow = 'hidden'
    lockScroll()
    closeRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      // `aria-modal` tells assistive tech the rest of the page is inert, but it
      // does nothing for keyboard focus — without this, Tab walks straight out
      // of the drawer and into the page it's covering.
      if (e.key !== 'Tab') return
      const focusables = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (!focusables?.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      unlockScroll()
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Returning focus belongs on close, not on every render.
  const close = () => {
    setOpen(false)
    triggerRef.current?.focus()
  }

  // The drawer is a `lg`-and-below affordance; if the viewport grows past the
  // breakpoint while it's open, it would be left hanging invisibly.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (e) => e.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className={`sticky top-0 z-[60] border-b transition-colors duration-500 ${
          scrolled
            ? 'border-ink/10 bg-cream/85 backdrop-blur-xl'
            : 'border-transparent bg-cream/40 backdrop-blur-md'
        }`}
      >
        <nav className="flex items-center justify-between gap-x-6 px-[clamp(16px,3vw,40px)] py-3">
          <a href="#top" className="flex flex-none items-center gap-3" data-cursor="top">
            <span className="flex h-[27px] w-[27px] items-center justify-center rounded-full bg-ink font-mono text-[12px] text-cream">
              JC
            </span>
            <span className="grid gap-[3px] leading-[1.15]">
              <span className="font-mono text-[10.5px] font-medium uppercase tracking-label">
                {profile.name}
              </span>
              <span className="hidden font-mono text-[9px] uppercase tracking-label opacity-45 sm:block">
                <DecryptedText text="Software engineer · Malawi" speed={26} />
              </span>
            </span>
          </a>

          {/* Desktop pills */}
          <ul className="hidden flex-1 flex-wrap items-center justify-center gap-[2px] lg:flex">
            {nav.map((item) => {
              const isActive = active === item.href.slice(1)
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    data-cursor={item.label}
                    className={`pill relative transition-colors duration-300 ${
                      isActive ? 'text-cream' : 'text-ink/70 hover:text-ink'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-ink"
                        transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <Magnet padding={40} strength={0.3} className="hidden flex-none lg:block">
            <a
              href="#contact"
              data-cursor="write"
              className="pill group border border-ink/20 transition-colors duration-300 hover:border-transparent hover:bg-accent hover:text-cream"
            >
              Get in touch
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Magnet>

          {/* Trigger */}
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="nav-drawer"
            aria-label="Open menu"
            data-cursor="menu"
            className="group flex h-10 w-10 flex-none flex-col items-center justify-center gap-[5px] rounded-full border border-ink/15 transition-colors duration-300 hover:border-ink/40 lg:hidden"
          >
            <span className="block h-[1.5px] w-[16px] bg-ink transition-transform duration-300 group-hover:-translate-y-[1px]" />
            <span className="block h-[1.5px] w-[16px] bg-ink transition-transform duration-300 group-hover:translate-y-[1px]" />
          </button>
        </nav>
      </motion.header>

      {/* Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />

            <motion.aside
              ref={panelRef}
              id="nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="absolute right-0 top-0 flex h-full w-[min(420px,92vw)] flex-col overflow-y-auto overscroll-contain bg-ink text-cream"
              initial={reduce ? false : { x: '100%' }}
              animate={{ x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: '100%' }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Accent rail — reads as the drawer being cut out of the page
                  rather than floated on top of it. */}
              <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] bg-accent" />
              <Noise opacity={0.05} blend="screen" />

              <div className="relative flex items-center justify-between px-[clamp(22px,6vw,34px)] pb-7 pt-6">
                <span className="grid gap-[6px]">
                  <span className="font-mono text-[9px] uppercase tracking-label text-cream/40">
                    Menu
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-label text-cream">
                    {profile.name}
                  </span>
                </span>

                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  data-cursor="close"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-colors duration-300 hover:border-transparent hover:bg-accent"
                >
                  <span className="block text-[15px] leading-none transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:rotate-90">
                    ✕
                  </span>
                </button>
              </div>

              <ul className="relative flex flex-col border-t border-cream/10">
                {nav.map((item, i) => {
                  const isActive = active === item.href.slice(1)
                  return (
                    <motion.li
                      key={item.href}
                      initial={reduce ? false : { opacity: 0, x: 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.16 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="border-b border-cream/10"
                    >
                      <a
                        href={item.href}
                        onClick={close}
                        data-cursor={item.label}
                        aria-current={isActive ? 'true' : undefined}
                        className="group relative flex items-center justify-between overflow-hidden px-[clamp(22px,6vw,34px)] py-[18px]"
                      >
                        {/* Sweeps in from the left on hover and stays; the row
                            fills rather than the label just changing colour. */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-[600ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0"
                        />
                        <span className="relative flex items-center gap-3">
                          <span
                            className={`h-[6px] w-[6px] flex-none rounded-full transition-colors duration-300 ${
                              isActive
                                ? 'bg-accent group-hover:bg-cream'
                                : 'bg-transparent group-hover:bg-cream/50'
                            }`}
                          />
                          <span
                            className={`display text-[clamp(24px,7vw,30px)] leading-none transition-colors duration-300 group-hover:text-cream ${
                              isActive ? 'text-accent' : 'text-cream/90'
                            }`}
                          >
                            {item.label}
                          </span>
                        </span>
                        <span className="relative font-mono text-[9px] uppercase tracking-label text-cream/35 transition-colors duration-300 group-hover:text-cream/70">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </a>
                    </motion.li>
                  )
                })}
              </ul>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 + nav.length * 0.07, duration: 0.5 }}
                className="relative px-[clamp(22px,6vw,34px)] pt-8"
              >
                <a
                  href="#contact"
                  onClick={close}
                  data-cursor="write"
                  className="group flex items-center justify-between rounded-full bg-accent px-6 py-4 font-mono text-[10.5px] uppercase tracking-label text-cream transition-colors duration-300 hover:bg-cream hover:text-ink"
                >
                  Get in touch
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="LinkedIn"
                    className="rounded-full border border-cream/20 py-3 text-center font-mono text-[9.5px] uppercase tracking-label text-cream/70 transition-colors duration-300 hover:border-cream/60 hover:text-cream"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={profile.thelmer}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="Thelmer"
                    className="rounded-full border border-cream/20 py-3 text-center font-mono text-[9.5px] uppercase tracking-label text-cream/70 transition-colors duration-300 hover:border-cream/60 hover:text-cream"
                  >
                    Thelmer
                  </a>
                </div>
              </motion.div>

              <div className="relative mt-auto grid gap-[10px] px-[clamp(22px,6vw,34px)] pb-7 pt-10 font-mono text-[10px] uppercase tracking-label text-cream/45">
                <a href={`mailto:${profile.email}`} className="transition-colors hover:text-accent">
                  {profile.email}
                </a>
                <span className="flex items-center justify-between border-t border-cream/10 pt-[10px]">
                  <span>
                    {profile.location} · {profile.country}
                  </span>
                  {clock && (
                    <span className="flex items-center gap-2 text-cream/60">
                      <span className="inline-block h-[5px] w-[5px] animate-pulse rounded-full bg-accent" />
                      {clock}
                    </span>
                  )}
                </span>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
