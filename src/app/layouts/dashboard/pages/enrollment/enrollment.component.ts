import { Component, OnDestroy } from '@angular/core';
import { Enrollment } from './models/enrollment';
import { EnrollmentService } from './enrollment.service';
import { MatDialog } from '@angular/material/dialog';
import { EnrollmentDialogComponent } from './components/enrollment-dialog/enrollment-dialog.component';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectEnrollments } from './store/enrollment.selectors';
import { EnrollmentActions } from './store/enrollment.actions';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrl: './enrollment.component.scss',
})
export class EnrollmentComponent implements OnDestroy {
  enrollments: Enrollment[] = [];
  // enrollments$: Observable<Enrollment[]>;
  subcriptions: Subscription[] = [];

  constructor(
    private enrollmentService: EnrollmentService,
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

    // this.enrollments$ = this.store.select(selectEnrollments);
    this.store.dispatch(EnrollmentActions.loadEnrollments());
  }

  onCreateEnrollment(): void {
    // this.dialog
    //   .open(EnrollmentDialogComponent)
    //   .afterClosed()
    //   .subscribe({
    //     next: (enrollmentData) => {
    //       if (enrollmentData) {
    //         this.enrollmentService.createEnrollment(enrollmentData).subscribe({
    //           next: (enrollments) => {
    //             this.enrollments = enrollments;
    //           },
    //         });
    //       }
    //     },
    //   });
    this.dialog.open(EnrollmentDialogComponent);
  }

  onEditEnrollment(ev: Enrollment) {
    // this.dialog.open(EnrollmentDialogComponent, {
    //   data: ev
    // }).afterClosed().subscribe({
    //   next: (enrollmentData) => {
    //     if(enrollmentData){
    //       this.enrollmentService.updateEnrollment(ev.id, enrollmentData).subscribe({
    //         next: (enrollments) => {
    //           this.enrollments = enrollments;
    //         }
    //       })
    //     }
    //   }
    // })
  }

  onDeleteEnrollment(id: number): void {
    // this.enrollmentService.deleteEnrollmentById(id).subscribe({
    //   next: (enrollments) => {
    //     this.enrollments = enrollments;
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.subcriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
