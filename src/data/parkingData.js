// Sofia, Bulgaria parking data
// Blue Zone: paid Mon-Sat 08:00-20:00
// Green Zone: paid Mon-Sat 08:00-20:00 (different tariff)
// Free: no payment required

export const ZONE_TYPES = {
  BLUE: 'blue',
  GREEN: 'green',
  YELLOW: 'yellow',
  FREE: 'free',
  RESIDENTIAL: 'residential',
};

export const ZONE_INFO = {
  [ZONE_TYPES.BLUE]: {
    label: 'Blue Zone',
    color: '#1565C0',
    lightColor: '#E3F2FD',
    pricePerHour: 2.0,
    currency: 'BGN',
    paidHours: { weekday: '08:00–20:00', saturday: '08:00–14:00', sunday: 'Free' },
    description: 'Paid parking in the city centre',
  },
  [ZONE_TYPES.GREEN]: {
    label: 'Green Zone',
    color: '#2E7D32',
    lightColor: '#E8F5E9',
    pricePerHour: 1.5,
    currency: 'BGN',
    paidHours: { weekday: '08:00–20:00', saturday: '08:00–14:00', sunday: 'Free' },
    description: 'Paid parking around the city centre',
  },
  [ZONE_TYPES.YELLOW]: {
    label: 'Yellow Zone',
    color: '#F9A825',
    lightColor: '#FFFDE7',
    pricePerHour: 1.0,
    currency: 'BGN',
    paidHours: { weekday: '08:00–18:00', saturday: '08:00–14:00', sunday: 'Free' },
    description: 'Paid parking in outer central areas',
  },
  [ZONE_TYPES.FREE]: {
    label: 'Free Parking',
    color: '#424242',
    lightColor: '#F5F5F5',
    pricePerHour: 0,
    currency: '',
    paidHours: { weekday: 'Always free', saturday: 'Always free', sunday: 'Always free' },
    description: 'Free public parking',
  },
  [ZONE_TYPES.RESIDENTIAL]: {
    label: 'Residential (Between Buildings)',
    color: '#6A1B9A',
    lightColor: '#F3E5F5',
    pricePerHour: 0,
    currency: '',
    paidHours: { weekday: 'Residents only at night', saturday: 'Residents only at night', sunday: 'Residents only at night' },
    description: 'Parking between residential buildings – limited use',
  },
};

