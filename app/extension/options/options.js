/**
 * OFFLINE BEHAVIOR
 */
const fallbackHTML = '<h1>THIS PAGE HAS BEEN BLOCKED BY THE ADMINISTRATOR</h1><p>Contact the support.</p>';
const fallbackCSS = '';
const fallbackURLS = 'https://www.facebook.com/;https://www.facebook.com.br/';

const statusDiv = document.getElementById('statusDiv');
const databaseId = document.getElementById('databaseId');

const htmlInput = document.getElementById('htmlInput');
const cssInput = document.getElementById('cssInput');
const urlsInput = document.getElementById('urlsInput');

// Update status to let user know options were saved.
const sendMessage = (message) => {
  statusDiv.textContent = message;
  setTimeout(() => { statusDiv.textContent = ''; }, 1000);
};

// Saves options to chrome.storage
const saveOptions = () => {
  const values = { html: htmlInput.value, css: cssInput.value, urls: urlsInput.value };

  chrome.storage.sync.set(values, () => {
    sendMessage('Options saved.');
  });
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const getOptionsValuesFromStorage = () => {
  const values = { id: '', html: fallbackHTML, css: fallbackCSS, urls: fallbackURLS };

  chrome.storage.sync.get(values, (items) => {
    databaseId.innerText = items.id;

    htmlInput.value = items.html;
    cssInput.value = items.css;
    urlsInput.value = items.urls;

    saveOptions();
  });
};

document.addEventListener('DOMContentLoaded', getOptionsValuesFromStorage);
document.getElementById('save').addEventListener('click', saveOptions);
