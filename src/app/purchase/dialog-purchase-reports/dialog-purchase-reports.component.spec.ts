import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPurchaseReportsComponent } from './dialog-purchase-reports.component';

describe('DialogPurchaseReportsComponent', () => {
  let component: DialogPurchaseReportsComponent;
  let fixture: ComponentFixture<DialogPurchaseReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPurchaseReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPurchaseReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
