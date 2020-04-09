import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from '../../servicies/todo/todo.service';
import { Todo } from '../../entities/todo.entity';
import { CreateTodoDto } from './dto/CreateTodoDto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  public getAll(): Todo[] {
    return this.todoService.getAll();
  }

  @Get(':id')
  public getOne(@Param('id') id: string): Todo {
    if (!id) {
      throw new BadRequestException('Id is a required parameter');
    }

    return this.todoService.getById(id);
  }

  @Post()
  public create(@Body() todo: CreateTodoDto): Todo {
    return this.todoService.createOne(todo);
  }

  @Put(':id')
  public update(@Param('id') id: string, @Body() todo: Todo): Todo {
    if (!id) {
      throw new BadRequestException('Id is a required parameter');
    }

    return this.todoService.updateOne(id, todo);
  }

  @Delete(':id')
  public delete(@Param('id') id: string): Todo {
    if (!id) {
      throw new BadRequestException('Id is a required parameter');
    }

    return this.todoService.removeOne(id);
  }
}
