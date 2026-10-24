
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

function passwordMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null;
  }

  return password === confirmPassword
    ? null
    : { passwordMismatch: true };
}

interface RegisterUser {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  showPassword = false;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private route : Router) {}

  registerForm = this.fb.group(
    {
      fullName: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      confirmPassword: ['', Validators.required]
    },
    {
      validators: passwordMatchValidator
    }
  );

  get f() {
    return this.registerForm.controls;
  }

  register(): void {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { fullName, email, phone, password } =
      this.registerForm.getRawValue();

    if (!fullName || !email || !phone || !password) {
      return;
    }

    try {
      const storedData = localStorage.getItem('zentroUsers');

      const users: RegisterUser[] = storedData
        ? JSON.parse(storedData)
        : [];

      const normalizedEmail = email.trim().toLowerCase();

      const emailExists = users.some(
        user => user.email.toLowerCase() === normalizedEmail
      );

      if (emailExists) {
        this.errorMessage =
          'Email already registered. Please sign in.';
        return;
      }

      const newUser: RegisterUser = {
        fullName: fullName.trim(),
        email: normalizedEmail,
        phone,
        password
      };

      users.push(newUser);

      localStorage.setItem(
        'zentroUsers',
        JSON.stringify(users)
      );

      this.successMessage =
        'Account created successfully! You can now sign in.';
this.route.navigate(['/login']);
      this.registerForm.reset();
      this.submitted = false;

    } catch (error) {
      this.errorMessage =
        'Unable to save account. Please try again.';
      console.error('Registration error:', error);
    }
  }
}
