import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompAgregarDireccionesComponent } from './comp-agregar-direcciones.component';

describe('CompAgregarDireccionesComponent', () => {
  let component: CompAgregarDireccionesComponent;
  let fixture: ComponentFixture<CompAgregarDireccionesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompAgregarDireccionesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompAgregarDireccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
