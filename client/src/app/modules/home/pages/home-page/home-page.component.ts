import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadingAuth } from '@store/actions/auth.actions';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.dispatch(loadingAuth());
  }
}
