import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMinimumPurchaseOrderComponent } from './dialog-minimum-purchase-order.component';

describe('DialogMinimumPurchaseOrderComponent', () => {
  let component: DialogMinimumPurchaseOrderComponent;
  let fixture: ComponentFixture<DialogMinimumPurchaseOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMinimumPurchaseOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMinimumPurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
