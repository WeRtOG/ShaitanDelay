<div align="center">
<img alt="Plug-in screenshot" src="https://github.com/WeRtOG/ShaitanDelay/blob/main/.github/PluginScreenshot.png?raw=true" width="500" />

# Shaitan DELAY (VST3 Win/Mac)

Delay plugin capable of creating magic ✨🐾
<br/><br/>
</div>
<br/><br/>

## Installation (source)

```
npm install
npx elem-copy-binaries
npm run make-ssl
```

## Build installation (Windows)

- Unpack the zip file of VST3 build
- Run `install.bat` if the plugin has not been installed before, or `update.bat` if it has already been installed
- To uninstall the plugin from the system, use this `uninstall.bat`

<br/>

## Available Scripts (Win/Mac)

### `npm start`

Runs the VST3 in the development mode.

<br/>

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

<br/>

### `npm run build`

Builds complete VST-plugin to the `dist` folder.

<br/>

### `npm run build-ui`

Builds the plugin UI to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

<br/>

### `npm run build-vst`

Makes VST3 using _already builded_ UI from `build` to `dist` folder.

<br/>

### `npm run make-zip`

Makes ZIP from last build and saves it to `dist` folder

<br/>

### `npm run make-ssl`

Makes SSL to `.cert` folder (**required** before first build)

<br/>

### `npm run publish`

Publishes last build from `dist` to Telegram\
\
Arguments:\
`--token` - [Telegram API](https://core.telegram.org/bots/api) token\
`--chatID` - [Telegram](https://telegram.org) chat id\
`--type` (can be `default` or `channel`) - [Telegram](https://telegram.org) type of chat (adds '-' to `chatID` when `channel`)\

**Note:** you can also create your local `publish.config.json` so that you don't have to write all the parameters manually every time\
\
Example:
```json
{
    "token": "YOUR_TELEGRAM_TOKEN",
    "chatID": "YOUR_CHAT_ID"
}
```
\
... And then only the `npm run publish` command without arguments will be enough to publish

<br/>

## Available Scripts (Win)

### `npm run win-uninstall`

The command to uninstall _builded_ VST3 plugin on Windows

<br/>

### `npm run win-update`

The command to update _builded_ VST3 plugin on Windows

<br/>

### `npm run win-build-install`

The command to build and install VST3 plugin on Windows

<br/>

### `npm run win-build-install-publish`

The command to build, install and publish VST3 plugin on Windows

<br/>

### `npm run win-build-update`

The command to build and update VST3 plugin on Windows

<br/>

### `npm run win-build-update-publish`

The command to build, update and publish VST3 plugin on Windows
