import { useState, useEffect, useRef, useCallback } from 'react'
import styles from '../styles/Work.module.css'
import cvImg from "../assets/Cv-Builder.png";
import battleShipImg from "../assets/battleship.png";
import weatherImg from "../assets/weatherImg.png";
import kodeSpotImg from "../assets/kodespot-landing-page.png";
import adminImg from "../assets/admin-dashboard.png";

export const PROJECTS = [
  {
    id:1, title:'CV Builder', category:'React App', year:'2026',
    desc:'Generates a professional CV from user input with multiple templates and one-click PDF download.',
    longDesc:'A full React application that walks users through a guided form, then renders a beautifully formatted CV. Features template switching, live preview, and PDF export via html2pdf.js. Built with React hooks and context for state management.',
    tags:['React','PDF','Template Engine'],
    url:'https://cv-application-nine-theta.vercel.app/', code:'https://github.com/nifemi01-0ps',
    img:cvImg,
  },
  {
    id:2, title:'Battleship', category:'Browser Game', year:'2025',
    desc:'Classic naval strategy game with AI opponent, tactical fleet placement, and test-driven game logic.',
    longDesc:'A faithful implementation of the classic Battleship game built with vanilla JavaScript following Test-Driven Development. The AI uses a hunt-and-target algorithm. The project demonstrates strong separation of concerns with a pure game logic layer fully covered by unit tests.',
    tags:['JavaScript','TDD','Game AI'],
    url:'https://nifemi01-0ps.github.io/Project-Battleship/', code:'https://github.com/nifemi01-0ps',
    img:battleShipImg,
  },
  {
    id:3, title:'Weather App', category:'API Integration', year:'2025',
    desc:'Real-time conditions, 6-day forecast, humidity and wind speed for any city worldwide.',
    longDesc:'Integrates with the OpenWeatherMap API to deliver real-time weather data. Features a responsive layout, city search with autocomplete, dynamic background based on conditions, and a 6-day forecast strip. Handles API errors gracefully.',
    tags:['JavaScript','REST API','CSS'],
    url:'https://nifemi01-0ps.github.io/Weather-App/', code:'https://github.com/nifemi01-0ps',
    img:weatherImg,
  },
  {
    id:4, title:'ShopFlow', category:'E-Commerce', year:'2025',
    desc:'Full React storefront for Nigerian market — Naira pricing, Paystack, dark mode, 100+ Vitest tests.',
    longDesc:'A production-grade e-commerce SPA built for Nigerian shoppers. Features Zustand for state management, Paystack payment integration, dark/light mode via ThemeContext, a custom proxy server to bypass CORS on product APIs, product search and filtering, wishlist, cart with persistence, and a comprehensive Vitest test suite covering utils, store actions, and component rendering.',
    tags:['React','Zustand','Vite','Paystack','Vitest'],
    url:'#', code:'https://github.com/nifemi01-0ps',
    img:'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80',
  },
  {
    id:5, title:'Kodespot', category:'Landing Page', year:'2024',
    desc:'Landing page for a Web3 and blockchain learning community with multi-section layout.',
    longDesc:'A modern marketing landing page for a blockchain education platform. Features a hero section, service offerings grid, learning tracks overview, and a newsletter signup. Fully responsive with smooth scroll and subtle CSS animations.',
    tags:['HTML','CSS','JavaScript'],
    url:'https://nifemi01-0ps.github.io/Kodespot/', code:'https://github.com/nifemi01-0ps',
    img:kodeSpotImg,
  },
  {
    id:6, title:'Admin Dashboard', category:'UI Design', year:'2025',
    desc:'Responsive admin panel with sidebar navigation, search, user profiles and multiple content panels.',
    longDesc:'A comprehensive admin dashboard UI featuring a collapsible sidebar, header with search and profile dropdown, stat cards, data tables, and a notifications panel. Built with CSS Grid and Flexbox for layout, with smooth transitions throughout.',
    tags:['HTML','CSS Grid','JavaScript'],
    url:'https://nifemi01-0ps.github.io/Admin-dashboard/', code:'https://github.com/nifemi01-0ps',
    img:adminImg,
  },
]

const LOOP_PAD = 2
function buildLoop(arr) {
  return [...arr.slice(-LOOP_PAD), ...arr, ...arr.slice(0, LOOP_PAD)]
}
const LOOPED     = buildLoop(PROJECTS)
const REAL_START = LOOP_PAD

