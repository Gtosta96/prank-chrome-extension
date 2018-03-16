// Runs Options on the install
chrome.runtime.onInstalled.addListener((object) => {
  if (object.reason !== 'install') return;
  chrome.runtime.openOptionsPage();
});
