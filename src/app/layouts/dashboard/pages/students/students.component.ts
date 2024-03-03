import { Component, OnDestroy } from '@angular/core';
import { Student } from './models/student';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { StudentsService } from './students.service';
import { Subscription } from 'rxjs';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnDestroy{
  students: Student[] = [];

  subscriptions: Subscription[] = [];

  constructor(
    private studentService: StudentsService,
    public dialog: MatDialog,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.studentService.getStudents().subscribe({
        next: (students) => {
          this.students = students;
        },
      })
    );
  }

  onCreateStudent(): void {
    this.subscriptions.push(
      this.dialog
        .open(StudentsDialogComponent)
        .afterClosed()
        .subscribe({
          next: (studentData) => {
            if (studentData) {
              this.studentService.createStudent(studentData).subscribe({
                next: (students) => {
                  this.students = students;
                },
              });
            }
          },
        })
    );
  }

  onEditStudent(ev: Student) {
    this.subscriptions.push(
      this.dialog
        .open(StudentsDialogComponent, {
          data: ev,
        })
        .afterClosed()
        .subscribe({
          next: (studentData) => {
            if (studentData) {
              this.studentService.updateStudent(ev.id, studentData).subscribe({
                next: (students) => {
                  this.students = students;
                },
              });
            }
          },
        })
    );
  }

  onDeleteStudent(id: string): void {
    this.alertService.showConfirmDeleteAction('este estudiante').then((result) => {
      if (result.isConfirmed) {
        this.subscriptions.push(
          this.studentService.deleteStudentById(id).subscribe({
            next: (students) => {
              this.students = students;
            },
          })
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((suscription) => suscription.unsubscribe());
  }
}
