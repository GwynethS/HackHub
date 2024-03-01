import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models/student';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../auth/auth.service';
import { User } from '../../../users/models/user';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../../../../../../core/store/auth/selectors';

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
  deleteStudent = new EventEmitter<string>();

  displayedColumns = ['id', 'fullname', 'email', 'actions'];

  authUser$: Observable<User | null>;

  constructor(private router: Router, private store: Store) {
    this.authUser$ = this.store.select(selectAuthUser);
  }

  redirectToStudentDetail(studentId: string): void {
    this.router.navigate(['/dashboard/students', studentId]);
  }
}
