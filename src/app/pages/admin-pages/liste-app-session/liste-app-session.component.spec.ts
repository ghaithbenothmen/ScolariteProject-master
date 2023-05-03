import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAppSessionComponent } from './liste-app-session.component';

describe('ListeAppSessionComponent', () => {
  let component: ListeAppSessionComponent;
  let fixture: ComponentFixture<ListeAppSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeAppSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeAppSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
