import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeDeFormationComponent } from './theme-de-formation.component';

describe('ThemeDeFormationComponent', () => {
  let component: ThemeDeFormationComponent;
  let fixture: ComponentFixture<ThemeDeFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeDeFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeDeFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
