// Runs Options on the install
chrome.runtime.onInstalled.addListener((object) => {
  if (object.reason !== 'install') return;
  chrome.runtime.openOptionsPage();
});

chrome.runtime.onConnect.addListener((port) => {
  let items = null;
  console.log('connected ', port);

  chrome.storage.sync.get(['html', 'css ', 'urls'], (storageItems) => {
    console.log('sync storage');
    items = storageItems;
    port.postMessage({ urls: items.urls });
  });

  port.onMessage.addListener(() => {
    console.log('changing...');
    chrome.tabs.insertCSS({ code: items.css });
    chrome.tabs.executeScript({ code: `document.documentElement.innerHTML="${items.html}"` }, () => port.postMessage({ interval: true }));
  });
});
