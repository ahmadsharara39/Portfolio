import { motion } from 'framer-motion'
import { FiCode, FiCpu, FiServer, FiDatabase, FiZap, FiTool } from 'react-icons/fi'
import SectionHeading from './SectionHeading'

const categories = [
  {
    icon: <FiCode />,
    title: 'Languages',
    color: 'neural',
    tags: ['Python', 'TypeScript', 'JavaScript', 'C++', 'PHP', 'SQL', 'HTML / CSS'],
  },
  {
    icon: <FiCpu />,
    title: 'AI / ML',
    color: 'synapse',
    tags: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Hugging Face', 'XGBoost', 'SVM', 'pandas', 'NumPy', 'Matplotlib', 'NLTK', 'spaCy'],
  },
  {
    icon: <FiServer />,
    title: 'Frameworks & APIs',
    color: 'pulse',
    tags: ['FastAPI', 'Flask', 'React', 'Tailwind CSS', 'TanStack Query', 'Pydantic v2', 'SQLAlchemy 2', 'OpenAI API', 'OpenAPI / Swagger', 'jQuery', 'Laravel'],
  },
  {
    icon: <FiDatabase />,
    title: 'Databases',
    color: 'matrix',
    tags: ['PostgreSQL', 'Redis', 'MySQL'],
  },
  {
    icon: <FiZap />,
    title: 'Automation & Platforms',
    color: 'neural',
    tags: ['Make', 'Chatcore', 'WhatsApp Business API', 'Meta for Developers', 'Meta Business Suite', 'WordPress'],
  },
  {
    icon: <FiTool />,
    title: 'Developer Tools',
    color: 'synapse',
    tags: ['Git', 'GitHub Actions', 'Docker', 'Vercel', 'Render', 'Linux', 'VS Code', 'Visual Studio', 'PyCharm', 'Arduino'],
  },
]

const colorStyles = {
  neural: {
    icon: 'bg-neural/10 text-neural border-neural/20',
    tag: 'bg-neural/8 border-neural/15 hover:border-neural hover:bg-neural/15 hover:text-neural-light hover:shadow-[0_0_12px_rgba(124,58,237,0.2)]',
    glow: 'hover:border-neural/40 hover:shadow-[0_0_30px_rgba(124,58,237,0.08)]',
    line: 'from-neural/50 to-transparent',
  },
  synapse: {
    icon: 'bg-synapse/10 text-synapse border-synapse/20',
    tag: 'bg-synapse/8 border-synapse/15 hover:border-synapse hover:bg-synapse/15 hover:text-synapse-light hover:shadow-[0_0_12px_rgba(6,182,212,0.2)]',
    glow: 'hover:border-synapse/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.08)]',
    line: 'from-synapse/50 to-transparent',
  },
  pulse: {
    icon: 'bg-pulse/10 text-pulse border-pulse/20',
    tag: 'bg-pulse/8 border-pulse/15 hover:border-pulse hover:bg-pulse/15 hover:text-pulse-light hover:shadow-[0_0_12px_rgba(236,72,153,0.2)]',
    glow: 'hover:border-pulse/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.08)]',
    line: 'from-pulse/50 to-transparent',
  },
  matrix: {
    icon: 'bg-matrix/10 text-matrix border-matrix/20',
    tag: 'bg-matrix/8 border-matrix/15 hover:border-matrix hover:bg-matrix/15 hover:text-matrix hover:shadow-[0_0_12px_rgba(16,185,129,0.2)]',
    glow: 'hover:border-matrix/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.08)]',
    line: 'from-matrix/50 to-transparent',
  },
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading label="Skills" title="My tech stack" subtitle="The tools and technologies I work with every day." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => {
            const styles = colorStyles[cat.color]
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.12 }}
                className={`relative bg-surface border border-border rounded-2xl p-6 transition-all duration-500 group ${styles.glow}`}
              >
                {/* Top accent line */}
                <div className={`absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r ${styles.line} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center text-xl mb-5 ${styles.icon} transition-all duration-300 group-hover:scale-110`}>
                  {cat.icon}
                </div>
                <h3 className="text-lg font-bold mb-4">{cat.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.tags.map((tag, j) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12 + j * 0.04 }}
                      className={`px-3 py-1 rounded-full text-xs border text-text-dim cursor-default transition-all duration-300 ${styles.tag}`}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
