import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Full-bleed intro curtain: counter runs to 100, then four panels wipe away.
 */
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(true)

  // Keep the callback in a ref so a new inline arrow from the parent never
  // restarts the counter interval.
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  useEffect(() => {
    let n = 0
    const id = setInterval(() => {
      n += Math.floor(Math.random() * 7) + 3
      if (n >= 100) {
        n = 100
        clearInterval(id)
        setTimeout(() => {
          setOpen(false)
          doneRef.current?.()
        }, 420)
      }
      setCount(n)
    }, 55)
    return () => clearInterval(id)
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-end justify-between"
          exit={{ pointerEvents: 'none' }}
        >
          <div className="absolute inset-0 flex">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="h-full flex-1 bg-ink"
                initial={{ y: 0 }}
                exit={{ y: '-102%' }}
                transition={{ duration: 0.85, delay: i * 0.07, ease: [0.76, 0, 0.24, 1] }}
              />
            ))}
          </div>

          <motion.div
            className="relative z-10 flex w-full items-end justify-between px-[clamp(16px,4vw,54px)] pb-[clamp(24px,5vh,64px)]"
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            <div className="font-mono text-[10px] uppercase tracking-label text-cream/55">
              Jeffrey Chisambi — Software Engineer
            </div>
            <div className="display text-cream" style={{ fontSize: 'clamp(56px,12vw,160px)' }}>
              {count}
              <span className="text-accent">%</span>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-accent"
            animate={{ width: `${count}%` }}
            transition={{ ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
