import { TestBed } from '@angular/core/testing';

import { DocumentacionAplicacionService } from './documentacion-aplicacion.service';

describe('DocumentacionAplicacionService', () => {
  let service: DocumentacionAplicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentacionAplicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
