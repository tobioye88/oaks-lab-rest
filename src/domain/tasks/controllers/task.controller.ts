import { Controller } from '@nestjs/common';
import { TaskService } from '../services/task.service';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  getTasks() {}
}
