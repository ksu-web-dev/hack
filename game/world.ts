import { Tile } from './tile'

export class World {
  public tiles: Tile[][]

  constructor(tiles: Tile[][]) {
    this.tiles = tiles
  }
}
