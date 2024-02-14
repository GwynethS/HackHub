import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../dashboard/pages/users/models/user';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

interface LoginData {
  email: null | string;
  password: null | string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUser: User | null = null;
  constructor(private router: Router, private httpClient: HttpClient) {}

  private setAuthUser(user: User): void{
    this.authUser = user;
    localStorage.setItem('token', user.token);
  }

  logIn(data: LoginData): Observable<User[]>{
    return this.httpClient.get<User[]>(`${environment.apiURL}/users?email=${data.email}&password=${data.password}`).pipe(tap((response) => {
      if(response.length){
        this.setAuthUser(response[0]);
        this.router.navigate(['dashboard']);
      }else{
        alert('El email o la contraseña son incorrectos');
      }
    }))
  }

  logOut(): void{
    this.authUser = null;
    this.router.navigate(['auth', 'login']);
    localStorage.removeItem('token');
  }

  verifyToken(){
    return this.httpClient.get<User[]>(`${environment.apiURL}/users?token=${localStorage.getItem('token')}`).pipe(map((response) => {
      if(response.length){
        this.setAuthUser(response[0]);
        return true;
      }else{
        this.authUser = null;
        localStorage.removeItem('token');
        return false;
      }
    }))
  }
}
