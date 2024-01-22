import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models/student';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrl: './students-table.component.scss'
})
export class StudentsTableComponent {
  @Input()
    dataSource: Student[] = [];
  
  @Output()
  deleteStudent = new EventEmitter<number>();

  @Output()
  editStudent = new EventEmitter<Student>();

  displayedColumns = ['id', 'fullname', 'email', 'actions'];
}
