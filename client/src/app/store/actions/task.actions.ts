import { Task } from '@core/models/task/task.interface';
import { createAction, props } from '@ngrx/store';

export const loadingTask = createAction('[Task] loading task');

//CREATE
export const failureCreateTask = createAction(
  '[Task] failure create task',
  props<{ error: string }>()
);

export const createTask = createAction(
  '[Task] created successful task',
  props<{ task: Task }>()
);

//EDIT
export const failureEditTask = createAction(
  '[Task] failure edit task',
  props<{ error: string }>()
);

export const editTask = createAction(
  '[Task] edit successful task',
  props<{ task: Task }>()
);

//DELETE
export const failureDeleteTask = createAction(
  '[Task] failure delete task',
  props<{ error: string }>()
);

export const deleteTask = createAction(
  '[Task] delete successful task',
  props<{ id: string }>()
);
