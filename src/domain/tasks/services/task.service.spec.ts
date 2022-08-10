import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryException } from '../../../exceptions/all.exception';
import { TaskRepository } from '../repositories/task.repository';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService, TaskRepository],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array with 1 task', () => {
    const response = service.getTasks();
    expect(response.length).toBe(1);
  });

  it('should add a task', () => {
    service.createTask({
      title: 'Second Task',
      steps: [
        {
          name: 'Second Task, First Step',
          isDone: false,
        },
        {
          name: 'Second Task, Second Step',
          isDone: false,
        },
      ],
    });
    const response = service.getTasks();
    expect(response.length).toBe(2);
  });

  it('should update a task', () => {
    const updatedTask = service.updateTask(
      {
        title: 'First Task Updated',
      },
      1,
    );
    expect(updatedTask.title).toBe('First Task Updated');
  });

  it('should update a task step', () => {
    const updatePayload = {
      id: 1,
      name: 'First Task Step --Updated',
      isDone: false,
    };
    const updatedTask = service.updateTaskStep(updatePayload, 1);
    expect(updatedTask.steps[0].name).toBe(updatePayload.name);
  });

  it('should add a new task step to task', () => {
    const addTaskStepPayload = {
      name: 'Last Task Step',
      isDone: false,
    };
    const updatedTask = service.addTaskStep(addTaskStepPayload, 1);
    expect(updatedTask.steps[updatedTask.steps.length - 1].name).toBe(
      addTaskStepPayload.name,
    );
  });

  it('should delete a new task step to task', () => {
    service.deleteTask(1);
    const tasks = service.getTasks();
    expect(tasks.length).toBe(0);
  });

  it('should throw an exception when deleting task that does not exist', () => {
    expect.assertions(1);
    service.deleteTask(1);
    try {
      service.deleteTask(1);
    } catch (e) {
      console.log(e);
      expect(e.message).toBe('Task not found');
    }
  });
});
