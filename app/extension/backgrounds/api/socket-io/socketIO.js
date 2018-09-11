// id could be undefined - race condition on installing the extension for the first time
const interval = setInterval(() => startSocketIO(), 1000);

function startSocketIO() {
  chrome.storage.sync.get('id', async ({ id }) => {
    if (!id) return;

    clearInterval(interval);

    const socket = window.io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('::socketIO:: - Connect');
    });

    socket.on('event', () => {
      console.log('::socketIO:: - Event');
    });

    socket.on('disconnect', () => {
      console.log('::socketIO:: - Disconnect');
    });
  });
}
