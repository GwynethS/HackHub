import { Component } from '@angular/core';
import { Student } from './models/student';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { StudentsService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  students: Student[] = [];

  constructor(
    private studentService: StudentsService,
    public dialog: MatDialog,
  ) {
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
      },
    });
  }

  onCreateStudent(): void {
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
      });
  }

  onEditStudent(ev: Student) {
    this.dialog.open(StudentsDialogComponent, {
      data: ev
    }).afterClosed().subscribe({
      next: (studentData) => {
        if(studentData){
          this.studentService.updateStudent(ev.id, studentData).subscribe({
            next: (students) => {
              this.students = students;
            }
          })
        }
      }
    })
  }

  onDeleteStudent(id: number): void {
    this.studentService.deleteStudentById(id).subscribe({
      next: (students) => {
        this.students = students;
      }
    });
  }
}
