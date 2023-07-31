import { TestBed } from '@angular/core/testing';

import { RecursoAplicacionService } from './recurso-aplicacion.service';

describe('RecursoAplicacionService', () => {
  let service: RecursoAplicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecursoAplicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
