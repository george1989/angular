import { TestBed } from '@angular/core/testing';

import { ComponenteAplicacionService } from './componente-aplicacion.service';

describe('ComponenteAplicacionService', () => {
  let service: ComponenteAplicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponenteAplicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
