import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEnrollment from './enrollment.reducer';

export const selectEnrollmentState =
  createFeatureSelector<fromEnrollment.State>(
    fromEnrollment.enrollmentFeatureKey
  );

export const selectEnrollments = createSelector(
  selectEnrollmentState,
  (state) => state.enrollments
);

export const selectEnrollmentsStudents = createSelector(
  selectEnrollmentState,
  (state) => state.students
);

export const selectEnrollmentsCourses = createSelector(
  selectEnrollmentState,
  (state) => state.courses
);
