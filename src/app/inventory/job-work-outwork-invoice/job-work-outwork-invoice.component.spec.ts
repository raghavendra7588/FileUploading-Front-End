import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobWorkOutworkInvoiceComponent } from './job-work-outwork-invoice.component';

describe('JobWorkOutworkInvoiceComponent', () => {
  let component: JobWorkOutworkInvoiceComponent;
  let fixture: ComponentFixture<JobWorkOutworkInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobWorkOutworkInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobWorkOutworkInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
