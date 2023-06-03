import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprenantArchComponent } from './apprenant-arch.component';

describe('ApprenantArchComponent', () => {
  let component: ApprenantArchComponent;
  let fixture: ComponentFixture<ApprenantArchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprenantArchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprenantArchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
