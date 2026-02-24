import { TestBed } from '@angular/core/testing';

import { SignupData } from './signup-data.service.js';

describe('SignupData', () => {
  let service: SignupData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
