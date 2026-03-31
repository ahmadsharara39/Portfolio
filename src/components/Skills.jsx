import { motion } from 'framer-motion'
import { FiCode, FiCpu, FiServer, FiTool } from 'react-icons/fi'
import SectionHeading from './SectionHeading'

const categories = [
  {
    icon: <FiCode />,
    title: 'Languages',
    color: 'neural',
    tags: ['Python', 'C++', 'JavaScript', 'SQL', 'HTML / CSS', 'PHP'],
  },
  {
    icon: <FiCpu />,
    title: 'AI / ML',
    color: 'synapse',
    tags: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Hugging Face', 'XGBoost', 'NLTK', 'spaCy', 'pandas', 'NumPy'],
  },
  {
    icon: <FiServer />,
    title: 'Frameworks & APIs',
    color: 'pulse',
    tags: ['FastAPI', 'Flask', 'React', 'Laravel', 'jQuery', 'OpenAI API', 'OpenAPI / Swagger'],
  },
  {
    icon: <FiTool />,
    title: 'Dev Tools & Platforms',
    color: 'matrix',
    tags: ['Git', 'GitHub Actions', 'VS Code', 'Docker', 'Linux', 'WordPress', 'Arduino'],
  },
]

const colorMap = {
  neural: {
    icon: 'bg-neural/10 text-neural',
    tag: 'bg-neural/8 border-neural/15 hover:border-neural/40 hover:text-neural-light',
  },
  synapse: {
    icon: 'bg-synapse/10 text-synapse',
    tag: 'bg-synapse/8 border-synapse/15 hover:border-synapse/40 hover:text-synapse-light',
  },
  pulse: {
    icon: 'bg-pulse/10 text-pulse',
    tag: 'bg-pulse/8 border-pulse/15 hover:border-pulse/40 hover:text-pulse-light',
  },
  matrix: {
    icon: 'bg-matrix/10 text-matrix',
    tag: 'bg-matrix/8 border-matrix/15 hover:border-matrix/40 hover:text-matrix',
  },
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading label="Skills" title="My tech stack" subtitle="The tools and technologies I work with every day." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface border border-border rounded-2xl p-6 hover:border-border-glow transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-5 ${colorMap[cat.color].icon}`}>
                {cat.icon}
              </div>
              <h3 className="text-lg font-bold mb-4">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 rounded-full text-xs border text-text-dim transition-colors ${colorMap[cat.color].tag}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
