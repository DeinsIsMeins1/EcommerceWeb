import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaBusquedaPage } from './lista-busqueda.page';

describe('ListaBusquedaPage', () => {
  let component: ListaBusquedaPage;
  let fixture: ComponentFixture<ListaBusquedaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListaBusquedaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
