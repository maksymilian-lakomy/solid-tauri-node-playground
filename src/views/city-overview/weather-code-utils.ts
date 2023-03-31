import { weatherCodes } from '../../open-meteo';

export const getWeatherCode = (weatherCode: number): string => {
  return weatherCodes[weatherCode] || `Got unknown weather code: ${weatherCode}...`;
};
