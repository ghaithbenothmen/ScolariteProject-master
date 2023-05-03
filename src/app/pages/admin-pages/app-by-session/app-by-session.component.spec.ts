import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBySessionComponent } from './app-by-session.component';

describe('AppBySessionComponent', () => {
  let component: AppBySessionComponent;
  let fixture: ComponentFixture<AppBySessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppBySessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppBySessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
