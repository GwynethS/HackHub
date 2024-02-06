import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../courses.service';
import { Course } from '../../models/course';
import { StudentsService } from '../../../students/students.service';
import { EnrollmentService } from '../../../enrollment/enrollment.service';
import { Student } from '../../../students/models/student';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss',
})
export class CourseDetailComponent {

  courseSelected : Course = {
    id: 0,
    name: '',
    teacher: ''
  };
  studentsInCourse: Student[] = [];

  displayedColumns = ['id', 'fullname', 'email', 'actions'];

  constructor(
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private enrollmentService: EnrollmentService,
    private route: ActivatedRoute
  ) {
    this.coursesService
      .getCourseById(Number(this.route.snapshot.params['id']))
      .subscribe({
        next: (findedCourse) => {
          if(findedCourse){
            this.courseSelected = findedCourse; 
          }
        },
        complete: () => {
          this.getUsersInCourse();
        }
      });
  }

  getUsersInCourse(){
    this.studentsService.getStudentsByCourse(this.courseSelected.id).subscribe({
      next: (students) => {
        if(students){
          this.studentsInCourse = students;
        }
      }
    })
  }

  deleteStudentFromCourse(studentId: number){
    this.enrollmentService.deleteEnrollmentByStudentAndCourseId(studentId, this.courseSelected.id);

    this.getUsersInCourse();
  }
}
