import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'

const stats = [
  { value: '3+', label: 'Roles' },
  { value: '6+', label: 'Projects' },
  { value: '88%', label: 'NLP Accuracy' },
]

const codeLines = [
  { indent: 0, content: <><span className="text-purple-400">const</span> <span className="text-sky-400">ahmad</span> = {'{'}</> },
  { indent: 1, content: <><span className="text-sky-400">role</span>: <span className="text-emerald-400">"AI & Software Engineer"</span>,</> },
  { indent: 1, content: <><span className="text-sky-400">location</span>: <span className="text-emerald-400">"Lebanon"</span>,</> },
  { indent: 1, content: <><span className="text-sky-400">passions</span>: [</> },
  { indent: 2, content: <><span className="text-emerald-400">"Machine Learning"</span>,</> },
  { indent: 2, content: <><span className="text-emerald-400">"NLP"</span>,</> },
  { indent: 2, content: <><span className="text-emerald-400">"Full-Stack Dev"</span>,</> },
  { indent: 2, content: <><span className="text-emerald-400">"Automation"</span>,</> },
  { indent: 1, content: <>],</> },
  { indent: 1, content: <><span className="text-sky-400">coffee</span>: <span className="text-orange-400">true</span></> },
  { indent: 0, content: <>{'}'}</> },
]

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
              experience in <span className="text-neural-light">AI/ML</span>,{' '}
              <span className="text-synapse-light">NLP</span>, and{' '}
              <span className="text-pulse-light">full-stack development</span>. I've fine-tuned transformer
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
                  className="bg-surface border border-border rounded-xl p-5 text-center hover:border-neural/50 transition-colors group"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-gradient-neural">{s.value}</div>
                  <div className="text-xs text-text-muted uppercase tracking-wider mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="bg-surface border border-border rounded-2xl overflow-hidden glow-neural">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-deep">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs text-text-muted font-mono">about.js</span>
              </div>
              <div className="p-6 font-mono text-sm leading-loose">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="flex"
                  >
                    <span className="text-text-muted/30 w-8 text-right mr-4 select-none text-xs leading-loose">
                      {i + 1}
                    </span>
                    <span style={{ paddingLeft: `${line.indent * 1.5}rem` }}>{line.content}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
