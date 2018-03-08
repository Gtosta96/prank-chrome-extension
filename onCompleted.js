chrome.webRequest.onCompleted.addListener(callback, getFilters());

  function callback(details) {
      changePage();
  }

  function getFilters() {
    return {
      // types: ['main_frame'],
      urls: [
        ...urlHelper('google'),
        ...urlHelper('facebook'),
        ...urlHelper('youtube'),
        ...urlHelper('console.aws.amazon'),
        ],
    };
  }

  // PAINT SCREEN
  function changePage() {
    const interval = setInterval(() => {
      chrome.tabs.executeScript(null, { file: 'editPage.js' })
    });
    setTimeout(() => clearInterval(interval), 5000);
  }

  // UTILS
  function urlHelper(domain) {
    return [`*://*.${domain}.com/*`, `*://*.${domain}.com.br/*`]
  }

