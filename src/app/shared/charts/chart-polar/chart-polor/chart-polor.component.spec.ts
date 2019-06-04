import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPolorComponent } from './chart-polor.component';

describe('ChartPolorComponent', () => {
  let component: ChartPolorComponent;
  let fixture: ComponentFixture<ChartPolorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartPolorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPolorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
