import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnologiaAplicacionComponent } from './tecnologia-aplicacion.component';

describe('TecnologiaAplicacionComponent', () => {
  let component: TecnologiaAplicacionComponent;
  let fixture: ComponentFixture<TecnologiaAplicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TecnologiaAplicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TecnologiaAplicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
