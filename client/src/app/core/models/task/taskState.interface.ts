import { Task } from './task.interface';

export interface taskState {
  error: string;
  loading: boolean;
  task: Task;
}
