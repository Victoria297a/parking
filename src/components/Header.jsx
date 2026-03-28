import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>🅿</span>
        <div>
          <div className={styles.logoTitle}>Sofia Parking</div>
          <div className={styles.logoSub}>Find &amp; navigate parking in Sofia, Bulgaria</div>
        </div>
      </div>
      <div className={styles.tagline}>
        🇧🇬 Real-time parking availability · Payment zones · Navigation
      </div>
    </header>
  );
}
