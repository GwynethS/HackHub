import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs';
import { Student } from './models/student';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

let students: Student[] = [
  {
    id: 1,
    firstName: 'Gwyneth',
    lastName: 'Segura',
    email: 'gwyneth@gmail.com',
  },
  {
    id: 2,
    firstName: 'Deyvid',
    lastName: 'Guevara',
    email: 'deyvidguevara@gmail.com',
  },
];

@Injectable()
export class StudentsService {
  constructor(
    private enrollmentService: EnrollmentService,
    private httpClient: HttpClient
  ) {}

  getStudents() {
    return this.httpClient.get<Student[]>(`${environment.apiURL}/students`);
  }

  getStudentById(id: number) {
    return this.httpClient.get<Student>(
      `${environment.apiURL}/students/${id}`
    );
  }

  getStudentsByCourse(courseId: number) {
    return this.enrollmentService.getEnrollmentsByCourseId(courseId).pipe(
      map((enrollments) => {
        if (enrollments.length !== 0) {
          return students.filter((student) =>
            enrollments.some(
              (enrollment) => enrollment.studentId === student.id
            )
          );
        } else {
          return [];
        }
      })
    );
  }

  createStudent(studentData: Student) {
    return this.httpClient
      .post<Student>(`${environment.apiURL}/students`, studentData)
      .pipe(mergeMap(() => this.getStudents()));
  }

  deleteStudentById(id: number) {
    return this.httpClient
      .delete<Student>(`${environment.apiURL}/students/${id}`)
      .pipe(mergeMap(() => this.getStudents()));

    return this.getStudents();
  }

  updateStudent(id: number, updateData: Student) {
    return this.httpClient.put<Student>(
      `${environment.apiURL}/students/${id}`,
      updateData
    ).pipe(mergeMap(() => this.getStudents()));
  }
}
