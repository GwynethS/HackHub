import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { EnrollmentActions } from './enrollment.actions';
import { EnrollmentService } from '../enrollment.service';
import { StudentsService } from '../../students/students.service';
import { CoursesService } from '../../courses/courses.service';

@Injectable()
export class EnrollmentEffects {
  loadEnrollments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentActions.loadEnrollments),
      concatMap(() =>
        this.enrollmentService.getEnrollments().pipe(
          map((data) => EnrollmentActions.loadEnrollmentsSuccess({ data })),
          catchError((error) =>
            of(EnrollmentActions.loadEnrollmentsFailure({ error }))
          )
        )
      )
    );
  });

  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentActions.loadStudents),
      concatMap(() =>
        this.studentsService.getStudents().pipe(
          map((data) => EnrollmentActions.loadStudentsSuccess({ data })),
          catchError((error) =>
            of(EnrollmentActions.loadStudentsFailure({ error }))
          )
        )
      )
    );
  });

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollmentActions.loadCourses),
      concatMap(() =>
        this.coursesService.getCourses().pipe(
          map(data => EnrollmentActions.loadCoursesSuccess({ data })),
          catchError(error => of(EnrollmentActions.loadCoursesFailure({ error }))))
      )
    );
  });

  createEnrollment$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollmentActions.createEnrollment),
      concatMap((action) =>
        this.enrollmentService.createEnrollment(action.data).pipe(
          map(data => EnrollmentActions.createEnrollmentSuccess({ data })),
          catchError(error => of(EnrollmentActions.createEnrollmentFailure({ error }))))
      )
    );
  });

  createEnrollmentSucess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollmentActions.createEnrollmentSuccess),
      map(() => EnrollmentActions.loadEnrollments())
    );
  });

  updateEnrollment$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollmentActions.updateEnrollment),
      concatMap((action) =>
        this.enrollmentService.updateEnrollment(action.id, action.data).pipe(
          map(data => EnrollmentActions.updateEnrollmentSuccess({ data })),
          catchError(error => of(EnrollmentActions.updateEnrollmentFailure({ error }))))
      )
    );
  });

  updateEnrollmentSucess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollmentActions.updateEnrollmentSuccess),
      map(() => EnrollmentActions.loadEnrollments())
    );
  });

  deleteEnrollment$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollmentActions.deleteEnrollment),
      concatMap((action) =>
        this.enrollmentService.deleteEnrollmentById(action.id).pipe(
          map(data => EnrollmentActions.updateEnrollmentSuccess({ data })),
          catchError(error => of(EnrollmentActions.updateEnrollmentFailure({ error }))))
      )
    );
  });

  deleteEnrollmentSucess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollmentActions.updateEnrollmentSuccess),
      map(() => EnrollmentActions.loadEnrollments())
    );
  });

  constructor(
    private actions$: Actions,
    private enrollmentService: EnrollmentService,
    private studentsService: StudentsService,
    private coursesService: CoursesService
  ) {}
}
