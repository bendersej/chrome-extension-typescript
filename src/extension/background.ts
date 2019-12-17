import { AppConfig } from '../server/config';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.contentScriptQuery === 'loadAppScript') {
    loadRemoteScript(request.serviceUrl).then((scriptAsText) => sendResponse(scriptAsText));
    return true;
  }
});

async function loadRemoteScript(remoteConfigURL: string) {
  const fetchedConfig = await fetch(`${remoteConfigURL}/api/v1/config`);

  const config: { app: AppConfig } = await fetchedConfig.json();

  const scriptAsText = await fetch(config.app.href, {
    headers: {
      'Content-Type': 'text/html',
    },
  });

  return scriptAsText.text();
}
