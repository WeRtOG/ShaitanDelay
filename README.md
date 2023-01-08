# Shaitan DELAY (VST3 Win/Mac)

Delay plugin capable of creating magic ✨🐾

## Available Scripts (Win/Mac)

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds complete VST-plugin to the `dist` folder.

### `npm run build-ui`

Builds the plugin UI to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run build-vst`

Makes VST3 using _already builded_ UI from `build` to `dist` folder.

### `npm run make-zip`

Makes ZIP from last build and saves it to `dist` folder

### `npm run publish`

Publishes last build to Telegram\
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

### `npm run make-ssl`

Makes SSL to `.cert` folder

### `npm run win-install`

The command to install _builded_ VST3 plugin on Windows

## Available Scripts (Win)

### `npm run win-uninstall`

The command to uninstall _builded_ VST3 plugin on Windows

### `npm run win-update`

The command to update _builded_ VST3 plugin on Windows

### `npm run win-build-update`

The command to build and update VST3 plugin on Windows
