import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi'
import {
  HiOutlineShoppingCart,
  HiOutlineChatBubbleLeftRight,
  HiOutlineChartBar,
  HiOutlineShieldCheck,
  HiOutlineSun,
  HiOutlineHandRaised,
  HiOutlineBolt,
} from 'react-icons/hi2'
import SectionHeading from './SectionHeading'

const categories = ['All', 'AI / ML', 'NLP', 'Web', 'IoT']

// --- FlowPilot AI links -------------------------------------------------
// Live demo confirmed. Drop the repo URL below to enable the "Code" button.
const FLOWPILOT_LIVE = 'https://flow-pilot-ai-omega.vercel.app'
const FLOWPILOT_CODE = '' // e.g. 'https://github.com/ahmadsharara39/FlowPilot-AI'
// -----------------------------------------------------------------------

const featured = {
  category: 'Web',
  type: 'AI Workflow Automation Platform',
  title: 'FlowPilot AI',
  date: 'Jul 2026',
  desc: 'A full-stack platform to create, run, and monitor automation workflows that chain triggers, AI steps, and actions — deployed on Vercel + Render/PostgreSQL with JWT auth and per-user isolation.',
  highlights: [
    'Extensible execution engine using a step-registry / dispatch pattern with output chaining and per-step audit logging.',
    'Pluggable AI-provider abstraction (OpenRouter + deterministic mock fallback) that runs with zero API keys.',
    'Typed end-to-end APIs — Pydantic v2 ↔ TypeScript — with manual and secure webhook triggers.',
  ],
  tech: ['FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Pydantic v2', 'JWT', 'Vercel', 'Render'],
  pipeline: ['Trigger', 'AI Step', 'Action'],
}

const projects = [
  {
    icon: <HiOutlineShoppingCart />,
    type: 'Full-Stack Web App',
    category: 'Web',
    title: 'Nexis E-Commerce Platform',
    desc: 'A dynamic e-commerce platform with an admin panel for product/order management, Stripe payment integration, role-based access control, and a seamless shopping experience.',
    tech: ['Laravel', 'PHP', 'React', 'Tailwind CSS', 'Stripe', 'MySQL'],
    link: 'https://github.com/ahmadsharara39/Nexis-Full-Stack',
    gradient: 'from-neural to-synapse',
  },
  {
    icon: <HiOutlineChatBubbleLeftRight />,
    type: 'NLP / Deep Learning',
    category: 'NLP',
    title: 'Arabic Tweet Sentiment Analysis',
    desc: 'A modular NLP pipeline using MARBERTv2, AraBERTv2, and Asafaya transformers with a logits-averaging ensemble achieving 88% accuracy. Includes Flask + React web interface.',
    tech: ['Python', 'PyTorch', 'Hugging Face', 'Flask', 'React'],
    link: 'https://github.com/ahmadsharara39/Sentiment-Analysis-of-Arabic-Tweets-using-MARBERTv2',
    gradient: 'from-pulse to-neural',
  },
  {
    icon: <HiOutlineChartBar />,
    type: 'NLP / FinTech',
    category: 'NLP',
    title: 'ABSA — Financial News',
    desc: 'Implemented Aspect-Based Sentiment Analysis with TF-IDF, entity-sentiment mapping, and FinBERT. Claim-veracity pre-filter using ensemble with 98.6% accuracy.',
    tech: ['Python', 'FinBERT', 'TF-IDF', 'scikit-learn', 'pandas'],
    link: 'https://github.com/ahmadsharara39/Aspect-Based-Sentiment-Analysis-in-Financial-News',
    gradient: 'from-matrix to-synapse',
  },
  {
    icon: <HiOutlineShieldCheck />,
    type: 'Machine Learning',
    category: 'AI / ML',
    title: 'Credit Card Fraud Detection',
    desc: 'Robust ML pipeline for fraud detection using ensemble learning. Handles class imbalance with SMOTE, trains RF, LR, NB, MLP — combined via Stacking Classifier.',
    tech: ['Python', 'scikit-learn', 'SMOTE', 'Stacking', 'Matplotlib'],
    link: 'https://github.com/ahmadsharara39/Credit-Card-Fraud-Detection-Using-Ensemble-Methods',
    gradient: 'from-orange-500 to-rose-500',
  },
  {
    icon: <HiOutlineSun />,
    type: 'ML / Energy',
    category: 'AI / ML',
    title: 'Solar PV Power Prediction',
    desc: 'End-to-end ML pipeline for solar energy prediction using weather data. PCA feature selection, Grid Search CV, tuned Random Forest & XGBoost achieving R² of 0.94.',
    tech: ['Python', 'XGBoost', 'Random Forest', 'PCA', 'seaborn'],
    link: 'https://github.com/ahmadsharara39/Predict-Solar-Photovoltaic-PV-Power-Generation-Using-Historical-Weather-and-Environmental-Data',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: <HiOutlineHandRaised />,
    type: 'Embedded Systems / IoT',
    category: 'IoT',
    title: 'Prosthetic Arm — EMG & Voice',
    desc: 'Dual-mode prosthetic arm control (EMG + on-device voice) with 50 ms latency and 85%+ accuracy. 3D-printed 7-DOF hand powered by 7 servos via ESP32 with REST APIs.',
    tech: ['ESP32', 'C++', 'EMG', '3D Printing', 'REST API'],
    link: null,
    gradient: 'from-neural to-pulse',
  },
]

function ScanLine({ via = 'synapse' }) {
  const color = via === 'neural' ? 'via-neural/40' : 'via-synapse/40'
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div className={`absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent ${color} to-transparent animate-scan`} />
    </div>
  )
}

