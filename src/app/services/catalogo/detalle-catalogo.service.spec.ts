import { TestBed } from '@angular/core/testing';

import { DetalleCatalogoService } from './detalle-catalogo.service';

describe('DetalleCatalogoService', () => {
  let service: DetalleCatalogoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleCatalogoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
