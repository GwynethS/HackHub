import { Injectable } from '@angular/core';
import { forkJoin, mergeMap, of, switchMap } from 'rxjs';
import { Student } from './models/student';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

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
    return this.httpClient.get<Student>(`${environment.apiURL}/students/${id}`);
  }

  getStudentsByCourse(courseId: number) {
    return this.enrollmentService.getEnrollmentsByCourseId(courseId).pipe(
      switchMap((enrollments) => {
        const studentIds = enrollments.map(
          (enrollment) => enrollment.studentId
        );

        if (studentIds.length !== 0) {
          const requests = studentIds.map((id) =>
            this.httpClient.get<Student>(`${environment.apiURL}/students/${id}`)
          );

          return forkJoin(requests);
        } else {
          return of([]);
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
    return this.enrollmentService.deleteEnrollmentsByStudentId(id).pipe(
      mergeMap(() =>
        this.httpClient.delete<Student>(`${environment.apiURL}/students/${id}`)
      ),
      mergeMap(() => this.getStudents())
    );
  }

  updateStudent(id: number, updateData: Student) {
    return this.httpClient
      .put<Student>(`${environment.apiURL}/students/${id}`, updateData)
      .pipe(mergeMap(() => this.getStudents()));
  }
}
