import { useState, useEffect } from 'react'

// Returns true when the media query currently matches, and updates on change.
// Used to MOUNT heavy canvases only where they're visible (not mount-then-hide),
// so their requestAnimationFrame loops never run on breakpoints that hide them.
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia(query)
    const handler = () => setMatches(mq.matches)
    handler()
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])

  return matches
}
