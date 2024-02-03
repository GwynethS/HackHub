import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseClassTableComponent } from './course-class-table.component';

describe('CourseClassTableComponent', () => {
  let component: CourseClassTableComponent;
  let fixture: ComponentFixture<CourseClassTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseClassTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseClassTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
