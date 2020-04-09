import { Injectable } from '@nestjs/common';
import { TodoRepository } from '../../repositories/todo/todo.repository';
import { Todo } from '../../entities/todo.entity';
import { CreateTodoDto } from '../../controllers/todo/dto/CreateTodoDto';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  getAll(): Todo[] {
    return this.todoRepository.find();
  }

  getById(id: string): Todo {
    return this.todoRepository.findOne(id);
  }

  createOne(todo: CreateTodoDto): Todo {
    const newTodo = new Todo(todo.title);

    return this.todoRepository.create(newTodo);
  }

  updateOne(id: string, todo: Partial<Todo>): Todo {
    const todoExist = this.todoRepository.findOne(id);

    if (!todoExist) {
      throw new Error('Todo does not exist');
    }

    return this.todoRepository.updateOne(id, todo);
  }

  removeOne(id: string): Todo {
    const todoExist = this.todoRepository.findOne(id);

    if (!todoExist) {
      throw new Error('Todo does not exist');
    }

    return this.todoRepository.remove(id);
  }
}
