import { TestBed } from '@angular/core/testing';

import { GrupoVocabularioService } from './grupo-vocabulario.service';

describe('GrupoVocabularioService', () => {
  let service: GrupoVocabularioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoVocabularioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
