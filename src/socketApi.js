const socketio = require('socket.io')
const io = socketio();

const socketApi = {};
socketApi.io=io;

let users = { };

io.on('connection', (socket) =>
{
console.log('connection succesful',socket.id);

socket.on('disconnect', function(reason){

    socket.broadcast.emit('disUser',users[socket.id]);
    delete users[socket.id];
});
    socket.on('newUser',(data) =>
    {
        let defaultdata = {
           id:socket.id,
           position: {
            x:0,
            y:0
           }
        };

        let userData = Object.assign(data, defaultdata);
        users[socket.id]=userData; 
        socket.broadcast.emit('newUser',userData);
        socket.emit('initPlayer',users);
    })

});

module.exports = socketApi;