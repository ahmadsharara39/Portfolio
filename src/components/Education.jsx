import { motion } from 'framer-motion'
import { HiOutlineAcademicCap } from 'react-icons/hi2'
import SectionHeading from './SectionHeading'

export default function Education() {
  return (
    <section id="education" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading label="Education" title="Academic background" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-surface border border-border rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6 hover:border-neural/40 transition-all duration-300 glow-neural"
        >
          <div className="w-20 h-20 rounded-2xl bg-neural/10 flex items-center justify-center text-3xl text-neural shrink-0">
            <HiOutlineAcademicCap />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold">B.E. in Computer & Communications Engineering</h3>
            <p className="text-neural-light font-medium mt-1">Rafik Hariri University — Mechref, Lebanon</p>
            <p className="font-mono text-sm text-text-muted mt-1">Aug 2021 – May 2025</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
