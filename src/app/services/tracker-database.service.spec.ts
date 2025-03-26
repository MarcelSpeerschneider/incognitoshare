import { TestBed } from '@angular/core/testing';

import { TrackerDatabaseService } from './tracker-database.service';

describe('TrackerDatabaseService', () => {
  let service: TrackerDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackerDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
