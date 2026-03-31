import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'

const jobs = [
  {
    role: 'Automation & Integration Engineer',
    company: 'Aligned Tech',
    location: 'Hazmieh, LB',
    date: 'Jan 2026 – Present',
    current: true,
    bullets: [
      'Designed and deployed automation workflows, chatbots, and web scraping solutions using Make, Chatcore, and custom APIs — connecting platforms end-to-end to streamline operations.',
      'Developed and maintained client-facing WordPress websites and managed ongoing bot/workflow optimization for reliability and performance.',
    ],
  },
  {
    role: 'AI Developer Intern',
    company: 'Apliman Technologies',
    location: 'Beirut, LB',
    date: 'Sep 2025 – Dec 2025',
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
    bullets: [
      'Fine-tuned AraBERTv2 / MARBERTv2 / Asafaya; soft-voting ensemble achieved up to 88% accuracy. Shipped an MVP in 1 week (Flask API + React) with model selection and live confidence charts.',
      'Served models via FastAPI/Flask REST for real-time and batch inference, with input validation, OpenAPI docs, and reproducible evaluation logging.',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 px-6 bg-grid-pattern">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          label="Experience"
          title="Where I've worked"
          subtitle="A timeline across AI, NLP, and software engineering."
        />

        <div className="relative pl-8 border-l-2 border-border space-y-10">
          {jobs.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.15 }}
              className="relative group"
            >
              {/* Dot */}
              <div
                className={`absolute -left-[calc(2rem+5px)] top-2 w-3 h-3 rounded-full border-2 ${
                  job.current
                    ? 'border-matrix bg-matrix shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                    : 'border-neural bg-neural/40'
                }`}
              />

              <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 hover:border-neural/40 transition-all duration-300 group-hover:glow-neural">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{job.role}</h3>
                    <p className="text-neural-light font-medium">{job.company} — {job.location}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-neural/10 border border-neural/20 text-xs font-mono text-neural-light whitespace-nowrap">
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
    </section>
  )
}
