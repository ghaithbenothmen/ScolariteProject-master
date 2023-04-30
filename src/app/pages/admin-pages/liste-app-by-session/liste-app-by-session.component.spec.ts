import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAppBySessionComponent } from './liste-app-by-session.component';

describe('ListeAppBySessionComponent', () => {
  let component: ListeAppBySessionComponent;
  let fixture: ComponentFixture<ListeAppBySessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeAppBySessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeAppBySessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
