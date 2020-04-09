import { TodoService } from './todo.service';
import { TodoRepository } from '../../repositories/todo/todo.repository';
import { Todo } from '../../entities/todo.entity';
import { todoMockService } from './todo.service.mock';

describe('TodoService', () => {
  let todoService: TodoService;
  let todoRepository: TodoRepository;

  beforeEach(() => {
    todoRepository = new TodoRepository(todoMockService);
    todoService = new TodoService(todoRepository);
  });

  describe('getAll', () => {
    it('should return a list of todo', () => {
      expect(todoService.getAll()).toBe(todoMockService);
    });
  });

  describe('getById', () => {
    it('should return a todo given an id', () => {
      const todo = todoMockService[0];

      expect(todoService.getById(todo.id)).toBe(todo);
      expect(todoService.getById(todo.id)).toBeInstanceOf(Todo);
    });

    it('should return null if not found', () => {
      expect(todoService.getById(undefined)).toBe(undefined);
    });
  });

  describe('createOne', () => {
    it('should create a todo with the repository', () => {
      const todo = new Todo('Todo mock');

      expect(todoRepository.create(todo)).toBe(todo);
      expect(todoRepository.find()).toContain(todo);
    });
  });

  describe('updateOne', () => {
    it('should throw an error if the todo is not found', () => {
      expect(() => todoService.updateOne(undefined, undefined)).toThrow();
    });

    it('should return the updated todo', () => {
      const todo = todoMockService[0];

      todo.title = todoMockService[1].title;

      expect(todoService.updateOne(todo.id, todo)).toStrictEqual(todo);
    });
  });

  describe('deleteOne', () => {
    it('should throw an error if the todo is not found', () => {
      expect(() => todoService.removeOne(undefined)).toThrow();
    });

    it('should return the removed todo', () => {
      const todo = todoMockService[0];

      expect(todoService.removeOne(todo.id)).toBe(todo);
    });
  });
});
