import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Enrollment } from '../../models/enrollment';
import { StudentsService } from '../../../students/students.service';
import { Student } from '../../../students/models/student';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-enrollment-table',
  templateUrl: './enrollment-table.component.html',
  styleUrl: './enrollment-table.component.scss'
})
export class EnrollmentTableComponent {
  @Input()
    dataSource: Enrollment[] = [];
  
  @Output()
    editEnrollment = new EventEmitter<Enrollment>();

  @Output()
    deleteEnrollment = new EventEmitter<number>();

  displayedColumns = ['id', 'studentId', 'courseId', 'enrollmentDate', 'actions'];
}
