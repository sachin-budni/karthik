import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartStackedbarComponent } from './chart-stackedbar.component';

describe('ChartStackedbarComponent', () => {
  let component: ChartStackedbarComponent;
  let fixture: ComponentFixture<ChartStackedbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartStackedbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartStackedbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
