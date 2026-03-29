import styles from './TrafficPanel.module.css';
import { useTimeContext } from '../hooks/useTimeContext';

const LEVEL_CONFIG = {
  high: { color: '#C62828', bg: '#FFEBEE', emoji: '🔴', label: 'High' },
  medium: { color: '#E65100', bg: '#FFF3E0', emoji: '🟡', label: 'Medium' },
  low: { color: '#1B5E20', bg: '#E8F5E9', emoji: '🟢', label: 'Low' },
};

export default function TrafficPanel() {
  const { dayName, isWeekend, pressure, timeString } = useTimeContext();
  const config = LEVEL_CONFIG[pressure.level];

  return (
    <div className={styles.panel} style={{ background: config.bg, borderLeft: `4px solid ${config.color}` }}>
      <div className={styles.row}>
        <span className={styles.emoji}>{config.emoji}</span>
        <div>
          <div className={styles.heading}>
            Parking pressure: <strong style={{ color: config.color }}>{config.label}</strong>
          </div>
          <div className={styles.sub}>{pressure.label}</div>
        </div>
      </div>
      <div className={styles.meta}>
        <span>{dayName}</span>
        <span className={styles.sep}>·</span>
        <span>{timeString}</span>
        <span className={styles.sep}>·</span>
        <span>{isWeekend ? '🏖 Weekend' : '💼 Weekday'}</span>
      </div>
    </div>
  );
}
