import { Module } from '@nestjs/common';
import { TodoService } from '../servicies/todo/todo.service';
import { TodoRepository } from '../repositories/todo/todo.repository';
import { TodoController } from '../controllers/todo/todo.controller';

@Module({
  providers: [
    TodoService,
    {
      provide: TodoRepository,
      useValue: [],
    },
  ],
  controllers: [TodoController],
})
export class TodoModule {}
