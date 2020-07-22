import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseDebitNoteComponent } from './purchase-debit-note.component';

describe('PurchaseDebitNoteComponent', () => {
  let component: PurchaseDebitNoteComponent;
  let fixture: ComponentFixture<PurchaseDebitNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseDebitNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseDebitNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
