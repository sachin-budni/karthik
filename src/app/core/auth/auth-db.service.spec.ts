import { TestBed } from '@angular/core/testing';

import { AuthDbService } from './auth-db.service';

describe('AuthDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthDbService = TestBed.get(AuthDbService);
    expect(service).toBeTruthy();
  });
});
