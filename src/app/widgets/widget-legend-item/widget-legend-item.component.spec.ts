import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetLegendItemComponent } from './widget-legend-item.component';

describe('WidgetLegendItemComponent', () => {
  let component: WidgetLegendItemComponent;
  let fixture: ComponentFixture<WidgetLegendItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetLegendItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetLegendItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
