import { TestBed } from '@angular/core/testing';

import { PageIdService } from './page-id.service';

describe('PageIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageIdService = TestBed.get(PageIdService);
    expect(service).toBeTruthy();
  });
});
