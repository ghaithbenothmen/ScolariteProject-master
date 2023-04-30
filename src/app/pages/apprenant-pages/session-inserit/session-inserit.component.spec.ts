import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionInseritComponent } from './session-inserit.component';

describe('SessionInseritComponent', () => {
  let component: SessionInseritComponent;
  let fixture: ComponentFixture<SessionInseritComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionInseritComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionInseritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
