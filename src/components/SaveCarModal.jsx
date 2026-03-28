import { useState } from 'react';
import styles from './SaveCarModal.module.css';

export default function SaveCarModal({ onSave, onCancel }) {
  const [label, setLabel] = useState('My parked car');
  const [useGeo, setUseGeo] = useState(false);
  const [geoStatus, setGeoStatus] = useState('');

  const handleGeo = () => {
    if (!navigator.geolocation) {
      setGeoStatus('Geolocation not supported by your browser.');
      return;
    }
    setUseGeo(true);
    setGeoStatus('Getting your location…');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoStatus('✅ Location obtained!');
        onSave(pos.coords.latitude, pos.coords.longitude, label);
      },
      (err) => {
        setUseGeo(false);
        setGeoStatus(`❌ ${err.message}`);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleMapCenter = () => {
    onSave(null, null, label); // App will use current map centre
  };

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>🚗 Save Your Parking Spot</h2>
        <p className={styles.desc}>
          Mark where you parked so you can easily find your car later.
        </p>

        <label className={styles.label}>Spot label</label>
        <input
          className={styles.input}
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="e.g. Near NDK, Blue Zone"
          maxLength={60}
        />

        <div className={styles.options}>
          <button className={styles.geoBtn} onClick={handleGeo} disabled={useGeo}>
            📍 Use my GPS location
          </button>
          <button className={styles.centreBtn} onClick={handleMapCenter}>
            🗺 Use current map centre
          </button>
        </div>

        {geoStatus && <div className={styles.status}>{geoStatus}</div>}

        <button className={styles.cancelBtn} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
