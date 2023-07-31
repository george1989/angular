import { TestBed } from '@angular/core/testing';

import { HitoRequerimientoService } from './hito-requerimiento.service';

describe('HitoRequerimientoService', () => {
  let service: HitoRequerimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HitoRequerimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
