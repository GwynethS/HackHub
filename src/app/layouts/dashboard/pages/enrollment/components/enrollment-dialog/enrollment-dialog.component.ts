import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Enrollment } from '../../models/enrollment';
import { StudentsService } from '../../../students/students.service';
import { CoursesService } from '../../../courses/courses.service';
import { Student } from '../../../students/models/student';
import { Course } from '../../../courses/models/course';

@Component({
  selector: 'app-enrollment-dialog',
  templateUrl: './enrollment-dialog.component.html',
  styleUrl: './enrollment-dialog.component.scss'
})
export class EnrollmentDialogComponent {
  enrollmentForm: FormGroup;

  students: Student[] = [];
  courses: Course[] = [];

  constructor(
    private fb: FormBuilder,
    private studentsService: StudentsService,
    private coursesService : CoursesService,
    private dialogRef: MatDialogRef<EnrollmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private editingEnrollment? : Enrollment,
  ) {
    this.enrollmentForm = this.fb.group({
      studentId: this.fb.control('', [
        Validators.required,
      ]),
      courseId: this.fb.control('', [
        Validators.required,
      ]),
    });

    if(editingEnrollment){
      this.enrollmentForm.patchValue(editingEnrollment);
    }
  }

  ngOnInit(){
    console.log("page data");
    this.studentsService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
      }
    })

    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      }
    })
  }

  onCreate(): void {
    if(this.enrollmentForm.invalid){
      this.enrollmentForm.markAllAsTouched();
    }else{
      this.dialogRef.close(this.enrollmentForm.value);
    }
  }

  onClearInputs(): void {
    this.enrollmentForm.reset();
  }
}
