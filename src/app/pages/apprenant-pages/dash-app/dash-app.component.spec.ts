import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAppComponent } from './dash-app.component';

describe('DashAppComponent', () => {
  let component: DashAppComponent;
  let fixture: ComponentFixture<DashAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
