import { TestBed } from '@angular/core/testing';

import { InfraestructuraAplicacionService } from './infraestructura-aplicacion.service';

describe('InfraestructuraAplicacionService', () => {
  let service: InfraestructuraAplicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfraestructuraAplicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
