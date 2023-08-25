import { taskState } from '@core/models/task/taskState.interface';
import { createSelector } from '@ngrx/store';
import { AppState } from '@store/app.state';

export const selectTask = (state: AppState) => state.task;

export const selectLoading = createSelector(
  selectTask,
  (state: taskState) => state.loading
);

export const selectError = createSelector(
  selectTask,
  (state: taskState) => state.error
);

export const selectATask = createSelector(
  selectTask,
  (state: taskState) => state.task
);
