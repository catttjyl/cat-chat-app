const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3000

const router = require('./router');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(router);

io.on('connection', (socket) => {
  console.log('a user connected');

	socket.on('disconnect', () => {
		console.log('User just left.')
    // const user = removeUser(socket.id);

    // if(user) {
    //   io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
    //   io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    // }
  })
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
  