const changeHTML = () => {
  // hack to edit body immediately after available
  // TODO: put a loader here and initialize the content through shared.js
  chrome.storage.sync.get(['html', 'css'], (items) => {
    setInterval(() => {
      const html = document.getElementsByTagName('html')[0];
      if (!html) return;
      html.innerHTML = items.html;
    }, 100);
  });
};

changeHTML();
chrome.runtime.connect();
// const connection = chrome.runtime.connect();
// connection.postMessage({ started: true });
