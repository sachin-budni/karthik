import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TbBubbleComponent } from './tb-bubble.component';

describe('TbBubbleComponent', () => {
  let component: TbBubbleComponent;
  let fixture: ComponentFixture<TbBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TbBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TbBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
