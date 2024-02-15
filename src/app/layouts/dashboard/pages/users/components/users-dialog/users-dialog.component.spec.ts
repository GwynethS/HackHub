import { TestBed } from '@angular/core/testing';

import { UsersDialogComponent } from './users-dialog.component';
import { SharedModule } from '../../../../../../shared/shared.module';
import { MockProvider } from 'ng-mocks';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('UsersDialogComponent', () => {
  let component: UsersDialogComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [MockProvider(MatDialogRef), {provide: MAT_DIALOG_DATA, useValue: {} }]
    })
    .compileComponents();
    
    component = TestBed.createComponent(UsersDialogComponent).componentInstance;
  });

  it('UsersDialogComponent debe estar definido', () => {
    expect(component).toBeTruthy();
  });
});
