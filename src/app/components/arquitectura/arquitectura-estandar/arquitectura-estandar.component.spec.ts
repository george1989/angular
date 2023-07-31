import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArquitecturaEstandarComponent } from './arquitectura-estandar.component';

describe('ArquitecturaEstandarComponent', () => {
  let component: ArquitecturaEstandarComponent;
  let fixture: ComponentFixture<ArquitecturaEstandarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArquitecturaEstandarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArquitecturaEstandarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
