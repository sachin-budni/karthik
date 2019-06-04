import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetStepperComponent } from './widget-stepper.component';

describe('WidgetStepperComponent', () => {
  let component: WidgetStepperComponent;
  let fixture: ComponentFixture<WidgetStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
