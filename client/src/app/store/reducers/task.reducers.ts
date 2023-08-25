import { taskState } from '@core/models/task/taskState.interface';
import { createReducer, on } from '@ngrx/store';
import {
  createTask,
  failureTask,
  loadingTask,
} from '@store/actions/task.actions';

export const initialState: taskState = {
  error: '',
  loading: false,
  task: {
    id: '',
    title: '',
    description: '',
    done: false,
    user: '',
    createdAt: undefined,
    updatedAt: undefined,
  },
};

export const taskReducer = createReducer(
  initialState,
  on(loadingTask, (state, { task }) => {
    return { ...state, task, loading: true };
  }),
  on(createTask, (state) => {
    return { ...state, loading: false, error: '' };
  }),
  on(failureTask, (state, { error }) => {
    return { ...state, loading: false, error: error };
  })
);
