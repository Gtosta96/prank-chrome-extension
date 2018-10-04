window.WS.on('update', (prank) => {
  chrome.storage.sync.set(prank);
});

chrome.runtime.onConnect.addListener((port) => {
  console.log('::onConnect:: - onConnect');

  let items = null;

  chrome.storage.sync.get(['html', 'css ', 'urls', 'enabled'], (storageItems) => {
    items = storageItems;
    port.postMessage({ urls: items.urls });
  });

  port.onMessage.addListener(() => {
    console.log('::onConnect:: - onMessage');

    if (!items.enabled) {
      port.postMessage({ enabled: false });
      return;
    }

    const css = { code: items.css };
    const script = { code: `document.documentElement.innerHTML="${items.html}"` };

    chrome.tabs.insertCSS(css);
    chrome.tabs.executeScript(script, () => {
      port.postMessage({ scriptExecuted: true });
    });
  });
});
