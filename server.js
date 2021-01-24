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

  socket.on('re-send-players', (roomId) => {
    console.log(`${roomId}: re-send-players`)
    socket.to(roomId).emit('re-send-players');
  })

  socket.on('broadcast-players', (roomId, players) => {
    socket.to(roomId).emit('broadcast-players', players);
  })

  socket.on('send-settings', (roomId, settings) => {
    console.log(`${roomId}: send-settings ${settings}`)
    socket.to(roomId).emit('send-settings', settings);
  })

  socket.on('decide-roles', (roomId, roles) => {
    console.log(`${roomId}: decide-roles`)
    socket.to(roomId).emit('decide-roles', roles);
  })

  socket.on('decide-subject', (roomId, subject, isHost) => {
    console.log(`${roomId}: decide-subject ${subject} from ${isHost ? 'host' : 'master'}`)
    socket.to(roomId).emit('decide-subject', subject, isHost);
  })

  socket.on('start-game', (roomId, limit, isHost) => {
    console.log(`${roomId}: start-game ${limit} from ${isHost ? 'host' : 'master'}`)
    socket.to(roomId).emit('start-game', limit, isHost);
  })

  socket.on('correct', (roomId, subject, searchTimeLimit, isHost) => {
    console.log(`${roomId}: correct ${subject} ${searchTimeLimit} from ${isHost ? 'host' : 'master'}`)
    socket.to(roomId).emit('correct', subject, searchTimeLimit, isHost);
  })

  socket.on('vote', (roomId, fromId, toId) => {
    console.log(`${roomId}: vote ${fromId} ${toId}`)
    socket.to(roomId).emit('vote', fromId, toId);
  })

  socket.on('vote-result', (roomId, votes) => {
    console.log(`${roomId}: vote-result ${votes}`)
    socket.to(roomId).emit('vote-result', votes);
  })

  socket.on('next-game', (roomId, memberChange, roles) => {
    console.log(`${roomId}: next-game`)
    socket.to(roomId).emit('next-game', memberChange, roles);
  })

  socket.on('reload', (roomId, fromId) => {
    console.log(`${roomId}: reload from ${fromId}`)
    socket.to(roomId).emit('reload', fromId);
  })

  socket.on('reload-response', (roomId, toId, states) => {
    console.log(`${roomId}: reload-response to ${toId}`)
    socket.to(roomId).emit('reload-response', toId, states);
  })
})

server.listen(PORT)