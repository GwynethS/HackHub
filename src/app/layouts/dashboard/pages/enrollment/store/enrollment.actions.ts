import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateEnrollmentData, Enrollment } from '../models/enrollment';
import { Student } from '../../students/models/student';
import { Course } from '../../courses/models/course';

export const EnrollmentActions = createActionGroup({
  source: 'Enrollment',
  events: {
    'Load Enrollments': emptyProps(),
    'Load Enrollments Success': props<{ data: Enrollment[] }>(),
    'Load Enrollments Failure': props<{ error: unknown }>(),

    'Load Students': emptyProps(),
    'Load Students Success': props<{ data: Student[] }>(),
    'Load Students Failure': props<{ error: unknown }>(),

    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ data: Course[] }>(),
    'Load Courses Failure': props<{ error: unknown }>(),

    'Create Enrollment': props<{ data: CreateEnrollmentData }>(),
    'Create Enrollment Success': props<{ data: Enrollment }>(),
    'Create Enrollment Failure': props<{ error: unknown }>(),

    'Update Enrollment': props<{ id: string, data: CreateEnrollmentData }>(),
    'Update Enrollment Success': props<{ data: Enrollment }>(),
    'Update Enrollment Failure': props<{ error: unknown }>(),

    'Delete Enrollment': props<{ id: string}>(),
    'Delete Enrollment Success': props<{ data: Enrollment }>(),
    'Delete Enrollment Failure': props<{ error: unknown }>(),
  }
});
