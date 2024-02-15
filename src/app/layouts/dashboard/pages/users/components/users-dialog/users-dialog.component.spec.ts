import { TestBed } from '@angular/core/testing';

import { UsersDialogComponent } from './users-dialog.component';
import { SharedModule } from '../../../../../../shared/shared.module';
import { MockProvider } from 'ng-mocks';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators } from '@angular/forms';

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

  it('El firstNme, lastName, email, password y role del formulario deben ser campos requeridos', () => {
    expect(component.userForm.get('firstName')?.hasValidator(Validators.required)).toBeTrue();
    expect(component.userForm.get('lastName')?.hasValidator(Validators.required)).toBeTrue();
    expect(component.userForm.get('email')?.hasValidator(Validators.required)).toBeTrue();
    expect(component.userForm.get('password')?.hasValidator(Validators.required)).toBeTrue();
    expect(component.userForm.get('role')?.hasValidator(Validators.required)).toBeTrue();
  });

  it('Se debe evitar el envío de un formulario inválido y marcar los campos con error', () => {
    component.userForm.patchValue({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: ''
    })

    expect(component.userForm.invalid).toBeTrue();

    const spyOnMarkAllAsTouched = spyOn(component.userForm, 'markAllAsTouched');

    component.onCreate();
    expect(spyOnMarkAllAsTouched).toHaveBeenCalled();
  });

  it('El método onClearInputs() debe resetear los campos del formualrio', () => {
    const spyOnReset = spyOn(component.userForm, 'reset');

    component.onClearInputs();
    expect(spyOnReset).toHaveBeenCalled();
  })
});
