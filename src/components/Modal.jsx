import { useEffect } from 'react';
import styles from '../styles/Modal.module.css';

export default function Modal({ project, onClose }) {
  useEffect(() => {
    const handler = e => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={e => e.stopPropagation()}
      >

        {/* Image */}
        <div className={styles.imageWrapper}>
          <img
            src={project.img}
            alt={project.title}
            className={styles.image}
          />

          <div className={styles.gradient} />
          <div className={styles.topBar} />

          <button onClick={onClose} className={styles.closeBtn}>
            ×
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>

          <div className={styles.header}>
            <div>
              <p className={styles.meta}>
                {project.category} · {project.year}
              </p>
              <h2 className={styles.title}>{project.title}</h2>
            </div>
          </div>

          <p className={styles.description}>
            {project.longDesc}
          </p>

          {/* Tech stack */}
          <div className={styles.techSection}>
            <p className={styles.techLabel}>Tech Stack</p>

            <div className={styles.tags}>
              {project.tags.map(t => (
                <span key={t} className={styles.tag}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className={styles.links}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryBtn}
            >
              Live Demo →
            </a>

            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryBtn}
            >
              View Code
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}