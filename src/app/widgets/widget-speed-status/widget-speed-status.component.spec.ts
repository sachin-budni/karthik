import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetSpeedStatusComponent } from './widget-speed-status.component';

describe('WidgetSpeedStatusComponent', () => {
  let component: WidgetSpeedStatusComponent;
  let fixture: ComponentFixture<WidgetSpeedStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetSpeedStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetSpeedStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
