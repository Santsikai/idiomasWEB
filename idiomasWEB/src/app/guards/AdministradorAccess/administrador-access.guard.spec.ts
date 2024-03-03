import { TestBed } from '@angular/core/testing';

import { AdministradorAccessGuard } from './administrador-access.guard';

describe('AdministradorAccessGuard', () => {
  let guard: AdministradorAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdministradorAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
