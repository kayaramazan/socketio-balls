const socketio = require('socket.io')
const io = socketio();

const socketApi = {};
socketApi.io=io;
io.on('connection', (socket) =>
{
console.log('connection succesful',socket.id);
});

module.exports = socketApi;