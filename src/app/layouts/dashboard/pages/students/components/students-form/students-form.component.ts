import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormGroupDirective } from '@angular/forms';
import { Student } from '../../models/student';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrl: './students-form.component.scss'
})
export class StudentsFormComponent {
  studentForm: FormGroup;

  @Output()
    studentSubmitted = new EventEmitter;

  @ViewChild(FormGroupDirective)
    private formDir!: FormGroupDirective;

  constructor(private fb: FormBuilder){
    this.studentForm = this.fb.group({
      firstName: this.fb.control('', [
        Validators.required, 
        Validators.minLength(2), 
        Validators.pattern('[a-zA-Z]*')]),
      lastName: this.fb.control('', [
        Validators.required, 
        Validators.minLength(2), 
        Validators.pattern('[a-zA-Z]*')]),
      email: this.fb.control('', [
        Validators.required, 
        Validators.email]),
    })
  }

  onSubmit(): void{
    if(this.studentForm.invalid){
      this.studentForm.markAllAsTouched();
    }else{
      this.studentSubmitted.emit(this.studentForm.value);
      this.formDir.resetForm();
      console.log('enviado');
    }
  }
}
