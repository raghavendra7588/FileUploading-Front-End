import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentItemMasterComponent } from './dialog-content-item-master.component';

describe('DialogContentItemMasterComponent', () => {
  let component: DialogContentItemMasterComponent;
  let fixture: ComponentFixture<DialogContentItemMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogContentItemMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContentItemMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
