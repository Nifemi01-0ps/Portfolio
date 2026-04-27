import { useState, useEffect, useRef } from 'react';
import styles from '../styles/About.module.css';
import aboutImg from "../assets/hero.jpg";

const PARAS = [
  "I'm Nifemi, a frontend developer based in Nigeria. I specialise in React and modern CSS, building interfaces that are fast, accessible, and genuinely enjoyable to use. I've shipped projects ranging from games to e-commerce platforms, always learning."];

const PROBLEMS = [
  {
    title: 'ShopFlow',
    icon: '🛒',
    problems: [
      {
        problem:'Defining Component inside another component caused react to trigger an infinite loop due to state updates and useEffect.',
        fix: "Moved the child component outside the parent to maintain a stable component references, preventing unneccessary remounting."
      },
      {
        problem: 'Meging data from static FakeStoreApi and DummyJson resulted in overlapping product Ids, causing incorrect product details to load when navigating between pages.',
        fix: "Implemented Node.js proxy to normalize the data by namespacing or generating unique Ids ensuring consistent routing and accurate product mapping."
      }
    ]
  }, 
  {
    title: 'Portfolio',
    icon: '🎨',
    problems: [
      {
        problem: 'Hero background images bledding into scroll section at the right hand side.',
        fix: 'Added overflow hidden to the hero wrapper and inset: 0.'
      },
      {
        problem: "Porfolio layout looked inconsistent and poorly scaled on smaller screen with text and element either to large or to cramped",
        fix: "Used Calmp() for fluid typography and spacing to ensure element scale smoothly across screen sizes and applied targeted media queries to adjust layout spacing and component structure for smaller devices."
      }
    ]
  },
  {
    title: 'CV Builder',
    icon: '📄',
    problems: [
      {
        problem: "Work Experience bullet point not rendering in the live preview.",
        fix: "Corrected the state mapping as preview was reading from different key."
      }
    ]
  }
]

const SKILLS_LIST = ['React','JavaScript','CSS / Sass','Vite','Zustand','Git','Data-base'];

function ProblemItem({ item, delay, visible }) {
  return (
    <li className={styles.problemItem} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateX(-10px)',
      transition: `opacity 0.4s ease ${delay}s, transform 0.4s ease ${delay}s`
    }}>
      <div className={styles.problemRow}>
        <span className={styles.bullet} aria-hidden="true">✗</span>
        <span className={styles.problemText}>{item.problem}</span>
      </div>
      <div className={styles.fixRow}>
        <span className={styles.fixBullet} aria-hidden="true">✓</span>
        <span className={styles.fixText}>{item.fix}</span>
      </div>
    </li>
  )
}
// Problems Block 
function ProblemBlock({ project, globalVisible }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.problemBlock}>
      <button className={styles.problemHeader} onClick={() => setOpen(o => !o)} aria-expanded={open}>
          <span className={styles.problemIcon}>{project.icon}</span>
          <span className={styles.problemTitle}>{project.title}</span>
          <span className={styles.problemCount}>{project.problems.length} solved</span>
          <span className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}>
            ›
          </span>        
      </button>
      <div className={`${styles.problemList} ${open ? styles.problemListOpen : ''}`}>
        <ul className={styles.problemUl}>
          {project.problems.map((item, i) => (
            <ProblemItem key={i} item={item} delay={i * 0.08} visible={open && globalVisible} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function About() {
  const [expanded, setExpanded] = useState(false);
  const [visibleParas, setVisibleParas] = useState(0);
  const [visibleTags, setVisibleTags] = useState(0);
  const [problemsVisible, setProblemsVisible] = useState(false)

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
      setProblemsVisible(false)
      return;
    }

    timers.current.push(setTimeout(() => setVisibleParas(1), 50));
    timers.current.push(setTimeout(() => setVisibleParas(2), 350));
    timers.current.push(setTimeout(() => setVisibleParas(3), 650));
    timers.current.push(setTimeout(() => setProblemsVisible(true), 700))

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
              <div className={styles.problemSection} style={{
                opacity: visibleParas >= 1 ? 1 : 0,
                transition: 'opacity 0.5s ease, transform 0.5s ease'
              }}>
                <h3 className={styles.problemsHeading}>
                  <span className={styles.headingIcon} aria-hidden="true">⚡</span>
                  Problems I've Solved
                </h3>
                <p className={styles.problemsSubtext}>
                  Real bugs and challenges I debugged across my projects - click to expand.
                </p>

                <div className={styles.problemBlock}>
                  {PROBLEMS.map(project => (
                    <ProblemBlock key={project.title} project={project} globalVisible={problemsVisible}/>
                  ))}
                </div>
              </div>
                  {/* Skill tag */}
              <div className={styles.tags} style={{
                opacity: visibleParas >= 2 ? 1 : 0,
                transition: 'opacity 0.5s ease 0.2s'
              }}>
                {SKILLS_LIST.map((s, i) => (
                  <span key={s} className={`${styles.tag} ${i < visibleTags ? styles.tagVisible : ''}`}>
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