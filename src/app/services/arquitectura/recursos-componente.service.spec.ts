import { TestBed } from '@angular/core/testing';

import { RecursosComponenteService } from './recursos-componente.service';

describe('RecursosComponenteService', () => {
  let service: RecursosComponenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecursosComponenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
