import { createEffect, createSignal, onMount } from 'solid-js';

export function DarkModeToggle() {
  const [darkMode, setDarkMode] = createSignal(false);

  let checkboxRef: HTMLInputElement | undefined = undefined;

  createEffect(() => {
    const darkModeClass = 'dark-mode';
    const documentClassList = document.documentElement.classList;

    documentClassList.toggle(darkModeClass, darkMode());
  });

  const onInput = () => {
    if (!checkboxRef) return;

    setDarkMode(checkboxRef.checked);
  };

  onMount(() => {
    if (!checkboxRef) return;

    setDarkMode(checkboxRef.checked);
  });

  return (
    <div>
      <input
        ref={checkboxRef}
        id="dark-mode"
        type="checkbox"
        onInput={() => onInput()}
        checked={true}
      ></input>
      <label for="dark-mode">Dark mode</label>
    </div>
  );
}
