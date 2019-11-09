import { World } from './world';

export interface Action {
  update(w: World): World;
  serialize(): string;
}

export class ConnectAction implements Action {
  public token: string;

  constructor(token: string) {
    this.token = token;
  }

  public update(w: World): World {
    return w;
  }

  public serialize(): string {
    return JSON.stringify({ token: this.token });
  }

  
}
