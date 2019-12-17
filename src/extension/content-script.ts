(async () => {
  chrome.runtime.sendMessage(
    { contentScriptQuery: 'loadAppScript', serviceUrl: process.env.SERVICE_URL },
    async (scriptAsText) => eval(scriptAsText),
  );
})();
