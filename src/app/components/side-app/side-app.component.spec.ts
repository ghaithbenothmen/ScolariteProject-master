import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideAppComponent } from './side-app.component';

describe('SideAppComponent', () => {
  let component: SideAppComponent;
  let fixture: ComponentFixture<SideAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
