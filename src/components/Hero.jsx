import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiMail } from 'react-icons/fi'
import NeuralOrb from './NeuralOrb'
import NeuralNetworkViz from './NeuralNetworkViz'

const roles = [
  'AI Engineer',
  'Automation Specialist',
  'NLP Developer',
  'Full-Stack Builder',
  'Integration Architect',
]

const floatingBadges = [
  { label: 'PyTorch', x: '8%', y: '20%', delay: 0 },
  { label: 'React', x: '85%', y: '15%', delay: 0.5 },
  { label: 'FastAPI', x: '5%', y: '70%', delay: 1 },
  { label: 'Hugging Face', x: '88%', y: '65%', delay: 1.5 },
  { label: 'TensorFlow', x: '15%', y: '45%', delay: 2 },
  { label: 'Make.com', x: '80%', y: '40%', delay: 2.5 },
]

function useTypingEffect(words, typingSpeed = 80, deletingSpeed = 40, pause = 1800) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.slice(0, text.length + 1))
        if (text.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), pause)
        }
      } else {
        setText(currentWord.slice(0, text.length - 1))
        if (text.length === 0) {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pause])

  return text
}

export default function Hero() {
  const typedRole = useTypingEffect(roles)

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      <NeuralOrb className="absolute top-1/4 left-1/4 w-[600px] h-[600px]" color="neural" />
      <NeuralOrb className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px]" color="synapse" delay={2} />
      <NeuralOrb className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2" color="pulse" delay={4} />

      {/* Floating tech badges */}
      {floatingBadges.map((badge) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 + badge.delay, duration: 0.5 }}
          className="absolute hidden lg:block"
          style={{ left: badge.x, top: badge.y }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3 + badge.delay * 0.5, repeat: Infinity, ease: 'easeInOut' }}
            className="px-3 py-1.5 rounded-full bg-surface/60 backdrop-blur-sm border border-border/50 text-xs font-mono text-text-muted"
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neural/10 border border-neural/20 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-matrix opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-matrix" />
            </span>
            <span className="text-sm font-medium text-neural-light font-mono">
              Available for opportunities
            </span>
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

          {/* Typing effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="h-10 mb-6 flex items-center justify-center lg:justify-start"
          >
            <span className="font-mono text-lg sm:text-xl text-synapse-light">
              &gt; {typedRole}
              <span className="animate-pulse ml-0.5 text-neural">|</span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg text-text-dim max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            Building intelligent systems — from{' '}
            <span className="text-neural-light font-medium">NLP pipelines</span> and{' '}
            <span className="text-synapse-light font-medium">ML models</span> to{' '}
            <span className="text-pulse-light font-medium">automation workflows</span> and
            seamless API integrations.
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
        </div>

        {/* Right - Neural Network Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hidden lg:flex items-center justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-neural/5 rounded-3xl blur-3xl" />
            <NeuralNetworkViz />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted text-xs font-mono"
      >
        <span>scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 rounded-full border border-border flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-neural" />
        </motion.div>
      </motion.div>
    </section>
  )
}
