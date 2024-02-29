import { Injectable } from '@angular/core';
import { Course } from './models/course';
import { mergeMap, of, map, catchError } from 'rxjs';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Enrollment } from '../enrollment/models/enrollment';

@Injectable()
export class CoursesService {
  constructor(
    private enrollmentService: EnrollmentService,
    private httpClient: HttpClient
  ) {}

  getCourses() {
    return this.httpClient.get<Course[]>(`${environment.apiURL}/courses`);
  }

  getCourseById(id: string) {
    return this.httpClient.get<Course>(`${environment.apiURL}/courses/${id}`);
  }

  getCoursesByStudent(studentId: string) {
    return this.httpClient
      .get<Enrollment[]>(
        `${environment.apiURL}/enrollments?_embed=course&studentId=${studentId}`
      )
      .pipe(map((enrollments) => enrollments.map(({ course }) => course)), catchError(() => of([])));
  }

  createCourse(courseData: Course) {
    return this.httpClient
      .post<Course>(`${environment.apiURL}/courses`, courseData)
      .pipe(mergeMap(() => this.getCourses()));
  }

  deleteCourseById(id: string) {
    return this.enrollmentService.deleteEnrollmentsByCourseId(id).pipe(
      mergeMap(() =>
        this.httpClient.delete<Course>(`${environment.apiURL}/courses/${id}`)
      ),
      mergeMap(() => this.getCourses())
    );
  }

  updateCourse(id: string, updateData: Course) {
    return this.httpClient
      .put<Course>(`${environment.apiURL}/courses/${id}`, updateData)
      .pipe(mergeMap(() => this.getCourses()));
  }
}
