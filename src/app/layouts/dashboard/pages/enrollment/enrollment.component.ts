import { Component, OnDestroy } from '@angular/core';
import { Enrollment } from './models/enrollment';
import { MatDialog } from '@angular/material/dialog';
import { EnrollmentDialogComponent } from './components/enrollment-dialog/enrollment-dialog.component';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectEnrollments } from './store/enrollment.selectors';
import { EnrollmentActions } from './store/enrollment.actions';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrl: './enrollment.component.scss',
})
export class EnrollmentComponent implements OnDestroy {
  enrollments: Enrollment[] = [];

  subcriptions: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    private store: Store
  ) {
    this.subcriptions.push(
      this.store.select(selectEnrollments).subscribe({
        next: (enrollments) => {
          this.enrollments = [...enrollments];
        },
      })
    );

    this.store.dispatch(EnrollmentActions.loadEnrollments());
  }

  onCreateEnrollment(): void {
    this.dialog.open(EnrollmentDialogComponent);
  }

  onEditEnrollment(ev: Enrollment) {
    this.dialog.open(EnrollmentDialogComponent, {
      data: ev,
    });
  }

  onDeleteEnrollment(id: string): void {
    this.store.dispatch(EnrollmentActions.deleteEnrollment({ id }));
  }

  ngOnDestroy(): void {
    this.subcriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
