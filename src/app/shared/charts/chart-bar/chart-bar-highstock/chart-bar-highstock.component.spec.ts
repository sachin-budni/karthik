import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBarHighstockComponent } from './chart-bar-highstock.component';

describe('ChartBarHighstockComponent', () => {
  let component: ChartBarHighstockComponent;
  let fixture: ComponentFixture<ChartBarHighstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartBarHighstockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartBarHighstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
