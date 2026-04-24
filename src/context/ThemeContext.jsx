import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'
import styles from '../styles/ThemeContext.module.css'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme')
      if (saved === 'dark' || saved === 'light') return saved
    } catch {}

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('portfolio-theme', theme)
    } catch {}
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(t => (t === 'light' ? 'dark' : 'light'))
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const iconRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    if (iconRef.current) {
      iconRef.current.innerHTML = theme === 'dark' ? SUN_SVG : MOON_SVG
    }

    if (btnRef.current) {
      btnRef.current.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      )
    }
  }, [theme])

  return (
    <button
      ref={btnRef}
      onClick={toggleTheme}
      className={styles.toggleBtn}
    >
      <span ref={iconRef} />
    </button>
  )
}

const MOON_SVG =
  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round"
  stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3
  7 7 0 0 0 21 12.79z"/></svg>`

const SUN_SVG =
  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round"
  stroke-linejoin="round">
  <circle cx="12" cy="12" r="5"/>
  <line x1="12" y1="1" x2="12" y2="3"/>
  <line x1="12" y1="21" x2="12" y2="23"/>
  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
  <line x1="1" y1="12" x2="3" y2="12"/>
  <line x1="21" y1="12" x2="23" y2="12"/>
  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
</svg>`