// Parking locations around Sofia
export const parkingSpots = [
  // --- Blue Zone (City centre) ---
  {
    id: 1,
    name: 'NDK Underground Parking',
    lat: 42.6876,
    lng: 23.3197,
    zone: ZONE_TYPES.BLUE,
    type: 'underground',
    totalSpots: 320,
    availableSpots: 45,
    address: 'pl. Bulgaria 1, Sofia',
    nearbyLandmark: 'National Palace of Culture',
    paymentMethods: ['cash', 'card', 'mobile'],
    accessibleSpots: 8,
  },
  {
    id: 2,
    name: 'Mall of Sofia Parking',
    lat: 42.6921,
    lng: 23.3241,
    zone: ZONE_TYPES.BLUE,
    type: 'underground',
    totalSpots: 500,
    availableSpots: 120,
    address: 'ul. Aleksandar Stamboliyski 101, Sofia',
    nearbyLandmark: 'Mall of Sofia',
    paymentMethods: ['cash', 'card'],
    accessibleSpots: 12,
  },
  {
    id: 3,
    name: 'Vitosha Blvd Parking',
    lat: 42.6945,
    lng: 23.3225,
    zone: ZONE_TYPES.BLUE,
    type: 'street',
    totalSpots: 40,
    availableSpots: 5,
    address: 'ul. Vitosha, Sofia',
    nearbyLandmark: 'Vitosha Boulevard',
    paymentMethods: ['mobile', 'meter'],
    accessibleSpots: 2,
  },
  {
    id: 4,
    name: 'Serdika Parking',
    lat: 42.6997,
    lng: 23.3211,
    zone: ZONE_TYPES.BLUE,
    type: 'surface',
    totalSpots: 80,
    availableSpots: 12,
    address: 'ul. Positano 2, Sofia',
    nearbyLandmark: 'Serdika Metro Station',
    paymentMethods: ['cash', 'card', 'mobile'],
    accessibleSpots: 4,
  },
  {
    id: 5,
    name: 'Central Market Hall Parking',
    lat: 42.7008,
    lng: 23.3248,
    zone: ZONE_TYPES.BLUE,
    type: 'surface',
    totalSpots: 60,
    availableSpots: 8,
    address: 'ul. Stefan Stambolov 21, Sofia',
    nearbyLandmark: 'Central Market Hall',
    paymentMethods: ['cash', 'mobile'],
    accessibleSpots: 3,
  },
  // --- Green Zone ---
  {
    id: 6,
    name: 'Sofia University Parking',
    lat: 42.6961,
    lng: 23.3343,
    zone: ZONE_TYPES.GREEN,
    type: 'street',
    totalSpots: 50,
    availableSpots: 18,
    address: 'bul. Tsar Osvoboditel 15, Sofia',
    nearbyLandmark: 'Sofia University',
    paymentMethods: ['mobile', 'meter'],
    accessibleSpots: 2,
  },
  {
    id: 7,
    name: 'Oborishte Street Parking',
    lat: 42.6981,
    lng: 23.3370,
    zone: ZONE_TYPES.GREEN,
    type: 'street',
    totalSpots: 35,
    availableSpots: 10,
    address: 'ul. Oborishte, Sofia',
    nearbyLandmark: 'Oborishte Neighbourhood',
    paymentMethods: ['mobile', 'meter'],
    accessibleSpots: 1,
  },
  {
    id: 8,
    name: 'Ivan Vazov Theatre Parking',
    lat: 42.6931,
    lng: 23.3301,
    zone: ZONE_TYPES.GREEN,
    type: 'street',
    totalSpots: 25,
    availableSpots: 6,
    address: 'ul. Dyakon Ignatiy 5, Sofia',
    nearbyLandmark: 'Ivan Vazov National Theatre',
    paymentMethods: ['mobile'],
    accessibleSpots: 1,
  },
  {
    id: 9,
    name: 'Yuzhen Park Parking',
    lat: 42.6842,
    lng: 23.3190,
    zone: ZONE_TYPES.GREEN,
    type: 'surface',
    totalSpots: 90,
    availableSpots: 30,
    address: 'bul. Bulgaria, Sofia',
    nearbyLandmark: 'South Park Sofia',
    paymentMethods: ['cash', 'mobile'],
    accessibleSpots: 5,
  },
  // --- Yellow Zone ---
  {
    id: 10,
    name: 'Arena Sofia Parking',
    lat: 42.6717,
    lng: 23.2783,
    zone: ZONE_TYPES.YELLOW,
    type: 'surface',
    totalSpots: 200,
    availableSpots: 80,
    address: 'ul. Arsenalski 1, Sofia',
    nearbyLandmark: 'Arena Sofia',
    paymentMethods: ['cash', 'card'],
    accessibleSpots: 10,
  },
  {
    id: 11,
    name: 'Vasil Levski Stadium Parking',
    lat: 42.6980,
    lng: 23.3490,
    zone: ZONE_TYPES.YELLOW,
    type: 'surface',
    totalSpots: 150,
    availableSpots: 60,
    address: 'bul. Evlogi Georgiev 38, Sofia',
    nearbyLandmark: 'Vasil Levski National Stadium',
    paymentMethods: ['cash'],
    accessibleSpots: 8,
  },
  {
    id: 12,
    name: 'Lozenets Parking',
    lat: 42.6798,
    lng: 23.3312,
    zone: ZONE_TYPES.YELLOW,
    type: 'street',
    totalSpots: 40,
    availableSpots: 15,
    address: 'ul. Lozenets, Sofia',
    nearbyLandmark: 'Lozenets Neighbourhood',
    paymentMethods: ['mobile', 'meter'],
    accessibleSpots: 2,
  },
  // --- Free Parking ---
  {
    id: 13,
    name: 'Borisova Gradina Free Parking',
    lat: 42.6890,
    lng: 23.3480,
    zone: ZONE_TYPES.FREE,
    type: 'surface',
    totalSpots: 120,
    availableSpots: 55,
    address: 'bul. Dragan Tsankov, Sofia',
    nearbyLandmark: 'Boris Garden',
    paymentMethods: [],
    accessibleSpots: 6,
  },
  {
    id: 14,
    name: 'Nadezhda Free Parking',
    lat: 42.7311,
    lng: 23.3059,
    zone: ZONE_TYPES.FREE,
    type: 'street',
    totalSpots: 60,
    availableSpots: 25,
    address: 'bul. Rositsa, Sofia',
    nearbyLandmark: 'Nadezhda District',
    paymentMethods: [],
    accessibleSpots: 3,
  },
  {
    id: 15,
    name: 'Mladost 1 Free Parking',
    lat: 42.6506,
    lng: 23.3768,
    zone: ZONE_TYPES.FREE,
    type: 'surface',
    totalSpots: 100,
    availableSpots: 40,
    address: 'bul. Aleksandar Malinov, Sofia',
    nearbyLandmark: 'Mladost 1 Neighbourhood',
    paymentMethods: [],
    accessibleSpots: 5,
  },
  {
    id: 16,
    name: 'Lyulin Free Parking',
    lat: 42.7048,
    lng: 23.2453,
    zone: ZONE_TYPES.FREE,
    type: 'surface',
    totalSpots: 80,
    availableSpots: 35,
    address: 'bul. Lyulin, Sofia',
    nearbyLandmark: 'Lyulin District',
    paymentMethods: [],
    accessibleSpots: 4,
  },
  // --- Residential (Between Buildings) ---
  {
    id: 17,
    name: 'Studentski Grad Residential',
    lat: 42.6618,
    lng: 23.3532,
    zone: ZONE_TYPES.RESIDENTIAL,
    type: 'residential',
    totalSpots: 70,
    availableSpots: 20,
    address: 'Studentski Grad, Sofia',
    nearbyLandmark: 'Students Town Campus',
    paymentMethods: [],
    accessibleSpots: 3,
    note: 'Priority for residents at night (22:00–08:00)',
  },
  {
    id: 18,
    name: 'Druzhba Residential Parking',
    lat: 42.6690,
    lng: 23.3920,
    zone: ZONE_TYPES.RESIDENTIAL,
    type: 'residential',
    totalSpots: 90,
    availableSpots: 30,
    address: 'Druzhba 1, Sofia',
    nearbyLandmark: 'Druzhba District',
    paymentMethods: [],
    accessibleSpots: 4,
    note: 'Priority for residents at night (22:00–08:00)',
  },
  {
    id: 19,
    name: 'Nadezhda 3 Residential',
    lat: 42.7385,
    lng: 23.3068,
    zone: ZONE_TYPES.RESIDENTIAL,
    type: 'residential',
    totalSpots: 55,
    availableSpots: 18,
    address: 'Nadezhda 3, Sofia',
    nearbyLandmark: 'Nadezhda 3 District',
    paymentMethods: [],
    accessibleSpots: 2,
    note: 'Priority for residents at night (22:00–08:00)',
  },
  {
    id: 20,
    name: 'Musagenitsa Residential',
    lat: 42.6752,
    lng: 23.3671,
    zone: ZONE_TYPES.RESIDENTIAL,
    type: 'residential',
    totalSpots: 65,
    availableSpots: 22,
    address: 'Musagenitsa, Sofia',
    nearbyLandmark: 'Musagenitsa District',
    paymentMethods: [],
    accessibleSpots: 3,
    note: 'Priority for residents at night (22:00–08:00)',
  },
];

