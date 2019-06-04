import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelayedReportComponent } from './delayed-report.component';

describe('DelayedReportComponent', () => {
  let component: DelayedReportComponent;
  let fixture: ComponentFixture<DelayedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelayedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelayedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
