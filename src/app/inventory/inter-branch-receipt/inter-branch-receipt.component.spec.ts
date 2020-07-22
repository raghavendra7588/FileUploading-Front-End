import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterBranchReceiptComponent } from './inter-branch-receipt.component';

describe('InterBranchReceiptComponent', () => {
  let component: InterBranchReceiptComponent;
  let fixture: ComponentFixture<InterBranchReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterBranchReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterBranchReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
