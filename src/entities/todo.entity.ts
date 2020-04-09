import { v4 as uuid } from 'uuid';

export class Todo {
  private readonly _id: string;
  private _title: string;

  constructor(title: string) {
    this._id = uuid();
    this._title = title;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
}
