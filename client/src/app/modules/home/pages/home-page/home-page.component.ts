import { Component, OnInit } from '@angular/core';
import { User } from '@core/models/user/user.interface';
import { Store } from '@ngrx/store';
import { loadingAuth } from '@store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  loading$: Observable<boolean> = new Observable();
  userData: User | any;

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.dispatch(loadingAuth());
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
  }
}
