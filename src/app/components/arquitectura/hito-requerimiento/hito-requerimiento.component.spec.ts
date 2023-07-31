import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HitoRequerimientoComponent } from './hito-requerimiento.component';

describe('HitoRequerimientoComponent', () => {
  let component: HitoRequerimientoComponent;
  let fixture: ComponentFixture<HitoRequerimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HitoRequerimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HitoRequerimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
