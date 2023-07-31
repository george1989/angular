import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstandarLogicaComponent } from './estandar-logica.component';

describe('EstandarLogicaComponent', () => {
  let component: EstandarLogicaComponent;
  let fixture: ComponentFixture<EstandarLogicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstandarLogicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstandarLogicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
