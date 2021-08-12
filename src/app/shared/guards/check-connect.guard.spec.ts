import { TestBed } from '@angular/core/testing';

import { CheckConnectGuard } from './check-connect.guard';

describe('CheckConnectGuard', () => {
  let guard: CheckConnectGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckConnectGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
