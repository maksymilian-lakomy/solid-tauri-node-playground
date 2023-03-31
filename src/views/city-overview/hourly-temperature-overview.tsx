import { CityOverviewCallbacks } from './city-overview';
import { Weather } from '../../open-meteo';
import { getTemperaturesRangeForWholeDay } from '../../utils';
import { createSignal, For } from 'solid-js';

interface Value {
  time: string;
  temperature: number;
  wind: number;
  humidity: number;
  visibility: number;
}

interface HourlyTemperatureOverviewProps {
  units: Record<keyof Omit<Value, 'time'>, string>;
  values: Value[];
}

export const createHourlyTemperatureOverviewProps = (weatherData: Weather) => {
  const time = weatherData.current_weather.time;

  const dayTemperatures = getTemperaturesRangeForWholeDay(time, weatherData);
  const indexOffset = weatherData.hourly.temperature_2m.indexOf(dayTemperatures[0]);

  return {
    units: {
      temperature: weatherData.hourly_units.temperature_2m,
      wind: weatherData.hourly_units.windspeed_10m,
      humidity: weatherData.hourly_units.relativehumidity_2m,
      visibility: weatherData.hourly_units.visibility,
    },
    values: dayTemperatures.map((_, index) => ({
      time: weatherData.hourly.time[indexOffset + index],
      temperature: weatherData.hourly.temperature_2m[indexOffset + index],
      wind: weatherData.hourly.windspeed_10m[indexOffset + index],
      humidity: weatherData.hourly.relativehumidity_2m[indexOffset + index],
      visibility: weatherData.hourly.visibility[indexOffset + index],
    })),
  };
};

type OverviewProperty = keyof Omit<Value, 'time'>;

export function HourlyTemperatureOverview({
  setCityView,
  values,
  units,
}: HourlyTemperatureOverviewProps & CityOverviewCallbacks) {
  const [property, setProperty] = createSignal<OverviewProperty>('temperature');

  let selectRef: HTMLSelectElement | undefined = undefined;

  const onSelectChange = () => {
    if (!selectRef) return;

    const property = selectRef.value as OverviewProperty;
    setProperty(property);
  };

  return (
    <div>
      <button onClick={() => setCityView('overview')}>Close</button>
      <h2>Temperature by hour</h2>
      <select ref={selectRef} onChange={() => onSelectChange()}>
        <option value="temperature">Temperature</option>
        <option value="wind">Wind</option>
        <option value="humidity">Humidity</option>
        <option value="visibility">Visibility</option>
      </select>
      <ol>
        <For each={values}>
          {(value) => (
            <li>
              <span>{value.time}</span> :
              <span>
                {value[property()]}
                {units[property()]}
              </span>
            </li>
          )}
        </For>
      </ol>
    </div>
  );
}
