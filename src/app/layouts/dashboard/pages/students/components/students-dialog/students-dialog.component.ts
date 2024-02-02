import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styleUrl: './students-dialog.component.scss',
})
export class StudentsDialogComponent {
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StudentsDialogComponent>
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
