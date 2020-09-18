import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSalesReportComponent } from './dialog-sales-report.component';

describe('DialogSalesReportComponent', () => {
  let component: DialogSalesReportComponent;
  let fixture: ComponentFixture<DialogSalesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSalesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSalesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
