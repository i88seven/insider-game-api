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
})

server.listen(PORT)