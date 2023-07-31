import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegracionAplicacionComponent } from './integracion-aplicacion.component';

describe('IntegracionAplicacionComponent', () => {
  let component: IntegracionAplicacionComponent;
  let fixture: ComponentFixture<IntegracionAplicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegracionAplicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntegracionAplicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
