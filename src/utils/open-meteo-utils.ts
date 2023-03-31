import { Weather } from '../open-meteo';

export const getTemperaturesRangeForWholeDay = (
  time: string,
  weatherData: Weather,
): number[] => {
  const firstIndex = weatherData.hourly.time.indexOf(time.split('T')[0] + 'T00:00');
  const lastIndex = weatherData.hourly.time.indexOf(time.split('T')[0] + 'T23:00');

  return weatherData.hourly.temperature_2m.slice(firstIndex, lastIndex + 1);
};
