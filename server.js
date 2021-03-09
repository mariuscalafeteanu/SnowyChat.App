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

    //creating and joining room
    // socket.on('create-room', room => {
    //     socket.join(room);
    // })
});


//listening
const port = 5000 || procces.env.port;
server.listen(port, () => console.log(`Server ON | PORT: ${port}`));