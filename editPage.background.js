const connection = chrome.runtime.connect();

chrome.runtime.onConnect.addListener(function(popupPort) {
  console.log('connection created');
  popupPort.postMessage('xD');
});