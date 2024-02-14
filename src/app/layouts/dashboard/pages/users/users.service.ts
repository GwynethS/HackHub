import { Injectable } from '@angular/core';
import { User } from './models/user';
import { Observable, delay, mergeMap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  generateString(length: number) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  getUsers() {
    return this.httpClient.get<User[]>(`${environment.apiURL}/users`);
  }

  getUserById(id: number): Observable<User | undefined> {
    return this.httpClient.get<User>(`${environment.apiURL}/users/${id}`);
  }

  createUser(userData: User) {
    return this.httpClient
      .post<User>(`${environment.apiURL}/users`, {
        ...userData,
        token: this.generateString(10),
      })
      .pipe(mergeMap(() => this.getUsers()));
  }

  deleteUserById(id: number) {
    return this.httpClient
      .delete<User>(`${environment.apiURL}/users/${id}`)
      .pipe(mergeMap(() => this.getUsers()));
  }

  updateUser(id: number, updateData: User){
    return this.getUserById(id).pipe(
      mergeMap((existingUser) => {
        const updatedUser: User = {
          ...existingUser,
          ...updateData,
        };

        return this.httpClient.put<User>(
          `${environment.apiURL}/users/${id}`,
          updatedUser
        );
      }),
      mergeMap(() => this.getUsers())
    );
  }
}
