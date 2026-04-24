import { useState, useEffect, useRef } from 'react';
import styles from './Hero.module.css';

const ROLES = [
  'Frontend Developer',
  'React Engineer',
  'Web Builder',
];

function MagneticBtn({ onClick, children }) {
  const ref = useRef(null);

  const onMove = e => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform = `
      translate(
        ${(e.clientX - r.left - r.width / 2) * 0.28}px,
        ${(e.clientY - r.top - r.height / 2) * 0.35}px
      )
    `;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseEnter={e =>
        (e.currentTarget.style.background = 'var(--gold-lt)')
      }
      onMouseLeave={e => {
        e.currentTarget.style.background = 'var(--gold)';
        onLeave();
      }}
      className={styles.magneticBtn}
    >
      {children}
    </button>
  );
}

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [del, setDel] = useState(false);
  const [ci, setCi] = useState(0);

  useEffect(() => {
    const cur = ROLES[idx];
    let t;

    if (!del && ci < cur.length)
      t = setTimeout(() => {
        setText(cur.slice(0, ci + 1));
        setCi(i => i + 1);
      }, 80);
    else if (!del && ci === cur.length)
      t = setTimeout(() => setDel(true), 2000);
    else if (del && ci > 0)
      t = setTimeout(() => {
        setText(cur.slice(0, ci - 1));
        setCi(i => i - 1);
      }, 45);
    else if (del && ci === 0) {
      setDel(false);
      setIdx(i => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(t);
  }, [ci, del, idx]);

  const scrollTo = id =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className={styles.hero}>
      <div className={styles.overlay} />

      <div className={styles.content}>
        <p className={styles.tag}>Portfolio 2026</p>

        <h1 className={styles.name}>Nifemi</h1>

        <div className={styles.roleBox}>
          <span className={styles.roleText}>{text}</span>
          <span className={styles.cursor}>|</span>
        </div>

        <p className={styles.subtitle}>
          I build fast, accessible, and delightful web interfaces — from landing
          pages to full e-commerce platforms.
        </p>

        <div className={styles.buttons}>
          <MagneticBtn onClick={() => scrollTo('work')}>
            View Work
          </MagneticBtn>

          <button
            onClick={() => scrollTo('contact')}
            className={styles.contactBtn}
            onMouseEnter={e =>
              (e.currentTarget.style.borderColor = 'var(--gold)')
            }
            onMouseLeave={e =>
              (e.currentTarget.style.borderColor =
                'rgba(255,255,255,0.35)')
            }
          >
            Contact
          </button>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        Scroll
      </div>
    </div>
  );
}