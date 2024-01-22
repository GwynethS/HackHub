import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrl: './students-form.component.scss'
})
export class StudentsFormComponent {
  value = '';

  studentForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.studentForm = this.fb.group({
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
    })
  }
}
