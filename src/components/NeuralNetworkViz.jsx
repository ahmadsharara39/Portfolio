import { useEffect, useRef } from 'react'
import { getTheme, onThemeChange, prefersReducedMotion, onReducedMotionChange } from '../lib/theme'

const LAYERS = [4, 6, 8, 6, 3]
const NODE_RADIUS = 4
const LAYER_GAP = 80
const NODE_GAP = 28

export default function NeuralNetworkViz() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const w = (LAYERS.length - 1) * LAYER_GAP + 60
    const maxNodes = Math.max(...LAYERS)
    const h = maxNodes * NODE_GAP + 40
    canvas.width = w * 2
    canvas.height = h * 2
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    ctx.scale(2, 2)

    let theme = getTheme()
    let reduced = prefersReducedMotion()
    let animId = null

    const nodes = LAYERS.map((count, li) => {
      const x = 30 + li * LAYER_GAP
      const totalH = (count - 1) * NODE_GAP
      const startY = (h - totalH) / 2
      return Array.from({ length: count }, (_, ni) => ({
        x,
        y: startY + ni * NODE_GAP,
        pulse: Math.random() * Math.PI * 2,
      }))
    })

    let t = 0

    const connBase = () => (theme === 'light' ? 0.13 : 0.06)
    // Node cores wash out on the light background, so darken them there
    // (matches the --color-neural-light token remap in index.css).
    const nodeCore = () => (theme === 'light' ? '109, 40, 217' : '167, 139, 250')
    const nodeEdge = () => (theme === 'light' ? '91, 33, 182' : '124, 58, 237')

    const drawConnections = (animated) => {
      const base = connBase()
      for (let li = 0; li < nodes.length - 1; li++) {
        for (const from of nodes[li]) {
          for (const to of nodes[li + 1]) {
            const alpha = animated ? base + Math.sin(t + from.pulse + to.pulse) * 0.03 : base
            ctx.beginPath()
            ctx.moveTo(from.x, from.y)
            ctx.lineTo(to.x, to.y)
            ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    const drawTravelingPulses = () => {
      for (let li = 0; li < nodes.length - 1; li++) {
        const srcIdx = Math.floor((t * 0.5 + li) % nodes[li].length)
        const dstIdx = Math.floor((t * 0.7 + li) % nodes[li + 1].length)
        const from = nodes[li][srcIdx]
        const to = nodes[li + 1][dstIdx]
        const progress = (t * 0.3 + li * 0.4) % 1
        const px = from.x + (to.x - from.x) * progress
        const py = from.y + (to.y - from.y) * progress

        ctx.beginPath()
        ctx.arc(px, py, 2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(6, 182, 212, 0.8)'
        ctx.fill()
        ctx.beginPath()
        ctx.arc(px, py, 6, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(6, 182, 212, 0.15)'
        ctx.fill()

        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.strokeStyle = `rgba(6, 182, 212, 0.2)`
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }

    const drawNodes = (animated) => {
      for (let li = 0; li < nodes.length; li++) {
        for (const node of nodes[li]) {
          const pulse = animated ? Math.sin(t * 1.5 + node.pulse) * 0.5 + 0.5 : 0.6
          const r = NODE_RADIUS + pulse * 1.5

          ctx.beginPath()
          ctx.arc(node.x, node.y, r * 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(124, 58, 237, ${0.04 + pulse * 0.04})`
          ctx.fill()

          ctx.beginPath()
          ctx.arc(node.x, node.y, r, 0, Math.PI * 2)
          const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r)
          grad.addColorStop(0, `rgba(${nodeCore()}, ${0.7 + pulse * 0.3})`)
          grad.addColorStop(1, `rgba(${nodeEdge()}, ${0.3 + pulse * 0.2})`)
          ctx.fillStyle = grad
          ctx.fill()
        }
      }
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h)
      drawConnections(false)
      drawNodes(false)
    }

    const draw = () => {
      t += 0.02
      ctx.clearRect(0, 0, w, h)
      drawConnections(true)
      drawTravelingPulses()
      drawNodes(true)
      animId = requestAnimationFrame(draw)
    }

    const start = () => {
      cancelAnimationFrame(animId)
      animId = null
      if (reduced) drawStatic()
      else draw()
    }
    start()

    const offTheme = onThemeChange((tm) => {
      theme = tm
      if (reduced) drawStatic()
    })
    const offRM = onReducedMotionChange((r) => {
      reduced = r
      start()
    })

    return () => {
      cancelAnimationFrame(animId)
      offTheme()
      offRM()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="opacity-60 hover:opacity-80 transition-opacity duration-700"
    />
  )
}
