

// const statusDiv = document.getElementById('statusDiv');
const databaseId = document.getElementById('databaseId');

const htmlInput = document.getElementById('htmlInput');
const cssInput = document.getElementById('cssInput');
const urlsInput = document.getElementById('urlsInput');
const enabledCheckbox = document.getElementById('enabledCheckbox');

// Update status to let user know options were saved.
// const sendMessage = (message) => {
//   statusDiv.textContent = message;
//   setTimeout(() => { statusDiv.textContent = ''; }, 1000);
// };

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const getOptionsValuesFromStorage = () => {
  chrome.storage.sync.get(null, (items) => {
    if (!items) return;

    updateFields(items);
  });
};

const updateFields = (items) => {
  console.log('updating fields');

  databaseId.innerText = items.id;

  htmlInput.value = items.html;
  cssInput.value = items.css;
  urlsInput.value = items.urls;
  enabledCheckbox.checked = items.enabled;

  chrome.storage.sync.set(items, () => {
    // sendMessage('Options saved.');
  });
};

document.addEventListener('DOMContentLoaded', () => {
  getOptionsValuesFromStorage();

  setInterval(() => {
    getOptionsValuesFromStorage();
  }, 1000);
});
