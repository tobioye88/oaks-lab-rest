import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskStepDto } from '../dto/update-task-step.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
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

  updateTask(updateTaskDto: UpdateTaskDto, taskId: number): Task {
    return this.taskRepository.updateTask(taskId, updateTaskDto.title);
  }

  updateTaskStep(updateTaskStepDto: UpdateTaskStepDto, taskId: number): Task {
    let task = this.taskRepository.getTaskById(taskId);

    let step = task.steps.find((task) => task.id === updateTaskStepDto.id);
    step = { ...step, ...updateTaskStepDto };
    task = this.taskRepository.updateTaskStep(step, taskId);
    return task;
  }
}
