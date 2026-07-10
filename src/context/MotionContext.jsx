import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const MotionContext = createContext(null)

function getInitialPaused() {
  if (typeof document !== 'undefined') {
    if (document.documentElement.getAttribute('data-anim') === 'off') return true
  }
  return false
}

// Provides a user-controlled "pause animations" flag (WCAG 2.2.2 — a way to
// pause/stop/hide motion without relying only on an OS setting). The flag is
// mirrored to a `data-anim` attribute + a `animationschange` event so the
// imperative canvas components can react without prop threading.
export function MotionProvider({ children }) {
  const [paused, setPaused] = useState(getInitialPaused)

  useEffect(() => {
    document.documentElement.setAttribute('data-anim', paused ? 'off' : 'on')
    try {
      localStorage.setItem('anim', paused ? 'off' : 'on')
    } catch {
      /* storage may be unavailable */
    }
    window.dispatchEvent(new CustomEvent('animationschange', { detail: paused }))
  }, [paused])

  const toggle = useCallback(() => setPaused((p) => !p), [])

  return <MotionContext.Provider value={{ paused, toggle }}>{children}</MotionContext.Provider>
}

export function useMotion() {
  const ctx = useContext(MotionContext)
  if (!ctx) throw new Error('useMotion must be used within a MotionProvider')
  return ctx
}
