import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import { HiOutlineShoppingCart, HiOutlineChatBubbleLeftRight, HiOutlineChartBar, HiOutlineShieldCheck, HiOutlineSun, HiOutlineHandRaised } from 'react-icons/hi2'
import SectionHeading from './SectionHeading'

const projects = [
  {
    icon: <HiOutlineShoppingCart />,
    type: 'Full-Stack Web App',
    title: 'Nexis E-Commerce Platform',
    desc: 'A dynamic e-commerce platform with an admin panel for product/order management, Stripe payment integration, role-based access control, and a seamless shopping experience.',
    tech: ['Laravel', 'PHP', 'React', 'Tailwind CSS', 'Stripe', 'MySQL'],
    link: 'https://github.com/ahmadsharara39/Nexis-Full-Stack',
    gradient: 'from-neural to-synapse',
    accent: 'neural',
  },
  {
    icon: <HiOutlineChatBubbleLeftRight />,
    type: 'NLP / Deep Learning',
    title: 'Arabic Tweet Sentiment Analysis',
    desc: 'A modular NLP pipeline using MARBERTv2, AraBERTv2, and Asafaya transformers with a logits-averaging ensemble achieving 88% accuracy. Includes Flask + React web interface.',
    tech: ['Python', 'PyTorch', 'Hugging Face', 'Flask', 'React'],
    link: 'https://github.com/ahmadsharara39/Sentiment-Analysis-of-Arabic-Tweets-using-MARBERTv2',
    gradient: 'from-pulse to-neural',
    accent: 'pulse',
  },
  {
    icon: <HiOutlineChartBar />,
    type: 'NLP / FinTech',
    title: 'ABSA — Financial News',
    desc: 'Implemented Aspect-Based Sentiment Analysis with TF-IDF, entity-sentiment mapping, and FinBERT. Claim-veracity pre-filter using ensemble with 98.6% accuracy.',
    tech: ['Python', 'FinBERT', 'TF-IDF', 'scikit-learn', 'pandas'],
    link: 'https://github.com/ahmadsharara39/Aspect-Based-Sentiment-Analysis-in-Financial-News',
    gradient: 'from-matrix to-synapse',
    accent: 'matrix',
  },
  {
    icon: <HiOutlineShieldCheck />,
    type: 'Machine Learning',
    title: 'Credit Card Fraud Detection',
    desc: 'Robust ML pipeline for fraud detection using ensemble learning. Handles class imbalance with SMOTE, trains RF, LR, NB, MLP — combined via Stacking Classifier.',
    tech: ['Python', 'scikit-learn', 'SMOTE', 'Stacking', 'Matplotlib'],
    link: 'https://github.com/ahmadsharara39/Credit-Card-Fraud-Detection-Using-Ensemble-Methods',
    gradient: 'from-orange-500 to-rose-500',
    accent: 'pulse',
  },
  {
    icon: <HiOutlineSun />,
    type: 'ML / Energy',
    title: 'Solar PV Power Prediction',
    desc: 'End-to-end ML pipeline for solar energy prediction using weather data. PCA feature selection, Grid Search CV, tuned Random Forest & XGBoost achieving R² of 0.94.',
    tech: ['Python', 'XGBoost', 'Random Forest', 'PCA', 'seaborn'],
    link: 'https://github.com/ahmadsharara39/Predict-Solar-Photovoltaic-PV-Power-Generation-Using-Historical-Weather-and-Environmental-Data',
    gradient: 'from-yellow-500 to-orange-500',
    accent: 'synapse',
  },
  {
    icon: <HiOutlineHandRaised />,
    type: 'Embedded Systems / IoT',
    title: 'Prosthetic Arm — EMG & Voice',
    desc: 'Dual-mode prosthetic arm control (EMG + on-device voice) with 50 ms latency and 85%+ accuracy. 3D-printed 7-DOF hand powered by 7 servos via ESP32 with REST APIs.',
    tech: ['ESP32', 'C++', 'EMG', '3D Printing', 'REST API'],
    link: null,
    gradient: 'from-neural to-pulse',
    accent: 'neural',
  },
]

function ScanLine() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-synapse/40 to-transparent animate-scan" />
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6 bg-dot-pattern">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Projects"
          title="Things I've built"
          subtitle="Spanning full-stack development, NLP, and machine learning."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-surface border border-border rounded-2xl overflow-hidden flex flex-col hover:border-border-glow hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            >
              <ScanLine />

              {/* Banner with animated gradient */}
              <div className="relative h-44 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-[0.06] group-hover:opacity-[0.15] transition-opacity duration-700`} />
                <div className="absolute inset-0 bg-grid-pattern opacity-30" />

                {/* Animated circuit lines */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.04] group-hover:opacity-[0.1] transition-opacity" viewBox="0 0 400 200">
                  <path d="M0 100 H150 L170 80 H250 L270 100 H400" stroke="currentColor" fill="none" strokeWidth="1" className="text-neural" />
                  <path d="M0 140 H80 L100 120 H180 L200 140 H400" stroke="currentColor" fill="none" strokeWidth="1" className="text-synapse" />
                  <path d="M0 60 H120 L140 80 H220 L240 60 H400" stroke="currentColor" fill="none" strokeWidth="1" className="text-pulse" />
                  <circle cx="170" cy="80" r="3" className="fill-neural opacity-50" />
                  <circle cx="270" cy="100" r="3" className="fill-synapse opacity-50" />
                  <circle cx="100" cy="120" r="3" className="fill-pulse opacity-50" />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="text-5xl text-text/15 group-hover:text-text/30 transition-all duration-500"
                  >
                    {p.icon}
                  </motion.div>
                </div>
              </div>

              {/* Body */}
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
                  >
                    <FiGithub />
                    View on GitHub
                    <FiExternalLink className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
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
        </div>
      </div>
    </section>
  )
}
