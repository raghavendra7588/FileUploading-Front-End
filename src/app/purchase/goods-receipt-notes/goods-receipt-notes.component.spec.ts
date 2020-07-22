import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReceiptNotesComponent } from './goods-receipt-notes.component';

describe('GoodsReceiptNotesComponent', () => {
  let component: GoodsReceiptNotesComponent;
  let fixture: ComponentFixture<GoodsReceiptNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsReceiptNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReceiptNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
