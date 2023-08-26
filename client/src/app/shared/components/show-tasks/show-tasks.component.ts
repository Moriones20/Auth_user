import { Component, OnInit } from '@angular/core';
import { Task } from '@core/models/task/task.interface';
import { Store } from '@ngrx/store';
import { taskFilter } from '@shared/helper/taskFilter';
import { TaskService } from '@shared/services/tasks/task.service';
import { selectLoading } from '@store/selectors/task.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html',
  styleUrls: ['./show-tasks.component.css'],
})
export class ShowTasksComponent implements OnInit {
  tasks: Task[] | undefined;
  loading$: Observable<boolean> = new Observable();

  constructor(private taskService: TaskService, private store: Store<any>) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading);

    this.loading$.subscribe((loading) => {
      if (!loading) {
        this.taskService.getTasks().subscribe({
          next: (resp) => {
            this.tasks = taskFilter(resp);
          },
          error: (err) => {
            console.error(err);
          },
        });
      }
    });
  }
}
