import { Injectable } from '@angular/core';
import { delay, finalize, of } from 'rxjs';
import { Student } from './models/student';

let students: Student[] = [
  {
    id: 1,
    firstName: 'Gwyneth',
    lastName: 'Segura',
    email: 'gwyneth@gmail.com'
  }
]

@Injectable()
export class StudentsService {

  constructor() { }

  getStudents(){
    return of(students).pipe(
      delay(500)
    );
  }

  getStudentById(id: number){
    return of(students.find((student) => student.id === id)).pipe(delay(500));
  }

  createStudent(studentData: Student){
    students = [...students, {...studentData, id: students.length + 1}];

    return this.getStudents();
  }

  deleteStudentById(id: number){
    students = students.filter((student) => student.id !== id);

    return this.getStudents();
  }

  updateStudent(id: number, updateData: Student){
    students = students.map((student) => student.id === id ? {...student, ...updateData} : student);

    return this.getStudents();
  }
}