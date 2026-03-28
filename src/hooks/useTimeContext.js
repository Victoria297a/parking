import { useState, useEffect } from 'react';
import { getParkingPressure } from '../data/parkingData';

export function useTimeContext() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    // Update every minute
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const hour = now.getHours();
  const day = now.getDay(); // 0 = Sun
  const pressure = getParkingPressure(hour, day);

  const isWeekend = day === 0 || day === 6;
  const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day];

  const timeString = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return { now, hour, day, dayName, isWeekend, pressure, timeString };
}
