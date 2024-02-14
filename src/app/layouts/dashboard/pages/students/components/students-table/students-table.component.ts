import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models/student';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../auth/auth.service';
import { User } from '../../../users/models/user';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrl: './students-table.component.scss',
})
export class StudentsTableComponent {
  @Input()
  dataSource: Student[] = [];

  @Output()
  editStudent = new EventEmitter<Student>();

  @Output()
  deleteStudent = new EventEmitter<number>();

  displayedColumns = ['id', 'fullname', 'email', 'actions'];

  authUser: User | null = null;

  constructor(private router: Router, private authService: AuthService) {
    if (authService.authUser) {
      this.authUser = authService.authUser;
    }
  }

  redirectToStudentDetail(studentId: number): void {
    this.router.navigate(['/dashboard/students', studentId]);
  }
}
