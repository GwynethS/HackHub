import { Injectable } from '@angular/core';
import { catchError, concatMap, finalize, map, mergeMap, of } from 'rxjs';
import { Student } from './models/student';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Enrollment } from '../enrollment/models/enrollment';
import { LoadingService } from '../../../../core/services/loading.service';

@Injectable()
export class StudentsService {
  constructor(
    private enrollmentService: EnrollmentService,
    private httpClient: HttpClient,
    private loadingService: LoadingService
  ) {}

  getStudents() {
    this.loadingService.setIsLoading(true);
    return this.httpClient
      .get<Student[]>(`${environment.apiURL}/students`)
      .pipe(finalize(() => this.loadingService.setIsLoading(false)));
  }

  getStudentById(id: string) {
    return this.httpClient.get<Student>(`${environment.apiURL}/students/${id}`);
  }

  getStudentsByCourse(courseId: string) {
    this.loadingService.setIsLoading(true);
    return this.httpClient
      .get<Enrollment[]>(
        `${environment.apiURL}/enrollments?_embed=student&courseId=${courseId}`
      )
      .pipe(
        map((enrollments) => enrollments.map(({ student }) => student)),
        catchError(() => of([])),
        finalize(() => this.loadingService.setIsLoading(false))
      );
  }

  createStudent(studentData: Student) {
    return this.httpClient
      .post<Student>(`${environment.apiURL}/students`, studentData)
      .pipe(mergeMap(() => this.getStudents()));
  }

  deleteStudentById(id: string) {
    return this.enrollmentService.deleteEnrollmentsByStudentId(id).pipe(
      concatMap(() =>
        this.httpClient.delete<Student>(`${environment.apiURL}/students/${id}`)
      ),
      concatMap(() => this.getStudents())
    );
  }

  updateStudent(id: string, updateData: Student) {
    return this.httpClient
      .put<Student>(`${environment.apiURL}/students/${id}`, updateData)
      .pipe(mergeMap(() => this.getStudents()));
  }
}
