import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelayedReportTabComponent } from './delayed-report-tab.component';

describe('DelayedReportTabComponent', () => {
  let component: DelayedReportTabComponent;
  let fixture: ComponentFixture<DelayedReportTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelayedReportTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelayedReportTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
