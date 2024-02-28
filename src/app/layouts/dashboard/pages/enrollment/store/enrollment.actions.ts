import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const EnrollmentActions = createActionGroup({
  source: 'Enrollment',
  events: {
    'Load Enrollments': emptyProps(),
    'Load Enrollments Success': props<{ data: unknown }>(),
    'Load Enrollments Failure': props<{ error: unknown }>(),
  }
});
