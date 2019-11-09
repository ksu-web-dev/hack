import { Message, deserialize } from '../game/message';
import { World } from '../game/world';
import { Tile } from '../game/tile';
import uuid from 'uuid/v4';
import { Action, ConnectAction, UpdateWorld } from '../game/action';

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

function pxs(val: number) {
  return val.toString() + 'px';
}

let chars = ['&#8283;', '&#8483;', '&#775;', '&#803;', '&#856;'];

function renderWorld(w: World, x: number, y: number) {
  let body = document.getElementsByTagName('body')[0];

  // Create a div to contain the world
  let worldDiv = document.createElement('div');
  worldDiv.style.width = pxs(15 * w.tiles[0].length);
  worldDiv.style.height = pxs(15 * w.tiles.length);
  worldDiv.style.position = 'relative';
  worldDiv.style.margin = 'auto';

  //worldDiv.style.left = pxs(x);
  //worldDiv.style.top = pxs(y);

  // Start creating a div for each row and then each cell of the row
  for (let i = 0; i < w.tiles.length; i++) {
    let rowDiv = document.createElement('div');
    rowDiv.style.height = pxs(15);
    rowDiv.style.display = 'flex';

    for (let j = 0; j < w.tiles[0].length; j++) {
      let elementDiv = document.createElement('div');
      elementDiv.style.height = pxs(15); //'15px';
      elementDiv.style.width = pxs(15); //'15px';

      elementDiv.innerHTML = w.tiles[i][j].character;
      elementDiv.style.textAlign = 'center';
      elementDiv.style.userSelect = 'none';

      rowDiv.appendChild(elementDiv);
    }
    worldDiv.appendChild(rowDiv);
  }

  // Then insert the tile's character centered in the tile
  body.appendChild(worldDiv);
  console.log(body);
}

var socket = io('http://localhost:8080');

send(new ConnectAction(token));

let world = new World();

socket.on('message', buffer => {
  const msg = deserialize(buffer);
  world = msg.body.update(world);

  console.log(world);
  renderWorld(world, 0, 0);
});
