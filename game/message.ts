import { World } from './world';
import { Action, Actions, ConnectAction, UpdateWorld } from './action';

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

export function deserialize(buffer: string): Message {
  let { id, body } = JSON.parse(buffer);
  let action;

  body = JSON.parse(body);

  switch (body.action) {
    case Actions.Connect:
      action = new ConnectAction(body.token);
      break;
    case Actions.UpdateWorld:
      action = new UpdateWorld(body.world);
      break;
  }

  return new Message(id, action);
}
