import { Location, World } from './world';
import { Tile } from './tile';

export interface Action {
  update(w: World): World;
  serialize(): string;
}

export enum Actions {
  Connect,
  UpdateWorld
}

export class ConnectAction implements Action {
  public token: string;

  constructor(token: string) {
    this.token = token;
  }

  public update(w: World): World {
    if (w.players[this.token] == null) {
      w.players[this.token] = new Location(0, 0);
    }

    return w;
  }

  public serialize(): string {
    return JSON.stringify({ action: Actions.Connect, token: this.token });
  }
}

export class UpdateWorld implements Action {
  public world: World;

  constructor(world: World) {
    this.world = world;
  }

  public update(w: World): World {
    return this.world;
  }

  public serialize(): string {
    let players = [];

    for (var i = 0; i < this.world.players.length; i++) {
      players[i] = {
        x: this.world.players[i],
        y: this.world.players[i]
      };
    }

    return JSON.stringify({
      action: Actions.UpdateWorld,
      world: { tiles: this.world.tiles, players: players }
    });
  }
}
