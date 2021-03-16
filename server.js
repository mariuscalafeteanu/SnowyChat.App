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
    socket.on('join-room', (room, user) => {
        socket.join(room);
        console.log(`${user} joined ${room}`);
    });

    //welcome user
    socket.on('user-joined', (message, room) => {
        socket.broadcast.to(room).emit('welcome-message', message);
    })

    //leaving room
    socket.on('leave-room', room => {
        socket.leave(room);
    })

    //leave room message
    socket.on('user-left', (message, room, user) => {
        socket.broadcast.to(room).emit('leave-message', message);
        console.log(`${user} left ${room}`);
    })

    //sending message
    socket.on('message', (message, room, user) => {
        io.to(room).emit('send-message', message, user);
    })
});

//listening
const port = 5000 || procces.env.port;
server.listen(port, () => console.log(`Server ON | PORT: ${port}`));