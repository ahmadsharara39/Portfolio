import { motion, useReducedMotion } from 'framer-motion'
import { FiArrowRight, FiMail, FiExternalLink, FiGithub, FiLinkedin, FiMapPin } from 'react-icons/fi'
import NeuralOrb from './NeuralOrb'
import NeuralNetworkViz from './NeuralNetworkViz'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useMotion } from '../context/MotionContext'

const primaryRole = 'Automation & Integration Engineer'

const floatingBadges = [
  { label: 'Make', x: '8%', y: '20%', delay: 0 },
  { label: 'FastAPI', x: '85%', y: '15%', delay: 0.5 },
  { label: 'React', x: '5%', y: '70%', delay: 1 },
]

const socials = [
  { icon: <FiGithub />, href: 'https://github.com/ahmadsharara39', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://linkedin.com/in/ahmadsharara', label: 'LinkedIn' },
]

const stats = [
  ['3+', 'Roles'],
  ['7+', 'Projects'],
  ['88%', 'NLP Acc.'],
]

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const { paused } = useMotion()
  const frozen = reduceMotion || paused
  const isLg = useMediaQuery('(min-width: 1024px)')

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      <NeuralOrb className="absolute top-1/4 left-1/4 w-[600px] h-[600px]" color="neural" />
      <NeuralOrb className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px]" color="synapse" delay={2} />
      <NeuralOrb className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2" color="pulse" delay={4} />

      {/* Floating tech badges — only mounted on lg (never loop off-screen on mobile) */}
      {isLg && floatingBadges.map((badge) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 + badge.delay, duration: 0.5 }}
          className="absolute"
          style={{ left: badge.x, top: badge.y }}
          aria-hidden="true"
        >
          <motion.div
            animate={frozen ? { y: 0 } : { y: [0, -8, 0] }}
            transition={frozen ? { duration: 0 } : { duration: 3 + badge.delay * 0.5, repeat: Infinity, ease: 'easeInOut' }}
            className="px-3 py-1.5 rounded-full bg-surface/60 backdrop-blur-sm border border-border/50 text-xs font-mono text-text-dim"
          >
            {badge.label}
          </motion.div>
        </motion.div>
      ))}

      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left - Text */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-matrix/10 border border-matrix/25 text-matrix text-xs font-medium mb-5"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-matrix opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-matrix" />
            </span>
            Available for full-time work
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-4"
          >
            <span className="text-gradient-neural glow-text-neural">Ahmad</span>
            <br />
            <span className="text-gradient-pulse">Sharara</span>
          </motion.h1>

          {/* Single, stable identity — no cycling, always fully legible */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="min-h-[2.5rem] mb-3 flex items-center justify-center lg:justify-start"
          >
            <span className="font-mono text-base sm:text-xl text-synapse-light leading-tight break-words">
              &gt; {primaryRole}
              <span className="animate-pulse ml-0.5 text-neural" aria-hidden="true">|</span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex items-center justify-center lg:justify-start gap-1.5 text-sm text-text-dim mb-7"
          >
            <FiMapPin className="text-neural-light shrink-0" aria-hidden="true" />
            <span>Remote · Beirut / Saida, Lebanon · open to relocation</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg text-text-dim max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
          >
            I connect platforms end-to-end — building{' '}
            <span className="text-neural-light font-medium">automation workflows</span>,{' '}
            <span className="text-synapse-light font-medium">chatbots &amp; API integrations</span>, and{' '}
            <span className="text-pulse-light font-medium">AI/ML features</span> that streamline how teams work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap justify-center lg:justify-start gap-4"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-neural to-synapse text-white font-semibold shadow-lg shadow-neural/25 hover:shadow-neural/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              View My Work
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border hover:border-neural text-text-dim hover:text-neural-light font-semibold hover:-translate-y-0.5 transition-all duration-300"
            >
              <FiMail aria-hidden="true" />
              Get in Touch
            </a>
          </motion.div>

          {/* Secondary links: résumé + code/profile — the credibility path */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-5"
          >
            <a
              href="/Ahmad_Sharara_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-text-dim hover:text-neural-light transition-colors"
            >
              <FiExternalLink className="text-xs" aria-hidden="true" />
              View résumé
            </a>
            <span className="w-px h-4 bg-border" aria-hidden="true" />
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label} (opens in a new tab)`}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-border text-text-dim hover:text-neural-light hover:border-neural transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </motion.div>

          {/* Proof stats — visible on all breakpoints, incl. desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex justify-center lg:justify-start gap-8 mt-8"
          >
            {stats.map(([val, label]) => (
              <div key={label} className="text-center lg:text-left">
                <div className="text-2xl font-extrabold text-gradient-neural">{val}</div>
                <div className="text-xs text-text-dim uppercase tracking-wider mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right - Neural Network Visualization (mounted only on lg) */}
        {isLg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-neural/5 rounded-3xl blur-3xl" />
              <NeuralNetworkViz />
            </div>
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-dim text-xs font-mono"
        aria-hidden="true"
      >
        <span>scroll</span>
        <motion.div
          animate={frozen ? { y: 0 } : { y: [0, 8, 0] }}
          transition={frozen ? { duration: 0 } : { repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 rounded-full border border-border flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-neural" />
        </motion.div>
      </motion.div>
    </section>
  )
}
