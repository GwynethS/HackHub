import { Component } from '@angular/core';
import { Course } from './models/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  courses: Course[] = [
    {
      id: 1,
      name: 'Python'
    },
    {
      id: 2,
      name: 'SQL'
    },
    {
      id: 3,
      name: 'Java'
    }
  ];
}
