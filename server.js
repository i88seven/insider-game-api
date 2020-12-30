'use strict';

const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const PORT = process.env.PORT || 3001

io.on('connection', socket => {
  console.log(`socket_id: ${socket.id} is connected.`)

  socket.on('join', (roomId, id, name) => {
    socket.join(roomId)
    socket.to(roomId).emit('join-room', {
      id,
      name,
    });
    console.log(`socket_id: ${socket.id} joined in room ${roomId}`)
  })

  socket.on('send-msg', (msg, roomId) => {
    socket.to(roomId).emit('new-msg', msg)
    console.log(`receive message: ${JSON.stringify(msg)}`)
  })
})

server.listen(PORT)