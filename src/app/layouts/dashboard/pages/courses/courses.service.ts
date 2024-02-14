import { Injectable } from '@angular/core';
import { Course } from './models/course';
import { forkJoin, mergeMap, of, switchMap } from 'rxjs';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class CoursesService {
  constructor(
    private enrollmentService: EnrollmentService,
    private httpClient: HttpClient
  ) {}

  getCourses() {
    return this.httpClient.get<Course[]>(`${environment.apiURL}/courses`);
  }

  getCourseById(id: number) {
    return this.httpClient.get<Course>(`${environment.apiURL}/courses/${id}`);
  }

  getCoursesByStudent(studentId: number) {
    return this.enrollmentService.getEnrollmentsByStudentId(studentId).pipe(
      switchMap((enrollments) => {
        const courseIds = enrollments.map(enrollment => enrollment.courseId);
  
        if (courseIds.length !== 0) {
          const requests = courseIds.map(id =>
            this.httpClient.get<Course>(`${environment.apiURL}/courses/${id}`)
          );
  
          return forkJoin(requests);
        } else {
          return of([]);
        }
      })
    );
  }

  createCourse(courseData: Course) {
    return this.httpClient
      .post<Course>(`${environment.apiURL}/courses`, courseData)
      .pipe(mergeMap(() => this.getCourses()));
  }

  deleteCourseById(id: number) {
    return this.enrollmentService.deleteEnrollmentsByCourseId(id).pipe(
      mergeMap(() =>
        this.httpClient.delete<Course>(`${environment.apiURL}/courses/${id}`)
      ),
      mergeMap(() => this.getCourses())
    );
  }

  updateCourse(id: number, updateData: Course) {
    return this.httpClient.put<Course>(
      `${environment.apiURL}/courses/${id}`,
      updateData
    ).pipe(mergeMap(() => this.getCourses()));
  }
}
