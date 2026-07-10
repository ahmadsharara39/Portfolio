import { useState, useCallback } from 'react'
import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import { MotionProvider, useMotion } from './context/MotionContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParticleField from './components/ParticleField'
import ScrollProgress from './components/ScrollProgress'
import Preloader from './components/Preloader'
import BackToTop from './components/BackToTop'

function AppShell() {
  const { paused } = useMotion()
  const [loaded, setLoaded] = useState(false)
  const handleComplete = useCallback(() => setLoaded(true), [])

  return (
    <MotionConfig reducedMotion={paused ? 'always' : 'user'}>
      {!loaded && <Preloader onComplete={handleComplete} />}

      {/* Skip link for keyboard / screen-reader users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-neural focus:text-white focus:font-medium"
      >
        Skip to content
      </a>

      <div
        inert={!loaded || undefined}
        className={`relative min-h-screen transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <ParticleField />
        <ScrollProgress />
        <Navbar />
        <main id="main" tabIndex={-1}>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </MotionConfig>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <MotionProvider>
        <AppShell />
      </MotionProvider>
    </ThemeProvider>
  )
}
