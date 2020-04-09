import { Injectable } from '@nestjs/common';
import { TodoRepository } from '../../repositories/todo/todo.repository';
import { Todo } from '../../entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  getAll(): Todo[] {
    return this.todoRepository.find();
  }

  getById(id: number): Todo {
    return this.todoRepository.findOne(id);
  }

  createOne(todo: Todo): Todo {
    const todoExist = this.todoRepository.findOne(todo.id);

    if (todoExist) {
      throw new Error('Todo already exist');
    }

    return this.todoRepository.create(todo);
  }

  updateOne(id: number, todo: Partial<Todo>): Todo {
    const todoExist = this.todoRepository.findOne(id);

    if (!todoExist) {
      throw new Error('Todo does not exist');
    }

    return this.todoRepository.updateOne(id, todo);
  }

  removeOne(id: number): Todo {
    const todoExist = this.todoRepository.findOne(id);

    if (!todoExist) {
      throw new Error('Todo does not exist');
    }

    return this.todoRepository.remove(id);
  }
}
