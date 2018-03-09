// Runs Options on the install
chrome.runtime.onInstalled.addListener(function (object) {
  if(object.reason !== 'install') return;
  chrome.runtime.openOptionsPage();
});