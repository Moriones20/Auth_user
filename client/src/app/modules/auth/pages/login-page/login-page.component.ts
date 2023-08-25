import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@core/models/user/user.interface';
import { Store } from '@ngrx/store';
import { loadingAuth } from '@store/actions/auth.actions';
import { loadingLogin } from '@store/actions/login.actions';
import { selectIsAuth, selectLoading } from '@store/selectors/auth.selectors';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  private readonly URL = environment.user_service;
  loading$: Observable<boolean> = new Observable();
  isAuth$: Observable<boolean> = new Observable();
  loginForm: FormGroup = new FormGroup({});
  userData: User | any;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading);

    this.store.dispatch(loadingAuth());
    this.isAuth$ = this.store.select(selectIsAuth);

    this.isAuth$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate(['/home']);
      }
    });

    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');

    this.loginForm = this.formBuilder.group({
      email: [
        this.userData.email || '',
        [Validators.required, Validators.email],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      const user = { email, password };

      this.store.dispatch(loadingLogin({ user }));
    }
  }

  loginGoogle() {
    window.location.href = `${this.URL}/auth/google`;
  }

  loginFacebook() {
    window.location.href = `${this.URL}/auth/facebook`;
  }
}
