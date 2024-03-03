import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Enrollment } from '../../models/enrollment';
import { Student } from '../../../students/models/student';
import { Course } from '../../../courses/models/course';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { EnrollmentActions } from '../../store/enrollment.actions';
import {
  selectEnrollmentsCourses,
  selectEnrollmentsStudents,
} from '../../store/enrollment.selectors';
import { EnrollmentService } from '../../enrollment.service';
import { AlertService } from '../../../../../../core/services/alert.service';

@Component({
  selector: 'app-enrollment-dialog',
  templateUrl: './enrollment-dialog.component.html',
  styleUrl: './enrollment-dialog.component.scss',
})
export class EnrollmentDialogComponent {
  enrollmentForm: FormGroup;

  students$: Observable<Student[]>;
  courses$: Observable<Course[]>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private enrollmentService: EnrollmentService,
    private alertService: AlertService,
    private dialogRef: MatDialogRef<EnrollmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private editingEnrollment?: Enrollment
  ) {
    this.enrollmentForm = this.fb.group({
      studentId: this.fb.control('', [Validators.required]),
      courseId: this.fb.control('', [Validators.required]),
    });

    if (this.editingEnrollment) {
      this.enrollmentForm.patchValue(this.editingEnrollment);
    }

    this.store.dispatch(EnrollmentActions.loadStudents());
    this.store.dispatch(EnrollmentActions.loadCourses());
    this.students$ = this.store.select(selectEnrollmentsStudents);
    this.courses$ = this.store.select(selectEnrollmentsCourses);
  }

  onCreate(): void {
    if (this.enrollmentForm.invalid) {
      this.enrollmentForm.markAllAsTouched();
    } else {
      this.enrollmentService
        .validateExistingEnrollment(
          this.enrollmentForm.value['studentId'],
          this.enrollmentForm.value['courseId']
        )
        .subscribe({
          next: (response) => {
            if (!response) {
              if (this.editingEnrollment) {
                this.store.dispatch(
                  EnrollmentActions.updateEnrollment({
                    id: this.editingEnrollment.id,
                    data: this.enrollmentForm.value,
                  })
                );
              } else {
                this.store.dispatch(
                  EnrollmentActions.createEnrollment({
                    data: this.enrollmentForm.value,
                  })
                );
              }
              this.dialogRef.close();
            }else{
              this.alertService.showError('Error', 'Este estudiante ya se encuentra registrado en este curso.');
            }
          },
        });
    }
  }

  onClearInputs(): void {
    this.enrollmentForm.reset();
  }
}
