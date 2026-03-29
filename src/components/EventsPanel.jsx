import { useState } from 'react';
import { sofiaEvents } from '../data/parkingData';
import styles from './EventsPanel.module.css';

const IMPACT_CONFIG = {
  high: { label: 'High impact', color: '#C62828' },
  medium: { label: 'Moderate impact', color: '#E65100' },
  low: { label: 'Low impact', color: '#1B5E20' },
};

export default function EventsPanel({ onFlyToEvent }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.panel}>
      <button className={styles.toggle} onClick={() => setExpanded((v) => !v)}>
        <span>📅 Nearby Events & Venues</span>
        <span className={styles.badge}>{sofiaEvents.length}</span>
        <span className={styles.arrow}>{expanded ? '▲' : '▼'}</span>
      </button>

      {expanded && (
        <div className={styles.list}>
          {sofiaEvents.map((ev) => {
            const imp = IMPACT_CONFIG[ev.impactLevel];
            return (
              <div key={ev.id} className={styles.eventItem}>
                <div className={styles.eventHeader}>
                  <span className={styles.icon}>{ev.icon}</span>
                  <div className={styles.eventInfo}>
                    <div className={styles.eventName}>{ev.name}</div>
                    <div className={styles.venue}>{ev.venue}</div>
                  </div>
                  <span
                    className={styles.impact}
                    style={{ color: imp.color }}
                  >
                    {imp.label}
                  </span>
                </div>
                <div className={styles.desc}>{ev.description}</div>
                <button
                  className={styles.flyBtn}
                  onClick={() => onFlyToEvent(ev)}
                >
                  📍 Show on map
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
