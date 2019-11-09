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

  constructor(tiles: World) {
    this.world = tiles;
  }

  public update(w: World): World {
    return w;
  }

  public serialize(): string {
    return JSON.stringify({
      actions: Actions.UpdateWorld,
      world: this.world
    });
  }
}
