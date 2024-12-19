export interface BirthData {
  name: string;
  dateOfBirth: string; // YYYY-MM-DD format
  timeOfBirth: string; // HH:mm format
  timezone: string;    // UTC offset
  latitude: number;
  longitude: number;
  location: string;    // City, Country
  utcTimestamp?: string; // ISO string format
}

export interface LocationData {
  latitude: number;
  longitude: number;
  name: string;
}

export interface FormErrors {
  name?: string;
  dateOfBirth?: string;
  timeOfBirth?: string;
  timezone?: string;
  location?: string;
}

export interface WallpaperResponse {
  success: boolean;
  data: {
    birthData: BirthData;
    astroData: any;
    wallpaper: {
      imageUrl: string;
      colors: string[];
    };
  };
}
