window.WS.on('update', (data) => {
  chrome.storage.sync.set(data);
});
