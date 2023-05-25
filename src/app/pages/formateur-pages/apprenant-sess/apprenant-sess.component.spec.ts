import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprenantSessComponent } from './apprenant-sess.component';

describe('ApprenantSessComponent', () => {
  let component: ApprenantSessComponent;
  let fixture: ComponentFixture<ApprenantSessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprenantSessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprenantSessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
