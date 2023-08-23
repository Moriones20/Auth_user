import { Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { Store } from '@ngrx/store';
import { logoutDone } from '@store/actions/logout.actions';
import { selectIsAuth } from '@store/selectors/login.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuth$: Observable<boolean> = new Observable();

  constructor(private store: Store<any>, private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuth$ = this.store.select(selectIsAuth);
  }

  logout() {
    this.store.dispatch(logoutDone());
    this.authService.logout();
  }
}
