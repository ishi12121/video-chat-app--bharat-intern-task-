import * as store from './store.js';

const socket = io('/');
socket.on('connect', () => {
     console.log('succesfully connected to socket.io  server ');
     store.setSocketId(socket.id);
});
