import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraestructuraAplicacionComponent } from './infraestructura-aplicacion.component';

describe('InfraestructuraAplicacionComponent', () => {
  let component: InfraestructuraAplicacionComponent;
  let fixture: ComponentFixture<InfraestructuraAplicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfraestructuraAplicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfraestructuraAplicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
