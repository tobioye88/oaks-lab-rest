import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import {
  IResponseHelper,
  ResponseHelper,
} from '../../../helpers/response.helper';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskStepDto } from '../dto/update-task-step.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
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

  @Patch(':taskId')
  updateTask(
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('taskId') taskId: string,
  ): IResponseHelper<Task> {
    const task = this.taskService.updateTask(updateTaskDto, Number(taskId));
    return ResponseHelper.success<Task>(task);
  }

  @Put(':taskId/task-step')
  updateTaskStep(
    @Body() updateTaskStepDto: UpdateTaskStepDto,
    @Param('taskId') taskId: string,
  ): IResponseHelper<Task> {
    const task = this.taskService.updateTaskStep(
      updateTaskStepDto,
      Number(taskId),
    );
    return ResponseHelper.success<Task>(task);
  }
}
