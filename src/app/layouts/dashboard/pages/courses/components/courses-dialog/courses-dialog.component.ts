import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../models/course';

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrl: './courses-dialog.component.scss'
})
export class CoursesDialogComponent {
  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CoursesDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private editingCourse? : Course
  ){
    this.courseForm = this.fb.group({
      name: this.fb.control('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      teacher: this.fb.control('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z\\s]*')
      ])
    })
  
    if(editingCourse){
      this.courseForm.patchValue(editingCourse);
    }
  }

  onCreate() : void{
    if(this.courseForm.invalid){
      this.courseForm.markAllAsTouched();
    }else{
      this.dialogRef.close(this.courseForm.value);
    }
  }

  onClearInputs():void{
    this.courseForm.reset();
  }
}
