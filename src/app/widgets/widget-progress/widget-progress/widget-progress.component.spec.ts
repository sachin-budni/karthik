import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetProgressComponent } from './widget-progress.component';

describe('WidgetProgressComponent', () => {
  let component: WidgetProgressComponent;
  let fixture: ComponentFixture<WidgetProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
