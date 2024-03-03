import { TestBed } from '@angular/core/testing';

import { LanguageAccessGuard } from './language-access.guard';

describe('LanguageAccessGuard', () => {
  let guard: LanguageAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LanguageAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
