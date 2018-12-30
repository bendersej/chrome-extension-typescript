import { AppConfig } from '../server/config';

(async () => {
  await loadRemoteScript(process.env.SERVICE_URL);
})();

async function loadRemoteScript(remoteConfigURL: string) {
  const fetchedConfig = await fetch(`${remoteConfigURL}/api/v1/config`);

  const config: { app: AppConfig } = await fetchedConfig.json();

  const scriptAsText = await fetch(config.app.href, {
    headers: {
      'Content-Type': 'text/html',
    },
  });

  return eval(await scriptAsText.text());
}
