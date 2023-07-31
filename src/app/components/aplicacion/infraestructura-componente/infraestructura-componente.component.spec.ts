import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraestructuraComponenteComponent } from './infraestructura-componente.component';

describe('InfraestructuraComponenteComponent', () => {
  let component: InfraestructuraComponenteComponent;
  let fixture: ComponentFixture<InfraestructuraComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfraestructuraComponenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfraestructuraComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
