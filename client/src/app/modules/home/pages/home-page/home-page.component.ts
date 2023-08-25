import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@core/models/user/user.interface';
import { Store } from '@ngrx/store';
import { loadingAuth } from '@store/actions/auth.actions';
import { loadingTask } from '@store/actions/task.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  taskForm: FormGroup = new FormGroup({});
  loading$: Observable<boolean> = new Observable();
  userData: User | any;

  constructor(private store: Store<any>, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.store.dispatch(loadingAuth());
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');

    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      done: [false],
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const title = this.taskForm.value.title;
      const description = this.taskForm.value.description;
      const done = this.taskForm.value.done;
      const user = this.userData._id;
      const task = { title, description, done, user };

      this.store.dispatch(loadingTask({ task }));
    }
  }
}
