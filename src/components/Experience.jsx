import { motion } from 'framer-motion'
import { FiZap, FiCpu, FiMessageSquare } from 'react-icons/fi'
import SectionHeading from './SectionHeading'

const jobs = [
  {
    role: 'Automation & Integration Engineer',
    company: 'Aligned Tech',
    location: 'Hazmieh, LB',
    date: 'Jan 2026 – Present',
    current: true,
    icon: <FiZap />,
    bullets: [
      'Designed and deployed automation workflows, chatbots, and web scraping solutions using Make, Chatcore, and custom APIs — connecting platforms end-to-end to streamline operations.',
      'Integrated conversational bots with WhatsApp Business numbers via the Meta for Developers platform — configuring the WhatsApp Cloud API and authoring approved broadcast/message templates for automated customer outreach.',
      'Developed and maintained client-facing WordPress websites and managed ongoing bot/workflow optimization for reliability and performance.',
    ],
  },
  {
    role: 'AI Developer Intern',
    company: 'Apliman Technologies',
    location: 'Beirut, LB',
    date: 'Sep 2025 – Dec 2025',
    icon: <FiCpu />,
    bullets: [
      'Built strong AI/ML/DL fundamentals by implementing supervised and unsupervised models on real datasets, comparing results via accuracy, precision, recall, and F1.',
      'Reproduced baseline image/text classifiers with PyTorch and TensorFlow, ran systematic hyperparameter sweeps, and documented production-ready experiments.',
    ],
  },
  {
    role: 'NLP Intern',
    company: 'Jaber Consulting',
    location: 'Beirut, LB',
    date: 'May 2025 – Jun 2025',
    icon: <FiMessageSquare />,
    bullets: [
      'Fine-tuned AraBERTv2 / MARBERTv2 / Asafaya; soft-voting ensemble achieved up to 88% accuracy. Shipped an MVP in 1 week (Flask API + React) with model selection and live confidence charts.',
      'Served models via FastAPI/Flask REST for real-time and batch inference, with input validation, OpenAPI docs, and reproducible evaluation logging.',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-label" className="relative py-16 md:py-24 px-6 bg-grid-pattern">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          labelId="experience-label"
          label="Experience"
          title="Where I've worked"
          subtitle="A timeline across AI, NLP, automation, and software engineering."
        />

        <div className="relative pl-8 sm:pl-10 max-w-4xl">
          {/* Animated timeline line */}
          <div className="absolute left-[14px] top-0 bottom-0 w-[2px]">
            <div className="w-full h-full bg-border" />
            <motion.div
              initial={{ height: '0%' }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeOut' }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-neural via-synapse to-pulse"
            />
          </div>

          <div className="space-y-10">
            {jobs.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="relative group"
              >
                {/* Dot with icon */}
                <div className={`absolute -left-8 sm:-left-10 top-6 w-7 h-7 rounded-lg flex items-center justify-center text-xs
                  ${job.current
                    ? 'bg-matrix/20 text-matrix border border-matrix/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'bg-neural/20 text-neural border border-neural/40'
                  }`}
                >
                  {job.icon}
                </div>

                <div className="bg-surface border border-border rounded-2xl p-5 sm:p-8 hover:border-neural/40 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(124,58,237,0.06)]">
                  {/* Scan line */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-neural/30 to-transparent animate-scan" />
                  </div>

                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-neural-light transition-colors duration-300">{job.role}</h3>
                      <p className="text-neural-light font-medium">{job.company} — {job.location}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap
                      ${job.current
                        ? 'bg-matrix/10 border border-matrix/20 text-matrix'
                        : 'bg-neural/10 border border-neural/20 text-neural-light'
                      }`}
                    >
                      {job.current && <span className="inline-block w-1.5 h-1.5 rounded-full bg-matrix mr-1.5 animate-pulse" />}
                      {job.date}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-text-dim">
                        <span className="text-neural mt-1 shrink-0">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
