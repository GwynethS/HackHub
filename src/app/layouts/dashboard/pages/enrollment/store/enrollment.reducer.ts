import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentActions } from './enrollment.actions';
import { Enrollment } from '../models/enrollment';
import { Student } from '../../students/models/student';
import { Course } from '../../courses/models/course';

export const enrollmentFeatureKey = 'enrollment';

export interface State {
  enrollments: Enrollment[];
  students: Student[];
  courses: Course[];
  error: unknown;
}

export const initialState: State = {
  enrollments: [],
  students: [],
  courses: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(EnrollmentActions.loadEnrollments, (state) => ({ ...state })),
  on(EnrollmentActions.loadEnrollmentsSuccess, (state, action) => ({
    ...state,
    enrollments: action.data,
  })),
  on(EnrollmentActions.loadEnrollmentsFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),

  on(EnrollmentActions.loadStudents, (state) => ({ ...state })),
  on(EnrollmentActions.loadStudentsSuccess, (state, action) => ({
    ...state,
    students: action.data,
  })),
  on(EnrollmentActions.loadStudentsFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),

  on(EnrollmentActions.loadCourses, (state) => ({ ...state })),
  on(EnrollmentActions.loadCoursesSuccess, (state, action) => ({
    ...state,
    courses: action.data,
  })),
  on(EnrollmentActions.loadCoursesFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
);

export const enrollmentFeature = createFeature({
  name: enrollmentFeatureKey,
  reducer,
});
