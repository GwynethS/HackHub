import { Component } from '@angular/core';
import { Enrollment } from './models/enrollment';
import { EnrollmentService } from './enrollment.service';
import { MatDialog } from '@angular/material/dialog';
import { EnrollmentDialogComponent } from './components/enrollment-dialog/enrollment-dialog.component';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrl: './enrollment.component.scss'
})
export class EnrollmentComponent {
  enrollments: Enrollment[] = [];

  constructor(
    private enrollmentService: EnrollmentService,
    public dialog: MatDialog,
  ) {
    this.enrollmentService.getEnrollments().subscribe({
      next: (enrollments) => {
        this.enrollments = enrollments;
      },
    });
  }

  onCreateEnrollment(): void {
    this.dialog
      .open(EnrollmentDialogComponent)
      .afterClosed()
      .subscribe({
        next: (enrollmentData) => {
          if (enrollmentData) {
            this.enrollmentService.createEnrollment(enrollmentData).subscribe({
              next: (enrollments) => {
                this.enrollments = enrollments;
              },
            });
          }
        },
      });
  }

  onEditEnrollment(ev: Enrollment) {
    this.dialog.open(EnrollmentDialogComponent, {
      data: ev
    }).afterClosed().subscribe({
      next: (enrollmentData) => {
        if(enrollmentData){
          this.enrollmentService.updateEnrollment(ev.id, enrollmentData).subscribe({
            next: (enrollments) => {
              this.enrollments = enrollments;
            }
          })
        }
      }
    })
  }

  onDeleteEnrollment(id: number): void {
    this.enrollmentService.deleteEnrollmentById(id).subscribe({
      next: (enrollments) => {
        this.enrollments = enrollments;
      }
    });
  }
}
