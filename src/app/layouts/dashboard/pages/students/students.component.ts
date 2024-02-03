import { Component } from '@angular/core';
import { Student } from './models/student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from '../../../../core/services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';

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
    private fb: FormBuilder
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
    // this.studentSelected = ev;
    // this.studentForm.patchValue(this.studentSelected);
  }

  // onSaveEditStudent() {
  //   if (this.studentForm.invalid || this.studentSelected === null) {
  //     this.studentForm.markAllAsTouched();
  //   } else {
  //     this.students = this.students.map((student) =>
  //       student.id === this.studentSelected?.id
  //         ? { ...this.studentSelected, ...this.studentForm.value }
  //         : student
  //     );
  //     this.studentSelected = null;
  //   }
  // }

  onDeleteStudent(id: number): void {
    this.studentService.deleteStudentById(id).subscribe({
      next: (students) => {
        this.students = students;
      }
    });
  }
}
