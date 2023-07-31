import { TestBed } from '@angular/core/testing';

import { EstandarLogicaService } from './estandar-logica.service';

describe('EstandarLogicaService', () => {
  let service: EstandarLogicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstandarLogicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
