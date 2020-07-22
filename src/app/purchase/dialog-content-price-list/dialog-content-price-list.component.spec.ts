import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentPriceListComponent } from './dialog-content-price-list.component';

describe('DialogContentPriceListComponent', () => {
  let component: DialogContentPriceListComponent;
  let fixture: ComponentFixture<DialogContentPriceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogContentPriceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContentPriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