// Major events / venues in Sofia that affect parking
export const sofiaEvents = [
  {
    id: 'e1',
    name: 'Concert at Arena Sofia',
    venue: 'Arena Sofia',
    lat: 42.6717,
    lng: 23.2783,
    impactRadius: 0.8, // km
    date: null, // recurring
    type: 'concert',
    icon: '🎵',
    impactLevel: 'high',
    description: 'Major concerts reduce parking significantly in the western part of the city',
    affectedZones: [10],
  },
  {
    id: 'e2',
    name: 'Football at Vasil Levski Stadium',
    venue: 'Vasil Levski National Stadium',
    lat: 42.6980,
    lng: 23.3490,
    impactRadius: 1.0,
    date: null,
    type: 'sports',
    icon: '⚽',
    impactLevel: 'high',
    description: 'Football matches cause heavy congestion east of the centre',
    affectedZones: [11, 6],
  },
  {
    id: 'e3',
    name: 'NDK Event',
    venue: 'National Palace of Culture',
    lat: 42.6876,
    lng: 23.3197,
    impactRadius: 0.6,
    date: null,
    type: 'culture',
    icon: '🎭',
    impactLevel: 'medium',
    description: 'NDK events cause increased parking demand in the southern centre',
    affectedZones: [1, 3],
  },
  {
    id: 'e4',
    name: 'Sofia Tech Park Event',
    venue: 'Sofia Tech Park',
    lat: 42.6521,
    lng: 23.3768,
    impactRadius: 0.5,
    date: null,
    type: 'tech',
    icon: '💻',
    impactLevel: 'medium',
    description: 'Tech events draw visitors to Mladost area',
    affectedZones: [15],
  },
];

