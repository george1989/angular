import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicacionListComponent } from './aplicacion-list.component';

describe('AplicacionListComponent', () => {
  let component: AplicacionListComponent;
  let fixture: ComponentFixture<AplicacionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AplicacionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicacionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
