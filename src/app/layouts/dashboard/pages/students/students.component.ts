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
  studentSelected: Student | null = null;

  students: Student[] = [];

  constructor(
    private studentService: StudentsService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
      }
    })
    // this.studentForm = this.fb.group({
    //   firstName: this.fb.control('', [
    //     Validators.required,
    //     Validators.minLength(2),
    //     Validators.pattern('[a-zA-Z]*'),
    //   ]),
    //   lastName: this.fb.control('', [
    //     Validators.required,
    //     Validators.minLength(2),
    //     Validators.pattern('[a-zA-Z]*'),
    //   ]),
    //   email: this.fb.control('', [Validators.required, Validators.email]),
    // });
  }

  onAddStudent(): void{
    this.dialog.open(StudentsDialogComponent).afterClosed().subscribe({
      next: (studentData) => {
        if(studentData){
          this.studentService.addStudent(studentData).subscribe({
            next: (students) => {
              this.students = students;
            }
          })
        }
      }
    })
  }

  // onStudentSubmitted(ev: Student) {
  //   this.students = [...this.students, { ...ev, id: this.students.length + 1 }];
  // }

  // onEditStudent(ev: Student) {
  //   this.studentSelected = ev;
  //   this.studentForm.patchValue(this.studentSelected);
  // }

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

  // onCancelEditStudent() {
  //   this.studentSelected = null;
  //   this.studentForm.reset();
  // }

  onDeleteStudent(id: number): void {
    this.studentSelected = null;
    this.students = this.students.filter((student) => student.id !== id);
  }
}
