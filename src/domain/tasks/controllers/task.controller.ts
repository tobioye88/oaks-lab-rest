import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  IResponseHelper,
  ResponseHelper,
} from '../../../helpers/response.helper';
import { AddTaskStepDto } from '../dto/add-task-step.dto';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskStepDto } from '../dto/update-task-step.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../schema/task.schema';
import { TaskService } from '../services/task.service';

@ApiTags('Tasks')
@Controller('v1/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('')
  @ApiOperation({
    summary: 'Get all Task',
  })
  getTasks(): IResponseHelper<Task[]> {
    const tasks = this.taskService.getTasks();
    return ResponseHelper.success<Task[]>(tasks);
  }

  @Post('')
  @ApiOperation({
    summary: 'Create a new task',
  })
  addTask(@Body() createTaskDto: CreateTaskDto): IResponseHelper<Task> {
    const task = this.taskService.createTask(createTaskDto);
    return ResponseHelper.success<Task>(task);
  }

  @Patch(':taskId')
  @ApiOperation({
    summary: 'Update task by id',
  })
  updateTask(
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('taskId') taskId: string,
  ): IResponseHelper<Task> {
    const task = this.taskService.updateTask(updateTaskDto, Number(taskId));
    return ResponseHelper.success<Task>(task);
  }

  @Put(':taskId/task-step')
  @ApiOperation({
    summary: 'Update task step to existing task',
  })
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

  @Post(':taskId/task-step')
  @ApiOperation({
    summary: 'Add a new task step to existing task',
  })
  addTaskStep(
    @Body() addTaskStepDto: AddTaskStepDto,
    @Param('taskId') taskId: string,
  ): IResponseHelper<Task> {
    const task = this.taskService.addTaskStep(addTaskStepDto, Number(taskId));
    return ResponseHelper.success<Task>(task);
  }

  @Delete(':taskId')
  @ApiOperation({
    summary: 'Delete task by id',
  })
  deleteTask(@Param('taskId') taskId: string): IResponseHelper<Task> {
    const task = this.taskService.deleteTask(Number(taskId));
    return ResponseHelper.success<Task>(task);
  }

  @Delete(':taskId/task-step/:stepId')
  @ApiOperation({
    summary: 'Delete task step by id',
  })
  deleteTaskStep(
    @Param('taskId') taskId: string,
    @Param('stepId') stepId: string,
  ): IResponseHelper<Task> {
    const task = this.taskService.deleteTaskStep(
      Number(taskId),
      Number(stepId),
    );
    return ResponseHelper.success<Task>(task);
  }
}
