import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstandarRecursoComponent } from './estandar-recurso.component';

describe('EstandarRecursoComponent', () => {
  let component: EstandarRecursoComponent;
  let fixture: ComponentFixture<EstandarRecursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstandarRecursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstandarRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
