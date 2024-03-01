import { Injectable } from '@angular/core';
import { Course } from './models/course';
import { mergeMap, of, map, catchError, finalize, concatMap } from 'rxjs';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Enrollment } from '../enrollment/models/enrollment';
import { LoadingService } from '../../../../core/services/loading.service';

@Injectable()
export class CoursesService {
  constructor(
    private enrollmentService: EnrollmentService,
    private httpClient: HttpClient,
    private loadingService: LoadingService
  ) {}

  getCourses() {
    this.loadingService.setIsLoading(true);
    return this.httpClient
      .get<Course[]>(`${environment.apiURL}/courses`)
      .pipe(finalize(() => this.loadingService.setIsLoading(false)));
  }

  getCourseById(id: string) {
    return this.httpClient.get<Course>(`${environment.apiURL}/courses/${id}`);
  }

  getCoursesByStudent(studentId: string) {
    this.loadingService.setIsLoading(true);
    return this.httpClient
      .get<Enrollment[]>(
        `${environment.apiURL}/enrollments?_embed=course&studentId=${studentId}`
      )
      .pipe(
        map((enrollments) => enrollments.map(({ course }) => course)),
        catchError(() => of([])),
        finalize(() => this.loadingService.setIsLoading(false))
      );
  }

  createCourse(courseData: Course) {
    return this.httpClient
      .post<Course>(`${environment.apiURL}/courses`, courseData)
      .pipe(mergeMap(() => this.getCourses()));
  }

  deleteCourseById(id: string) {
    return this.enrollmentService.deleteEnrollmentsByCourseId(id).pipe(
      concatMap(() =>
        this.httpClient.delete<Course>(`${environment.apiURL}/courses/${id}`)
      ),
      concatMap(() => this.getCourses())
    );
  }

  updateCourse(id: string, updateData: Course) {
    return this.httpClient
      .put<Course>(`${environment.apiURL}/courses/${id}`, updateData)
      .pipe(mergeMap(() => this.getCourses()));
  }
}
