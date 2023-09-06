import { taskState } from '@core/models/task/taskState.interface';
import { createReducer, on } from '@ngrx/store';
import {
  createTask,
  deleteTask,
  editTask,
  failureCreateTask,
  failureDeleteTask,
  failureEditTask,
  loadingTask,
} from '@store/actions/task.actions';

export const initialState: taskState = {
  message: '',
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
  on(loadingTask, (state) => {
    return { ...state, loading: true, message: '' };
  }),

  //CREATE
  on(createTask, (state, { task }) => {
    return { ...state, task, loading: false, message: 'Created successful' };
  }),
  on(failureCreateTask, (state, { error }) => {
    return { ...state, loading: false, message: error };
  }),

  //EDIT
  on(editTask, (state, { task }) => {
    return { ...state, task, loading: false, message: 'Edit successful' };
  }),
  on(failureEditTask, (state, { error }) => {
    return { ...state, loading: false, message: error };
  }),

  //DELETE
  on(deleteTask, (state, { id }) => {
    return {
      ...state,
      loading: false,
      message: 'Deleted successful',
    };
  }),
  on(failureDeleteTask, (state, { error }) => {
    return { ...state, loading: false, message: error };
  })
);
