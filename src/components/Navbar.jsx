import { useState, useEffect, useRef } from 'react';
import { ThemeToggle } from '../context/ThemeContext.jsx';
import styles from '../styles/Navbar.module.css';

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

function MagneticBtn({ children, href }) {
  const ref = useRef(null);

  const onMove = e => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate(
      ${(e.clientX - r.left - r.width / 2) * 0.25}px,
      ${(e.clientY - r.top - r.height / 2) * 0.35}px
    )`;
  };

  const onLeave = () => {
    ref.current.style.transform = 'translate(0,0)';
  };

  return (
    <a
      href={href}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={styles.magneticBtn}
    >
      {children}
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 900);
  const menuRef = useRef(null);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 900);
      if (window.innerWidth >= 900) setOpen(false);
    };
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [open]);

  const scrollTo = href => {
    setOpen(false);
    const el = document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav ref={menuRef} className={styles.nav}>

      {/* Logo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={styles.logo}
      >
        Nifemi<span className={styles.dot}>.</span>
      </button>

      {/* Desktop */}
      {!isMobile && (
        <div className={styles.desktop}>
          {LINKS.map(({ label, href }) => (
            <button
              key={label}
              className={styles.link}
              onClick={() => scrollTo(href)}
            >
              {label}
            </button>
          ))}
          <ThemeToggle />
          <MagneticBtn href="mailto:raphaeledafesnr@gmail.com">
            Hire Me
          </MagneticBtn>
        </div>
      )}

      {/* Mobile toggle */}
      {isMobile && (
        <div className={styles.mobileTop}>
          <ThemeToggle />

          <button
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={styles.menuBtn}
          >
            <span className={`${styles.bar} ${open ? styles.bar1Open : ''}`} />
            <span className={`${styles.bar} ${open ? styles.barHidden : ''}`} />
            <span className={`${styles.bar} ${open ? styles.bar3Open : ''}`} />
          </button>
        </div>
      )}

      {/* Mobile menu */}
      {isMobile && (
        <div className={`${styles.mobileMenu} ${open ? styles.open : ''}`}>
          {LINKS.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => scrollTo(href)}
              className={styles.mobileLink}
            >
              {label}
            </button>
          ))}

          <div className={styles.mobileFooter}>
            <a
              href="mailto:raphaeledafesnr@gmail.com"
              className={styles.mobileBtn}
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}