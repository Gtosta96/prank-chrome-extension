chrome.runtime.onInstalled.addListener(async (object) => {
  if (object.reason !== 'install') return;

  console.log('::onInstalled:: - Install');

  const prank = await window.HTTP.create();
  syncAndOpenOptionsPage(prank);
});

chrome.runtime.onInstalled.addListener(async (object) => {
  if (object.reason !== 'update') return;

  console.log('::onInstalled:: - Update');

  chrome.storage.sync.get('id', async ({ id }) => {
    const prank = await window.HTTP.getById(id);
    syncAndOpenOptionsPage(prank);
  });
});

function syncAndOpenOptionsPage(prank) {
  chrome.storage.sync.set(prank, () => {
    chrome.runtime.openOptionsPage();
  });
}