function FeaturedProject() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className="group relative mb-6 overflow-hidden rounded-3xl border border-border-glow bg-surface glow-neural"
    >
      <ScanLine via="neural" />
      <div className="absolute inset-0 bg-gradient-to-br from-neural/[0.07] via-transparent to-synapse/[0.07] pointer-events-none" />

      <div className="relative grid lg:grid-cols-2 gap-8 p-7 sm:p-9">
        {/* Left — content */}
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neural/15 border border-neural/30 text-neural-light text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-neural-light animate-pulse" />
              Featured
            </span>
            <span className="font-mono text-xs text-synapse-light uppercase tracking-widest">{featured.type}</span>
            <span className="font-mono text-xs text-text-muted">{featured.date}</span>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-neural/10 border border-neural/25 flex items-center justify-center text-2xl text-neural-light shrink-0">
              <HiOutlineBolt aria-hidden="true" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              <span className="text-gradient-neural">{featured.title}</span>
            </h3>
          </div>

          <p className="text-text-dim leading-relaxed mb-5">{featured.desc}</p>

          <ul className="space-y-2.5 mb-6">
            {featured.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm text-text-dim">
                <span className="text-synapse mt-0.5 shrink-0" aria-hidden="true">▸</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {featured.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-full text-[0.72rem] bg-neural/8 border border-neural/15 text-text-dim"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-3">
            <a
              href={FLOWPILOT_LIVE}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-neural to-synapse text-white font-semibold shadow-lg shadow-neural/25 hover:shadow-neural/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              Live Demo
              <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
            {FLOWPILOT_CODE && (
              <a
                href={FLOWPILOT_CODE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-neural text-text-dim hover:text-neural-light font-semibold hover:-translate-y-0.5 transition-all duration-300"
              >
                <FiGithub aria-hidden="true" />
                Code
              </a>
            )}
          </div>
        </div>

        {/* Right — workflow pipeline visual */}
        <div className="relative hidden lg:flex items-center justify-center">
          <div className="absolute inset-0 bg-neural/5 rounded-2xl blur-3xl" />
          <div className="relative w-full max-w-sm bg-code border border-code-border rounded-2xl p-6 font-mono text-sm shadow-2xl">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-pulse/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-matrix/70" />
              <span className="ml-auto text-[0.65rem] text-slate-500">workflow.run()</span>
            </div>
            <div className="space-y-3">
              {featured.pipeline.map((step, i) => (
                <div key={step}>
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-neural/25 border border-neural/40 flex items-center justify-center text-xs text-violet-300">
                      {i + 1}
                    </span>
                    <span className="flex-1 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-slate-200">
                      {step}
                    </span>
                    <span className="text-[0.6rem] text-emerald-400">✓</span>
                  </div>
                  {i < featured.pipeline.length - 1 && (
                    <div className="ml-3.5 h-4 w-px bg-gradient-to-b from-neural/50 to-synapse/40" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-code-border flex items-center gap-2 text-[0.7rem] text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              zero API keys · per-user isolation
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter)
  const showFeatured = filter === 'All' || filter === featured.category

  return (
    <section id="projects" className="relative py-24 px-6 bg-dot-pattern">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Projects"
          title="Things I've built"
          subtitle="Spanning AI automation, full-stack development, NLP, and machine learning."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter projects by category">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                filter === cat
                  ? 'bg-neural text-white shadow-lg shadow-neural/25'
                  : 'bg-surface border border-border text-text-dim hover:border-neural/40 hover:text-neural-light'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {showFeatured && <FeaturedProject />}

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-surface border border-border rounded-2xl overflow-hidden flex flex-col hover:border-border-glow hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
              >
                <ScanLine />

                <div className="relative h-44 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-[0.06] group-hover:opacity-[0.15] transition-opacity duration-700`} />
                  <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                  <svg className="absolute inset-0 w-full h-full opacity-[0.05] group-hover:opacity-[0.12] transition-opacity" viewBox="0 0 400 200" aria-hidden="true">
                    <path d="M0 100 H150 L170 80 H250 L270 100 H400" stroke="currentColor" fill="none" strokeWidth="1" className="text-neural" />
                    <path d="M0 140 H80 L100 120 H180 L200 140 H400" stroke="currentColor" fill="none" strokeWidth="1" className="text-synapse" />
                    <path d="M0 60 H120 L140 80 H220 L240 60 H400" stroke="currentColor" fill="none" strokeWidth="1" className="text-pulse" />
                    <circle cx="170" cy="80" r="3" className="fill-neural opacity-50" />
                    <circle cx="270" cy="100" r="3" className="fill-synapse opacity-50" />
                    <circle cx="100" cy="120" r="3" className="fill-pulse opacity-50" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-5xl text-text/15 group-hover:text-text/30 transition-all duration-500" aria-hidden="true">
                      {p.icon}
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <span className="font-mono text-xs text-neural uppercase tracking-widest mb-2">
                    {p.type}
                  </span>
                  <h3 className="text-lg font-bold mb-3 group-hover:text-neural-light transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-text-dim text-sm flex-1 mb-4 leading-relaxed">{p.desc}</p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full text-[0.7rem] bg-neural/6 border border-neural/10 text-text-muted group-hover:border-neural/20 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {p.link ? (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-neural-light hover:text-neural transition-colors group/link"
                      aria-label={`View ${p.title} on GitHub`}
                    >
                      <FiGithub aria-hidden="true" />
                      View on GitHub
                      <FiExternalLink className="opacity-0 group-hover/link:opacity-100 transition-opacity" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-sm text-text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-text-muted" />
                      Hardware Project — No Repo
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
