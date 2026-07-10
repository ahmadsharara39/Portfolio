import { useEffect, useRef } from 'react'
import { getTheme, onThemeChange, prefersReducedMotion } from '../lib/theme'

export default function DataStream({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = 200
    canvas.height = 600

    // Purely decorative "matrix rain" — don't animate for reduced-motion users.
    if (prefersReducedMotion()) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      return
    }

    let theme = getTheme()
    const chars = '01アイウエオカキクケコ'.split('')
    const columns = 10
    const drops = Array(columns).fill(0)
    let animId

    const draw = () => {
      // Fade the previous frame using the current background colour.
      ctx.fillStyle = theme === 'light' ? 'rgba(246, 247, 251, 0.08)' : 'rgba(5, 5, 16, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * 20
        const alpha = 0.15 + Math.random() * 0.15
        ctx.font = '14px JetBrains Mono, monospace'
        ctx.fillStyle = `rgba(124, 58, 237, ${alpha})`
        ctx.fillText(char, x, y)

        if (Math.random() > 0.96) {
          ctx.fillStyle = `rgba(6, 182, 212, 0.6)`
          ctx.fillText(char, x, y)
        }

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i] += 16
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    const offTheme = onThemeChange((t) => { theme = t })

    return () => {
      cancelAnimationFrame(animId)
      offTheme()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none opacity-30 ${className}`}
      style={{ width: 200, height: 600 }}
    />
  )
}
