import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiLinkedin, FiGithub, FiSend } from 'react-icons/fi'
import SectionHeading from './SectionHeading'
import NeuralOrb from './NeuralOrb'

const contactItems = [
  {
    icon: <FiMail />,
    label: 'Email',
    value: 'ahmadsharara03@gmail.com',
    href: 'mailto:ahmadsharara03@gmail.com',
    color: 'text-neural bg-neural/10',
  },
  {
    icon: <FiLinkedin />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/ahmadsharara',
    href: 'https://linkedin.com/in/ahmadsharara',
    color: 'text-synapse bg-synapse/10',
  },
  {
    icon: <FiPhone />,
    label: 'Phone',
    value: '+961 81 047 743',
    href: 'tel:+96181047743',
    color: 'text-matrix bg-matrix/10',
  },
  {
    icon: <FiGithub />,
    label: 'GitHub',
    value: 'github.com/ahmadsharara39',
    href: 'https://github.com/ahmadsharara39',
    color: 'text-text bg-text/10',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 px-6 bg-abyss border-t border-border overflow-hidden">
      <NeuralOrb className="absolute -top-40 -right-40 w-[500px] h-[500px]" color="neural" delay={1} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <SectionHeading
              label="Contact"
              title="Let's work together"
              subtitle="Whether you have a project, a job opportunity, or just want to say hi — I'd love to hear from you."
            />

            <div className="space-y-4">
              {contactItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 bg-surface border border-border rounded-xl px-6 py-4 hover:border-neural/40 hover:translate-x-1.5 transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${item.color}`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-text-muted">{item.label}</div>
                    <div className="font-semibold group-hover:text-neural-light transition-colors">{item.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <form
              action="https://formsubmit.co/ahmadsharara03@gmail.com"
              method="POST"
              className="space-y-4"
            >
              <input type="hidden" name="_captcha" value="false" />
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full bg-surface border border-border rounded-xl px-5 py-3.5 text-text placeholder:text-text-muted outline-none focus:border-neural transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full bg-surface border border-border rounded-xl px-5 py-3.5 text-text placeholder:text-text-muted outline-none focus:border-neural transition-colors"
                />
              </div>
              <input
                type="text"
                name="_subject"
                placeholder="Subject"
                className="w-full bg-surface border border-border rounded-xl px-5 py-3.5 text-text placeholder:text-text-muted outline-none focus:border-neural transition-colors"
              />
              <textarea
                name="message"
                placeholder="Your Message..."
                required
                rows={5}
                className="w-full bg-surface border border-border rounded-xl px-5 py-3.5 text-text placeholder:text-text-muted outline-none focus:border-neural transition-colors resize-y"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-neural to-synapse text-white font-semibold shadow-lg shadow-neural/25 hover:shadow-neural/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <FiSend />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
