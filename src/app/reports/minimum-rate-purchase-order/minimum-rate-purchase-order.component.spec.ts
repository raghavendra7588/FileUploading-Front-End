import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimumRatePurchaseOrderComponent } from './minimum-rate-purchase-order.component';

describe('MinimumRatePurchaseOrderComponent', () => {
  let component: MinimumRatePurchaseOrderComponent;
  let fixture: ComponentFixture<MinimumRatePurchaseOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinimumRatePurchaseOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinimumRatePurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
