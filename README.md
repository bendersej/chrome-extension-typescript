# chrome-extension-typescript
Chrome extension boilerplate with remote server


### Why?
I found myself writing the same code over and over again when bootstraping a new extension (story behind every boilerplate) and I could not find something suitable:
I wanted to:
- Be able to publish my extension once on the store and remote update it.
- Have tight typescript integration

This boilerplate allows you to quickly get started with the following:
- Typescript with TSLint
- Prettier

### Stack
- An app (app.js)
- A wrapper loading the app.js remotely (using the `/api/v1/config`) endpoint and evaluating the content within the content-script to retain access to the chrome storage.
- A companion Koa server


### How to dev
## Pre-Requisite:
```
yarn install
```
Create a .env file with the following
```
SERVICE_URL=http://localhost:3000
APP_DIST_LOCATION=../static/app
```
1. Run the client first since the server needs the manifest information to point to the correct app location
```
yarn run dev:client
```
2. Spawn a new terminal tab and run the server
```
yarn run dev:server
```
3. Load the extension via Chrome extensions (Load unpacked extension) and select the `extension` folder in `dist/extension`
```
