const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let users = {}; // { username: socket.id }

app.use(express.static('public')); // Serve static files from the 'public' directory

io.on('connection', socket => {
  console.log('New client connected:', socket.id);

  socket.on('register-username', username => {
    // Add user to the list and notify all clients of the updated user list
    users[username] = socket.id;
    io.emit('update-user-list', Object.keys(users).map(username => ({ username })));
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    // Find the username associated with the socket ID and remove it
    for (const [username, id] of Object.entries(users)) {
      if (id === socket.id) {
        delete users[username];
        io.emit('update-user-list', Object.keys(users).map(username => ({ username })));
        break;
      }
    }
  });

  socket.on('call-user', ({ offer, to }) => {
    const recipientId = users[to];
    if (recipientId) {
      socket.to(recipientId).emit('call-made', {
        offer,
        username: Object.keys(users).find(key => users[key] === socket.id),
      });
    }
  });

  socket.on('make-answer', ({ answer, to }) => {
    const recipientId = users[to];
    if (recipientId) {
      socket.to(recipientId).emit('answer-made', {
        answer,
        username: Object.keys(users).find(key => users[key] === socket.id),
      });
    }
  });

  socket.on('end-call', () => {
    // Notify all clients that a call has ended
    io.emit('call-ended');
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
