import { WeatherTarget, weatherTargets } from '../store';
import { For } from 'solid-js';
import globalStore from '../store/global-store';

export function CitySelectComponent() {
  const { city: active, setCityByName: setActive } = globalStore;

  let selectRef: HTMLSelectElement | undefined = undefined;

  const onSelectChange = (): void => {
    if (!selectRef) return;

    setActive(selectRef.value as WeatherTarget);
  };

  const targetsList = Object.entries(weatherTargets);

  return (
    <div>
      <select ref={selectRef} onChange={() => onSelectChange()}>
        <option value="default" selected={!active()}>
          Select city
        </option>
        <For each={targetsList}>
          {([value, { city }]) => (
            <option value={value} selected={active()?.city === city}>
              {city}
            </option>
          )}
        </For>
      </select>
    </div>
  );
}
