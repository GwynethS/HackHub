import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models/student';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrl: './students-table.component.scss'
})
export class StudentsTableComponent {
  @Input()
    dataSource: Student[] = [];
  
  @Output()
    editStudent = new EventEmitter<Student>();

  @Output()
    deleteStudent = new EventEmitter<number>();

  displayedColumns = ['id', 'fullname', 'email', 'actions'];

  constructor(private router: Router) {}

  redirectToStudentDetail(studentId: number): void{
    this.router.navigate(['/dashboard/students', 'student-detail', studentId]);
  }
}
