import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentacionArquitecturaComponent } from './documentacion-arquitectura.component';

describe('DocumentacionArquitecturaComponent', () => {
  let component: DocumentacionArquitecturaComponent;
  let fixture: ComponentFixture<DocumentacionArquitecturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentacionArquitecturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentacionArquitecturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
