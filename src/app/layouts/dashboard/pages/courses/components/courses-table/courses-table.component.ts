import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models/course';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../users/models/user';
import { AuthService } from '../../../../../auth/auth.service';

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
  deleteCourse = new EventEmitter<number>();

  displayedColumns = ['id', 'name', 'teacher', 'actions'];

  authUser: User | null = null;

  constructor(private router: Router, private authService : AuthService) {
    if(authService.authUser){
      this.authUser = authService.authUser;
    }
  }

  redirectToCourseDetail(courseId: number): void {
    this.router.navigate(['/dashboard/courses', courseId]);
  }
}
