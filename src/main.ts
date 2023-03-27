import { invoke } from "@tauri-apps/api/tauri"
import { Command } from "@tauri-apps/api/shell"
import { listen, TauriEvent } from "@tauri-apps/api/event";

let greetInputEl: HTMLInputElement | null;
let greetMsgEl: HTMLElement | null;

async function greet() {
  if (greetMsgEl && greetInputEl) {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    greetMsgEl.textContent = await invoke("greet", {
      name: greetInputEl.value,
    });
  }
}

const command = Command.sidecar('binaries/app')
command.spawn()
  .then((child) => {
    listen(TauriEvent.WINDOW_DESTROYED, function () {
      child.kill();
    })
  })

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document
    .querySelector("#greet-button")
    ?.addEventListener("click", () => greet());
});
