import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LAYERS = [3, 5, 7, 5, 2]

function MiniNetwork() {
  return (
    <svg viewBox="0 0 200 100" className="w-48 h-24 mb-6">
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
                  transition={{ duration: 0.8, delay: li * 0.15 }}
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
              transition={{ duration: 0.3, delay: li * 0.15 + ni * 0.05 }}
            />
          )
          return elements
        })
      })}
    </svg>
  )
}

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(() => setDone(true), 300)
          setTimeout(() => onComplete(), 800)
          return 100
        }
        return p + Math.random() * 12 + 3
      })
    }, 60)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] bg-void flex flex-col items-center justify-center"
        >
          <MiniNetwork />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-gradient-neural mb-2">Ahmad Sharara</h2>
            <p className="text-text-muted text-sm font-mono mb-8">AI & Software Engineer</p>
          </motion.div>

          <div className="w-48 h-1 bg-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-neural to-synapse rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="text-text-muted text-xs font-mono mt-3">
            {Math.min(Math.floor(progress), 100)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
