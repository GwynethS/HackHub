import { Injectable } from '@angular/core';
import { Course } from './models/course';
import { delay, map, mergeMap, of } from 'rxjs';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

let courses: Course[] = [
  {
    id: 1,
    name: 'Python',
    teacher: 'Jorge Ramirez',
  },
  {
    id: 2,
    name: 'Java',
    teacher: 'Carlos Perez',
  },
];

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
      map((enrollments) => {
        if (enrollments.length !== 0) {
          return courses.filter((course) =>
            enrollments.some((enrollment) => enrollment.courseId === course.id)
          );
        } else {
          return [];
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
    return this.httpClient
      .delete<Course>(`${environment.apiURL}/courses/${id}`)
      .pipe(mergeMap(() => this.getCourses()));
  }

  updateCourse(id: number, updateData: Course) {
    return this.httpClient.put<Course>(
      `${environment.apiURL}/courses/${id}`,
      updateData
    ).pipe(mergeMap(() => this.getCourses()));
  }
}
