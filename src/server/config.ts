require('dotenv').config();
import { join } from 'path';
const assetsManifest = require(join(process.cwd(), 'dist/assets-manifest.json'));

if (process.env.APP_DIST_LOCATION === undefined || process.env.SERVICE_URL === undefined) {
  throw Error('Missing ENV variables: APP_DIST_LOCATION or SERVICE_URL');
}

export interface AppConfig {
  href: string;
  version: string;
}

export const APP_CONFIG = getAppConfig({
  serviceURL: process.env.SERVICE_URL,
  assetsManifest,
  appDistLocation: process.env.APP_DIST_LOCATION,
});

export const PORT = process.env.PORT || 3000;
export const STATIC_FOLDER = './dist/static';

function getAppConfig({
  serviceURL,
  assetsManifest,
  appDistLocation,
}: {
  serviceURL: string;
  assetsManifest: { [key: string]: { js: string } & { release: string } };
  appDistLocation: string;
}): AppConfig {
  const filenamePath = assetsManifest[appDistLocation].js;

  const fileName = filenamePath.split('/').slice(-1)[0];

  return {
    href: join(serviceURL, fileName),
    version: assetsManifest.metadata.release,
  };
}
