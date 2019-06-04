import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDaysComponent } from './filter-days.component';

describe('FilterDaysComponent', () => {
  let component: FilterDaysComponent;
  let fixture: ComponentFixture<FilterDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
