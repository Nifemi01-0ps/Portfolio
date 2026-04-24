import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Skill.module.css';

const SKILLS = [
  { name: 'HTML5', pct: 92 },
  { name: 'CSS / Sass', pct: 70 },
  { name: 'JavaScript', pct:  75},
  { name: 'React', pct: 60 },
  { name: 'Vite', pct: 60 },
  { name: 'Git', pct: 90 },
  { name: 'Zustand', pct: 50 },
  { name: 'Testing/Vitest', pct: 70 },
  { name: 'Node/Express', pct: 35 },
  { name: 'Figma', pct: 50 },
];

export default function Skills() {
  const [go, setGo] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setGo(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <div>
            <p className="reveal">Toolkit</p>
            <h2 className="reveal d1">Skills & Expertise</h2>
          </div>

          <p className={`reveal d2 ${styles.subText}`}>
            Specialised in the React ecosystem and modern CSS fundamentals.
          </p>
        </div>

        {/* Skills Grid */}
        <div ref={ref} className={styles.grid}>
          {SKILLS.map((s, i) => (
            <div
              key={s.name}
              className={`reveal d${(i % 3) + 1} ${styles.card}`}
            >
              <div className={styles.row}>
                <span className={styles.skillName}>{s.name}</span>
                <span className={styles.percent}>{s.pct}%</span>
              </div>

              <div className={styles.bar}>
                <div
                  className={styles.fill}
                  style={{
                    width: go ? `${s.pct}%` : '0%',
                    transition: `width 1.1s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}