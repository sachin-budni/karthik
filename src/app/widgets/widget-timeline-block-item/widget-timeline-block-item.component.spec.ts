import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetTimelineBlockItemComponent } from './widget-timeline-block-item.component';

describe('WidgetTimelineBlockItemComponent', () => {
  let component: WidgetTimelineBlockItemComponent;
  let fixture: ComponentFixture<WidgetTimelineBlockItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetTimelineBlockItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetTimelineBlockItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
