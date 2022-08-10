import { Test, TestingModule } from '@nestjs/testing';
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
});
