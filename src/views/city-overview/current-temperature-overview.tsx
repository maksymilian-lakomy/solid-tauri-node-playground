import { Weather } from '../../open-meteo';
import { getDate } from './date-utils';
import { getWeatherCode } from './weather-code-utils';
import { CityOverviewCallbacks } from './city-overview';
import { getTemperaturesRangeForWholeDay } from '../../utils';

interface CurrentTemperatureOverviewProps {
  time: Date;
  weatherCode: number;
  units: {
    wind: string;
    humidity: string;
    temperature: string;
    visibility: string;
  };
  values: {
    wind: number;
    smallestTemperature: number;
    largestTemperature: number;
    temperature: number;
    apparentTemperature: number;
    humidity: number;
    visibility: number;
  };
}

export const createCurrentTemperatureOverviewProps = (
  weatherData: Weather,
): CurrentTemperatureOverviewProps => {
  const time = weatherData.current_weather.time;

  const dayTemperatures = getTemperaturesRangeForWholeDay(time, weatherData);
  const sortedDayTemperatures = dayTemperatures.sort((a, b) => a - b);

  const timeIndex = weatherData.hourly.time.indexOf(time);

  return {
    time: new Date(weatherData.current_weather.time),
    weatherCode: weatherData.hourly.weathercode[timeIndex],
    units: {
      temperature: weatherData.hourly_units.temperature_2m,
      wind: weatherData.hourly_units.windspeed_10m,
      humidity: weatherData.hourly_units.relativehumidity_2m,
      visibility: weatherData.hourly_units.visibility,
    },
    values: {
      smallestTemperature: sortedDayTemperatures[0],
      largestTemperature: sortedDayTemperatures[sortedDayTemperatures.length - 1],
      temperature: weatherData.hourly.temperature_2m[timeIndex],
      apparentTemperature: weatherData.hourly.apparent_temperature[timeIndex],
      wind: weatherData.hourly.windspeed_10m[timeIndex],
      humidity: weatherData.hourly.relativehumidity_2m[timeIndex],
      visibility: weatherData.hourly.visibility[timeIndex],
    },
  };
};

export function CurrentTemperatureOverview({
  time,
  weatherCode,
  values,
  units,
  setCityView,
}: CurrentTemperatureOverviewProps & CityOverviewCallbacks) {
  return (
    <div>
      <div>{getDate(time)}</div>
      <div>{getWeatherCode(weatherCode)}</div>
      <h2>
        {values.temperature}
        {units.temperature}
      </h2>
      <div>
        <h3>Daily summary</h3>
        <p>
          Now it feels like {values.apparentTemperature}
          {units.temperature}, but actually it is {values.temperature}.
        </p>
        <p>
          Today the temperature is felt in range from {values.smallestTemperature}
          {units.temperature} to {values.largestTemperature}
          {units.temperature}
        </p>
      </div>

      <div>
        <div>
          <p>
            {values.wind}
            {units.wind}
            <br />
            Wind
          </p>
          <p>
            {values.humidity}
            {units.humidity}
            <br />
            Humidity
          </p>
          <p>
            {values.visibility}
            {units.visibility}
            <br />
            Visibility
          </p>
        </div>
      </div>

      <button onClick={() => setCityView('hourly')}>See temperature by hour</button>
    </div>
  );
}
