import { World } from './world';
import { Action } from './action';

export class Message {
  id: string;
  body: Action;

  constructor(id: string, action: Action) {
    this.id = id;
    this.body = action;
  }

  public serialize(): string {
    return JSON.stringify({
      id: this.id,
      body: this.body.serialize()
    });
  }
}
