const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const http = require('http');

const app = express();
require('dotenv').config();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const onlineUsers = new Map();

io.on('connection', (socket) => {
  socket.on('add_user', (data) => {
    onlineUsers.set(data, socket.id);
  });

  socket.on('send_message', (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('message_received', data);
    }
  });
});

server.listen(process.env.PORT, () => {
  console.log(
    `Listening on PORT ${process.env.PORT}\nhttp://localhost:${process.env.PORT}/`
  );
});
