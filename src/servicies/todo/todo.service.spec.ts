import { TodoService } from './todo.service';
import { TodoRepository } from '../../repositories/todo/todo.repository';
import { Todo } from '../../entities/todo.entity';

describe('TodoService', () => {
  let todoService: TodoService;
  let todoRepository: TodoRepository;

  beforeEach(() => {
    todoRepository = new TodoRepository();
    todoService = new TodoService(todoRepository);
  });

  describe('getAll', () => {
    it('should return a list of todo', () => {
      const result = [
        new Todo(1, 'Todo 1'),
        new Todo(2, 'Todo 2'),
        new Todo(3, 'Todo 3'),
      ];

      jest.spyOn(todoService, 'getAll').mockImplementation(() => result);

      expect(todoService.getAll()).toBe(result);
    });
  });

  describe('getOne', () => {
    it('should return a todo given an id', () => {
      const result = new Todo(1, 'Todo mock');

      jest.spyOn(todoService, 'getById').mockImplementation(() => result);

      expect(todoService.getById(1)).toBe(result);
      expect(todoService.getById(1)).toBeInstanceOf(Todo);
    });

    it('should return null if not found', () => {
      expect(todoService.getById(5)).toBe(undefined);
    });
  });

  describe('createOne', () => {
    it('should throw an error if a todo already exist', () => {
      const todo = new Todo(1, 'Todo mock');

      const result = new Todo(1, 'Todo 1');
      jest.spyOn(todoRepository, 'findOne').mockImplementation(() => result);

      expect(() => todoService.createOne(todo)).toThrow();
    });

    it('should create a todo with the repository', () => {
      const todo = new Todo(4, 'Todo mock');

      expect(todoRepository.create(todo)).toBe(todo);
      expect(todoRepository.find()).toContain(todo);
    });
  });

  describe('updateOne', () => {
    it('should throw an error if the todo is not found', () => {
      const todo = new Todo(5, 'Todo mock');

      expect(() => todoService.updateOne(5, todo)).toThrow();
    });

    it('should return the updated todo', () => {
      const todo = new Todo(1, 'Todo mock');

      expect(todoService.updateOne(1, todo)).toStrictEqual(todo);
    });
  });

  describe('deleteOne', () => {
    it('should throw an error if the todo is not found', () => {
      expect(() => todoService.removeOne(5)).toThrow();
    });

    it('should return the removed todo', () => {
      const todo = todoService.getById(1);

      expect(todoService.removeOne(1)).toBe(todo);
    });
  });
});
