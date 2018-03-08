const connection = chrome.runtime.connect();

console.log('connection created');
chrome.runtime.onConnect.addListener(function(popupPort) {
  console.log('connection what');
  popupPort.postMessage({'cmd': 'anim'});
});

function editPage() {
  const body = document.getElementsByTagName("BODY")[0];
  body.innerHTML = '<h1>THIS PAGE HAS BEEN BLOCKED BY THE ADMINISTRATOR</h1><p>Contact the support.</p>';
}