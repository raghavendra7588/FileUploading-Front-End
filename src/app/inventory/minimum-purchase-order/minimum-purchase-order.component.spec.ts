import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimumPurchaseOrderComponent } from './minimum-purchase-order.component';

describe('MinimumPurchaseOrderComponent', () => {
  let component: MinimumPurchaseOrderComponent;
  let fixture: ComponentFixture<MinimumPurchaseOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinimumPurchaseOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinimumPurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
