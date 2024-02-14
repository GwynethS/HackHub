import { TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent]
    })
    .compileComponents();
    
    component = TestBed.createComponent(HomeComponent).componentInstance;
  });

  it('HomeComponent debe estar definido', () => {
    expect(component).toBeTruthy();
  });
});
