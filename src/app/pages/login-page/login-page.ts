/* =====================================================================
   FILE: pages/login-page/login-page.ts
   FIGMA: "Student login". Left: photo card. Right: the form.
   ===================================================================== */

import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  // STEP 1: ReactiveFormsModule gives the template [formGroup] and
  // formControlName. COMMON MISTAKE: forgetting it gives the error
  // "Can't bind to 'formGroup' since it isn't a known property of 'form'".
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  // STEP 2: The form MODEL. One FormControl per field: [start value, validators].
  // NonNullableFormBuilder makes reset() go back to '' instead of null.
  protected readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    remember: [false],
  });

  // STEP 3: Small signals for what the screen needs to remember.
  protected readonly showPassword = signal(false);
  protected readonly submitting = signal(false);
  protected readonly errorMessage = signal('');

  // Shortcuts so the template can say email.touched instead of form.controls.email.touched.
  protected get email() {
    return this.form.controls.email;
  }
  protected get password() {
    return this.form.controls.password;
  }

  protected onSubmit(): void {
    // STEP 4: Never send an invalid form. markAllAsTouched() makes every
    // error message appear at once, so the student sees what is wrong.
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set('');

    // STEP 5: getRawValue() returns { email, password, remember }.
    // The server answers with Set-Cookie. The browser stores the cookie.
    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => this.router.navigateByUrl('/profile'),
      error: (err: HttpErrorResponse) => {
        this.submitting.set(false);
        // The mock server sends { message: 'Wrong username or password' }.
        this.errorMessage.set(err.error?.message ?? 'Something went wrong. Please try again.');
      },
    });
  }
}
