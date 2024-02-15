import { TestBed, tick } from '@angular/core/testing';

import { UsersService } from './users.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { User } from './models/user';

describe('UsersService', () => {
  let service: UsersService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });
    service = TestBed.inject(UsersService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('UsersService debe estar definido', () => {
    expect(service).toBeTruthy();
  });

  it('El método getUsers() debe retornar los usuarios del archivo db.json', () => {
    const MOCK_RESPONSE: User[] = [
      {
        id: 10,
        firstName: 'MOCKNAME',
        lastName: 'MOCKLASTNAME',
        email: 'mock@mail.com',
        password: 'password',
        role: 'ADMIN',
        token: 'askdlak135a4',
      },
    ];

    service.getUsers().subscribe({
      next: (users) => {
        expect(users).toEqual(MOCK_RESPONSE);
      },
    });

    httpController
      .expectOne({
        url: 'http://localhost:3000/users',
        method: 'GET',
      })
      .flush(MOCK_RESPONSE);
  });

  it('El método createUser() debe crear un usuario y asignarle un token', () => {
    const MOCK_DATA: User = {
      id: 10,
      firstName: 'MOCKNAME',
      lastName: 'MOCKLASTNAME',
      email: 'mock@mail.com',
      password: 'password',
      role: 'ADMIN',
      token: '',
    };

    service.createUser(MOCK_DATA).subscribe({
      next: (users) => {
        expect(users).toContain(MOCK_DATA);
      },
    });

    const req = httpController.expectOne({
      url: 'http://localhost:3000/users',
      method: 'POST',
    });

    expect(req.request.body).toEqual({
      ...MOCK_DATA,
      token: jasmine.any(String),
    });
    req.flush(MOCK_DATA);
  });
});
