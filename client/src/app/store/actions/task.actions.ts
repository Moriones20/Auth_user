import { Task } from '@core/models/task/task.interface';
import { createAction, props } from '@ngrx/store';

export const loadingTask = createAction(
  '[Task] loading task',
  props<{ task: Task }>()
);

export const failureTask = createAction(
  '[Task] failure task',
  props<{ error: string }>()
);

export const createTask = createAction('[Task] created successful task');
