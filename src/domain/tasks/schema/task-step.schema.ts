import { ITaskStep } from '../interfaces/task.interface';
import { Task } from './task.schema';

//@Entity('task_steps')
export class TaskStep implements ITaskStep {
  //@PrimaryGeneratedColumn()
  id: number;

  // @Column()
  taskId: number;

  // @Column()
  name: string;

  // @Column()
  isDone: boolean;
}
