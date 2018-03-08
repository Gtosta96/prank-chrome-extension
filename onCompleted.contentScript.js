editPage();
const connection = chrome.runtime.connect();

connection.onMessage.addListener(function(msg) {
  console.log('message received', msg);
});

function editPage() {
  // hack to edit body immediately after available
  const interval = setInterval(() => {
    const body = document.getElementsByTagName("BODY")[0];
    if (body) {
      body.innerHTML = '<h1>THIS PAGE HAS BEEN BLOCKED BY THE ADMINISTRATOR</h1><p>Contact the support.</p>';
      clearInterval(interval);
    }
  }, 100);
}
