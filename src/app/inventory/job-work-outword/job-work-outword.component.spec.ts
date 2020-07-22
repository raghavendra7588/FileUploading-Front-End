import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobWorkOutwordComponent } from './job-work-outword.component';

describe('JobWorkOutwordComponent', () => {
  let component: JobWorkOutwordComponent;
  let fixture: ComponentFixture<JobWorkOutwordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobWorkOutwordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobWorkOutwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
