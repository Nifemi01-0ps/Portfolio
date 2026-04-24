import { useState, useEffect, useRef, useCallback } from 'react';
import styles from '../styles/Work.module.css';
import cvImg from "../assets/Cv-Builder.png";
import battleShipImg from "../assets/battleship.png";
import weatherImg from "../assets/weather-app.png";
import kodeSpotImg from "../assets/kodespot-landing-page.png";
import adminImg from "../assets/admin-dashboard.png";

export const PROJECTS = [
  {
    id:1, title:'CV Builder', category:'React App', year:'2026',
    desc:'Generates a professional CV from user input with multiple templates and one-click PDF download.',
    longDesc:'A full React application...',
    tags:['React','PDF','Template Engine'],
    url:'https://cv-application-nine-theta.vercel.app/', code:'https://github.com/nifemi01-0ps',
    img:{cvImg},
  },
  {
    id:2, title:'Battleship', category:'Browser Game', year:'2025',
    desc:'Classic naval strategy game with AI opponent.',
    longDesc:'A faithful implementation...',
    tags:['JavaScript','TDD','Game AI'],
    url:'https://nifemi01-0ps.github.io/Project-Battleship/', code:'https://github.com/nifemi01-0ps',
    img: {battleShipImg},
  },
  {
    id:3, title:'Weather App', category:'API Integration', year:'2025',
    desc:'Real-time weather conditions worldwide.',
    longDesc:'Integrates with OpenWeatherMap...',
    tags:['JavaScript','REST API','CSS'],
    url:'https://nifemi01-0ps.github.io/Weather-App/', code:'https://github.com/nifemi01-0ps',
    img:{weatherImg},
  },
  {
    id:4, title:'ShopFlow', category:'E-Commerce', year:'2026',
    desc:'Full React storefront for Nigerian market.',
    longDesc:'Production-grade e-commerce SPA...',
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
    img:{kodeSpotImg}
  },
   {
    id:6, title:'Admin Dashboard', category:'UI Design', year:'2024',
    desc:'Responsive admin panel with sidebar navigation, search, user profiles and multiple content panels.',
    longDesc:'A comprehensive admin dashboard UI featuring a collapsible sidebar, header with search and profile dropdown, stat cards, data tables, and a notifications panel. Built with CSS Grid and Flexbox for layout, with smooth transitions throughout.',
    tags:['HTML','CSS Grid','JavaScript'],
    url:'https://nifemi01-0ps.github.io/Admin-dashboard/', code:'https://github.com/nifemi01-0ps',
    img:{adminImg},
  },
]

const LOOP_PAD = 2
const buildLoop = arr => [...arr.slice(-LOOP_PAD), ...arr, ...arr.slice(0, LOOP_PAD)]
const LOOPED = buildLoop(PROJECTS)
const REAL_START = LOOP_PAD

function ProjectCard({ project, isActive, onReadMore, onSelect }) {
  return (
    <div
      className={`${styles.card} ${isActive ? styles.cardActive : styles.cardInactive}`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onSelect()}
    >
      {/* Image */}
      <div className={styles.cardImage}>
        <img
          src={project.img}
          alt={project.title}
          className={`${styles.cardImgTag} ${
            isActive ? styles.cardImgActive : styles.cardImgInactive
          }`}
        />

        <div className={styles.overlay} />
        {isActive && <div className={styles.goldBar} />}

        {isActive && (
          <>
            <button
              className={`${styles.navBtn} ${styles.navLeft}`}
              onClick={e => {
                e.stopPropagation()
                onReadMore('prev')
              }}
            >
              ‹
            </button>

            <button
              className={`${styles.navBtn} ${styles.navRight}`}
              onClick={e => {
                e.stopPropagation()
                onReadMore('next')
              }}
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Body */}
      <div className={styles.cardBody}>
        <p className={styles.year}>{project.year}</p>

        <h3 className={styles.cardTitle}>{project.title}</h3>

        {isActive && <p className={styles.desc}>{project.desc}</p>}

        <button
          className={styles.readBtn}
          onClick={e => {
            e.stopPropagation()
            onReadMore('modal')
          }}
        >
          Read More
        </button>

        <div className={styles.tags}>
          {project.tags.map(tag => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Work({ openModal }) {
  const [loopIdx, setLoopIdx] = useState(REAL_START + 2)
  const [isAnimating, setIsAnimating] = useState(false)

  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const [offset, setOffset] = useState(0)

  const realIdx =
    (loopIdx - LOOP_PAD + PROJECTS.length * 100) % PROJECTS.length

  const recalc = useCallback(() => {
    const track = trackRef.current
    const container = containerRef.current
    if (!track || !container) return

    const cards = track.querySelectorAll('[data-card]')
    if (!cards[loopIdx]) return

    const vw = container.getBoundingClientRect().width
    const card = cards[loopIdx]

    setOffset(vw / 2 - card.offsetLeft - card.offsetWidth / 2)
  }, [loopIdx])

  useEffect(() => recalc(), [loopIdx, recalc])

  useEffect(() => {
    window.addEventListener('resize', recalc)
    return () => window.removeEventListener('resize', recalc)
  }, [recalc])

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
    if (action === 'prev') return go(-1)
    if (action === 'next') return go(1)
    if (action === 'modal') return openModal(PROJECTS[realIdx])

    if (loopIdx === loopI) openModal(PROJECTS[realIdx])
    else {
      setIsAnimating(true)
      setLoopIdx(loopI)
    }
  }

  useEffect(() => {
    const handler = e => {
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isAnimating])

  return (
    <section id="work" className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <p className={`${styles.subTitle} reveal`}>Projects</p>
          <h2 className={`${styles.title} reveal d1`}>
            Projects I've Shipped
          </h2>
        </div>

        <p className={`${styles.helperText} reveal d2`}>
          Swipe · Arrow keys · Click to explore
        </p>
      </div>

      {/* Carousel */}
      <div ref={containerRef} className={styles.carouselContainer}>
        <div
          ref={trackRef}
          className={`${styles.track} ${
            isAnimating ? styles.trackAnimating : ''
          }`}
          style={{ transform: `translateX(${offset}px)` }}
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

      {/* Dots */}
      <div className={styles.dots}>
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${
              i === realIdx ? styles.dotActive : styles.dotInactive
            }`}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true)
                setLoopIdx(LOOP_PAD + i)
              }
            }}
          />
        ))}
      </div>
    </section>
  )
}