import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadingAuth } from '@store/actions/auth.actions';
import { loadingRegister } from '@store/actions/register.actions';
import { selectIsAuth } from '@store/selectors/login.selectors';
import { selectLoading } from '@store/selectors/register.selectors';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  private readonly URL = environment.user_service;
  loading$: Observable<boolean> = new Observable();
  isAuth$: Observable<boolean> = new Observable();
  registerForm: FormGroup = new FormGroup({});
  userData: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<any>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadingAuth());
    this.loading$ = this.store.select(selectLoading);
    this.isAuth$ = this.store.select(selectIsAuth);

    this.isAuth$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate(['/home']);
      }
    });

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
    if (this.registerForm.valid) {
      const name = this.registerForm.value.name;
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;
      const user = { name, email, password };

      this.store.dispatch(loadingRegister({ user }));
    }
  }

  loginGoogle() {
    window.location.href = `${this.URL}/auth/google`;
  }

  loginFacebook() {
    window.location.href = `${this.URL}/auth/facebook`;
  }
}
