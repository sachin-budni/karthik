import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTrackableDistributionComponent } from './chart-trackable-distribution.component';

describe('ChartTrackableDistributionComponent', () => {
  let component: ChartTrackableDistributionComponent;
  let fixture: ComponentFixture<ChartTrackableDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartTrackableDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTrackableDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
