import { ITask } from '../interfaces/task.interface';
import { TaskStep } from './task-step.schema';

//@Entity('task')
export class Task implements ITask {
  //@PrimaryGeneratedColumn()
  id: number;

  // @Column()
  title: string;

  // @Column()
  isDone: boolean;

  // @OneToMany(() => TaskStep, (step) => step.taskId)
  steps: TaskStep[];
}
