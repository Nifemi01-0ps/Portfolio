import { useEffect } from 'react'
import UtilityBar from './components/UtilityBar.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Work from './components/Work.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Modal from './components/Modal.jsx'
import { useModal } from './hooks/useModal.js'
import styles from './App.module.css'

export default function App() {
  const { modal, openModal, closeModal } = useModal()

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            obs.unobserve(e.target)
          }
        }),
      { threshold: 0.08 }
    )

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const bar = document.getElementById('progress-bar')
    let raf = false

    const onScroll = () => {
      if (raf) return
      raf = true

      requestAnimationFrame(() => {
        const total = document.body.scrollHeight - window.innerHeight
        if (bar && total > 0) {
          bar.style.width = `${(window.scrollY / total) * 100}%`
        }
        raf = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div id="progress-bar" className={styles.progressBar} />

      {/* header (utility + navbar) */}
      <div className={styles.fixedHeader}>
        <UtilityBar />
        <Navbar />
      </div>

      {/* Hero background layer */}
      <div className={styles.heroLayer}>
        <Hero />
      </div>

      {/* Scroll content */}
      <div className={styles.scrollLayer}>
        <Work openModal={openModal} />
        <About />
        <Skills />
        <Contact />
        <Footer />
      </div>

      {modal && <Modal project={modal} onClose={closeModal} />}
    </>
  )
}