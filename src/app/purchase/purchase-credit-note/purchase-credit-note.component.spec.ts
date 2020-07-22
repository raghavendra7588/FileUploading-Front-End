import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseCreditNoteComponent } from './purchase-credit-note.component';

describe('PurchaseCreditNoteComponent', () => {
  let component: PurchaseCreditNoteComponent;
  let fixture: ComponentFixture<PurchaseCreditNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseCreditNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseCreditNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
