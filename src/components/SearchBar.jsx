import { useState } from 'react';
import styles from './SearchBar.module.css';
import { parkingSpots } from '../data/parkingData';

export default function SearchBar({ onSelectSpot }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [focused, setFocused] = useState(false);

  const handleChange = (e) => {
    const q = e.target.value;
    setQuery(q);
    if (q.trim().length < 2) {
      setResults([]);
      return;
    }
    const lower = q.toLowerCase();
    setResults(
      parkingSpots
        .filter(
          (s) =>
            s.name.toLowerCase().includes(lower) ||
            s.address.toLowerCase().includes(lower) ||
            (s.nearbyLandmark && s.nearbyLandmark.toLowerCase().includes(lower))
        )
        .slice(0, 6)
    );
  };

  const handleSelect = (spot) => {
    setQuery(spot.name);
    setResults([]);
    onSelectSpot(spot);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputRow}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          className={styles.input}
          type="text"
          placeholder="Search parking by name, address or landmark…"
          value={query}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
        />
        {query && (
          <button className={styles.clear} onClick={() => { setQuery(''); setResults([]); }}>✕</button>
        )}
      </div>

      {focused && results.length > 0 && (
        <div className={styles.dropdown}>
          {results.map((spot) => (
            <button
              key={spot.id}
              className={styles.result}
              onClick={() => handleSelect(spot)}
            >
              <span className={styles.resultName}>{spot.name}</span>
              <span className={styles.resultAddr}>{spot.address}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
