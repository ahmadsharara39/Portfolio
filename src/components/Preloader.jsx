import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { prefersReducedMotion } from '../lib/theme'

const LAYERS = [3, 5, 7, 5, 2]

function MiniNetwork() {
  return (
    <svg viewBox="0 0 200 100" className="w-48 h-24 mb-6" aria-hidden="true">
      {LAYERS.map((count, li) => {
        const x = 20 + li * 40
        const nodes = Array.from({ length: count }, (_, ni) => {
          const totalH = (count - 1) * 14
          const y = (100 - totalH) / 2 + ni * 14
          return { x, y }
        })

        return nodes.map((node, ni) => {
          const elements = []
          if (li < LAYERS.length - 1) {
            const nextCount = LAYERS[li + 1]
            const nextX = 20 + (li + 1) * 40
            for (let nj = 0; nj < nextCount; nj++) {
              const nextTotalH = (nextCount - 1) * 14
              const nextY = (100 - nextTotalH) / 2 + nj * 14
              elements.push(
                <motion.line
                  key={`l-${li}-${ni}-${nj}`}
                  x1={node.x} y1={node.y} x2={nextX} y2={nextY}
                  stroke="rgba(124, 58, 237, 0.15)"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: li * 0.1 }}
                />
              )
            }
          }
          elements.push(
            <motion.circle
              key={`n-${li}-${ni}`}
              cx={node.x} cy={node.y} r="2.5"
              fill="rgba(124, 58, 237, 0.6)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: li * 0.1 + ni * 0.04 }}
            />
          )
          return elements
        })
      })}
    </svg>
  )
}

// A brief branded splash — hard-capped so it never gates already-rendered
// content for long, and skipped entirely for reduced-motion users.
export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) {
      onComplete()
      return
    }
    const DURATION = 550
    let raf
    let start = null
    const tick = (now) => {
      if (start === null) start = now
      const p = Math.min(((now - start) / DURATION) * 100, 100)
      setProgress(p)
      if (p < 100) raf = requestAnimationFrame(tick)
      else onComplete()
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onComplete])

  return (
    <motion.div
      exit={{ opacity: 0 }}
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="fixed inset-0 z-[200] bg-void flex flex-col items-center justify-center"
    >
      <MiniNetwork />

      <div className="text-center">
        {/* Rendered as a <p>, not a heading, so it doesn't precede the real h1 */}
        <p className="text-2xl font-bold text-gradient-neural mb-2">Ahmad Sharara</p>
        <p className="text-text-muted text-sm font-mono mb-8">AI &amp; Software Engineer</p>
      </div>

      <div
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Loading"
        className="w-48 h-1 bg-border rounded-full overflow-hidden"
      >
        <div
          className="h-full bg-gradient-to-r from-neural to-synapse rounded-full"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <span className="sr-only">Loading portfolio…</span>
    </motion.div>
  )
}
