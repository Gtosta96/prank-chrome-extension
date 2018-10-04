let socket;

// id could be undefined - race condition on installing the extension for the first time
const interval = setInterval(() => startSocketIO(), 1000);

function startSocketIO() {
  chrome.storage.sync.get('id', async (storage) => {
    if (!storage.id) return;

    clearInterval(interval);

    socket = window.io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('::socketIO:: - Connect');
    });

    socket.on('disconnect', () => {
      console.log('::socketIO:: - Disconnect');
    });
  });
}

function emit(event, data) {
  console.log('::socketIO:: - emitting ->', event);
  socket.emit(event, data);
}

// TODO: make it better REFACTORY IT, PLEASE!
function on(event, callback) {
  const innerInterval = setInterval(() => {
    if (!socket) return;

    console.log('::socketIO:: - registering ->', event);
    clearInterval(innerInterval);

    window.socket = socket;

    socket.on(event, (data) => {
      console.log('::socketIO:: - receiving ->', event);
      callback(data);
    });
  }, 1000);
}

window.WS = { emit, on };
