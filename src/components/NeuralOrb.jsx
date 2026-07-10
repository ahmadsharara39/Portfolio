import { motion, useReducedMotion } from 'framer-motion'
import { useMotion } from '../context/MotionContext'

// Values come from CSS custom properties so the glow adapts to light/dark.
const colors = {
  neural: 'var(--orb-neural)',
  synapse: 'var(--orb-synapse)',
  pulse: 'var(--orb-pulse)',
}

export default function NeuralOrb({ className = '', color = 'neural', delay = 0 }) {
  const reduce = useReducedMotion()
  const { paused } = useMotion()
  // Reading `paused` here means a re-render on toggle swaps the animate target
  // to a static value, which cancels the in-flight framer loop (MotionConfig
  // alone can't stop an already-mounted loop).
  const frozen = reduce || paused

  return (
    <motion.div
      initial={frozen ? false : { scale: 0.8, opacity: 0 }}
      animate={frozen ? { scale: 1, opacity: 1 } : { scale: [0.8, 1.1, 0.9, 1], opacity: 1 }}
      transition={frozen ? { duration: 0 } : { duration: 8, delay, repeat: Infinity, repeatType: 'reverse' }}
      className={`rounded-full blur-3xl pointer-events-none ${className}`}
      style={{ background: `radial-gradient(circle, ${colors[color]} 0%, transparent 70%)` }}
    />
  )
}
