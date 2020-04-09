import { TodoController } from './todo.controller';
import { TodoService } from '../../servicies/todo/todo.service';
import { Test } from '@nestjs/testing';
import { Todo } from '../../entities/todo.entity';
import { TodoRepository } from '../../repositories/todo/todo.repository';
import { todoMockController } from './todo.controller.mock';
import { CreateTodoDto } from './dto/CreateTodoDto';

describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        TodoService,
        {
          provide: TodoRepository,
          useValue: new TodoRepository(todoMockController),
        },
      ],
    }).compile();

    todoController = moduleRef.get<TodoController>(TodoController);
    todoService = moduleRef.get<TodoService>(TodoService);
  });

  describe('getAll', () => {
    it('should return an array of todo', () => {
      jest
        .spyOn(todoService, 'getAll')
        .mockImplementation(() => todoMockController);

      expect(todoController.getAll()).toBe(todoMockController);
    });
  });

  describe('getOne', () => {
    it('should throw an error if id is not given', () => {
      expect(() => todoController.getOne(undefined)).toThrow();
    });
    it('should get a todo given an id', () => {
      const todo = todoMockController[0];

      jest.spyOn(todoService, 'getById').mockImplementation(() => todo);

      expect(todoController.getOne(todo.id)).toBe(todo);
    });
  });

  describe('create', () => {
    it('should return the created todo', () => {
      const todo = todoMockController[0];

      jest.spyOn(todoService, 'createOne').mockImplementation(() => todo);
      expect(todoController.create(todo)).toBe(todo);
    });
  });

  describe('update', () => {
    it('should throw an error if id is not given', () => {
      expect(() => todoController.update(undefined, undefined)).toThrow();
    });

    it('should return the updated todo', () => {
      const todo = todoMockController[0];
      jest.spyOn(todoService, 'updateOne').mockImplementation(() => todo);

      expect(todoController.update(todo.id, todo)).toBe(todo);
    });
  });

  describe('delete', () => {
    it('should throw an error if id is not given', () => {
      expect(() => todoController.delete(undefined)).toThrow();
    });

    it('should return the deleted todo', () => {
      const todo = todoMockController[0];

      jest.spyOn(todoService, 'removeOne').mockImplementation(() => todo);

      expect(todoController.delete(todo.id)).toBe(todo);
    });
  });
});
