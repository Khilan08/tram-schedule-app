import { TestBed } from '@angular/core/testing';

import { TramService } from './tram.service';

describe('TramService', () => {
  let service: TramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
