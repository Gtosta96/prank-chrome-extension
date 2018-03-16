const changeHTML = () => {
  // hack to edit body immediately after available
  chrome.storage.sync.get(['html', 'css'], (items) => {
    setInterval(() => {
      const html = document.getElementsByTagName('html')[0];
      if (!html) return;
      html.innerHTML = items.html;
      console.log(items);
    }, 100);
  });
};

changeHTML();
