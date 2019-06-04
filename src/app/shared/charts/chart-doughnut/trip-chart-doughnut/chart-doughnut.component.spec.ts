import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripChartDoughnutComponent } from './chart-doughnut.component';

describe('ChartDoughnutComponent', () => {
  let component: TripChartDoughnutComponent;
  let fixture: ComponentFixture<TripChartDoughnutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripChartDoughnutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripChartDoughnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
