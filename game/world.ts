import { Tile } from './tile';

export class Location {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class World {
  public tiles: Tile[][];
  public players: Location[][];

  constructor(tiles?: Tile[][]) {
    if (tiles) {
      this.tiles = tiles;
    }

    this.players = [];
  }
}
