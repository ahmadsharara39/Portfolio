import { motion } from 'framer-motion'
import { FiArrowRight, FiMail } from 'react-icons/fi'
import NeuralOrb from './NeuralOrb'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      <NeuralOrb className="absolute top-1/4 left-1/4 w-[500px] h-[500px]" color="neural" />
      <NeuralOrb className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px]" color="synapse" delay={2} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neural/10 border border-neural/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-matrix animate-pulse" />
          <span className="text-sm font-medium text-neural-light font-mono">
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-6"
        >
          Hi, I'm{' '}
          <span className="text-gradient-neural glow-text-neural">Ahmad</span>
          <br />
          <span className="text-gradient-pulse">Sharara</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl text-text-dim max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          AI &amp; Software Engineer building intelligent systems — from{' '}
          <span className="text-neural-light">NLP pipelines</span> and{' '}
          <span className="text-synapse-light">ML models</span> to{' '}
          <span className="text-pulse-light">full-stack applications</span> and
          automation workflows.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-neural to-synapse text-white font-semibold shadow-lg shadow-neural/25 hover:shadow-neural/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            View My Work
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border hover:border-neural text-text-dim hover:text-neural-light font-semibold hover:-translate-y-0.5 transition-all duration-300"
          >
            <FiMail />
            Get in Touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex flex-col items-center gap-2 text-text-muted text-xs font-mono">
            <span>scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-5 h-8 rounded-full border border-border flex items-start justify-center pt-1.5"
            >
              <div className="w-1 h-2 rounded-full bg-neural" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
