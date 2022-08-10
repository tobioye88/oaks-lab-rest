import { Module } from '@nestjs/common';
import { TaskController } from './controllers/task.controller';
import { TaskRepository } from './repositories/task.repository';
import { TaskService } from './services/task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
})
export class TaskModule {}
