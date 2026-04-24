import SocialIcons from './SocialIcons.jsx';
import styles from '../styles/Footer.module.css';

const SOCIAL_LINKS = [
  { icon: 'github', href: 'https://github.com/nifemi01-0ps', label: 'GitHub' },
  { icon: 'linkedin', href: 'https://www.linkedin.com/in/raphael-edafe-87593a265/', label: 'LinkedIn' },
  { icon: 'twitter', href: 'https://x.com/AFCEdafe', label: 'Twitter / X' },
  { icon: 'email', href: 'mailto:raphaeledafesnr@gmail.com', label: 'Email me' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>

      {/* Top row */}
      <div className={styles.topRow}>
        <span className={styles.logo}>
          Nifemi<span className={styles.dot}>.</span>
        </span>

        <SocialIcons
          links={SOCIAL_LINKS}
          color="rgba(255,255,255,0.45)"
          hover="var(--gold)"
          size={40}
          gap="10px"
          showBorder={true}
        />
      </div>

      {/* Bottom row */}
      <div className={styles.bottomRow}>
        <p className={styles.text}>
          © {new Date().getFullYear()} Nifemi · Built with React + Vite
        </p>

        <p className={styles.text}>
          Designed & developed by Nifemi
        </p>
      </div>

    </footer>
  );
}