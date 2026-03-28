import { useState, useRef } from 'react';
import './App.css';
import Header from './components/Header';
import ParkingMap from './components/ParkingMap';
import ZoneLegend from './components/ZoneLegend';
import TrafficPanel from './components/TrafficPanel';
import EventsPanel from './components/EventsPanel';
import SavedSpotsPanel from './components/SavedSpotsPanel';
import SearchBar from './components/SearchBar';
import SaveCarModal from './components/SaveCarModal';
import { parkingSpots, ZONE_TYPES } from './data/parkingData';
import { useSavedSpots } from './hooks/useSavedSpots';

const ALL_ZONES = Object.values(ZONE_TYPES);

function App() {
  const [activeZones, setActiveZones] = useState(ALL_ZONES);
  const [flyTarget, setFlyTarget] = useState(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [activeTab, setActiveTab] = useState('legend'); // 'legend' | 'saved' | 'events'
  const mapCentreRef = useRef([42.6977, 23.3219]);

  const { savedSpots, saveSpot, removeSpot, isSaved, saveCustomSpot } = useSavedSpots();

  const handleToggleZone = (zone) => {
    setActiveZones((prev) =>
      prev.includes(zone) ? prev.filter((z) => z !== zone) : [...prev, zone]
    );
  };

  const handleSelectSpot = (spot) => {
    setFlyTarget({ ...spot, _ts: Date.now() });
  };

  const handleFlyTo = (spot) => {
    setFlyTarget({ ...spot, _ts: Date.now() });
  };

  const handleSaveCar = (lat, lng, label) => {
    if (lat !== null && lng !== null) {
      saveCustomSpot(lat, lng, label);
    } else {
      // Use Sofia city centre as fallback (user clicked "use map centre")
      const [clat, clng] = mapCentreRef.current;
      saveCustomSpot(clat, clng, label);
    }
    setShowSaveModal(false);
    setActiveTab('saved');
  };

  return (
    <div className="appShell">
      <Header />

      <div className="mainLayout">
        {/* Sidebar */}
        <aside className="sidebar">
          <SearchBar onSelectSpot={handleSelectSpot} />

          <div className="tabBar">
            <button
              className={`tab ${activeTab === 'legend' ? 'tabActive' : ''}`}
              onClick={() => setActiveTab('legend')}
            >
              🗺 Zones
            </button>
            <button
              className={`tab ${activeTab === 'events' ? 'tabActive' : ''}`}
              onClick={() => setActiveTab('events')}
            >
              📅 Events
            </button>
            <button
              className={`tab ${activeTab === 'saved' ? 'tabActive' : ''}`}
              onClick={() => setActiveTab('saved')}
            >
              🔖 Saved{savedSpots.length > 0 ? ` (${savedSpots.length})` : ''}
            </button>
          </div>

          <div className="panelContent">
            <TrafficPanel />

            {activeTab === 'legend' && (
              <ZoneLegend activeZones={activeZones} onToggleZone={handleToggleZone} />
            )}
            {activeTab === 'events' && (
              <EventsPanel onFlyToEvent={handleFlyTo} />
            )}
            {activeTab === 'saved' && (
              <SavedSpotsPanel
                savedSpots={savedSpots}
                onRemove={removeSpot}
                onFlyTo={handleFlyTo}
              />
            )}
          </div>
        </aside>

        {/* Map */}
        <ParkingMap
          spots={parkingSpots}
          savedSpots={savedSpots}
          onSaveSpot={saveSpot}
          onRemoveSpot={removeSpot}
          isSaved={isSaved}
          flyTarget={flyTarget}
          activeZones={activeZones}
          onMapClick={() => setShowSaveModal(true)}
        />
      </div>

      {showSaveModal && (
        <SaveCarModal
          onSave={handleSaveCar}
          onCancel={() => setShowSaveModal(false)}
        />
      )}
    </div>
  );
}

export default App;
