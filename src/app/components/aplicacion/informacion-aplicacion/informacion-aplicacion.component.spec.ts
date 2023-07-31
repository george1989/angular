import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionAplicacionComponent } from './informacion-aplicacion.component';

describe('InformacionAplicacionComponent', () => {
  let component: InformacionAplicacionComponent;
  let fixture: ComponentFixture<InformacionAplicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionAplicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacionAplicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
