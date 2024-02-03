import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseClassDialogComponent } from './course-class-dialog.component';

describe('CourseClassDialogComponent', () => {
  let component: CourseClassDialogComponent;
  let fixture: ComponentFixture<CourseClassDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseClassDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseClassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
