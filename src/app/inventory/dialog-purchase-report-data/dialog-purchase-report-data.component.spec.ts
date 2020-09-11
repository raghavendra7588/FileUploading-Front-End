import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPurchaseReportDataComponent } from './dialog-purchase-report-data.component';

describe('DialogPurchaseReportDataComponent', () => {
  let component: DialogPurchaseReportDataComponent;
  let fixture: ComponentFixture<DialogPurchaseReportDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPurchaseReportDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPurchaseReportDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
