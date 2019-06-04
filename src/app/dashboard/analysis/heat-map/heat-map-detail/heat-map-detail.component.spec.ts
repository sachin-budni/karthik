import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatMapDetailComponent } from './heat-map-detail.component';

describe('HeatMapDetailComponent', () => {
  let component: HeatMapDetailComponent;
  let fixture: ComponentFixture<HeatMapDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatMapDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatMapDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
