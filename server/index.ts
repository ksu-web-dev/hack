import express from 'express';
import socketio from 'socket.io';
import chalk from 'chalk';
import { Server } from 'http';
import { World } from '../game/world';
import { Message } from '../game/message';

const app = express();
const server = new Server(app);
const io = socketio(server);

let players = {};

app.use(express.static('./static'));

if (process.env.NODE_ENV == 'development') {
  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
  });
}

io.on('connection', function(socket) {
  log(`A user connected on socket: ${socket.id}`);

  socket.on('message', buffer => {
    log(`Received a message: ${buffer}`);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
    delete players[socket.id];
    socket.broadcast.emit('currentPlayers', players);
  });
});

log('Server is now listening on port 8080');

server.listen(8080);

function log(msg: string) {
  const time = new Date().toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });

  console.log(`[${chalk.gray(time)}] ${msg}`);
}
