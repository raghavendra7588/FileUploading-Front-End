import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialIssuedForJobWorkComponent } from './material-issued-for-job-work.component';

describe('MaterialIssuedForJobWorkComponent', () => {
  let component: MaterialIssuedForJobWorkComponent;
  let fixture: ComponentFixture<MaterialIssuedForJobWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialIssuedForJobWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialIssuedForJobWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
