import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarForComponent } from './navbar-for.component';

describe('NavbarForComponent', () => {
  let component: NavbarForComponent;
  let fixture: ComponentFixture<NavbarForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarForComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
