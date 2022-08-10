import { ITaskStep } from '../interfaces/task.interface';
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
          id: 1,
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
}
