import { Injectable } from '@angular/core';
import { Observable, delay, finalize, map, of } from 'rxjs';
import { Student } from './models/student';
import { EnrollmentService } from '../enrollment/enrollment.service';

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

  constructor(private enrollmentService : EnrollmentService) { }

  getStudents(){
    return of(students).pipe(
      delay(500)
    );
  }

  getStudentById(id: number){
    return of(students.find((student) => student.id === id)).pipe(delay(500));
  }

  getStudentsByCourse(courseId: number){
    return this.enrollmentService.getEnrollmentsByCourseId(courseId).pipe(
      map(enrollments => {
        if (enrollments.length !== 0) {
          return students.filter(student => enrollments.some(enrollment => enrollment.studentId === student.id));
        } else {
          return [];
        }
      })
    );
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
