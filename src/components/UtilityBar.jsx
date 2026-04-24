import SocialIcons from '../components/SocialIcons.jsx';
import styles from '../styles/UtilityBar.module.css';

const SOCIAL_LINKS = [
  { icon: 'github',   href: 'https://github.com/nifemi01-0ps',        label: 'GitHub' },
  { icon: 'linkedin', href: 'https://www.linkedin.com/in/raphael-edafe-87593a265/', label: 'LinkedIn' },
  { icon: 'email',    href: 'mailto:raphaeledafesnr@gmail.com',       label: 'Email me' },
  { icon: 'phone',    href: 'tel:+2349034483597',                     label: 'Call me' },
  { icon: 'twitter', href: 'https://x.com/AFCEdafe', label: 'Dm me' }
];

export default function UtilityBar() {
  return (
    <div className={styles.bar}>
      <span className={styles.text}>
        Frontend Developer · Nigeria
      </span>

      <SocialIcons
        links={SOCIAL_LINKS}
        color="rgba(255,255,255,0.45)"
        hover="var(--gold)"
        size={28}
        gap="4px"
      />
    </div>
  );
}