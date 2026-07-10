import { motion } from 'framer-motion'

// Values come from CSS custom properties so the glow adapts to light/dark.
const colors = {
  neural: 'var(--orb-neural)',
  synapse: 'var(--orb-synapse)',
  pulse: 'var(--orb-pulse)',
}

export default function NeuralOrb({ className = '', color = 'neural', delay = 0 }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: [0.8, 1.1, 0.9, 1], opacity: 1 }}
      transition={{ duration: 8, delay, repeat: Infinity, repeatType: 'reverse' }}
      className={`rounded-full blur-3xl pointer-events-none ${className}`}
      style={{ background: `radial-gradient(circle, ${colors[color]} 0%, transparent 70%)` }}
    />
  )
}
