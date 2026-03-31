import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from './SectionHeading'

const stats = [
  { value: 3, suffix: '+', label: 'Roles' },
  { value: 6, suffix: '+', label: 'Projects' },
  { value: 88, suffix: '%', label: 'NLP Accuracy' },
]

const terminalLines = [
  { text: '> initializing ahmad_sharara.ai ...', color: 'text-text-muted', delay: 0 },
  { text: '✓ Loading neural pathways', color: 'text-matrix', delay: 600 },
  { text: '✓ Mounting NLP transformers', color: 'text-matrix', delay: 1200 },
  { text: '✓ Connecting API endpoints', color: 'text-matrix', delay: 1800 },
  { text: '✓ Automation workflows: ACTIVE', color: 'text-matrix', delay: 2400 },
  { text: '', color: '', delay: 3000 },
  { text: 'const profile = {', color: 'text-purple-400', delay: 3200 },
  { text: '  role: "AI & Software Engineer",', color: 'text-emerald-400', delay: 3500 },
  { text: '  location: "Lebanon",', color: 'text-emerald-400', delay: 3800 },
  { text: '  stack: ["PyTorch", "React",', color: 'text-sky-400', delay: 4100 },
  { text: '    "FastAPI", "Make.com"],', color: 'text-sky-400', delay: 4400 },
  { text: '  status: "ready"', color: 'text-orange-400', delay: 4700 },
  { text: '}', color: 'text-purple-400', delay: 5000 },
  { text: '', color: '', delay: 5200 },
  { text: '> System online. All modules loaded.', color: 'text-synapse-light', delay: 5400 },
]

function AnimatedCounter({ value, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1500
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, value])

  return <span ref={ref}>{count}{suffix}</span>
}

function AnimatedTerminal() {
  const [visibleLines, setVisibleLines] = useState([])
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!inView) return
    const timers = terminalLines.map((line, i) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i])
      }, line.delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [inView])

  return (
    <div ref={ref} className="bg-deep border border-border rounded-2xl overflow-hidden glow-neural">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-void/50">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-auto flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-matrix animate-pulse" />
          <span className="text-[0.65rem] text-matrix font-mono">LIVE</span>
        </span>
      </div>
      <div className="p-5 font-mono text-sm space-y-1 min-h-[360px]">
        {terminalLines.map((line, i) => (
          <div
            key={i}
            className={`transition-all duration-300 ${
              visibleLines.includes(i)
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-4'
            } ${line.color}`}
          >
            {line.text || '\u00A0'}
          </div>
        ))}
        {visibleLines.length === terminalLines.length && (
          <div className="text-text-muted animate-pulse mt-1">▌</div>
        )}
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading label="About Me" title="Turning data into decisions." subtitle="And ideas into products." />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-text-dim text-lg leading-relaxed"
            >
              I'm a Computer & Communications Engineering graduate from Rafik Hariri University with hands-on
              experience in <span className="text-neural-light font-medium">AI/ML</span>,{' '}
              <span className="text-synapse-light font-medium">NLP</span>, and{' '}
              <span className="text-pulse-light font-medium">full-stack development</span>. I've fine-tuned transformer
              models, built end-to-end automation workflows, and shipped production-ready web applications.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-text-dim text-lg leading-relaxed"
            >
              Currently working as an Automation & Integration Engineer, I design chatbots, web-scraping
              solutions, and API integrations that streamline business operations. I thrive at the intersection
              of intelligent systems and practical engineering.
            </motion.p>

            <div className="grid grid-cols-3 gap-4 pt-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  className="group bg-surface border border-border rounded-xl p-5 text-center hover:border-neural/50 transition-all duration-300 hover:glow-neural"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-gradient-neural">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-text-muted uppercase tracking-wider mt-1 group-hover:text-text-dim transition-colors">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <AnimatedTerminal />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
