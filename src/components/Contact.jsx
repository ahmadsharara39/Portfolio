import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiLinkedin, FiGithub, FiSend } from 'react-icons/fi'
import SectionHeading from './SectionHeading'
import NeuralOrb from './NeuralOrb'
import DataStream from './DataStream'

const contactItems = [
  {
    icon: <FiMail />,
    label: 'Email',
    value: 'ahmadsharara03@gmail.com',
    href: 'mailto:ahmadsharara03@gmail.com',
    color: 'text-neural bg-neural/10 border-neural/20',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]',
  },
  {
    icon: <FiLinkedin />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/ahmadsharara',
    href: 'https://linkedin.com/in/ahmadsharara',
    color: 'text-synapse bg-synapse/10 border-synapse/20',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]',
  },
  {
    icon: <FiPhone />,
    label: 'Phone',
    value: '+961 81 047 743',
    href: 'tel:+96181047743',
    color: 'text-matrix bg-matrix/10 border-matrix/20',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]',
  },
  {
    icon: <FiGithub />,
    label: 'GitHub',
    value: 'github.com/ahmadsharara39',
    href: 'https://github.com/ahmadsharara39',
    color: 'text-text bg-text/10 border-text/20',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(226,232,240,0.08)]',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 px-6 bg-abyss border-t border-border overflow-hidden">
      <NeuralOrb className="absolute -top-40 -right-40 w-[500px] h-[500px]" color="neural" delay={1} />
      <NeuralOrb className="absolute -bottom-40 -left-40 w-[400px] h-[400px]" color="synapse" delay={3} />

      {/* Data streams on sides */}
      <div className="absolute top-0 right-0 opacity-20 hidden xl:block">
        <DataStream />
      </div>
      <div className="absolute top-0 left-0 opacity-15 hidden xl:block">
        <DataStream />
      </div>

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
                  className={`flex items-center gap-4 bg-surface border border-border rounded-xl px-6 py-4 hover:border-border-glow hover:translate-x-2 transition-all duration-400 group ${item.hoverGlow}`}
                >
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center text-xl ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-text-muted font-mono">{item.label}</div>
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
            <div className="bg-surface border border-border rounded-2xl p-8 glow-neural">
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
                    className="w-full bg-deep border border-border rounded-xl px-5 py-3.5 text-text placeholder:text-text-muted outline-none focus:border-neural focus:shadow-[0_0_15px_rgba(124,58,237,0.1)] transition-all duration-300"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="w-full bg-deep border border-border rounded-xl px-5 py-3.5 text-text placeholder:text-text-muted outline-none focus:border-neural focus:shadow-[0_0_15px_rgba(124,58,237,0.1)] transition-all duration-300"
                  />
                </div>
                <input
                  type="text"
                  name="_subject"
                  placeholder="Subject"
                  className="w-full bg-deep border border-border rounded-xl px-5 py-3.5 text-text placeholder:text-text-muted outline-none focus:border-neural focus:shadow-[0_0_15px_rgba(124,58,237,0.1)] transition-all duration-300"
                />
                <textarea
                  name="message"
                  placeholder="Your Message..."
                  required
                  rows={5}
                  className="w-full bg-deep border border-border rounded-xl px-5 py-3.5 text-text placeholder:text-text-muted outline-none focus:border-neural focus:shadow-[0_0_15px_rgba(124,58,237,0.1)] transition-all duration-300 resize-y"
                />
                <button
                  type="submit"
                  className="group/btn inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-neural to-synapse text-white font-semibold shadow-lg shadow-neural/25 hover:shadow-neural/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <FiSend className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
