import { TestBed } from '@angular/core/testing';

import { EstandarRecursoService } from './estandar-recurso.service';

describe('EstandarRecursoService', () => {
  let service: EstandarRecursoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstandarRecursoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
