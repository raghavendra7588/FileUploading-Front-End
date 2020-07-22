import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobWorkInwardRateComponent } from './job-work-inward-rate.component';

describe('JobWorkInwardRateComponent', () => {
  let component: JobWorkInwardRateComponent;
  let fixture: ComponentFixture<JobWorkInwardRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobWorkInwardRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobWorkInwardRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
