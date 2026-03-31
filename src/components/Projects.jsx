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
  },
  {
    icon: <HiOutlineChatBubbleLeftRight />,
    type: 'NLP / Deep Learning',
    title: 'Arabic Tweet Sentiment Analysis',
    desc: 'A modular NLP pipeline using MARBERTv2, AraBERTv2, and Asafaya transformers with a logits-averaging ensemble achieving 88% accuracy. Includes a Flask + React web interface.',
    tech: ['Python', 'PyTorch', 'Hugging Face', 'Flask', 'React'],
    link: 'https://github.com/ahmadsharara39/Sentiment-Analysis-of-Arabic-Tweets-using-MARBERTv2',
    gradient: 'from-pulse to-neural',
  },
  {
    icon: <HiOutlineChartBar />,
    type: 'NLP / FinTech',
    title: 'ABSA — Financial News',
    desc: 'Implemented Aspect-Based Sentiment Analysis with TF-IDF, entity-sentiment mapping, and FinBERT. Added claim-veracity pre-filter using an ensemble with 98.6% accuracy and ROC analysis.',
    tech: ['Python', 'FinBERT', 'TF-IDF', 'scikit-learn', 'pandas'],
    link: 'https://github.com/ahmadsharara39/Aspect-Based-Sentiment-Analysis-in-Financial-News',
    gradient: 'from-matrix to-synapse',
  },
  {
    icon: <HiOutlineShieldCheck />,
    type: 'Machine Learning',
    title: 'Credit Card Fraud Detection',
    desc: 'Robust ML pipeline for detecting credit card fraud using ensemble learning. Handles class imbalance with SMOTE, trains RF, LR, NB, and MLP — combined via Stacking Classifier.',
    tech: ['Python', 'scikit-learn', 'SMOTE', 'Stacking', 'Matplotlib'],
    link: 'https://github.com/ahmadsharara39/Credit-Card-Fraud-Detection-Using-Ensemble-Methods',
    gradient: 'from-orange-500 to-rose-500',
  },
  {
    icon: <HiOutlineSun />,
    type: 'ML / Energy',
    title: 'Solar PV Power Prediction',
    desc: 'End-to-end ML pipeline to predict solar energy production using weather data. Features PCA-based feature selection, Grid Search with CV, and tuned Random Forest & XGBoost regressors achieving R² of 0.94.',
    tech: ['Python', 'XGBoost', 'Random Forest', 'PCA', 'seaborn'],
    link: 'https://github.com/ahmadsharara39/Predict-Solar-Photovoltaic-PV-Power-Generation-Using-Historical-Weather-and-Environmental-Data',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: <HiOutlineHandRaised />,
    type: 'Embedded Systems / IoT',
    title: 'Prosthetic Arm — EMG & Voice',
    desc: 'Built dual-mode prosthetic arm control (EMG + on-device voice) with 50 ms latency and 85%+ accuracy. Engineered a 3D-printed 7-DOF hand powered by 7 servos via ESP32 with REST APIs.',
    tech: ['ESP32', 'C++', 'EMG', '3D Printing', 'REST API'],
    link: null,
    gradient: 'from-neural to-pulse',
  },
]

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
              className="group bg-surface border border-border rounded-2xl overflow-hidden flex flex-col hover:border-border-glow hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Banner */}
              <div className={`relative h-40 flex items-center justify-center bg-gradient-to-br ${p.gradient} opacity-[0.07] group-hover:opacity-[0.13] transition-opacity duration-500`}>
              </div>
              <div className="absolute mt-12 self-center text-5xl text-text/20 group-hover:text-text/40 transition-colors duration-300">
                {p.icon}
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1">
                <span className="font-mono text-xs text-neural uppercase tracking-widest mb-2">
                  {p.type}
                </span>
                <h3 className="text-lg font-bold mb-3 group-hover:text-neural-light transition-colors">
                  {p.title}
                </h3>
                <p className="text-text-dim text-sm flex-1 mb-4 leading-relaxed">{p.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-full text-[0.7rem] bg-neural/6 border border-neural/10 text-text-muted"
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
