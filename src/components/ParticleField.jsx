import { useEffect, useRef } from 'react'

export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let mouse = { x: null, y: null }
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouse = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY + window.scrollY
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
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`
        ctx.fill()
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.08})`
        ctx.fill()
      }
    }

    const count = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 180)
    const nodes = Array.from({ length: count }, () => new Node())

    const drawConnections = () => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            const alpha = 0.08 * (1 - dist / 150)
            const ci = nodes[i].color
            const cj = nodes[j].color
            const gradient = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y)
            gradient.addColorStop(0, `rgba(${ci.r}, ${ci.g}, ${ci.b}, ${alpha})`)
            gradient.addColorStop(1, `rgba(${cj.r}, ${cj.g}, ${cj.b}, ${alpha})`)
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }
    }

    const drawDataPulses = (t) => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100 && (i + j) % 7 === 0) {
            const progress = ((t * 0.001 + i * 0.3) % 1)
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

    const animate = () => {
      time++
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      nodes.forEach((n) => { n.update(time); n.draw(ctx) })
      drawConnections()
      drawDataPulses(time)
      animationId = requestAnimationFrame(animate)
    }
    animate()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(document.body)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  )
}
