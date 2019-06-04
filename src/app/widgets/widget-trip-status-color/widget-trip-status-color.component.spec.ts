import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetTripStatusColorComponent } from './widget-trip-status-color.component';

describe('WidgetTripStatusColorComponent', () => {
  let component: WidgetTripStatusColorComponent;
  let fixture: ComponentFixture<WidgetTripStatusColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetTripStatusColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetTripStatusColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
