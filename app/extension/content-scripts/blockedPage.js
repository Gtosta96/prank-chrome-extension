const connection = chrome.runtime.connect();

const changeHTML = () => {
  const icon = chrome.extension.getURL('../img/loading.svg');

  // hack to edit body immediately after available
  const interval = setInterval(() => {
    const html = document.getElementsByTagName('html')[0];
    if (!html) return;
    html.innerHTML = (
      '<div class="loading-container">' +
        `<img class="loading-img" src='${icon}'>` +
      '</div>'
    );
  }, 100);

  connection.onMessage.addListener(opts => opts && opts.interval && clearInterval(interval));
};

connection.onMessage.addListener((opts) => {
  console.log('::blockedPage:: - onMessage');

  if (opts && opts.urls && opts.urls.includes(document.location.hostname)) {
    changeHTML();
    connection.postMessage();
  }
});
