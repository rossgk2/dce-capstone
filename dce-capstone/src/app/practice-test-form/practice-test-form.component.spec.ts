import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeTestFormComponent } from './practice-test-form.component';

describe('PracticeTestFormComponent', () => {
  let component: PracticeTestFormComponent;
  let fixture: ComponentFixture<PracticeTestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticeTestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeTestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
