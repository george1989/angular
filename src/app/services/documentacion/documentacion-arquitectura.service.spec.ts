import { TestBed } from '@angular/core/testing';

import { DocumentacionArquitecturaService } from './documentacion-arquitectura.service';

describe('DocumentacionArquitecturaService', () => {
  let service: DocumentacionArquitecturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentacionArquitecturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
