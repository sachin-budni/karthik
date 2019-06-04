import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDelayedComponent } from './chart-delayed.component';

describe('ChartDelayedComponent', () => {
  let component: ChartDelayedComponent;
  let fixture: ComponentFixture<ChartDelayedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartDelayedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDelayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
