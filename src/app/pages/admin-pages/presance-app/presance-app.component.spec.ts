import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresanceAppComponent } from './presance-app.component';

describe('PresanceAppComponent', () => {
  let component: PresanceAppComponent;
  let fixture: ComponentFixture<PresanceAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresanceAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresanceAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
