import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideForComponent } from './side-for.component';

describe('SideForComponent', () => {
  let component: SideForComponent;
  let fixture: ComponentFixture<SideForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideForComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
