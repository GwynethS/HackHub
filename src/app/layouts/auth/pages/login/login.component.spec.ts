import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MockProvider } from 'ng-mocks';
import { AuthService } from '../../auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SharedModule, ReactiveFormsModule],
      providers: [MockProvider(AuthService)]
    })
    .compileComponents();
    
    component = TestBed.createComponent(LoginComponent).componentInstance;
  });

  it('LoginComponent debe estar definido', () => {
    expect(component).toBeTruthy();
  });

  it('El email y la contraseña del formulario deben ser campos requeridos', () => {
    expect(component.loginForm.get('email')?.hasValidator(Validators.required)).toBeTrue();
    expect(component.loginForm.get('password')?.hasValidator(Validators.required)).toBeTrue();
  });

  it('Se debe evitar el envío de un formulario inválido y marcar los campos con error', () => {
    component.loginForm.patchValue({
      email: '',
      password: ''
    })

    expect(component.loginForm.invalid).toBeTrue();

    const spyOnMarkAllAsTouched = spyOn(component.loginForm, 'markAllAsTouched');

    component.onSubmit();
    expect(spyOnMarkAllAsTouched).toHaveBeenCalled();
  });
});
