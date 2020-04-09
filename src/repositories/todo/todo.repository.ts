import { Todo } from '../../entities/todo.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoRepository {
  private todoCollection: Todo[];

  constructor(todoCollection?: Todo[]) {
    this.todoCollection = todoCollection
      ? todoCollection
      : [new Todo('Todo 1'), new Todo('Todo 2'), new Todo('Todo 3')];
  }

  public find(): Todo[] {
    return this.todoCollection;
  }

  public findOne(id: string): Todo {
    return this.todoCollection.find(todo => todo.id === id);
  }

  public updateOne(id: string, todo: Partial<Todo>): Todo {
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

  public remove(id: string): Todo {
    const todoIndex = this.todoCollection.findIndex(item => item.id === id);

    if (todoIndex < 0) {
      throw new Error('Todo not found');
    }

    const todo = this.todoCollection[todoIndex];
    this.todoCollection = this.todoCollection.filter(item => item.id !== id);

    return todo;
  }
}
