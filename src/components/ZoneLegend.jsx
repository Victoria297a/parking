import { ZONE_INFO } from '../data/parkingData';
import styles from './ZoneLegend.module.css';

export default function ZoneLegend({ activeZones, onToggleZone }) {
  return (
    <div className={styles.legend}>
      <h3 className={styles.title}>Parking Zones</h3>
      {Object.entries(ZONE_INFO).map(([key, info]) => (
        <button
          key={key}
          className={`${styles.item} ${activeZones.includes(key) ? styles.active : styles.inactive}`}
          onClick={() => onToggleZone(key)}
          style={{
            '--zone-color': info.color,
            '--zone-light': info.lightColor,
          }}
        >
          <span className={styles.dot} style={{ background: info.color }} />
          <span className={styles.label}>{info.label}</span>
          {info.pricePerHour > 0 && (
            <span className={styles.price}>{info.pricePerHour} BGN/h</span>
          )}
        </button>
      ))}
    </div>
  );
}
