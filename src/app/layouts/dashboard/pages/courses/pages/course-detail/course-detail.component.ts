import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../courses.service';
import { Course } from '../../models/course';
import { StudentsService } from '../../../students/students.service';
import { EnrollmentService } from '../../../enrollment/enrollment.service';
import { Student } from '../../../students/models/student';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss',
})
export class CourseDetailComponent implements OnDestroy{
  courseSelected: Course | null = null;
  enrolledStudents: (Student | undefined)[] = [];

  displayedColumns = ['id', 'fullname', 'email', 'actions'];

  subscriptions: Subscription[] = [];

  constructor(
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private enrollmentService: EnrollmentService,
    private route: ActivatedRoute
  ) {
    this.subscriptions.push(
      this.coursesService
        .getCourseById(this.route.snapshot.params['id'])
        .subscribe({
          next: (findedCourse) => {
            if (findedCourse) {
              this.courseSelected = findedCourse;
            }
          },
          complete: () => {
            this.getEnrolledStudents();
          },
        })
    );
  }

  getEnrolledStudents() {
    if (this.courseSelected)
      this.subscriptions.push(
        this.studentsService
          .getStudentsByCourse(this.courseSelected.id)
          .subscribe({
            next: (students) => {
              if (students) {
                this.enrolledStudents = students;
              }
            },
          })
      );
  }

  deleteStudentFromCourse(studentId: string) {
    if (this.courseSelected)
      this.subscriptions.push(
        this.enrollmentService
          .deleteEnrollmentByStudentAndCourseId(
            studentId,
            this.courseSelected.id
          )
          .subscribe({ complete: () => this.getEnrolledStudents() })
      );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((suscription) => suscription.unsubscribe());
  }
}
