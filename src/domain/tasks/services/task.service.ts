import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskRepository } from '../repositories/task.repository';
import { Task } from '../schema/task.schema';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  getTasks(): Task[] {
    return this.taskRepository.getTasks();
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    return this.taskRepository.createTask(
      createTaskDto.title,
      createTaskDto.steps,
    );
  }
}
