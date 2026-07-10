import { motion } from 'framer-motion'
import { HiOutlineAcademicCap } from 'react-icons/hi2'
import { FiAward } from 'react-icons/fi'
import SectionHeading from './SectionHeading'

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-label" className="relative py-16 md:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading labelId="education-label" label="Education" title="Academic background" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl bg-surface border border-border rounded-2xl p-8 flex flex-col sm:flex-row items-start gap-6 hover:border-neural/40 transition-all duration-300 glow-neural"
        >
          <div className="w-20 h-20 rounded-2xl bg-neural/10 flex items-center justify-center text-3xl text-neural shrink-0 mx-auto sm:mx-0">
            <HiOutlineAcademicCap />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold">B.E. in Computer &amp; Communications Engineering</h3>
            <p className="text-neural-light font-medium mt-1">Rafik Hariri University — Mechref, Lebanon</p>
            <p className="font-mono text-sm text-text-muted mt-1">Aug 2021 – May 2025</p>

            <div className="mt-4 flex items-start gap-2 rounded-xl bg-matrix/10 border border-matrix/25 px-3 py-2 text-matrix text-xs font-medium text-left">
              <FiAward aria-hidden="true" className="mt-0.5 shrink-0 text-sm" />
              <span>
                1st Place — IEEE Lebanon National Student Competition (LNSC) 2025 · Biomedical Engineering Hardware Track
              </span>
            </div>

            <p className="text-text-dim text-sm mt-3">
              Capstone: the award-winning{' '}
              <a href="#projects" className="text-neural-light hover:text-neural underline underline-offset-2">
                EMG + Voice Prosthetic Arm
              </a>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
