import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  private readonly URL = environment.user_service;
  registerForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private router: Router) {}

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

      console.log(`${name} and ${password} and ${email}`);
    }
  }

  loginGoogle() {
    window.location.href = `${this.URL}/auth/google`;
  }

  loginFacebook() {
    window.location.href = `${this.URL}/auth/facebook`;
  }
}
