import { createResource, createSignal, Match, Show, Switch } from 'solid-js';
import { OpenMeteo } from '../../open-meteo';
import {
  createCurrentTemperatureOverviewProps,
  CurrentTemperatureOverview,
} from './current-temperature-overview';
import {
  createHourlyTemperatureOverviewProps,
  HourlyTemperatureOverview,
} from './hourly-temperature-overview';
import { CityDetails } from '../../store';
import globalStore from '../../store/global-store';

export type CityView = 'overview' | 'hourly' | 'weekly';

export interface CityOverviewCallbacks {
  setCityView: (cityView: CityView) => void;
}

export function CityOverview({ city }: { city: CityDetails }) {
  const [view, setView] = createSignal<CityView>('overview');

  const { reset } = globalStore;
  const [weatherData] = createResource(city, OpenMeteo.fetchWeatherData);

  return (
    <div>
      <Show when={weatherData()} keyed>
        {(weatherData) => (
          <Switch>
            <Match when={view() === 'overview'}>
              <CurrentTemperatureOverview
                setCityView={setView}
                {...createCurrentTemperatureOverviewProps(weatherData)}
              />
            </Match>
            <Match when={view() === 'hourly'}>
              <HourlyTemperatureOverview
                setCityView={setView}
                {...createHourlyTemperatureOverviewProps(weatherData)}
              />
            </Match>
          </Switch>
        )}
      </Show>
      <button onClick={() => reset()}>Return</button>
    </div>
  );
}
