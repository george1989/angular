import { TestBed } from '@angular/core/testing';

import { TecnologiaAplicacionService } from './tecnologia-aplicacion.service';

describe('TecnologiaAplicacionService', () => {
  let service: TecnologiaAplicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TecnologiaAplicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
