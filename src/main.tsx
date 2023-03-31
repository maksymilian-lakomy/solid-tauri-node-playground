import { Command } from '@tauri-apps/api/shell';
import { listen, TauriEvent } from '@tauri-apps/api/event';
import { render } from 'solid-js/web';
import { CityOverview } from './views/city-overview';
import { EntryView } from './views/entry';
import globalStore from './store/global-store';
import { Show } from 'solid-js';
import { DarkModeToggle } from './components';

function Main() {
  const { city } = globalStore;

  return (
    <div>
      <Show when={city()} fallback={<EntryView />} keyed>
        {(city) => <CityOverview city={city} />}
      </Show>
      <DarkModeToggle />
    </div>
  );
}

const rootElementSelector = `#app`;
const rootElement = document.querySelector(rootElementSelector);

if (!rootElement)
  throw new Error(`Could not find root element by selector "${rootElementSelector}"!`);

render(() => <Main />, rootElement);

const command = Command.sidecar('binaries/app');
command.spawn().then((child) => {
  listen(TauriEvent.WINDOW_DESTROYED, function () {
    child.kill();
  });
});
