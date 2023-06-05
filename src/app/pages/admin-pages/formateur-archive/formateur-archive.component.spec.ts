import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateurArchiveComponent } from './formateur-archive.component';

describe('FormateurArchiveComponent', () => {
  let component: FormateurArchiveComponent;
  let fixture: ComponentFixture<FormateurArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormateurArchiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormateurArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
