import cities from 'cities.json';
import moment from 'moment-timezone';

interface City {
  name: string;
  country: string;
  lat: number;
  lng: number;
}

export function searchCities(query: string): City[] {
  const citiesData = cities as City[];
  const searchTerm = query.toLowerCase();
  
  return citiesData
    .filter(city => 
      `${city.name}, ${city.country}`.toLowerCase().includes(searchTerm)
    )
    .slice(0, 10); // Limit to 10 results
}

export function getTimezoneForLocation(latitude: number, longitude: number): string {
  return moment.tz.zone(
    moment.tz.names().find(name => {
      const zone = moment.tz.zone(name);
      if (!zone) return false;
      
      // Get timezone boundaries (approximate)
      const timezoneOffsetHours = zone.utcOffset(Date.now()) / 60;
      const expectedOffsetHours = -longitude / 15;
      
      // Check if the timezone is within 2 hours of the expected offset
      return Math.abs(timezoneOffsetHours - expectedOffsetHours) <= 2;
    }) || 'UTC'
  )?.name || 'UTC';
}

export function formatLocation(city: City): string {
  return `${city.name}, ${city.country}`;
}

export function getCurrentTimezoneOffset(timezone: string): string {
  const offset = moment.tz(timezone).format('Z');
  return offset;
}
