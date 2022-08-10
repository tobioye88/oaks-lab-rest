import { Controller, Get } from '@nestjs/common';
import {
  IResponseHelper,
  ResponseHelper,
} from '../../../helpers/response.helper';
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
}
