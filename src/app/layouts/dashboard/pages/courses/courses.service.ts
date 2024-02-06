import { Injectable } from '@angular/core';
import { Course } from './models/course';
import { delay, map, of } from 'rxjs';
import { EnrollmentService } from '../enrollment/enrollment.service';

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

  constructor(private enrollmentService : EnrollmentService) { }

  getCourses(){
    return of(courses).pipe(
      delay(500)
    );
  }

  getCourseById(id: number){
    return of(courses.find((course) => course.id === id)).pipe(delay(500));
  }

  getCoursesByStudent(studentId: number){
    return this.enrollmentService.getEnrollmentsByStudentId(studentId).pipe(
      map(enrollments => {
        if (enrollments.length !== 0) {
          return courses.filter(course => enrollments.some(enrollment => enrollment.courseId === course.id));
        } else {
          return [];
        }
      })
    );
  }

  createCourse(courseData: Course){
    courses = [...courses, {...courseData, id: courses.length + 1}];

    return this.getCourses();
  }

  deleteCourseById(id: number){
    courses = courses.filter((course) => course.id !== id);
    this.enrollmentService.deleteEnrollmentsByCourseId(id);

    return this.getCourses();
  }

  updateCourse(id: number, updateData: Course){
    courses = courses.map((course) => course.id === id ? {...course, ...updateData} : course);

    return this.getCourses();
  }
}
