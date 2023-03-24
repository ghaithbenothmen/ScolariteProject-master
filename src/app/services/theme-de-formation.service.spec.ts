import { TestBed } from '@angular/core/testing';

import { ThemeDeFormationService } from '../services/theme-de-formation.service';

describe('ThemeDeFormationService', () => {
  let service: ThemeDeFormationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeDeFormationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
