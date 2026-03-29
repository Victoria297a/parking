import { useState, useEffect } from 'react';

const STORAGE_KEY = 'sofia_parking_saved_spots';

export function useSavedSpots() {
  const [savedSpots, setSavedSpots] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSpots));
  }, [savedSpots]);

  const saveSpot = (spot) => {
    setSavedSpots((prev) => {
      if (prev.find((s) => s.id === spot.id)) return prev;
      return [
        ...prev,
        { ...spot, savedAt: new Date().toISOString() },
      ];
    });
  };

  const removeSpot = (spotId) => {
    setSavedSpots((prev) => prev.filter((s) => s.id !== spotId));
  };

  const isSaved = (spotId) => savedSpots.some((s) => s.id === spotId);

  const saveCustomSpot = (lat, lng, label) => {
    const id = `custom_${Date.now()}`;
    setSavedSpots((prev) => [
      ...prev,
      {
        id,
        name: label || 'My parked car',
        lat,
        lng,
        isCustom: true,
        savedAt: new Date().toISOString(),
      },
    ]);
    return id;
  };

  return { savedSpots, saveSpot, removeSpot, isSaved, saveCustomSpot };
}
