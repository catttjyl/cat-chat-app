const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require("cors");
const mongoose = require("mongoose");
const colors = require('colors');
const router = require('./router');
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");

const app = express();
const server = createServer(app);

app.use(router);
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const io = new Server(server, {
    cors: { origin: "https://cat-chat-app.netlify.app/", 
    // cors: { origin: "http://localhost:3000", 
    methods: ["GET", "POST"] },
  });
  
require("dotenv").config();
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull".cyan.underline);
  })
  .catch((err) => {
    console.log(`Error: ${err.message}`.red.bold);
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  console.log("New connection");
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`.yellow.bold);
});
  