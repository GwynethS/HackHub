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

  getEnrollmentsByCourseId(courseId: number){
    return of(enrollments.filter((enrollments) => enrollments.courseId === courseId)).pipe(delay(500));
  }

  getEnrollmentsByStudentId(studentId: number){
    return of(enrollments.filter((enrollments) => enrollments.studentId === studentId)).pipe(delay(500));
  }

  createEnrollment(enrollmentData: Enrollment){
    enrollments = [...enrollments, {...enrollmentData, id: enrollments.length + 1, enrollmentDate: new Date()}];

    return this.getEnrollments();
  }

  deleteEnrollmentById(id: number){
    enrollments = enrollments.filter((enrollment) => enrollment.id !== id);

    return this.getEnrollments();
  }

  deleteEnrollmentsByCourseId(courseId: number){
    enrollments = enrollments.filter((enrollments) => enrollments.courseId !== courseId);
  }

  deleteEnrollmentsByStudentId(studentId: number){
    enrollments = enrollments.filter((enrollments) => enrollments.studentId !== studentId);
  }

  deleteEnrollmentByStudentAndCourseId(studentId: number, courseId: number){
    enrollments = enrollments.filter((enrollments) => !(enrollments.studentId === studentId && enrollments.courseId === courseId));
  }

  updateEnrollment(id: number, updateData: Enrollment){
    enrollments = enrollments.map((enrollment) => enrollment.id === id ? {...enrollment, ...updateData, enrollmentDate: new Date()} : enrollment);

    return this.getEnrollments();
  }
}
