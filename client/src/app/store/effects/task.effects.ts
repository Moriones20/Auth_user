import { Injectable } from '@angular/core';
import { TaskService } from '@shared/services/tasks/task.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  createTask,
  deleteTask,
  failureCreateTask,
  failureDeleteTask,
  loadingTask,
} from '@store/actions/task.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class TaskEffects {
  createTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createTask),
      exhaustMap((action) => {
        const { task } = action;
        this.store.dispatch(loadingTask());
        return this.taskService.createTask(task).pipe(
          map((resp) => {
            return createTask({ task: resp.task });
          }),
          catchError((err) => {
            console.error(err.error);
            return of(failureCreateTask({ error: err.error.message }));
          })
        );
      })
    );
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteTask),
      exhaustMap((action) => {
        const { id } = action;
        this.store.dispatch(loadingTask());
        return this.taskService.deleteTask(id).pipe(
          map((resp) => {
            return deleteTask({ id });
          }),
          catchError((err) => {
            console.error(err.error);
            return of(failureDeleteTask({ error: err.error.message }));
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private store: Store
  ) {}
}
