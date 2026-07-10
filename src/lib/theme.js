// Lightweight, framework-free helpers for imperative (canvas) components
// that need to react to theme changes and motion preferences.

export function getTheme() {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

// Subscribe to theme changes fired by ThemeContext. Returns an unsubscribe fn.
export function onThemeChange(cb) {
  const handler = () => cb(getTheme())
  window.addEventListener('themechange', handler)
  return () => window.removeEventListener('themechange', handler)
}

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

// Subscribe to OS-level reduced-motion changes. Returns an unsubscribe fn.
export function onReducedMotionChange(cb) {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return () => {}
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  const handler = () => cb(mq.matches)
  mq.addEventListener('change', handler)
  return () => mq.removeEventListener('change', handler)
}
