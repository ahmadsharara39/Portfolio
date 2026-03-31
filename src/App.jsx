import { useState, useCallback } from 'react'
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

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const handleComplete = useCallback(() => setLoaded(true), [])

  return (
    <>
      {!loaded && <Preloader onComplete={handleComplete} />}
      <div className={`relative min-h-screen transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <ParticleField />
        <ScrollProgress />
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
        <Footer />
        <BackToTop />
      </div>
    </>
  )
}
