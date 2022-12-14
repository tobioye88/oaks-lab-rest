import { RepositoryException } from '../../../exceptions/all.exception';
import { ITaskStep } from '../interfaces/task.interface';
import { TaskStep } from '../schema/task-step.schema';
import { Task } from '../schema/task.schema';

export class TaskRepository {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'First Title',
      isDone: true,
      steps: [
        {
          id: 1,
          taskId: 1,
          name: 'First Step',
          isDone: true,
        },
        {
          id: 2,
          taskId: 1,
          name: 'Second Step',
          isDone: true,
        },
      ],
    },
  ];

  getTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: string, steps: ITaskStep[]): Task {
    const id = Math.round(Math.random() * 100);
    const isDone = steps.every((step) => step.isDone);
    const newTask = { title, steps, id, isDone } as Task;
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(taskId: number, title: string): Task {
    const task = this.getTasks().find((task) => task.id === taskId);
    task.title = title;
    return task;
  }

  getTaskById(taskId: number): Task {
    return this.getTasks().find((task) => task.id === taskId);
  }

  updateTaskStep(newStep: TaskStep, taskId: number): Task {
    const task = this.getTasks().find((task) => task.id === taskId);
    const step = task.steps.find((step) => (step.id = newStep.id));
    step.name = newStep.name;
    step.isDone = newStep.isDone;
    task.isDone = task.steps.every((step) => step.isDone);
    return task;
  }

  addTaskStep(newStep: ITaskStep, taskId: number): Task {
    const task = this.getTasks().find((task) => task.id === taskId);
    newStep = { id: Math.round(Math.random() * 100), ...newStep, taskId };
    task.steps.push(newStep);
    return task;
  }

  deleteTask(taskId: number) {
    const deleteIndex = this.tasks.findIndex((task) => task.id === taskId);
    if (deleteIndex == -1) {
      throw new RepositoryException('Task not found', 404);
    }
    const task = this.tasks[deleteIndex];
    this.tasks.splice(deleteIndex);
    return task;
  }

  deleteTaskStep(taskId: number, stepId: number) {
    const deleteIndex = this.tasks.findIndex((task) => task.id === taskId);
    if (deleteIndex == -1) {
      throw new RepositoryException('Task not found', 404);
    }
    const task = this.tasks[deleteIndex];
    const stepIndex = task.steps.findIndex((step) => step.id == stepId);
    task.steps.splice(stepIndex);
    return task;
  }
}
