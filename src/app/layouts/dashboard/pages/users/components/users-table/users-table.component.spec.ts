import { TestBed } from '@angular/core/testing';

import { UsersTableComponent } from './users-table.component';
import { SharedModule } from '../../../../../../shared/shared.module';

describe('UsersTableComponent', () => {
  let component: UsersTableComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
    })
    .compileComponents();
    
    component = TestBed.createComponent(UsersTableComponent).componentInstance;
  });

  it('UsersTableComponent debe estar definido', () => {
    expect(component).toBeTruthy();
  });
});
