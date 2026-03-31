import { motion } from 'framer-motion'

export default function SectionHeading({ label, title, subtitle }) {
  return (
    <div className="mb-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        className="inline-flex items-center gap-2 font-mono text-sm text-neural mb-3"
      >
        <span className="text-neural/40">//</span> {label}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ delay: 0.1 }}
        className="text-3xl sm:text-4xl font-extrabold mb-3"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.2 }}
          className="text-text-dim text-lg max-w-xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
