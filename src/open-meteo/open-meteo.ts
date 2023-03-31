export interface HourlyUnits {
  time: string;
  temperature_2m: string;
  relativehumidity_2m: string;
  apparent_temperature: string;
  windspeed_10m: string;
  weathercode: string;
  visibility: string;
}

export interface Hourly {
  time: string[];
  temperature_2m: number[];
  relativehumidity_2m: number[];
  apparent_temperature: number[];
  weathercode: number[];
  windspeed_10m: number[];
  visibility: number[];
}

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
}

export interface Weather {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: CurrentWeather;
  hourly_units: HourlyUnits;
  hourly: Hourly;
}

interface FetchWeatherDataQueryParams {
  latitude: number;
  longitude: number;
}

export class OpenMeteo {
  private static readonly API_URL = 'https://api.open-meteo.com/v1';

  public static fetchWeatherData(
    queryParams: FetchWeatherDataQueryParams,
  ): Promise<Weather> {
    const url = new URL(`${OpenMeteo.API_URL}/forecast`);
    url.searchParams.append('latitude', queryParams.latitude.toString());
    url.searchParams.append('longitude', queryParams.longitude.toString());
    url.searchParams.append(
      'hourly',
      'temperature_2m,relativehumidity_2m,windspeed_10m,apparent_temperature,weathercode,visibility',
    );
    url.searchParams.append('timezone', 'auto');
    url.searchParams.append('current_weather', 'true');
    url.searchParams.append('forecast_days', '7');

    return fetch(url.toString()).then((response) => response.json());
  }
}
