import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoAplicacionComponent } from './recurso-aplicacion.component';

describe('RecursoAplicacionComponent', () => {
  let component: RecursoAplicacionComponent;
  let fixture: ComponentFixture<RecursoAplicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursoAplicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecursoAplicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
