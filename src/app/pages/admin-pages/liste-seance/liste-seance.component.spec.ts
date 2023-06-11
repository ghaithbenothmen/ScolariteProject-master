import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSeanceComponent } from './liste-seance.component';

describe('ListeSeanceComponent', () => {
  let component: ListeSeanceComponent;
  let fixture: ComponentFixture<ListeSeanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeSeanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeSeanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
