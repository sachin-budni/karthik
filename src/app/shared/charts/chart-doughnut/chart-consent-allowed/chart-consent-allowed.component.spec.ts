import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartConsentAllowedComponent } from './chart-consent-allowed.component';

describe('ChartConsentAllowedComponent', () => {
  let component: ChartConsentAllowedComponent;
  let fixture: ComponentFixture<ChartConsentAllowedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartConsentAllowedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartConsentAllowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
