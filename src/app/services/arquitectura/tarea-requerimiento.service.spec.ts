import { TestBed } from '@angular/core/testing';

import { TareaRequerimientoService } from './tarea-requerimiento.service';

describe('TareaRequerimientoService', () => {
  let service: TareaRequerimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareaRequerimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
