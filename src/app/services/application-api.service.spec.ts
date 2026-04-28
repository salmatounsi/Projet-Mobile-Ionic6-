import { TestBed } from '@angular/core/testing';

import { ApplicationApi } from './application-api.service.ts';

describe('ApplicationApi', () => {
  let service: ApplicationApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
