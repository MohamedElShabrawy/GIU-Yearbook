import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  studentId: number;
  name: string;
}

export interface LoginPayload {
  email: string;
  password: string;
  remember?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  // Switch between mock-api and real backend automatically
  private baseUrl = environment.useMockApi ? '/mock-api' : `${environment.apiUrl}/auth`;

  // Signal holding the signed-in user state
  readonly currentUser = signal<User | null>(null);

  /**
   * STEP 1: Login
   * POST /mock-api/login
   * Expects: { email, password, remember }
   */
  login(credentials: LoginPayload): Observable<User> {
    return this.http
      .post<User>(`${this.baseUrl}/login`, credentials, {
        withCredentials: true, // IMPORTANT: Allows browser to store the HttpOnly cookie
      })
      .pipe(tap((user) => this.currentUser.set(user)));
  }

  /**
   * STEP 2: Check current session ("Who am I?")
   * GET /mock-api/me
   */
  checkSession(): Observable<User> {
    return this.http
      .get<User>(`${this.baseUrl}/me`, {
        withCredentials: true, // Sends the HttpOnly session cookie back to the server
      })
      .pipe(
        tap({
          next: (user) => this.currentUser.set(user),
          error: () => this.currentUser.set(null),
        }),
      );
  }

  /**
   * STEP 3: Logout
   * POST /mock-api/logout
   */
  logout(): Observable<void> {
    return this.http
      .post<void>(
        `${this.baseUrl}/logout`,
        {},
        {
          withCredentials: true,
        },
      )
      .pipe(tap(() => this.currentUser.set(null)));
  }
}
