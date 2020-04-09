export class Todo {
  private readonly _id: number;
  private _title: string;

  constructor(id: number, title: string) {
    this._id = id;
    this._title = title;
  }

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
}
