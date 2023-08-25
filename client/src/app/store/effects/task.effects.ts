import { Injectable } from '@angular/core';
import { TaskService } from '@modules/home/services/task.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { createTask, loadingTask } from '@store/actions/task.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class taskEffects {
  loadingTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadingTask),
      exhaustMap((action) => {
        const { task } = action;
        return this.taskService.createTask(task).pipe(
          map((resp) => {
            this.store.dispatch(loadingTask({ task: resp.task }));
            return createTask();
          }),
          catchError((err) => {
            console.error(err.error);
            return of({
              type: '[Task] failure task',
              error: err.error.message,
            });
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
