import { Module } from '@nestjs/common';
import { TodoModule } from './modules/todo.module';

@Module({
  imports: [TodoModule],
})
export class AppModule {}
