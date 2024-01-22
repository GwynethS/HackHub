import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsFormComponent } from './students-form.component';

describe('StudentsFormComponent', () => {
  let component: StudentsFormComponent;
  let fixture: ComponentFixture<StudentsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
