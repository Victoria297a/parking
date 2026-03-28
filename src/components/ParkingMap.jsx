import { useEffect, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  CircleMarker,
  Circle,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ZONE_INFO, isCurrentlyPaid } from '../data/parkingData';
import { useTimeContext } from '../hooks/useTimeContext';
import styles from './ParkingMap.module.css';

// Fix default marker icons broken by Vite bundling
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function createParkingIcon(zone, isPaid) {
  const info = ZONE_INFO[zone];
  const color = info ? info.color : '#757575';
  const border = isPaid ? '#FF5722' : color;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
      <path fill="${color}" stroke="${border}" stroke-width="2"
        d="M14 2C8.48 2 4 6.48 4 12c0 7.5 10 22 10 22s10-14.5 10-22c0-5.52-4.48-10-10-10z"/>
      <text x="14" y="16" text-anchor="middle" fill="white" font-size="10"
        font-family="Arial,sans-serif" font-weight="bold">P</text>
    </svg>`;
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -36],
  });
}

function createSavedIcon() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
      <path fill="#FF6F00" stroke="#E65100" stroke-width="2"
        d="M16 2C9.37 2 4 7.37 4 14c0 9 12 26 12 26s12-17 12-26c0-6.63-5.37-12-12-12z"/>
      <text x="16" y="18" text-anchor="middle" fill="white" font-size="13"
        font-family="Arial,sans-serif" font-weight="bold">🚗</text>
    </svg>`;
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
  });
}

function FlyToController({ flyTarget }) {
  const map = useMap();
  const prevTarget = useRef(null);

  useEffect(() => {
    if (flyTarget && flyTarget !== prevTarget.current) {
      prevTarget.current = flyTarget;
      map.flyTo([flyTarget.lat, flyTarget.lng], 16, { duration: 1.5 });
    }
  }, [flyTarget, map]);

  return null;
}

function AvailabilityBar({ available, total }) {
  const pct = total > 0 ? Math.round((available / total) * 100) : 0;
  const color = pct > 50 ? '#2E7D32' : pct > 20 ? '#F9A825' : '#C62828';
  return (
    <div style={{ margin: '6px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
        <span style={{ color }}>
          {available}/{total} spots free
        </span>
        <span style={{ color, fontWeight: 600 }}>{pct}%</span>
      </div>
      <div style={{ background: '#eee', borderRadius: 4, height: 6, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, background: color, height: '100%', borderRadius: 4, transition: 'width 0.3s' }} />
      </div>
    </div>
  );
}

export default function ParkingMap({
  spots,
  savedSpots,
  onSaveSpot,
  onRemoveSpot,
  isSaved,
  flyTarget,
  activeZones,
  onMapClick,
}) {
  const { hour, day } = useTimeContext();

  const visibleSpots = spots.filter((s) => activeZones.includes(s.zone));

  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        center={[42.6977, 23.3219]}
        zoom={13}
        className={styles.map}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FlyToController flyTarget={flyTarget} />

        {/* Parking spots */}
        {visibleSpots.map((spot) => {
          const paid = isCurrentlyPaid(spot.zone, hour, day);
          const icon = createParkingIcon(spot.zone, paid);
          const info = ZONE_INFO[spot.zone];
          const saved = isSaved(spot.id);

          return (
            <Marker
              key={spot.id}
              position={[spot.lat, spot.lng]}
              icon={icon}
            >
              <Popup maxWidth={280}>
                <div className={styles.popup}>
                  <div className={styles.popupHeader} style={{ background: info.lightColor, borderBottom: `3px solid ${info.color}` }}>
                    <span className={styles.popupZone} style={{ color: info.color }}>
                      {info.label}
                    </span>
                    <span className={`${styles.popupPaid} ${paid ? styles.paid : styles.free}`}>
                      {paid ? `💰 ${info.pricePerHour} BGN/h` : '✅ Free now'}
                    </span>
                  </div>
                  <div className={styles.popupBody}>
                    <h4 className={styles.popupName}>{spot.name}</h4>
                    <div className={styles.popupAddress}>📍 {spot.address}</div>
                    {spot.nearbyLandmark && (
                      <div className={styles.popupLandmark}>🏛 Near: {spot.nearbyLandmark}</div>
                    )}
                    <AvailabilityBar available={spot.availableSpots} total={spot.totalSpots} />
                    {spot.accessibleSpots > 0 && (
                      <div className={styles.accessible}>♿ {spot.accessibleSpots} accessible spots</div>
                    )}
                    {spot.paymentMethods.length > 0 && (
                      <div className={styles.payment}>
                        💳 {spot.paymentMethods.join(', ')}
                      </div>
                    )}
                    {spot.note && <div className={styles.note}>ℹ️ {spot.note}</div>}
                    <div className={styles.hours}>
                      🕐 Weekdays: {info.paidHours.weekday}<br />
                      🕐 Saturday: {info.paidHours.saturday}<br />
                      🕐 Sunday: {info.paidHours.sunday}
                    </div>
                    <div className={styles.popupActions}>
                      <button
                        className={`${styles.actionBtn} ${styles.navBtn}`}
                        onClick={() => window.open(
                          `https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}`,
                          '_blank'
                        )}
                      >
                        🧭 Navigate
                      </button>
                      <button
                        className={`${styles.actionBtn} ${saved ? styles.savedBtn : styles.saveBtn}`}
                        onClick={() => saved ? onRemoveSpot(spot.id) : onSaveSpot(spot)}
                      >
                        {saved ? '🔖 Saved' : '📌 Save Spot'}
                      </button>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Custom saved spots (car location) */}
        {savedSpots
          .filter((s) => s.isCustom)
          .map((spot) => (
            <Marker
              key={spot.id}
              position={[spot.lat, spot.lng]}
              icon={createSavedIcon()}
            >
              <Popup>
                <div className={styles.popup}>
                  <div className={styles.popupBody}>
                    <h4 className={styles.popupName}>🚗 {spot.name}</h4>
                    <div className={styles.coords}>
                      {spot.lat.toFixed(5)}, {spot.lng.toFixed(5)}
                    </div>
                    <div className={styles.popupActions}>
                      <button
                        className={`${styles.actionBtn} ${styles.navBtn}`}
                        onClick={() => window.open(
                          `https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}`,
                          '_blank'
                        )}
                      >
                        🧭 Navigate Here
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.savedBtn}`}
                        onClick={() => onRemoveSpot(spot.id)}
                      >
                        ✕ Remove
                      </button>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      {/* Click to save car position button */}
      <button
        className={styles.saveCarBtn}
        onClick={onMapClick}
        title="Save your current parking position"
      >
        🚗 Save My Car Here
      </button>
    </div>
  );
}
