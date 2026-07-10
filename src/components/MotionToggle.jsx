import { FiPause, FiPlay } from 'react-icons/fi'
import { useMotion } from '../context/MotionContext'

export default function MotionToggle({ className = '' }) {
  const { paused, toggle } = useMotion()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      aria-label={paused ? 'Resume animations' : 'Pause animations'}
      title={paused ? 'Resume animations' : 'Pause animations'}
      className={`relative w-11 h-11 rounded-full border border-border bg-surface/60 flex items-center justify-center text-text-dim hover:text-neural-light hover:border-neural transition-colors duration-300 cursor-pointer ${className}`}
    >
      {paused ? <FiPlay aria-hidden="true" className="text-base" /> : <FiPause aria-hidden="true" className="text-base" />}
    </button>
  )
}
