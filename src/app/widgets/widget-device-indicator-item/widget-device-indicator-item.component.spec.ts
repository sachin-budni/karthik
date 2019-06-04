import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetDeviceIndicatorItemComponent } from './widget-device-indicator-item.component';

describe('WidgetDeviceIndicatorItemComponent', () => {
  let component: WidgetDeviceIndicatorItemComponent;
  let fixture: ComponentFixture<WidgetDeviceIndicatorItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetDeviceIndicatorItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetDeviceIndicatorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
