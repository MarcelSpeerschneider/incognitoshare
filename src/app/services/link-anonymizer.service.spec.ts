import { TestBed } from '@angular/core/testing';

import { LinkAnonymizerService } from './link-anonymizer.service';

describe('LinkAnonymizerService', () => {
  let service: LinkAnonymizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkAnonymizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
