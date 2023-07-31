import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentacionAplicacionComponent } from './documentacion-aplicacion.component';

describe('DocumentacionAplicacionComponent', () => {
  let component: DocumentacionAplicacionComponent;
  let fixture: ComponentFixture<DocumentacionAplicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentacionAplicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentacionAplicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
