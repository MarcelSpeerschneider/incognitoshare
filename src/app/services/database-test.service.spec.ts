import { TestBed } from '@angular/core/testing';

import { DatabaseTestService } from './database-test.service';

describe('DatabaseTestService', () => {
  let service: DatabaseTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
