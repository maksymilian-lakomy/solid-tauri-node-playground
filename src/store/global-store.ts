import { createRoot, createSignal } from 'solid-js';

export interface CityDetails {
  city: string;
  latitude: number;
  longitude: number;
}

export const weatherTargets = {
  berlin: {
    city: 'Berlin',
    latitude: 52.520008,
    longitude: 13.404954,
  },
  krakow: {
    city: 'Kraków',
    latitude: 50.0646501,
    longitude: 19.9449799,
  },
  poznan: {
    city: 'Poznań',
    latitude: 52.406374,
    longitude: 16.9251681,
  },
  slupsk: {
    city: 'Słupsk',
    latitude: 54.46415,
    longitude: 17.02866,
  },
};

export type WeatherTarget = keyof typeof weatherTargets;

function createGlobalStore() {
  const [city, setCity] = createSignal<CityDetails | null>(null);

  const setCityByName = (cityName: keyof typeof weatherTargets) => {
    setCity(weatherTargets[cityName]);
  };

  const reset = () => setCity(null);

  return {
    city,
    setCityByName,
    reset,
  };
}

export default createRoot(createGlobalStore);
