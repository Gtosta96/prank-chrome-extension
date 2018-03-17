const fallbackHTML = '<h1>THIS PAGE HAS BEEN BLOCKED BY THE ADMINISTRATOR</h1><p>Contact the support.</p>';
const fallbackCSS = '';
const fallbackURLS = 'https://www.facebook.com/;https://www.facebook.com.br/';

const htmlInput = document.getElementById('htmlInput');
const cssInput = document.getElementById('cssInput');
const urlsInput = document.getElementById('urlsInput');
const statusDiv = document.getElementById('statusDiv');

// Update status to let user know options were saved.
const sendMessage = (message) => {
  statusDiv.textContent = message;
  setTimeout(() => { statusDiv.textContent = ''; }, 1000);
};

// Saves options to chrome.storage
const saveOptions = () => {
  chrome.storage.sync.set({
    html: htmlInput.value,
    css: cssInput.value,
    urls: urlsInput.value,
  }, () => { sendMessage('Options saved.'); });
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get({ html: fallbackHTML, css: fallbackCSS, urls: fallbackURLS }, (items) => {
    htmlInput.value = items.html;
    cssInput.value = items.css;
    urlsInput.value = items.urls;
    saveOptions();
  });
};

// Resets options to chrome.storage
const resetOptions = () => {
  chrome.storage.sync.clear(() => {
    restoreOptions();
  });
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('reset').addEventListener('click', resetOptions);
