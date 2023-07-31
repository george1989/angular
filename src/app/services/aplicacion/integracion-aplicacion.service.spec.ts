import { TestBed } from '@angular/core/testing';

import { IntegracionAplicacionService } from './integracion-aplicacion.service';

describe('IntegracionAplicacionService', () => {
  let service: IntegracionAplicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntegracionAplicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
