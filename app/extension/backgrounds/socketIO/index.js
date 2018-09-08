// import io from '../../lib/socket.io';

const socket = io('http://localhost:3000'); // eslint-disable-line no-undef

socket.on('connect', (...args) => {
  console.log('SOCKET_OI connected', args);
});

socket.on('event', (...args) => {
  console.log('SOCKET_OI event', args);
});

socket.on('disconnect', (...args) => {
  console.log('SOCKET_OI disconnected', args);
});
