
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  loginForm: FormGroup;

  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {

    if (this.loginForm.invalid || this.isLoading) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const savedData = localStorage.getItem('zentroUsers');

    if (!savedData) {
      this.errorMessage = 'Account not found. Please register first.';
      return;
    }

    const users = JSON.parse(savedData);

    const email = this.loginForm.get('email')?.value
      ?.trim()
      .toLowerCase();

    const password = this.loginForm.get('password')?.value;

    const registeredUser = users.find((user: any) =>
      user.email?.trim().toLowerCase() === email
    );

    if (!registeredUser) {
      this.errorMessage = 'Account not found. Please register first.';
      return;
    }

    if (password !== registeredUser.password) {
      this.errorMessage = 'Incorrect password. Please try again.';
      return;
    }

    // Successful Login
    this.errorMessage = '';
    this.isLoading = true;

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loggedInEmail', registeredUser.email);

    // 2 Seconds Loading
    setTimeout(() => {
      this.router.navigate(['/products']);
    }, 2000);
  }
}