// Rush hour definitions
export const RUSH_HOURS = [
  { label: 'Morning rush', start: 7, end: 10, days: [1, 2, 3, 4, 5], level: 'high' },
  { label: 'Evening rush', start: 17, end: 20, days: [1, 2, 3, 4, 5], level: 'high' },
  { label: 'Midday (weekday)', start: 12, end: 14, days: [1, 2, 3, 4, 5], level: 'medium' },
  { label: 'Saturday shopping', start: 10, end: 15, days: [6], level: 'medium' },
];

/**
 * Returns the current traffic / parking pressure based on day and hour.
 * day: 0=Sun, 1=Mon…6=Sat
 */
export function getParkingPressure(hour, day) {
  for (const rh of RUSH_HOURS) {
    if (rh.days.includes(day) && hour >= rh.start && hour < rh.end) {
      return { level: rh.level, label: rh.label };
    }
  }
  if (day === 0) return { level: 'low', label: 'Sunday – easy parking' };
  if (day === 6) return { level: 'low', label: 'Saturday off-peak' };
  return { level: 'low', label: 'Normal hours' };
}

/**
 * Checks whether a zone is currently paid given the current time.
 */
export function isCurrentlyPaid(zone, hour, day) {
  if (zone === ZONE_TYPES.FREE || zone === ZONE_TYPES.RESIDENTIAL) return false;
  if (day === 0) return false; // Sunday – all street parking free
  const info = ZONE_INFO[zone];
  if (!info || info.pricePerHour === 0) return false;

  if (zone === ZONE_TYPES.BLUE || zone === ZONE_TYPES.GREEN) {
    if (day >= 1 && day <= 5) return hour >= 8 && hour < 20;
    if (day === 6) return hour >= 8 && hour < 14;
  }
  if (zone === ZONE_TYPES.YELLOW) {
    if (day >= 1 && day <= 5) return hour >= 8 && hour < 18;
    if (day === 6) return hour >= 8 && hour < 14;
  }
  return false;
}
