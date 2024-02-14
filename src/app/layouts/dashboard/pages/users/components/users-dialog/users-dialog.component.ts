import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrl: './users-dialog.component.scss'
})
export class UsersDialogComponent {
  userForm: FormGroup;
  roles = ['ADMIN', 'USER'];
  revealPassword = false;
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UsersDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
      private editingUser? : User
  ) {
    this.userForm = this.fb.group({
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
      password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
      role: this.fb.control('', [Validators.required]),
    });

    if(editingUser){
      this.userForm.patchValue(editingUser);
    }
  }

  onCreate(): void {
    if(this.userForm.invalid){
      this.userForm.markAllAsTouched();
    }else{
      this.dialogRef.close(this.userForm.value);
    }
  }

  onClearInputs(): void {
    this.userForm.reset();
  }
}
