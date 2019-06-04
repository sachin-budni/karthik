import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDoughnutComponent } from './chat-doughnut.component';

describe('ChatDoughnutComponent', () => {
  let component: ChatDoughnutComponent;
  let fixture: ComponentFixture<ChatDoughnutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatDoughnutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatDoughnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
