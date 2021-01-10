import { BaseModel } from './base-model';
import { LooseObject } from '@typings';

export class Todo extends BaseModel {
  title: string;
  description: string;

  constructor(json?: any) {
    super(json);
    if (json) {
      this.title = json.title;
      this.description = json.description;
    }
  }

  public serialize(): LooseObject {
    return {
      id: this._id,
      title: this.title,
      description: this.description,
    };
  }
}
