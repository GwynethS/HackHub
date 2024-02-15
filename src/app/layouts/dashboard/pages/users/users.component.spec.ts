import { TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { SharedModule } from '../../../../shared/shared.module';
import { MockProvider } from 'ng-mocks';
import { UsersService } from './users.service';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { AuthService } from '../../../auth/auth.service';

describe('UsersComponent', () => {
  let component: UsersComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent, UsersTableComponent],
      imports: [SharedModule],
      providers: [MockProvider(UsersService), MockProvider(AuthService)]
    })
    .compileComponents();
    
    component = TestBed.createComponent(UsersComponent).componentInstance;
  });

  it('UsersComponent debe estar definido', () => {
    expect(component).toBeTruthy();
  });
});
