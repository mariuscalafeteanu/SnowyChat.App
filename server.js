//init express
const express = require('express');
const app = express();

//init socket.io
const socketIo = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketIo(server);

//static folder
app.use(express.static('public'));

// Socket.IO
io.on('connection', socket => {

    //joining room
    socket.on('join-room', room => {
        socket.join(room);
        console.log(`A user joined ${room}`);
    });

    //welcome user
    socket.on('user-joined', data => {
        io.emit('welcome-message', data);
    })

    //leaving room
    socket.on('leave-room', room => {
        socket.leave(room);
        console.log(`A user left ${room}`);
    })

    //leave room message
    socket.on('user-left', data => {
        io.emit('leave-message', data);
    })

    //sending message
    socket.on('message', (message, room, user) => {
        io.to(room).emit('send-message', message, user);
    })
});

//listening
const port = 5000 || procces.env.port;
server.listen(port, () => console.log(`Server ON | PORT: ${port}`));