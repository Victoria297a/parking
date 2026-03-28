import styles from './SavedSpotsPanel.module.css';

export default function SavedSpotsPanel({ savedSpots, onRemove, onFlyTo }) {
  if (savedSpots.length === 0) {
    return (
      <div className={styles.panel}>
        <h3 className={styles.title}>🔖 Saved Spots</h3>
        <p className={styles.empty}>No saved spots yet. Click a parking location on the map and press "Save Spot".</p>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <h3 className={styles.title}>🔖 Saved Spots ({savedSpots.length})</h3>
      <div className={styles.list}>
        {savedSpots.map((spot) => (
          <div key={spot.id} className={styles.item}>
            <div className={styles.itemInfo}>
              <div className={styles.name}>{spot.name}</div>
              {spot.isCustom && (
                <div className={styles.coords}>
                  {spot.lat.toFixed(5)}, {spot.lng.toFixed(5)}
                </div>
              )}
              <div className={styles.time}>
                Saved {new Date(spot.savedAt).toLocaleString('en-GB', {
                  day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                })}
              </div>
            </div>
            <div className={styles.actions}>
              <button className={styles.flyBtn} onClick={() => onFlyTo(spot)}>
                📍
              </button>
              <button className={styles.navBtn} onClick={() => {
                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}`,
                  '_blank'
                );
              }}>
                🧭
              </button>
              <button className={styles.removeBtn} onClick={() => onRemove(spot.id)}>
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
