import { TestBed } from '@angular/core/testing';

import { NumerapiService } from './numerapi.service';

describe('NumerapiService', () => {
  let service: NumerapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumerapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
