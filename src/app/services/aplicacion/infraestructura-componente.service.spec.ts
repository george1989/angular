import { TestBed } from '@angular/core/testing';

import { InfraestructuraComponenteService } from './infraestructura-componente.service';

describe('InfraestructuraComponenteService', () => {
  let service: InfraestructuraComponenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfraestructuraComponenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
