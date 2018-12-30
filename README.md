## Why?
I found myself writing the same code over and over again when bootstraping a new extension (the story behind every boilerplate) and I could not find something suitable.

I wanted to:
- Be able to publish my extension once on the store and remote update it.
- A good development experience: thanks to the awesome [webpack-chrome-extension-reloader](https://github.com/rubenspgcavalcante/webpack-chrome-extension-reloader), any changes in the client code triggers a page refresh and reload the code automagically.
- A tight TypeScript integration

This boilerplate allows you to quickly get started with the following:
- Typescript with TSLint
- Prettier
- Node (with Koa)

## Stack
- A client app (app.js) meant to be injected and mounted in the DOM
- A wrapper loading the app.js remotely (using the `/api/v1/config`) endpoint and evaluating the content within the content-script to retain access to the chrome storage.
- A companion Koa server

## How to dev
### Pre-Requisite:
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
