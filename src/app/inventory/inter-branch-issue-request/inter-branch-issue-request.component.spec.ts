import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterBranchIssueRequestComponent } from './inter-branch-issue-request.component';

describe('InterBranchIssueRequestComponent', () => {
  let component: InterBranchIssueRequestComponent;
  let fixture: ComponentFixture<InterBranchIssueRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterBranchIssueRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterBranchIssueRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
