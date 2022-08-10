export interface ITask {
  id?: number;
  title: string;
  isDone: boolean;
}

export interface ITaskStep {
  id?: number;
  taskId?: number;
  name: string;
  isDone: boolean;
}
