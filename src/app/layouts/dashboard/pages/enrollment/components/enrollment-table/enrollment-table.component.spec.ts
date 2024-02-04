import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentTableComponent } from './enrollment-table.component';

describe('EnrollmentTableComponent', () => {
  let component: EnrollmentTableComponent;
  let fixture: ComponentFixture<EnrollmentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnrollmentTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnrollmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
