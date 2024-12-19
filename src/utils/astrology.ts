import { BirthData } from '../types/birth-data';

export interface AstroData {
  biorhythm: {
    physical: number;
    emotional: number;
    intellectual: number;
  };
}

export function calculateBiorhythm(birthDate: Date, targetDate: Date = new Date()): {
  physical: number;
  emotional: number;
  intellectual: number;
} {
  const days = Math.floor((targetDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
  
  return {
    physical: Math.sin((2 * Math.PI * days) / 23) * 100,
    emotional: Math.sin((2 * Math.PI * days) / 28) * 100,
    intellectual: Math.sin((2 * Math.PI * days) / 33) * 100,
  };
}

export async function calculateAstroData(timestamp: string): Promise<AstroData> {
  const biorhythm = calculateBiorhythm(new Date(timestamp));

  return {
    biorhythm,
  };
}

export function getColorScheme(astroData: AstroData): string[] {
  // Convert biorhythm values (-100 to 100) to color intensities
  const normalizeValue = (value: number): number => (value + 100) / 2; // Convert to 0-100 range

  const physical = normalizeValue(astroData.biorhythm.physical);
  const emotional = normalizeValue(astroData.biorhythm.emotional);
  const intellectual = normalizeValue(astroData.biorhythm.intellectual);

  // Generate colors based on biorhythm values
  return [
    `hsl(0, ${physical}%, 50%)`,     // Red for physical (varies in saturation)
    `hsl(280, ${emotional}%, 50%)`,   // Purple for emotional
    `hsl(200, ${intellectual}%, 50%)`, // Blue for intellectual
    '#10B981',  // Green for growth
    '#F59E0B',  // Yellow for wisdom
  ];
}
