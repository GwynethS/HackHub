import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models/course';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private router: Router, private route: ActivatedRoute) {}

  redirectToCourseDetail(courseId: number): void {
    console.log(this.route.snapshot);
    this.router.navigate(['/dashboard/courses', 'course-detail', courseId]);
  }
}
