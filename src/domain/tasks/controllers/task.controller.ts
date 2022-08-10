import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import {
  IResponseHelper,
  ResponseHelper,
} from '../../../helpers/response.helper';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../schema/task.schema';
import { TaskService } from '../services/task.service';

@Controller('v1/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('')
  getTasks(): IResponseHelper<Task[]> {
    const tasks = this.taskService.getTasks();
    return ResponseHelper.success<Task[]>(tasks);
  }

  @Post('')
  addTask(@Body() createTaskDto: CreateTaskDto): IResponseHelper<Task> {
    const task = this.taskService.createTask(createTaskDto);
    return ResponseHelper.success<Task>(task);
  }
}
