import { useEffect, useState } from 'react'

/**
 * True on devices with no hover and/or a coarse pointer (phones, tablets).
 * Starts false so the desktop path renders first, then corrects after mount —
 * fine for a client-rendered SPA.
 */
export default function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: none), (pointer: coarse)')
    const update = () => setCoarse(mq.matches)
    update()

    if (mq.addEventListener) {
      mq.addEventListener('change', update)
      return () => mq.removeEventListener('change', update)
    }
    // Safari < 14
    mq.addListener(update)
    return () => mq.removeListener(update)
  }, [])

  return coarse
}
