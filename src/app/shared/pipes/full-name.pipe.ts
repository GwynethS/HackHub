import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../../layouts/dashboard/pages/students/models/student';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: Student, ...args: unknown[]): unknown {
    return value.firstName + ' ' + value.lastName;
  }

}
