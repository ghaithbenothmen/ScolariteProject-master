import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuPageComponent } from './actu-page.component';

describe('ActuPageComponent', () => {
  let component: ActuPageComponent;
  let fixture: ComponentFixture<ActuPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActuPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActuPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
