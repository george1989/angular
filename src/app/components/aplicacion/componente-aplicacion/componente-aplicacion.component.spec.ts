import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteAplicacionComponent } from './componente-aplicacion.component';

describe('ComponenteAplicacionComponent', () => {
  let component: ComponenteAplicacionComponent;
  let fixture: ComponentFixture<ComponenteAplicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponenteAplicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteAplicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
