import { TestBed } from '@angular/core/testing';

import { SessionFormationServiceService } from './session-formation.service';

describe('SessionFormationServiceService', () => {
  let service: SessionFormationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionFormationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
