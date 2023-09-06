import { Task } from './task.interface';

export interface taskState {
  message: string;
  loading: boolean;
  task: Task;
}
