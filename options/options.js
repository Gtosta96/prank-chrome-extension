// TODO: IMPROVE THIS LOGIC...

const fallbackHTML = '<h1>THIS PAGE HAS BEEN BLOCKED BY THE ADMINISTRATOR</h1><p>Contact the support.</p>';
const fallbackCSS = '';

const htmlInput = document.getElementById('htmlInput');
const cssInput = document.getElementById('cssInput');
const statusDiv = document.getElementById('statusDiv');

// Sends message to the user
const sendMessage = (message) => {
    statusDiv.textContent = message;
    setTimeout(() => { statusDiv.textContent = ''; }, 750);
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get(['html', 'css'], (items) => {

    if (Object.keys(items).length > 0) {
      htmlInput.value = items.html;
      cssInput.value = items.css;
    } else {
      htmlInput.value = fallbackHTML;
      cssInput.value = fallbackCSS;
      saveOptions();
    }
  });
}

// Saves options to chrome.storage
const saveOptions = () => {
  chrome.storage.sync.set({ html: htmlInput.value, css: cssInput.value  }, () => {
    // Update status to let user know options were saved.
    sendMessage('Options saved.');
  });
}

// Resets options to chrome.storage
const resetOptions = () => {
  chrome.storage.sync.clear(() => {
    restoreOptions();
    sendMessage('Options reseted.');
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('reset').addEventListener('click', resetOptions);
