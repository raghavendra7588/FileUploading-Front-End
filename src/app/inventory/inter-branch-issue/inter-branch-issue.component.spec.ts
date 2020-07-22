import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterBranchIssueComponent } from './inter-branch-issue.component';

describe('InterBranchIssueComponent', () => {
  let component: InterBranchIssueComponent;
  let fixture: ComponentFixture<InterBranchIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterBranchIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterBranchIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
