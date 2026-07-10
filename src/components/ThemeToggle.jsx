import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme()
  const isLight = theme === 'light'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      className={`relative w-11 h-11 rounded-full border border-border bg-surface/60 flex items-center justify-center text-text-dim hover:text-neural-light hover:border-neural transition-colors duration-300 cursor-pointer ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25 }}
          className="text-lg"
        >
          {isLight ? <FiMoon aria-hidden="true" /> : <FiSun aria-hidden="true" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
