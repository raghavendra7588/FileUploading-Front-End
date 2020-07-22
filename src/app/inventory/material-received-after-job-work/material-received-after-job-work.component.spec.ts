import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialReceivedAfterJobWorkComponent } from './material-received-after-job-work.component';

describe('MaterialReceivedAfterJobWorkComponent', () => {
  let component: MaterialReceivedAfterJobWorkComponent;
  let fixture: ComponentFixture<MaterialReceivedAfterJobWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialReceivedAfterJobWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialReceivedAfterJobWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
