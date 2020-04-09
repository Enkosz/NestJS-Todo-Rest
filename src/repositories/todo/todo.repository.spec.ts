import { TodoRepository } from './todo.repository';
import { Todo } from '../../entities/todo.entity';
import { todoMockService } from './todo.repository.mock';

describe('TodoRepository', () => {
  let todoRepository: TodoRepository;

  beforeEach(() => {
    todoRepository = new TodoRepository(todoMockService);
  });

  describe('find', () => {
    it('should return a list of todo', () => {
      jest
        .spyOn(todoRepository, 'find')
        .mockImplementation(() => todoMockService);

      expect(todoRepository.find()).toBe(todoMockService);
    });
  });

  describe('findOne', () => {
    it('should return a single todo given an id', () => {
      const todo = todoMockService[0];

      expect(todoRepository.findOne(todo.id)).toBe(todo);
    });
  });

  describe('updateOne', () => {
    it('should throw an error if the todo is not found', () => {
      const newTodo = new Todo('Prova');

      expect(() => todoRepository.updateOne(undefined, newTodo)).toThrow();
    });

    it('should return the updated todo', () => {
      const newTodo = todoMockService[0];

      newTodo.title = todoMockService[1].title;

      expect(todoRepository.updateOne(newTodo.id, newTodo)).toEqual(newTodo);
    });

    it('should have inserted the new todo into the collection', () => {
      const newTodo = todoMockService[0];

      newTodo.title = todoMockService[1].title;

      expect(todoRepository.updateOne(newTodo.id, newTodo)).toBe(newTodo);
      expect(todoRepository.findOne(newTodo.id)).toEqual(newTodo);
    });
  });

  describe('create', () => {
    it('should create a todo and add it to the collection', () => {
      const todo = new Todo('Mock todo');

      expect(todoRepository.create(todo)).toBe(todo);
      expect(todoRepository.findOne(todo.id)).toBe(todo);
    });
  });

  describe('remove', () => {
    it('should throw an error if the todo does not exist', () => {
      expect(() => todoRepository.remove(undefined)).toThrow();
    });

    it('should return the removed todo', () => {
      const todo = todoMockService[0];

      expect(todoRepository.remove(todo.id)).toBe(todo);
    });

    it('should remove the todo from the repository', () => {
      const todo = todoMockService[0];

      expect(todoRepository.remove(todo.id)).toBe(todo);
      expect(todoRepository.findOne(todo.id)).toBe(undefined);
    });
  });
});
