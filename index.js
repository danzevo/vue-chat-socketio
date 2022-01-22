const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html');
});

io.on('connection', (socket) => {
    io.emit('connections', Object.keys(io.sockets.connected).length);

    socket.on('disconnect', () => {
        console.log('Disconnected');
    })

    socket.on('created', (data) => {
        //broadcast not to you but to others
        socket.broadcast.emit('created', (data));
        //broadcast to yourself
        // io.emit('created', (data));
    })

    socket.on('chat-message', (data) => {
      socket.broadcast.emit('chat-message', (data));
    })

    socket.on('typing', (data) => {
      socket.broadcast.emit('typing', (data));
    })

    socket.on('stopTyping', (data) => {
      socket.broadcast.emit('stopTyping', (data));
    })

    socket.on('joined', (data) => {
      socket.broadcast.emit('joined', (data));
    })

    socket.on('leaved', (data) => {
      socket.broadcast.emit('leaved', (data));
    })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});