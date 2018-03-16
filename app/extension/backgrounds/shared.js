// Runs Options on the install
chrome.runtime.onInstalled.addListener((object) => {
  if (object.reason !== 'install') return;
  chrome.runtime.openOptionsPage();
});

chrome.runtime.onConnect.addListener((port) => {
  console.log('connected ', port);
  chrome.storage.sync.get(['html', 'css'], (items) => {
    chrome.tabs.insertCSS({ code: items.css });
    // too slow :(
    // chrome.tabs.executeScript({ code: `document.body.innerHTML="${items.html}"` });
  });
});
