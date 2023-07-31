import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicacionDetailsComponent } from './aplicacion-details.component';

describe('AplicacionDetailsComponent', () => {
  let component: AplicacionDetailsComponent;
  let fixture: ComponentFixture<AplicacionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AplicacionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicacionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
