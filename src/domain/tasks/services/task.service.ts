import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../repositories/task.repository';
import { Task } from '../schema/task.schema';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  getTasks(): Task[] {
    return this.taskRepository.getTasks();
  }
}
