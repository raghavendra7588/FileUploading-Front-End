import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobWorkInwardComponent } from './job-work-inward.component';

describe('JobWorkInwardComponent', () => {
  let component: JobWorkInwardComponent;
  let fixture: ComponentFixture<JobWorkInwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobWorkInwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobWorkInwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
