import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models/course';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../users/models/user';
import { AuthService } from '../../../../../auth/auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../../../../../../core/store/auth/selectors';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrl: './courses-table.component.scss',
})
export class CoursesTableComponent {
  @Input()
  dataSource: Course[] = [];

  @Output()
  editCourse = new EventEmitter<Course>();

  @Output()
  deleteCourse = new EventEmitter<string>();

  displayedColumns = ['id', 'name', 'teacher', 'actions'];

  authUser$: Observable<User | null>;

  constructor(private router: Router, private store: Store) {
    this.authUser$ = this.store.select(selectAuthUser);
  }

  redirectToCourseDetail(courseId: string): void {
    this.router.navigate(['/dashboard/courses', courseId]);
  }
}
