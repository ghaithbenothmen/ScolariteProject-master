import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeanceAppComponent } from './seance-app.component';

describe('SeanceAppComponent', () => {
  let component: SeanceAppComponent;
  let fixture: ComponentFixture<SeanceAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeanceAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeanceAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
