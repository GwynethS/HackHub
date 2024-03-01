import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../dashboard/pages/users/models/user';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { AuthAction } from '../../core/store/auth/actions';
import { AlertService } from '../../core/services/alert.service';

interface LoginData {
  email: null | string;
  password: null | string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUser: User | null = null;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private store: Store,
    private alertService: AlertService
  ) {}

  private setAuthUser(user: User): void {
    this.store.dispatch(AuthAction.setAuthUser({ user }));
    localStorage.setItem('token', user.token);
  }

  logIn(data: LoginData): Observable<User[]> {
    return this.httpClient
      .get<User[]>(
        `${environment.apiURL}/users?email=${data.email}&password=${data.password}`
      )
      .pipe(
        tap((response) => {
          if (response.length) {
            this.setAuthUser(response[0]);
            this.router.navigate(['dashboard']);
          } else {
            this.alertService.showError(
              'No se pudo iniciar sesión',
              'El email o la constraseña son incorrectos'
            );
          }
        })
      );
  }

  logOut(): void {
    this.store.dispatch(AuthAction.logout());
    this.router.navigate(['auth', 'login']);
    localStorage.removeItem('token');
  }

  verifyToken() {
    return this.httpClient
      .get<User[]>(
        `${environment.apiURL}/users?token=${localStorage.getItem('token')}`
      )
      .pipe(
        map((response) => {
          if (response.length) {
            this.setAuthUser(response[0]);
            return true;
          } else {
            this.store.dispatch(AuthAction.logout());
            localStorage.removeItem('token');
            return false;
          }
        }),
        catchError(() => of(false))
      );
  }
}
