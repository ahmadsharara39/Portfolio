import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMail, FiPhone, FiLinkedin, FiGithub, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi'
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

const STATUS = { idle: 'idle', sending: 'sending', sent: 'sent', error: 'error' }

function SuccessOverlay({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-surface rounded-2xl"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-matrix/15 border-2 border-matrix flex items-center justify-center mb-6"
      >
        <motion.div
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <FiCheck className="text-matrix text-3xl" strokeWidth={3} />
        </motion.div>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-xl font-bold mb-2"
      >
        Message Sent!
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-text-dim text-sm mb-6 text-center px-4"
      >
        Thanks for reaching out. I'll get back to you soon.
      </motion.p>
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onClick={onReset}
        className="px-6 py-2.5 rounded-full border border-border text-text-dim text-sm font-medium hover:border-neural hover:text-neural-light transition-all duration-300 cursor-pointer"
      >
        Send another message
      </motion.button>
    </motion.div>
  )
}

function SendButton({ status }) {
  return (
    <button
      type="submit"
      disabled={status === STATUS.sending}
      className="group/btn relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-neural to-synapse text-white font-semibold shadow-lg shadow-neural/25 hover:shadow-neural/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {status === STATUS.sending ? (
          <motion.div
            key="sending"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="flex items-center gap-2.5"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            />
            Sending...
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="flex items-center gap-2.5"
          >
            <FiSend className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            Send Message
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

export default function Contact() {
  const [status, setStatus] = useState(STATUS.idle)
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus(STATUS.sending)

    const formData = new FormData(formRef.current)
    try {
      const res = await fetch('https://formsubmit.co/ajax/ahmadsharara03@gmail.com', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
      })
      if (res.ok) {
        setStatus(STATUS.sent)
      } else {
        setStatus(STATUS.error)
        setTimeout(() => setStatus(STATUS.idle), 3000)
      }
    } catch {
      setStatus(STATUS.error)
      setTimeout(() => setStatus(STATUS.idle), 3000)
    }
  }

  const handleReset = () => {
    formRef.current?.reset()
    setStatus(STATUS.idle)
  }

  return (
    <section id="contact" className="relative py-24 px-6 bg-abyss border-t border-border overflow-hidden">
      <NeuralOrb className="absolute -top-40 -right-40 w-[500px] h-[500px]" color="neural" delay={1} />
      <NeuralOrb className="absolute -bottom-40 -left-40 w-[400px] h-[400px]" color="synapse" delay={3} />

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
            <div className="relative bg-surface border border-border rounded-2xl p-8 glow-neural min-h-[420px]">
              <AnimatePresence>
                {status === STATUS.sent && (
                  <SuccessOverlay onReset={handleReset} />
                )}
              </AnimatePresence>

              <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-4"
                animate={{
                  opacity: status === STATUS.sent ? 0 : 1,
                  scale: status === STATUS.sent ? 0.95 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
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

                {status === STATUS.error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-pulse"
                  >
                    <FiAlertCircle /> Something went wrong. Please try again.
                  </motion.div>
                )}

                <SendButton status={status} />
              </motion.form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
