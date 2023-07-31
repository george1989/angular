import { TestBed } from '@angular/core/testing';

import { ArquitecturaEstandarService } from './arquitectura-estandar.service';

describe('ArquitecturaEstandarService', () => {
  let service: ArquitecturaEstandarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArquitecturaEstandarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
