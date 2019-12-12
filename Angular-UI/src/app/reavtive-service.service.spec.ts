import { TestBed } from '@angular/core/testing';

import { ReavtiveServiceService } from './reavtive-service.service';

describe('ReavtiveServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReavtiveServiceService = TestBed.get(ReavtiveServiceService);
    expect(service).toBeTruthy();
  });
});
