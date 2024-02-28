import { Component } from '@angular/core';
import { Course } from './models/course';
import { CoursesService } from './courses.service';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  courses: Course[] = [];

  constructor(
    private courseService: CoursesService,
    public dialog: MatDialog
  ){
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      }
    })
  }

  onCreateCourse(): void{
    this.dialog.open(CoursesDialogComponent).afterClosed().subscribe({
      next: (courseData) => {
        if(courseData){
          this.courseService.createCourse(courseData).subscribe({
            next: (courses) =>{
              this.courses = courses;
            }
          })
        }
      }
    })
  }

  onEditCourse(ev: Course) {
    this.dialog.open(CoursesDialogComponent, {
      data: ev
    }).afterClosed().subscribe({
      next: (courseData) => {
        if(courseData){
          this.courseService.updateCourse(ev.id, courseData).subscribe({
            next: (courses) => {
              this.courses = courses;
            }
          })
        }
      }
    })
  }

  onDeleteCourse(id: string): void {
    this.courseService.deleteCourseById(id).subscribe({
      next: (courses) => {
        this.courses = courses;
      }
    });
  }
}
