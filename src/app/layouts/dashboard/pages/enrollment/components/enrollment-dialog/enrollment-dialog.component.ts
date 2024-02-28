import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Enrollment } from '../../models/enrollment';
import { StudentsService } from '../../../students/students.service';
import { CoursesService } from '../../../courses/courses.service';
import { Student } from '../../../students/models/student';
import { Course } from '../../../courses/models/course';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { EnrollmentActions } from '../../store/enrollment.actions';
import {
  selectEnrollmentsCourses,
  selectEnrollmentsStudents,
} from '../../store/enrollment.selectors';

@Component({
  selector: 'app-enrollment-dialog',
  templateUrl: './enrollment-dialog.component.html',
  styleUrl: './enrollment-dialog.component.scss',
})
export class EnrollmentDialogComponent {
  enrollmentForm: FormGroup;

  students: Student[] = [];
  courses: Course[] = [];

  students$: Observable<Student[]>;
  courses$: Observable<Course[]>;

  constructor(
    private fb: FormBuilder,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private store: Store,
    private dialogRef: MatDialogRef<EnrollmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private editingEnrollment?: Enrollment
  ) {
    this.enrollmentForm = this.fb.group({
      studentId: this.fb.control('', [Validators.required]),
      courseId: this.fb.control('', [Validators.required]),
    });

    if (editingEnrollment) {
      this.enrollmentForm.patchValue(editingEnrollment);
    }

    this.store.dispatch(EnrollmentActions.loadStudents());
    this.store.dispatch(EnrollmentActions.loadCourses());
    this.students$ = this.store.select(selectEnrollmentsStudents);
    this.courses$ = this.store.select(selectEnrollmentsCourses);
  }

  ngOnInit() {
    this.studentsService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
      },
    });

    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
    });
  }

  onCreate(): void {
    if (this.enrollmentForm.invalid) {
      this.enrollmentForm.markAllAsTouched();
    } else {
      // this.dialogRef.close(this.enrollmentForm.value);
      this.store.dispatch(
        EnrollmentActions.createEnrollment({ data: this.enrollmentForm.value })
      );
      this.dialogRef.close();
    }
  }

  onClearInputs(): void {
    this.enrollmentForm.reset();
  }
}
