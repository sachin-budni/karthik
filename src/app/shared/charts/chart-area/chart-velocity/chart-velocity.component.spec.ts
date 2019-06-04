import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartVelocityComponent } from './chart-velocity.component';

describe('ChartVelocityComponent', () => {
  let component: ChartVelocityComponent;
  let fixture: ComponentFixture<ChartVelocityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartVelocityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartVelocityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
