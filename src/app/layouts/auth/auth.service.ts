import { Injectable } from '@angular/core';

interface LoginData {
  email: null | string,
  password: null | string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // private setAuthUser(user: U)
}
