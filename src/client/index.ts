console.log(
  '%c Running within the context of the content-script:',
  'color: #0095ff',
  chrome.storage,
);

console.log('Cookies!', document.cookie);
