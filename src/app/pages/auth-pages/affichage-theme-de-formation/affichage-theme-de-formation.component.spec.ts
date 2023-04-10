import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageThemeDeFormationComponent } from './affichage-theme-de-formation.component';

describe('AffichageThemeDeFormationComponent', () => {
  let component: AffichageThemeDeFormationComponent;
  let fixture: ComponentFixture<AffichageThemeDeFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffichageThemeDeFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffichageThemeDeFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
