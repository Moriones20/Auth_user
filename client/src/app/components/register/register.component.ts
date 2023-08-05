import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/auth/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  URL_BACK: string = 'http://localhost:3001';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
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

      this.authService.register(user).subscribe({
        next: (resp) => {
          if (resp.statusCode == 201) {
            localStorage.setItem('userData', JSON.stringify(resp.user));
            this.router.navigate(['/login']);
          } else {
            alert(resp.message);
          }
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
    }
  }

  loginGoogle() {
    window.location.href = `${this.URL_BACK}/auth/google`;
  }

  loginFacebook() {
    window.location.href = `${this.URL_BACK}/auth/facebook`;
  }
}
