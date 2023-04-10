import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichagesessionDeFormationComponent } from './affichagesession-de-formation.component';

describe('AffichagesessionDeFormationComponent', () => {
  let component: AffichagesessionDeFormationComponent;
  let fixture: ComponentFixture<AffichagesessionDeFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffichagesessionDeFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffichagesessionDeFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
