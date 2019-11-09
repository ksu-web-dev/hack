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
<<<<<<< HEAD
  let width = 10;
  let height = 10;
  let tiles = [];
  for (let i = 0; i < width; i++) {
    tiles[i] = [];
    for (let j = 0; j < height; j++) {
      tiles[i][j] = new Tile();
      //tiles[i][j].character = '.';
      tiles[i][j].character = '@';
    }
  }
  let world = new World(tiles);
  w = world;
=======
>>>>>>> 7d1557271447cee7051a591a6230bcbbf6c4ee6e

  let body = document.getElementsByTagName('body')[0];

  // Create a div to contain the world
  let worldDiv = document.createElement("div");
<<<<<<< HEAD
  worldDiv.style.width = pxs(15 * tiles[0].length);
  worldDiv.style.height = pxs(15 * tiles.length);

=======
  worldDiv.style.width = pxs(15 * w.tiles[0].length);
  worldDiv.style.height = pxs(15 * w.tiles.length);
  worldDiv.style.position = "relative";
  worldDiv.style.margin = "auto";

  //worldDiv.style.left = pxs(x);
  //worldDiv.style.top = pxs(y);
>>>>>>> 7d1557271447cee7051a591a6230bcbbf6c4ee6e

  // Start creating a div for each row and then each cell of the row
  for (let i = 0; i < w.tiles.length; i++) {

    let rowDiv = document.createElement("div");
    rowDiv.style.height = pxs(15);
    rowDiv.style.display = 'flex';


    for (let j = 0; j < w.tiles[0].length; j++) {

      let elementDiv = document.createElement("div");
      elementDiv.style.height = pxs(15);//'15px';
      elementDiv.style.width = pxs(15);//'15px';

      elementDiv.innerHTML = w.tiles[i][j].character;
      elementDiv.style.textAlign = "center";
      elementDiv.style.userSelect = "none";

      rowDiv.appendChild(elementDiv);
    }
    worldDiv.appendChild(rowDiv);
  }
  // Then insert the tile's character centered in the tile
  body.appendChild(worldDiv);
  console.log(body);
}

var movement = { // where the player is moving.
  up: false,
  down: false,
  left: false,
  right: false
}
document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = true;
      break;
    case 87: // W
      movement.up = true;
      break;
    case 68: // D
      movement.right = true;
      break;
    case 83: // S
      movement.down = true;
      break;
  }
  updatePlayer(movement);
});

document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = false;
      break;
    case 87: // W
      movement.up = false;
      break;
    case 68: // D
      movement.right = false;
      break;
    case 83: // S
      movement.down = false;
      break;
  }
  updatePlayer(movement);
});

setInterval(function() { //emit to the socket, player movement 60 times a second.
  socket.emit('movement', movement);
}, 1000 / 60);

function updatePlayer(arr : any) //what is the player?
{
    // if (arr.left && Allowedmovement.left) {
    //   player.x -= 1;
    // }
    // if (arr.up && Allowedmovement.up) {
    //   player.y -= 1;
    // }
    // if (arr.right && Allowedmovement.right) {
    //   player.x += 1;
    // }
    // if (arr.down && Allowedmovement.down) {
    //   player.y += 1;
    // }


    //What are the player coordinates?
    //change player coordinates, based off movement
    //update the server with player location.
}

//** Check if tile that player wants to move to, is passable or not.
// Disable the player from moving into a tile that is non-passable. **//
function checkCollision() //<- pass in player coordinates?
{
  var allowedMovement = {
    up: true,
    down: true,
    left: true,
    right: true
  }

  //see what tiles around player are not passable.
  //set Allowedmovement to false if any direction is not allowed.

  return allowedMovement;
}

var socket = io('http://localhost:8080');

send(new ConnectAction(token));

renderWorld(null, 0, 0);
