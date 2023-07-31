import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaRequerimientoComponent } from './tarea-requerimiento.component';

describe('TareaRequerimientoComponent', () => {
  let component: TareaRequerimientoComponent;
  let fixture: ComponentFixture<TareaRequerimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareaRequerimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TareaRequerimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
