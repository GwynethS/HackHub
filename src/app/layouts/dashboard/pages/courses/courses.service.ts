import { Injectable } from '@angular/core';
import { Course } from './models/course';
import { delay, of } from 'rxjs';

let courses: Course[] = [
  {
    id: 1,
    name: 'Python',
    teacher: 'Jorge Ramirez',
  },
  {
    id: 2,
    name: 'Java',
    teacher: 'Carlos Perez',
  }
]

@Injectable()
export class CoursesService {

  constructor() { }

  getCourses(){
    return of(courses).pipe(
      delay(500)
    );
  }

  getCourseById(id: number){
    return of(courses.find((course) => course.id === id)).pipe(delay(500));
  }

  createCourse(courseData: Course){
    courses = [...courses, {...courseData, id: courses.length + 1}];

    return this.getCourses();
  }

  deleteCourseById(id: number){
    courses = courses.filter((course) => course.id !== id);

    return this.getCourses();
  }

  updateCourse(id: number, updateData: Course){
    courses = courses.map((course) => course.id === id ? {...course, ...updateData} : course);

    return this.getCourses();
  }
}
