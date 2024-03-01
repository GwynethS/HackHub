import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorsFeedback',
})
export class ErrorsFeedbackPipe implements PipeTransform {
  transform(errors?: ValidationErrors | null, ...args: unknown[]): unknown {
    if (!!errors) {
      let messages = [];

      if (errors['required']) messages.push('Este campo es requerido');
      if (errors['email']) messages.push('Ingrese un email válido');
      if (errors['minlength'])
        messages.push(
          `Al menos ${errors['minlength'].requiredLength} caracteres`
        );
      if (errors['pattern']) {
        let pattern = errors['pattern']['requiredPattern'];
        switch (pattern) {
          case '^[a-zA-Z]*$':
            messages.push('Solo debe contener letras');
            break;
          case '^[a-zA-Z\\s]*$':
            messages.push('Solo debe contener letras');
            break;
          default:
            break;
        }
      }

      return messages.join('. ') + '.';
    }
    return null;
  }
}
