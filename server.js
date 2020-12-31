'use strict';

const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const PORT = process.env.PORT || 3001

io.on('connection', socket => {
  console.log(`socket_id: ${socket.id} is connected.`)

  socket.on('join-room', (roomId, id, name) => {
    socket.join(roomId)
    socket.to(roomId).emit('join-room', {
      id,
      name,
    });
    console.log(`socket_id: ${socket.id} joined in room ${roomId}`)
  })

  socket.on('broadcast-players', (roomId, players) => {
    socket.to(roomId).emit('broadcast-players', players);
  })

  socket.on('decide-roles', (roomId, roles) => {
    console.log(`${roomId}: decide-roles`)
    socket.to(roomId).emit('decide-roles', roles);
  })

  socket.on('decide-subject', (roomId, subject) => {
    console.log(`${roomId}: decide-subject ${subject}`)
    socket.to(roomId).emit('decide-subject', subject);
  })

  socket.on('start-game', (roomId, limit) => {
    console.log(`${roomId}: start-game ${limit}`)
    socket.to(roomId).emit('start-game', limit);
  })

  socket.on('correct', (roomId, subject, searchTimeLimit) => {
    console.log(`${roomId}: correct ${subject} ${searchTimeLimit}`)
    socket.to(roomId).emit('correct', subject, searchTimeLimit);
  })

  socket.on('vote', (roomId, fromId, toId) => {
    console.log(`${roomId}: vote ${fromId} ${toId}`)
    socket.to(roomId).emit('vote', fromId, toId);
  })

  socket.on('vote-result', (roomId, votes) => {
    console.log(`${roomId}: vote-result ${votes}`)
    socket.to(roomId).emit('vote-result', votes);
  })

  socket.on('next-game', (roomId, roles) => {
    console.log(`${roomId}: next-game`)
    socket.to(roomId).emit('next-game', roles);
  })
})

server.listen(PORT)