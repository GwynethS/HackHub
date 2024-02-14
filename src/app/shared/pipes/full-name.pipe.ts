import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../../layouts/dashboard/pages/students/models/student';
import { User } from '../../layouts/dashboard/pages/users/models/user';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: Student | User | null, ...args: unknown[]): unknown {
    if(value){
      return value.firstName + ' ' + value.lastName;
    }else{
      return 'Nombre';
    }
  }

}
