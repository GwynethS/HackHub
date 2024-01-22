import { Component } from '@angular/core';
import { Student } from './models/student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
  dataSource: Student[] = [
    {
      id: 1,
      firstName: 'Gwyneth',
      lastName: 'Segura',
      email: 'gwyneth@gmail.com'
    }
  ]
  onStudentSubmitted(ev: Student){
    this.dataSource = [...this.dataSource, {...ev, id: this.dataSource.length + 1}]
  }
}
