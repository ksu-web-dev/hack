import express from 'express';
import socketio from 'socket.io';
import chalk from 'chalk';
import { Server } from 'http';
import { World } from '../game/world';
import { Message, deserialize } from '../game/message';
import { Actions, UpdateWorld, ConnectAction } from '../game/action';
import { Tile } from '../game/tile';

const WORLD_SIZE = 1000;

const app = express();
const server = new Server(app);
const io = socketio(server);

let tiles = [];
for (var i = 0; i < WORLD_SIZE; i++) {
  tiles[i] = [];
  for (var j = 0; j < WORLD_SIZE; j++) {
    tiles[j] = new Tile('.');
  }
}

let world = new World(tiles);

app.use(express.static('./static'));

if (process.env.NODE_ENV == 'development') {
  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
  });
}

function log(msg: string) {
  const time = new Date().toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });

  console.log(`[${chalk.gray(time)}] ${msg}`);
}

function reply(s: socketio.Socket, msg: Message) {
  s.emit('message', msg.serialize());
}

io.on('connection', function(socket) {
  log(`A user connected on socket: ${socket.id}`);

  socket.on('message', buffer => {
    log(`Received a message: ${buffer}`);
    const msg = deserialize(buffer);
    world = msg.body.update(world);
    msg.body = new UpdateWorld(world);

    socket.emit('message', msg.serialize());
  });

  socket.on('disconnect', function() {
    log('User disconnected');
  });
});

log('Server is now listening on port 8080');

server.listen(8080);
