import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models/student';

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styleUrl: './students-dialog.component.scss',
})
export class StudentsDialogComponent {
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StudentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
      private editingStudent? : Student
  ) {
    this.studentForm = this.fb.group({
      firstName: this.fb.control('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z]*'),
      ]),
      lastName: this.fb.control('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z]*'),
      ]),
      email: this.fb.control('', [Validators.required, Validators.email]),
    });

    if(editingStudent){
      this.studentForm.patchValue(editingStudent);
    }
  }

  onCreate(): void {
    if(this.studentForm.invalid){
      this.studentForm.markAllAsTouched();
    }else{
      this.dialogRef.close(this.studentForm.value);
    }
  }

  onClearInputs(): void {
    this.studentForm.reset();
  }
}
