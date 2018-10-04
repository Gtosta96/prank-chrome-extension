const connection = chrome.runtime.connect();
let interval = null;

const changeHTML = () => {
  const icon = chrome.extension.getURL('../img/loading.svg');

  // hack to edit body immediately after available
  interval = setInterval(() => {
    const html = document.getElementsByTagName('html')[0];
    if (!html) return;

    html.innerHTML = (
      '<div class="loading-container">' +
        `<img class="loading-img" src='${icon}'>` +
      '</div>'
    );
  }, 100);
};

// callback announcing the URLs were got successfully and the script can be run.
connection.onMessage.addListener((opts) => {
  console.log('::blockedPage:: - onMessage');

  if (opts && opts.urls) {
    const match = opts.urls.some(url => document.location.hostname.includes(url));
    if (!match) return;

    changeHTML();
    connection.postMessage();
  }
});

// callback announcing the script has been successfully executed or it is disabled
connection.onMessage.addListener((opts) => {
  if (opts && (opts.scriptExecuted || opts.enabled === false)) { // null !== false
    clearInterval(interval);
  }
});
