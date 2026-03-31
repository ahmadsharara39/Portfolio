import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const socials = [
  { icon: <FiGithub />, href: 'https://github.com/ahmadsharara39', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://linkedin.com/in/ahmadsharara', label: 'LinkedIn' },
  { icon: <FiMail />, href: 'mailto:ahmadsharara03@gmail.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border bg-void text-center">
      <div className="flex justify-center gap-4 mb-4">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith('http') ? '_blank' : undefined}
            rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            aria-label={s.label}
            className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-text-dim hover:text-neural hover:border-neural transition-all duration-300 hover:-translate-y-0.5"
          >
            {s.icon}
          </a>
        ))}
      </div>
      <p className="text-text-muted text-sm">
        &copy; {new Date().getFullYear()} Ahmad Sharara. Built with React & passion.
      </p>
    </footer>
  )
}
