import { Component } from '@angular/core';
import { Student } from './models/student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
  studentForm: FormGroup;

  studentSelected: Student | null = null;

  students: Student[] = [
    {
      id: 1,
      firstName: 'Gwyneth',
      lastName: 'Segura',
      email: 'gwyneth@gmail.com'
    }
  ]

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

  onStudentSubmitted(ev: Student){
    this.students = [...this.students, {...ev, id: this.students.length + 1}]
  }

  onEditStudent(ev: Student){
    this.studentSelected = ev;
    this.studentForm.patchValue(this.studentSelected);
  }

  onSaveEditStudent(){
    if(this.studentForm.invalid || this.studentSelected === null){
      this.studentForm.markAllAsTouched();
    }else{
      this.students = this.students.map((student) => student.id === this.studentSelected?.id ? {...this.studentSelected, ...this.studentForm.value} : student );
      this.studentSelected = null;
    }
  }

  onCancelEditStudent(){
    this.studentSelected = null;
    this.studentForm.reset();
  }

  onDeleteStudent(id: number): void{
    this.students = this.students.filter((student) => student.id !== id);
  }
}
