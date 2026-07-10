import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { FiExternalLink, FiGithub, FiLinkedin } from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'
import MotionToggle from './MotionToggle'
import { useMediaQuery } from '../hooks/useMediaQuery'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { icon: <FiGithub />, href: 'https://github.com/ahmadsharara39', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://linkedin.com/in/ahmadsharara', label: 'LinkedIn' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const toggleRef = useRef(null)
  const menuRef = useRef(null)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  // Crossing to the desktop layout hides the hamburger; make sure an open
  // mobile menu is closed so its body-scroll-lock cleanup runs (else the page
  // stays unscrollable after a resize / tablet rotation).
  useEffect(() => {
    if (isDesktop) setOpen(false)
  }, [isDesktop])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = links.map((l) => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(sections[i])
          return
        }
      }
      setActive('')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile menu: Escape to close, lock body scroll, move focus in/out.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    const firstLink = menuRef.current?.querySelector('a')
    firstLink?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const linkClass = (href) =>
    active === href.slice(1) ? 'text-neural-light' : 'text-text-dim hover:text-neural-light'

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-void/80 backdrop-blur-xl border-b border-border'
          : 'bg-gradient-to-b from-void/70 to-transparent backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#main"
          aria-label="Ahmad Sharara — back to top"
          className="text-xl font-extrabold text-gradient-neural tracking-tight"
        >
          AS.
        </a>

        <ul className="hidden lg:flex items-center gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === link.href.slice(1) ? 'page' : undefined}
                className={`text-sm font-medium transition-colors relative group ${linkClass(link.href)}`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-neural transition-all duration-300 ${
                  active === link.href.slice(1) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </a>
            </li>
          ))}
          {socials.map((s) => (
            <li key={s.label} className="flex items-center">
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label} (opens in a new tab)`}
                className="w-9 h-9 flex items-center justify-center rounded-full text-text-dim hover:text-neural-light hover:bg-surface/60 transition-colors"
              >
                {s.icon}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/Ahmad_Sharara_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neural/10 border border-neural/20 text-neural-light text-sm font-medium hover:bg-neural/20 transition-all duration-300"
            >
              Resume
              <FiExternalLink className="text-xs" aria-hidden="true" />
            </a>
          </li>
          <li className="flex items-center gap-2">
            <MotionToggle />
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile / tablet controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <MotionToggle />
          <ThemeToggle />
          <button
            ref={toggleRef}
            onClick={() => setOpen(!open)}
            className="w-11 h-11 flex items-center justify-center text-text text-2xl rounded-full hover:text-neural-light transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-abyss/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <ul className="px-6 py-4 space-y-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === link.href.slice(1) ? 'page' : undefined}
                    className={`flex items-center min-h-11 py-2 transition-colors ${linkClass(link.href)}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-4 pt-3">
                <a
                  href="/Ahmad_Sharara_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1.5 min-h-11 px-4 py-2 rounded-full bg-neural/10 border border-neural/20 text-neural-light text-sm font-medium"
                >
                  Resume
                  <FiExternalLink className="text-xs" aria-hidden="true" />
                </a>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                    className="w-11 h-11 flex items-center justify-center rounded-full text-text-dim hover:text-neural-light hover:bg-surface/60 transition-colors"
                  >
                    {s.icon}
                  </a>
                ))}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
