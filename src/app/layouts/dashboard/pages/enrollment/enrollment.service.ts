import { Injectable } from '@angular/core';
import { CreateEnrollmentData, Enrollment } from './models/enrollment';
import {
  Observable,
  forkJoin,
  from,
  mapTo,
  mergeAll,
  mergeMap,
  of,
  switchMap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class EnrollmentService {
  constructor(private httpClient: HttpClient) {}

  getEnrollments() {
    return this.httpClient.get<Enrollment[]>(
      `${environment.apiURL}/enrollments`
    );
  }

  getEnrollmentsByCourseId(courseId: string) {
    return this.httpClient.get<Enrollment[]>(
      `${environment.apiURL}/enrollments?courseId=${courseId}`
    );
  }

  getEnrollmentsByStudentId(studentId: string) {
    return this.httpClient.get<Enrollment[]>(
      `${environment.apiURL}/enrollments?studentId=${studentId}`
    );
  }

  createEnrollment(enrollmentData: CreateEnrollmentData) {
    return this.httpClient.post<Enrollment>(
      `${environment.apiURL}/enrollments`,
      {
        ...enrollmentData,
        enrollmentDate: new Date(),
      }
    );
    // .pipe(mergeMap(() => this.getEnrollments()));
  }

  deleteEnrollmentById(id: string) {
    return this.httpClient.delete<Enrollment>(
      `${environment.apiURL}/enrollments/${id}`
    );
  }

  deleteEnrollmentsByCourseId(courseId: string) {
    return this.getEnrollmentsByCourseId(courseId).pipe(
      mergeMap((enrollments) => {
        if (enrollments.length) {
          const deletedEnrollments = enrollments.map((enrollment) =>
            this.httpClient.delete<Enrollment>(
              `${environment.apiURL}/enrollments/${enrollment.id}`
            )
          );
          return forkJoin(deletedEnrollments);
        }
        return of(null);
      })
    );
  }

  deleteEnrollmentsByStudentId(studentId: string) {
    return this.getEnrollmentsByStudentId(studentId).pipe(
      mergeMap((enrollments) => {
        if (enrollments.length) {
          const deletedEnrollments = enrollments.map((enrollment) =>
            this.httpClient.delete<Enrollment>(
              `${environment.apiURL}/enrollments/${enrollment.id}`
            )
          );
          return forkJoin(deletedEnrollments);
        }
        return of(null);
      })
    );
  }

  deleteEnrollmentByStudentAndCourseId(studentId: string, courseId: string) {
    return this.httpClient
      .get<Enrollment[]>(
        `${environment.apiURL}/enrollments?studentId=${studentId}&courseId=${courseId}`
      )
      .pipe(
        switchMap((enrollments) => {
          if (enrollments.length) {
            console.log(enrollments[0]);
            return this.httpClient.delete<Enrollment>(
              `${environment.apiURL}/enrollments/${enrollments[0].id}`
            );
          } else {
            return of(null);
          }
        })
      );
  }

  updateEnrollment(id: string, updateData: CreateEnrollmentData) {
    return this.httpClient.put<Enrollment>(
      `${environment.apiURL}/enrollments/${id}`,
      {
        ...updateData,
        enrollmentDate: new Date(),
      }
    );
  }
}
