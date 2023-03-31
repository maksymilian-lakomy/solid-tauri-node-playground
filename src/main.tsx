import { Command } from '@tauri-apps/api/shell';
import { listen, TauriEvent } from '@tauri-apps/api/event';
import { render } from 'solid-js/web';

function HelloWorld() {
  return <div>Hello World!</div>;
}

const rootElementSelector = `#app`;
const rootElement = document.querySelector(rootElementSelector);

if (!rootElement)
  throw new Error(`Could not find root element by selector "${rootElementSelector}"!`);

render(() => <HelloWorld />, rootElement);

const command = Command.sidecar('binaries/app');
command.spawn().then((child) => {
  listen(TauriEvent.WINDOW_DESTROYED, function () {
    child.kill();
  });
});
