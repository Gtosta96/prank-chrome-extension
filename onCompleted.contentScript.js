const connection = chrome.runtime.connect();
connection.onMessage.addListener(function(msg) {
  console.log('amem', msg);
});
// chrome.runtime.postMessage('POTATO');
