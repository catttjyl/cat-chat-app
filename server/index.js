const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require('./user');

const PORT = process.env.PORT || 3001;

const router = require('./router');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});


app.use(router);
app.use(cors());

io.on('connection', (socket) => {
  console.log('New client connected.');

	socket.on('join', ({ name, room }, callback) => {
		console.log("room:",room,"name",name);
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!`});

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

	socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });
		io.to(user.room).emit('roomData', { room: user.room, text: message });

    callback();
  });

	socket.on('disconnect', () => {
		console.log('Client disconnected');
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
  