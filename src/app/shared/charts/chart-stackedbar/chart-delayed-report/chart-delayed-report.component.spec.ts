import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDelayedReportComponent } from './chart-delayed-report.component';

describe('ChartDelayedReportComponent', () => {
  let component: ChartDelayedReportComponent;
  let fixture: ComponentFixture<ChartDelayedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartDelayedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDelayedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
