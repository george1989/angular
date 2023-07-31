import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosComponenteComponent } from './recursos-componente.component';

describe('RecursosComponenteComponent', () => {
  let component: RecursosComponenteComponent;
  let fixture: ComponentFixture<RecursosComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursosComponenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecursosComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
