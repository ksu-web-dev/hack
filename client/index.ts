import { Message } from '../game/message';
import uuid from 'uuid/v4';
import { Action, ConnectAction } from '../game/action';

declare const io: typeof import('socket.io');

let token = window.localStorage.getItem('token');

if (token == null) {
  token = uuid();
  window.localStorage.setItem('token', token);
  console.log(`Generating new token ${token}`);
}

function send(action: Action) {
  const m = new Message(uuid(), action);
  socket.emit('message', m.serialize());
}

var socket = io('http://localhost:8080');

send(new ConnectAction(token));
