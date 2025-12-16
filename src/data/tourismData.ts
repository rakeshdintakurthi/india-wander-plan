export interface State {
  id: string;
  name: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface City {
  id: string;
  stateId: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  bestFor: string[];
}

export interface Place {
  id: string;
  cityId: string;
  name: string;
  description: string;
  image: string;
  category: string;
  visitDuration: string;
}

export type PreferenceType = 
  | 'hills' 
  | 'mountains' 
  | 'beaches' 
  | 'agriculture' 
  | 'spiritual';

export const preferences: { id: PreferenceType; label: string; icon: string; description: string }[] = [
  { id: 'hills', label: 'Hills', icon: '⛰️', description: 'Scenic hill stations and valleys' },
  { id: 'mountains', label: 'Mountains', icon: '🏔️', description: 'Majestic mountain ranges' },
  { id: 'beaches', label: 'Beaches', icon: '🏖️', description: 'Beautiful coastal areas' },
  { id: 'agriculture', label: 'Agriculture Villages', icon: '🌾', description: 'Rural farming communities' },
  { id: 'spiritual', label: 'Spiritual Places', icon: '🛕', description: 'Temples and sacred sites' },
];

export const states: State[] = [
  {
    id: 'andhra-pradesh',
    name: 'Andhra Pradesh',
    description: 'Land of rice and spices, known for its rich cultural heritage and stunning temples.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
    highlights: ['Tirupati Temple', 'Beaches', 'Rich Culture'],
  },
  {
    id: 'telangana',
    name: 'Telangana',
    description: 'Home to the historic city of Hyderabad with its iconic Charminar and delicious biryani.',
    image: 'https://images.unsplash.com/photo-1603813507806-0d33c9d6b0c4?w=800',
    highlights: ['Charminar', 'Golconda Fort', 'Hyderabadi Cuisine'],
  },
  {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    description: 'Ancient Dravidian culture with magnificent temples and classical arts.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
    highlights: ['Meenakshi Temple', 'Marina Beach', 'Classical Dance'],
  },
  {
    id: 'kerala',
    name: 'Kerala',
    description: "God's Own Country - famous for backwaters, Ayurveda, and lush greenery.",
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
    highlights: ['Backwaters', 'Hill Stations', 'Ayurveda'],
  },
];

export const cities: City[] = [
  // Andhra Pradesh
  {
    id: 'vijayawada',
    stateId: 'andhra-pradesh',
    name: 'Vijayawada',
    description: 'The business capital of AP, known for Kanaka Durga Temple and vibrant city life.',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
    tags: ['City Life', 'Culture', 'Temples'],
    bestFor: ['spiritual', 'agriculture'],
  },
  {
    id: 'visakhapatnam',
    stateId: 'andhra-pradesh',
    name: 'Visakhapatnam',
    description: 'The City of Destiny - a beautiful port city with stunning beaches and hills.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    tags: ['Beaches', 'Hills', 'Navy'],
    bestFor: ['beaches', 'hills', 'mountains'],
  },
  {
    id: 'tirupati',
    stateId: 'andhra-pradesh',
    name: 'Tirupati',
    description: 'Home to the world-famous Tirumala Venkateswara Temple, one of the richest pilgrimage centers.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
    tags: ['Pilgrimage', 'Spiritual', 'Temple'],
    bestFor: ['spiritual', 'hills'],
  },
  // Telangana
  {
    id: 'hyderabad',
    stateId: 'telangana',
    name: 'Hyderabad',
    description: 'The City of Pearls - known for Charminar, biryani, and IT hub.',
    image: 'https://images.unsplash.com/photo-1603813507806-0d33c9d6b0c4?w=800',
    tags: ['Heritage', 'Food', 'IT Hub'],
    bestFor: ['spiritual', 'agriculture'],
  },
  {
    id: 'warangal',
    stateId: 'telangana',
    name: 'Warangal',
    description: 'Ancient Kakatiya kingdom capital with stunning temples and fort ruins.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
    tags: ['Heritage', 'Temples', 'History'],
    bestFor: ['spiritual', 'agriculture'],
  },
  // Tamil Nadu
  {
    id: 'chennai',
    stateId: 'tamil-nadu',
    name: 'Chennai',
    description: 'The gateway to South India with beautiful beaches and classical arts.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
    tags: ['Beaches', 'Culture', 'Temples'],
    bestFor: ['beaches', 'spiritual'],
  },
  {
    id: 'madurai',
    stateId: 'tamil-nadu',
    name: 'Madurai',
    description: 'One of the oldest cities in India, home to the magnificent Meenakshi Temple.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
    tags: ['Pilgrimage', 'Heritage', 'Temples'],
    bestFor: ['spiritual'],
  },
  // Kerala
  {
    id: 'kochi',
    stateId: 'kerala',
    name: 'Kochi',
    description: 'The Queen of Arabian Sea - a vibrant port city with colonial heritage.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
    tags: ['Backwaters', 'Heritage', 'Beaches'],
    bestFor: ['beaches', 'agriculture'],
  },
  {
    id: 'munnar',
    stateId: 'kerala',
    name: 'Munnar',
    description: 'A hill station surrounded by tea plantations and misty mountains.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
    tags: ['Hills', 'Tea Gardens', 'Nature'],
    bestFor: ['hills', 'mountains', 'agriculture'],
  },
];

export const places: Place[] = [
  // Visakhapatnam
  {
    id: 'rk-beach',
    cityId: 'visakhapatnam',
    name: 'RK Beach',
    description: 'The most popular beach in Vizag, perfect for evening walks and local food.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    category: 'Beach',
    visitDuration: '2-3 hours',
  },
  {
    id: 'kailasagiri',
    cityId: 'visakhapatnam',
    name: 'Kailasagiri',
    description: 'A hilltop park with panoramic views of the city and sea, featuring Shiva-Parvati statues.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    category: 'Hill Station',
    visitDuration: '3-4 hours',
  },
  {
    id: 'submarine-museum',
    cityId: 'visakhapatnam',
    name: 'INS Kursura Submarine Museum',
    description: 'A decommissioned submarine converted into a museum showcasing naval history.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    category: 'Museum',
    visitDuration: '1-2 hours',
  },
  {
    id: 'araku-valley',
    cityId: 'visakhapatnam',
    name: 'Araku Valley',
    description: 'A scenic hill station known for coffee plantations and tribal culture.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    category: 'Hill Station',
    visitDuration: 'Full day',
  },
  // Tirupati
  {
    id: 'tirumala-temple',
    cityId: 'tirupati',
    name: 'Tirumala Venkateswara Temple',
    description: 'The most visited religious site in the world, dedicated to Lord Venkateswara.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
    category: 'Temple',
    visitDuration: '4-6 hours',
  },
  {
    id: 'sri-padmavathi',
    cityId: 'tirupati',
    name: 'Sri Padmavathi Ammavari Temple',
    description: 'Temple dedicated to Goddess Padmavathi, consort of Lord Venkateswara.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
    category: 'Temple',
    visitDuration: '1-2 hours',
  },
  {
    id: 'talakona-waterfall',
    cityId: 'tirupati',
    name: 'Talakona Waterfall',
    description: 'The highest waterfall in Andhra Pradesh, surrounded by dense forests.',
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800',
    category: 'Nature',
    visitDuration: '3-4 hours',
  },
  // Vijayawada
  {
    id: 'kanaka-durga',
    cityId: 'vijayawada',
    name: 'Kanaka Durga Temple',
    description: 'An ancient temple dedicated to Goddess Durga, situated on Indrakeeladri Hill.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
    category: 'Temple',
    visitDuration: '2-3 hours',
  },
  {
    id: 'prakasam-barrage',
    cityId: 'vijayawada',
    name: 'Prakasam Barrage',
    description: 'A beautiful dam across Krishna River, offering stunning sunset views.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    category: 'Landmark',
    visitDuration: '1-2 hours',
  },
  {
    id: 'undavalli-caves',
    cityId: 'vijayawada',
    name: 'Undavalli Caves',
    description: 'Ancient rock-cut caves with beautiful sculptures and a huge monolithic Buddha statue.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
    category: 'Heritage',
    visitDuration: '2-3 hours',
  },
];

export function getCitiesByState(stateId: string): City[] {
  return cities.filter(city => city.stateId === stateId);
}

export function getPlacesByCity(cityId: string): Place[] {
  return places.filter(place => place.cityId === cityId);
}

export function recommendCity(stateId: string, selectedPreferences: PreferenceType[]): City | null {
  const stateCities = getCitiesByState(stateId);
  
  if (stateCities.length === 0) return null;
  
  // Score each city based on matching preferences
  const scoredCities = stateCities.map(city => {
    const score = selectedPreferences.reduce((acc, pref) => {
      return acc + (city.bestFor.includes(pref) ? 1 : 0);
    }, 0);
    return { city, score };
  });
  
  // Sort by score and return the best match
  scoredCities.sort((a, b) => b.score - a.score);
  return scoredCities[0]?.city || stateCities[0];
}

export function getRecommendationReason(city: City, selectedPreferences: PreferenceType[]): string {
  const matchingPrefs = selectedPreferences.filter(pref => city.bestFor.includes(pref));
  const prefLabels = matchingPrefs.map(pref => 
    preferences.find(p => p.id === pref)?.label
  ).filter(Boolean);
  
  if (prefLabels.length === 0) {
    return `${city.name} is a great destination in this state with diverse attractions.`;
  }
  
  return `${city.name} is perfect for you because it offers excellent ${prefLabels.join(', ').toLowerCase()} experiences!`;
}

export function suggestBestState(): State {
  // Simple rule-based logic - suggest Kerala as it has diverse options
  const stateScores: Record<string, number> = {
    'kerala': 10,
    'andhra-pradesh': 8,
    'tamil-nadu': 7,
    'telangana': 6,
  };
  
  // Randomly pick between top states for variety
  const topStates = states.sort((a, b) => 
    (stateScores[b.id] || 0) - (stateScores[a.id] || 0)
  );
  
  return topStates[Math.floor(Math.random() * 2)];
}
