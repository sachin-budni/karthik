import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TbTimelineDottedComponent } from './tb-timeline-dotted.component';

describe('TbTimelineDottedComponent', () => {
  let component: TbTimelineDottedComponent;
  let fixture: ComponentFixture<TbTimelineDottedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TbTimelineDottedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TbTimelineDottedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
