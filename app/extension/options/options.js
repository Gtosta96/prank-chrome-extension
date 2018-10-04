/**
 * OFFLINE BEHAVIOR
 */
const fallbackHTML = '<h1>THIS PAGE HAS BEEN BLOCKED BY THE ADMINISTRATOR</h1><p>Contact the support.</p>';
const fallbackCSS = '';
const fallbackURLS = 'https://www.facebook.com/;https://www.facebook.com.br/';
const fallbackEnabled = false;

const statusDiv = document.getElementById('statusDiv');
const databaseId = document.getElementById('databaseId');

const htmlInput = document.getElementById('htmlInput');
const cssInput = document.getElementById('cssInput');
const urlsInput = document.getElementById('urlsInput');
const enabledCheckbox = document.getElementById('enabledCheckbox');

// Update status to let user know options were saved.
const sendMessage = (message) => {
  statusDiv.textContent = message;
  setTimeout(() => { statusDiv.textContent = ''; }, 1000);
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const getOptionsValuesFromStorage = () => {
  const values = {
    id: '',
    html: fallbackHTML,
    css: fallbackCSS,
    urls: fallbackURLS,
    enabled: fallbackEnabled,
  };

  chrome.storage.sync.get(values, (items) => {
    updateFields(items);
    saveOptions();
  });
};

const updateFields = (items) => {
  databaseId.innerText = items.id;

  htmlInput.value = items.html;
  cssInput.value = items.css;
  urlsInput.value = items.urls;
  enabledCheckbox.checked = items.enabled;
};

// Saves options to chrome.storage
const saveOptions = (props = {}) => {
  const values = {
    id: props.id || databaseId.innerText,
    html: props.html || htmlInput.value,
    css: props.css || cssInput.value,
    urls: props.urls || urlsInput.value,
    enabled: props.enabled || enabledCheckbox.checked,
  };

  updateFields(values);
  chrome.storage.sync.set(values, () => {
    sendMessage('Options saved.');
  });
};

document.addEventListener('DOMContentLoaded', () => {
  getOptionsValuesFromStorage();
  document.getElementById('save').addEventListener('click', () => saveOptions());

  const backgroundPage = chrome.extension.getBackgroundPage();
  backgroundPage.WS.on('update', prank => saveOptions(prank));
});