function ProjectCard({ project, isActive, onReadMore, onSelect }) {
  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onSelect()}
      className={`${styles.card} ${isActive ? styles.cardActive : styles.cardInactive}`}
    >
      {/* Image */}
      <div className={styles.imageWrap}>
        <img
          src={project.img}
          alt={project.title}
          loading="lazy"
          className={`${styles.image} ${isActive ? styles.imageActive : styles.imageInactive}`}
        />
        <div className={styles.imageOverlay} />
        {isActive && <div className={styles.activeBar} />}

        {/* Prev / Next inside active card */}
        {isActive && (
          <>
            <button
              data-nav="prev"
              onClick={e => { e.stopPropagation(); onReadMore('prev') }}
              className={styles.navBtn}
              style={{ left: '12px' }}
            >‹</button>
            <button
              data-nav="next"
              onClick={e => { e.stopPropagation(); onReadMore('next') }}
              className={styles.navBtn}
              style={{ right: '12px' }}
            >›</button>
          </>
        )}
      </div>

      {/* Body */}
      <div className={styles.cardBody}>
        <p className={styles.year}>{project.year}</p>
        <h3 className={`${styles.title} ${isActive ? styles.titleActive : styles.titleInactive}`}>
          {project.title}
        </h3>

        {isActive && (
          <p className={styles.desc}>{project.desc}</p>
        )}

        <button
          onClick={e => { e.stopPropagation(); onReadMore('modal') }}
          className={styles.readMoreBtn}
        >
          Read More
        </button>

        <div className={styles.tags}>
          {project.tags.map(t => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Work({ openModal }) {
  const [loopIdx,      setLoopIdx]      = useState(REAL_START + 3)
  const [isAnimating,  setIsAnimating]  = useState(false)
  const [offset,       setOffset]       = useState(0)
  const containerRef = useRef(null)
  const trackRef     = useRef(null)

  const realIdx = (loopIdx - LOOP_PAD + PROJECTS.length * 100) % PROJECTS.length

  const recalc = useCallback(() => {
    const track     = trackRef.current
    const container = containerRef.current
    if (!track || !container) return
    const cards = track.querySelectorAll('[data-card]')
    if (!cards[loopIdx]) return
    const vw   = container.getBoundingClientRect().width
    const card = cards[loopIdx]
    setOffset(vw / 2 - card.offsetLeft - card.offsetWidth / 2)
  }, [loopIdx])

  useEffect(() => { recalc() },                              [loopIdx, recalc])
  useEffect(() => { window.addEventListener('resize', recalc); return () => window.removeEventListener('resize', recalc) }, [recalc])

  const handleTransitionEnd = () => {
    setIsAnimating(false)
    if (loopIdx < LOOP_PAD) {
      setLoopIdx(LOOPED.length - LOOP_PAD * 2 + loopIdx)
    } else if (loopIdx >= LOOPED.length - LOOP_PAD) {
      setLoopIdx(LOOP_PAD + (loopIdx - (LOOPED.length - LOOP_PAD)))
    }
  }

  const go = dir => {
    if (isAnimating) return
    setIsAnimating(true)
    setLoopIdx(i => i + dir)
  }

  const handleCardAction = (loopI, action) => {
    if (action === 'prev')  { go(-1); return }
    if (action === 'next')  { go(1);  return }
    if (action === 'modal') { openModal(PROJECTS[realIdx]); return }
    if (loopIdx === loopI)  openModal(PROJECTS[realIdx])
    else { setIsAnimating(true); setLoopIdx(loopI) }
  }

  useEffect(() => {
    const h = e => {
      if (e.key === 'ArrowLeft')  go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [isAnimating])

  const touchStartX = useRef(null)
  const touchStartY = useRef(null)

  const onTouchStart = e => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }
  const onTouchEnd = e => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
    touchStartX.current = null
    touchStartY.current = null
  }

  return (
    <section id="work" className={styles.section}>

      {/* Header */}
      <div className={styles.header}>
        <div>
          <p className={`reveal ${styles.sectionLabel}`}>Selected Work</p>
          <h2 className={`reveal d1 ${styles.sectionTitle} `}>Projects</h2>
        </div>
        <p className={`reveal d2 ${styles.hint}`}>Swipe · Arrow keys · Click to explore</p>
      </div>

      {/* Carousel */}
      <div
        ref={containerRef}
        className={styles.carouselWrap}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={trackRef}
          className={styles.track}
          style={{
            transition: isAnimating ? 'transform .45s var(--ease)' : 'none',
            transform: `translateX(${offset}px)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {LOOPED.map((p, i) => (
            <div key={`${p.id}-${i}`} data-card={i}>
              <ProjectCard
                project={p}
                isActive={i === loopIdx}
                onSelect={() => handleCardAction(i, 'select')}
                onReadMore={action => handleCardAction(i, action)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className={styles.dots}>
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => { if (!isAnimating) { setIsAnimating(true); setLoopIdx(LOOP_PAD + i) } }}
            className={`${styles.dot} ${i === realIdx ? styles.dotActive : ''}`}
          />
        ))}
      </div>

    </section>
  )
}