import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { User } from '../dashboard/pages/users/models/user';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, { provide: Router, useValue: spy }],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('AuthService debe estar definido', () => {
    expect(service).toBeTruthy();
  });

  it('El méotod logIn() debe asignar un usuario a la propiedad authUser', () => {
    const MOCK_RESPONSE: User[] = [{
      id: 10,
      firstName: 'MOCKNAME',
      lastName: 'MOCKLASTNAME',
      email: 'mock@mail.com',
      password: 'password',
      role: 'ADMIN',
      token: 'askdlak135a4',
    }];

    service.logIn({ email: 'mock@mail.com', password: 'password' }).subscribe({
      next: () => {
        expect(service.authUser).toBeTruthy();
        expect(service.authUser).toEqual(MOCK_RESPONSE[0]);
      },
    });

    httpController
      .expectOne({
        url: 'http://localhost:3000/users?email=mock@mail.com&password=password',
        method: 'GET',
      })
      .flush(MOCK_RESPONSE);
  });

  it('El método logOut() debe cerrar la sesión del usuario, eliminar el token y redirigirlo al logIn', () => {
    service.authUser = {
      id: 10,
      firstName: 'MOCKNAME',
      lastName: 'MOCKLASTNAME',
      email: 'mock@mail.com',
      password: 'password',
      role: 'ADMIN',
      token: 'askdlak135a4',
    } 

    service.logOut();

    expect(service.authUser).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['auth', 'login']);
    expect(localStorage.getItem('token')).toBeNull();
  });

  
  it('El método verifyToken() debe verificar un token válido', () => {
    const MOCK_RESPONSE: User[] = [{
      id: 10,
      firstName: 'MOCKNAME',
      lastName: 'MOCKLASTNAME',
      email: 'mock@mail.com',
      password: 'password',
      role: 'ADMIN',
      token: 'askdlak135a4',
    }];

    service.verifyToken().subscribe((result) => {
      expect(result).toBeTruthy();
      expect(service.authUser).toEqual(MOCK_RESPONSE[0]);
    });

    const req = httpController.expectOne(
      `http://localhost:3000/users?token=${localStorage.getItem('token')}`
    );
    req.flush(MOCK_RESPONSE);
  });

  it('El método verifyToken() debe detectar un token inválido', () => {
    const MOCK_RESPONSE: User[] = [];

    service.verifyToken().subscribe((result) => {
      expect(result).toBeFalsy();
      expect(service.authUser).toBeNull();
      expect(localStorage.getItem('token')).toBeNull();
    });

    const req = httpController.expectOne(
      `http://localhost:3000/users?token=${localStorage.getItem('token')}`
    );
    req.flush(MOCK_RESPONSE);
  });
});
