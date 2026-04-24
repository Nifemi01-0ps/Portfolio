import { useState, useEffect, useRef } from 'react';
import styles from '../styles/About.module.css';
import aboutImg from "../assets/hero.jpg";

const PARAS = [
  '"I care about the details — the interaction that feels satisfying, the layout that guides the eye, the code that makes a page instant."',
  "I'm Nifemi, a frontend developer based in Nigeria. I specialise in React and modern CSS, building interfaces that are fast, accessible, and genuinely enjoyable to use. I've shipped projects ranging from games to e-commerce platforms, always learning.",
  "My most ambitious project to date is ShopFlow — a full React e-commerce app built with Zustand, Vite, Paystack integration, dark mode, and a Vitest test suite with 100+ passing tests.",
];

const SKILLS_LIST = ['React','JavaScript','CSS / Sass','Vite','Zustand','Git','Data-base'];

export default function About() {
  const [expanded, setExpanded] = useState(false);
  const [visibleParas, setVisibleParas] = useState(0);
  const [visibleTags, setVisibleTags] = useState(0);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => {
    clearTimers();
    if (!expanded) {
      setVisibleParas(0);
      setVisibleTags(0);
      return;
    }

    timers.current.push(setTimeout(() => setVisibleParas(1), 50));
    timers.current.push(setTimeout(() => setVisibleParas(2), 350));
    timers.current.push(setTimeout(() => setVisibleParas(3), 650));

    SKILLS_LIST.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => setVisibleTags(t => t + 1), 900 + i * 80)
      );
    });

    return clearTimers;
  }, [expanded]);

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <p className={styles.label}>About Me</p>
          <h2 className={styles.title}>The person behind the code.</h2>
        </div>

        <div className={styles.grid}>

          {/* Image */}
          <div className={styles.imageWrapper}>
            <div className={styles.imageBox}>
              <img
                src={aboutImg}
                alt="Nifemi"
                loading="lazy"
                className={styles.image}
              />
            </div>

            <div className={styles.statusBox}>
              <div className={styles.statusRow}>
                <span className={styles.dot} />
                <span className={styles.statusText}>Available for work</span>
              </div>
              <p className={styles.subText}>Open to freelance & full-time</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className={styles.mainPara}>{PARAS[0]}</p>

            <button
              onClick={() => setExpanded(e => !e)}
              className={styles.toggleBtn}
            >
              {expanded ? 'Show Less ↑' : 'Read More ↓'}
            </button>

            <div
              className={`${styles.collapse} ${
                expanded ? styles.open : ''
              }`}
            >
              {[PARAS[1], PARAS[2]].map((p, pi) => (
                <p
                  key={pi}
                  className={`${styles.para} ${
                    visibleParas >= pi + 2 ? styles.show : ''
                  }`}
                >
                  {p}
                </p>
              ))}

              <div className={styles.tags}>
                {SKILLS_LIST.map((s, i) => (
                  <span
                    key={s}
                    className={`${styles.tag} ${
                      i < visibleTags ? styles.tagVisible : ''
                    }`}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {visibleParas >= 3 && (
                <a href="/resume.pdf" download className={styles.cvBtn}>
                  Download CV ↓
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}