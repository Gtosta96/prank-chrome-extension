const changeHTML = () => {
  // hack to edit body immediately after available
  const interval = setInterval(() => {
    const html = document.getElementsByTagName("html")[0];
    if (!html) return;

    console.log('html encontrado! :) (LOOP)');
    clearInterval(interval);
      chrome.storage.sync.get('html', (items) => {
        html.innerHTML = items.html;
      });
  }, 100);
}

changeHTML();