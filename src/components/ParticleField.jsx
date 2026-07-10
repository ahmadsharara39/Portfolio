import { useEffect, useRef } from 'react'
import {
  getTheme,
  onThemeChange,
  shouldFreezeMotion,
  onReducedMotionChange,
  onAnimationsChange,
} from '../lib/theme'

export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId = null
    let mouse = { x: null, y: null }
    let time = 0
    let theme = getTheme()
    let frozen = shouldFreezeMotion()
    let resizeTimer = null

    // Viewport-sized (NOT document-height): the field is a fixed background,
    // so we never allocate a giant off-screen buffer or squish the canvas.
    const isSmall = () => window.innerWidth < 768
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        resize()
        rebuild()
        if (frozen) drawStatic()
      }, 150)
    }
    window.addEventListener('resize', onResize)

    const handleMouse = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', handleMouse)

    const colors = [
      { r: 124, g: 58, b: 237 },
      { r: 6, g: 182, b: 212 },
      { r: 236, g: 72, b: 153 },
      { r: 16, g: 185, b: 129 },
    ]

    class Node {
      constructor() {
        this.reset()
      }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.baseSize = Math.random() * 2 + 0.8
        this.size = this.baseSize
        this.speedX = (Math.random() - 0.5) * 0.25
        this.speedY = (Math.random() - 0.5) * 0.25
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.opacity = Math.random() * 0.6 + 0.15
        this.pulseSpeed = Math.random() * 0.02 + 0.01
        this.pulseOffset = Math.random() * Math.PI * 2
      }
      update(t) {
        this.x += this.speedX
        this.y += this.speedY
        this.size = this.baseSize + Math.sin(t * this.pulseSpeed + this.pulseOffset) * 0.5

        if (mouse.x !== null) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 200) {
            const force = (200 - dist) / 200
            this.x -= (dx / dist) * force * 0.8
            this.y -= (dy / dist) * force * 0.8
            this.size = this.baseSize + force * 2
          }
        }

        if (this.x < -50) this.x = canvas.width + 50
        if (this.x > canvas.width + 50) this.x = -50
        if (this.y < -50) this.y = canvas.height + 50
        if (this.y > canvas.height + 50) this.y = -50
      }
      draw(ctx) {
        const mul = theme === 'light' ? 1.15 : 1
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${Math.min(this.opacity * mul, 1)})`
        ctx.fill()
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.08})`
        ctx.fill()
      }
    }

    let nodes = []
    const rebuild = () => {
      const cap = isSmall() ? 55 : 110
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 16000), cap)
      nodes = Array.from({ length: count }, () => new Node())
    }
    rebuild()

    // Single pass: draw connections and (when animated) data pulses in one loop,
    // with a flat stroke color instead of a per-pair gradient allocation.
    const drawLinks = (t, animated) => {
      const base = theme === 'light' ? 0.11 : 0.08
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            const alpha = base * (1 - dist / 150)
            const ci = nodes[i].color
            ctx.strokeStyle = `rgba(${ci.r}, ${ci.g}, ${ci.b}, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()

            if (animated && dist < 100 && (i + j) % 7 === 0) {
              const progress = (t * 0.001 + i * 0.3) % 1
              const px = nodes[i].x + (nodes[j].x - nodes[i].x) * progress
              const py = nodes[i].y + (nodes[j].y - nodes[i].y) * progress
              ctx.beginPath()
              ctx.arc(px, py, 1.5, 0, Math.PI * 2)
              ctx.fillStyle = `rgba(6, 182, 212, ${0.6 * (1 - dist / 100)})`
              ctx.fill()
            }
          }
        }
      }
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      nodes.forEach((n) => n.draw(ctx))
      drawLinks(0, false)
    }

    const animate = () => {
      time++
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      nodes.forEach((n) => { n.update(time); n.draw(ctx) })
      drawLinks(time, true)
      animationId = requestAnimationFrame(animate)
    }

    const start = () => {
      cancelAnimationFrame(animationId)
      animationId = null
      if (frozen) drawStatic()
      else animate()
    }
    start()

    const offTheme = onThemeChange((t) => {
      theme = t
      if (frozen) drawStatic()
    })
    const refreshFrozen = () => {
      frozen = shouldFreezeMotion()
      start()
    }
    const offRM = onReducedMotionChange(refreshFrozen)
    const offAnim = onAnimationsChange(refreshFrozen)

    return () => {
      cancelAnimationFrame(animationId)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', handleMouse)
      offTheme()
      offRM()
      offAnim()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.5 }}
    />
  )
}
