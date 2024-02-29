import { Component } from '@angular/core';
import { Student } from '../../models/student';
import { Course } from '../../../courses/models/course';
import { CoursesService } from '../../../courses/courses.service';
import { StudentsService } from '../../students.service';
import { EnrollmentService } from '../../../enrollment/enrollment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss',
})
export class StudentDetailComponent {
  studentSelected: Student | null = null;
  enrolledCourses: (Course | undefined)[] = [];

  displayedColumns = ['id', 'name', 'teacher', 'actions'];

  constructor(
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private enrollmentService: EnrollmentService,
    private route: ActivatedRoute
  ) {
    this.studentsService
      .getStudentById(this.route.snapshot.params['id'])
      .subscribe({
        next: (findedStudent) => {
          if (findedStudent) {
            this.studentSelected = findedStudent;
          }
        },
        complete: () => {
          this.getEnrolledCourses();
        },
      });
  }

  getEnrolledCourses() {
    if (this.studentSelected)
      this.coursesService
        .getCoursesByStudent(this.studentSelected.id)
        .subscribe({
          next: (courses) => {
            if (courses.length) {
              this.enrolledCourses = courses;
            }
          },
        });
  }

  deleteEnrolledCourse(courseId: string) {
    if (this.studentSelected)
      this.enrollmentService
        .deleteEnrollmentByStudentAndCourseId(this.studentSelected.id, courseId)
        .subscribe({ complete: () => this.getEnrolledCourses() });
  }
}
