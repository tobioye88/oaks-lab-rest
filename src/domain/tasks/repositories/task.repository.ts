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
}
