
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showPassword = false;
  errorMessage = '';

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {

    const savedData = localStorage.getItem('zentroUsers');

    if (!savedData) {
      this.errorMessage = 'Please register first.';
      return;
    }

    const users = JSON.parse(savedData);

    const email = this.loginForm.get('email')?.value?.trim().toLowerCase();
    const password = this.loginForm.get('password')?.value;

    const registeredUser = users.find(
      (user: any) =>
        user.email?.trim().toLowerCase() === email
    );

    if (!registeredUser) {
      this.errorMessage = 'Email not registered.';
      return;
    }

    if (password !== registeredUser.password) {
      this.errorMessage = 'Incorrect password.';
      return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    this.router.navigate(['/products']);
  }
}
