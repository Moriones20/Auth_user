import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadingLogin } from '@store/actions/login.actions';
import { selectIsAuth, selectLoading } from '@store/selectors/login.selectors';
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
  userData: any;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.store.select(selectIsAuth);
    if (this.isAuth$) {
      this.router.navigate(['/home']);
    }

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
    this.loading$ = this.store.select(selectLoading);
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
