import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAplicacionComponent } from './add-aplicacion.component';

describe('AddAplicacionComponent', () => {
  let component: AddAplicacionComponent;
  let fixture: ComponentFixture<AddAplicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAplicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAplicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
