import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '@core/models/task/task.interface';
import { Store } from '@ngrx/store';
import { editTask } from '@store/actions/task.actions';
import { selectLoading } from '@store/selectors/task.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit {
  @Input() showModal!: boolean;
  @Input() task!: Task;
  @Output() showModalChange = new EventEmitter<boolean>();
  editForm: FormGroup = new FormGroup({});
  loading$: Observable<boolean> = new Observable();

  constructor(private formBuilder: FormBuilder, private store: Store<any>) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading);

    this.editForm = this.formBuilder.group({
      title: [this.task?.title || '', Validators.required],
      description: [this.task?.description || ''],
      done: [this.task?.done || false],
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
    this.showModalChange.emit(this.showModal);
  }

  onSubmit() {
    if (this.editForm.valid) {
      const id = this.task.id;
      const title = this.editForm.value.title;
      const description = this.editForm.value.description;
      const done = this.editForm.value.done;
      const user = this.task.user;
      const task = { id, title, description, done, user };

      this.store.dispatch(editTask({ task }));
      this.loading$.subscribe((loading) => {
        if (!loading) {
          this.toggleModal();
        }
      });
    }
  }
}
