import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummeryTrackedComponent } from './summery-tracked.component';

describe('SummeryTrackedComponent', () => {
  let component: SummeryTrackedComponent;
  let fixture: ComponentFixture<SummeryTrackedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummeryTrackedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummeryTrackedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
