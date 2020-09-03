import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPrintPurchaseReportComponent } from './dialog-print-purchase-report.component';

describe('DialogPrintPurchaseReportComponent', () => {
  let component: DialogPrintPurchaseReportComponent;
  let fixture: ComponentFixture<DialogPrintPurchaseReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPrintPurchaseReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPrintPurchaseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
