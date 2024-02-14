import { Injectable } from '@angular/core';
import { User } from './models/user';
import { delay, of } from 'rxjs';

let users: User[] = [
  {
    id: 1,
    firstName: 'Lyu',
    lastName: 'Segura',
    email: 'lyu@gmail.com',
    password: '123456',
    role: 'ADMIN',
    token: 'ksjdfhkjah'
  },
  {
    id: 2,
    firstName: 'Jean',
    lastName: 'Achamizo',
    email: 'jean@gmail.com',
    password: '123456',
    role: 'USER',
    token: 'ladkajlsk'
  }
]

@Injectable()
export class UsersService {

  constructor() { }

  getUsers(){
    return of(users).pipe(
      delay(500)
    );
  }

  createUser(userData: User){
    users = [...users, {...userData, id: users.length + 1}];

    return this.getUsers();
  }

  deleteUserById(id: number){
    users = users.filter((user) => user.id !== id);

    return this.getUsers();
  }

  updateUser(id: number, updateData: User){
    users = users.map((user) => user.id === id ? {...user, ...updateData} : user);

    return this.getUsers();
  }
}
