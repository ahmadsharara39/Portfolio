import { motion } from 'framer-motion'

const colors = {
  neural: 'rgba(124, 58, 237, 0.08)',
  synapse: 'rgba(6, 182, 212, 0.06)',
  pulse: 'rgba(236, 72, 153, 0.06)',
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
