const watch = require('node-watch');
const path = require('path');

const { exec } = require('child_process');

const PATH = path.resolve(__dirname, '../app/extension');

console.log('starting watcher...');
watch(PATH, { recursive: true }, (evt, name) => {
  console.log('%s changed.', name);
  // exec('start chrome http://reload.extensions');
});
