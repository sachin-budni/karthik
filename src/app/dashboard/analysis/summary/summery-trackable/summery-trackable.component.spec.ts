import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummeryTrackableComponent } from './summery-trackable.component';

describe('SummeryTrackableComponent', () => {
  let component: SummeryTrackableComponent;
  let fixture: ComponentFixture<SummeryTrackableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummeryTrackableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummeryTrackableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
