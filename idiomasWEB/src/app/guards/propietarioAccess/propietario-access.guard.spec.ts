import { TestBed } from '@angular/core/testing';

import { PropietarioAccessGuard } from './propietario-access.guard';

describe('PropietarioAccessGuard', () => {
  let guard: PropietarioAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PropietarioAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
