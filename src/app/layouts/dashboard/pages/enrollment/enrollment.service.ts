import { Injectable } from '@angular/core';
import { Enrollment } from './models/enrollment';
import { delay, of } from 'rxjs';

let enrollments: Enrollment[] = [
  {
    id: 1,
    studentId: 1,
    courseId: 1,
    enrollmentDate: new Date()
  }
];

@Injectable()
export class EnrollmentService {

  constructor() { }

  getEnrollments(){
    return of(enrollments).pipe(
      delay(500)
    )
  }

  getEnrollmentById(id: number){
    return of(enrollments.find((enrollment) => enrollment.id === id)).pipe(delay(500));
  }

  createEnrollment(enrollmentData: Enrollment){
    enrollments = [...enrollments, {...enrollmentData, id: enrollments.length + 1, enrollmentDate: new Date()}];

    return this.getEnrollments();
  }

  deleteEnrollmentById(id: number){
    enrollments = enrollments.filter((enrollment) => enrollment.id !== id);

    return this.getEnrollments();
  }

  updateEnrollment(id: number, updateData: Enrollment){
    enrollments = enrollments.map((enrollment) => enrollment.id === id ? {...enrollment, ...updateData, enrollmentDate: new Date()} : enrollment);

    return this.getEnrollments();
  }
}
