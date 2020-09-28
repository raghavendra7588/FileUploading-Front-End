import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMinimumRatePurchaseOrderComponent } from './dialog-minimum-rate-purchase-order.component';

describe('DialogMinimumRatePurchaseOrderComponent', () => {
  let component: DialogMinimumRatePurchaseOrderComponent;
  let fixture: ComponentFixture<DialogMinimumRatePurchaseOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMinimumRatePurchaseOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMinimumRatePurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
