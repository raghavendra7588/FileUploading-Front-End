import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDunesComponent } from './payment-dunes.component';

describe('PaymentDunesComponent', () => {
  let component: PaymentDunesComponent;
  let fixture: ComponentFixture<PaymentDunesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentDunesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDunesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
