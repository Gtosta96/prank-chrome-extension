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
  chrome.runtime.connect().onMessage.addListener(() => clearInterval(interval));
};

changeHTML();
