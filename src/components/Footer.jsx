import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi'

const socials = [
  { icon: <FiGithub />, href: 'https://github.com/ahmadsharara39', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://linkedin.com/in/ahmadsharara', label: 'LinkedIn' },
  { icon: <FiMail />, href: 'mailto:ahmadsharara03@gmail.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-border bg-void">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="text-xl font-extrabold text-gradient-neural">AS.</span>
          <span className="text-text-dim text-sm">
            &copy; {new Date().getFullYear()} Ahmad Sharara
          </span>
        </div>

        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={s.label}
              className="w-11 h-11 rounded-full bg-surface border border-border flex items-center justify-center text-text-dim hover:text-neural hover:border-neural transition-all duration-300 hover:-translate-y-0.5"
            >
              {s.icon}
            </a>
          ))}
        </div>

        <p className="text-text-dim text-sm flex items-center gap-1">
          Built with <FiHeart className="text-pulse text-xs" /> & React
        </p>
      </div>
    </footer>
  )
}
