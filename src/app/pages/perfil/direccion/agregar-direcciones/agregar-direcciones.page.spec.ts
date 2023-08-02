import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarDireccionesPage } from './agregar-direcciones.page';

describe('AgregarDireccionesPage', () => {
  let component: AgregarDireccionesPage;
  let fixture: ComponentFixture<AgregarDireccionesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgregarDireccionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
