import { Todo } from '../../entities/todo.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoRepository {
  private todoCollection: Todo[];

  constructor() {
    this.todoCollection = [
      new Todo(1, 'Todo 1'),
      new Todo(2, 'Todo 2'),
      new Todo(3, 'Todo 3'),
    ];
  }

  public find(): Todo[] {
    return this.todoCollection;
  }

  public findOne(id: number): Todo {
    return this.todoCollection.find(todo => todo.id === id);
  }

  public updateOne(id: number, todo: Partial<Todo>): Todo {
    const todoExist = this.todoCollection.find(entity => entity.id === id);

    if (!todoExist) {
      throw new Error('Todo not found, cannot update');
    }

    todoExist.title = todo.title;

    return todoExist;
  }

  public create(todo: Todo): Todo {
    this.todoCollection.push(todo);

    return todo;
  }

  public remove(id: number): Todo {
    const todoIndex = this.todoCollection.findIndex(item => item.id === id);

    if (todoIndex < 0) {
      throw new Error('Todo not found');
    }

    const todo = this.todoCollection[todoIndex];
    this.todoCollection = this.todoCollection.filter(item => item.id !== id);

    return todo;
  }
}
