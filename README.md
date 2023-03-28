# tauri-node-playground
Tauri + node 

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

### Preconditions (tl;dr)

- Debian
    - System dependencies:
        ```
        > sudo apt update
        > sudo apt install libwebkit2gtk-4.0-dev \
            build-essential \
            curl \
            wget \
            libssl-dev \
            libgtk-3-dev \
            libayatana-appindicator3-dev \
            librsvg2-dev
        ```

    - Rust
        ```
        > curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
        ```
- macOS
    - System dependencies:
        ```
        > xcode-select --install
        ```
    - Rust
        ```
        > curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
        ```
- Troubleshooting
    ```
    > rustc --version
    ```
- [Docs](https://tauri.app/v1/guides/getting-started/prerequisites)

### Development
- Fork and clone [repository](https://github.com/tpiechaczek/tauri-node-playground)
- Execute `yarn` in root directory

**For local development**
- run `yarn tauri dev` - first run can take some time, please be patient

**To build the app**
- run `yarn tauri build`
