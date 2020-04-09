import { TodoRepository } from './todo.repository';
import { Todo } from '../../entities/todo.entity';

describe('TodoRepository', () => {
  let todoRepository: TodoRepository;

  beforeEach(() => {
    todoRepository = new TodoRepository();
  });

  describe('find', () => {
    it('should return a list of todo', () => {
      const result = [
        new Todo(1, 'Todo 1'),
        new Todo(2, 'Todo 2'),
        new Todo(3, 'Todo 3'),
      ];
      jest.spyOn(todoRepository, 'find').mockImplementation(() => result);

      expect(todoRepository.find()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single todo given an id', () => {
      const result = new Todo(1, 'Testing todo');

      jest.spyOn(todoRepository, 'findOne').mockImplementation(() => result);
      expect(todoRepository.findOne(1)).toBe(result);
    });
  });

  describe('updateOne', () => {
    it('should throw an error if the todo is not found', () => {
      const newTodo = new Todo(5, 'Prova');

      expect(() => todoRepository.updateOne(5, newTodo)).toThrow();
    });

    it('should return the updated todo', () => {
      const newTodo = new Todo(1, 'Updated todo');

      expect(todoRepository.updateOne(1, newTodo)).toEqual(newTodo);
    });

    it('should have inserted the new todo into the collection', () => {
      const newTodo = new Todo(1, 'Updated todo');

      todoRepository.updateOne(1, newTodo);
      expect(todoRepository.findOne(1)).toEqual(newTodo);
    });
  });

  describe('create', () => {
    it('should create a todo and add it to the collection', () => {
      const todo = new Todo(5, 'Mock todo');

      expect(todoRepository.create(todo)).toBe(todo);
      expect(todoRepository.findOne(todo.id)).toBe(todo);
    });
  });

  describe('remove', () => {
    it('should throw an error if the todo doesn\'t exist', () => {
      expect(() => todoRepository.remove(5)).toThrow();
    });

    it('should return the removed todo', () => {
      const todo = todoRepository.findOne(1);

      expect(todoRepository.remove(1)).toBe(todo);
    });

    it('should remove the todo from the repository', () => {
      const todo = todoRepository.remove(1);

      expect(todoRepository.findOne(1)).toBe(undefined);
    });
  });
});
