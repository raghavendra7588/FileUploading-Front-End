import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobWorkOutwardRateComponent } from './job-work-outward-rate.component';

describe('JobWorkOutwardRateComponent', () => {
  let component: JobWorkOutwardRateComponent;
  let fixture: ComponentFixture<JobWorkOutwardRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobWorkOutwardRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobWorkOutwardRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
