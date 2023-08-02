import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompAgregarTarjetasComponent } from './comp-agregar-tarjetas.component';

describe('CompAgregarTarjetasComponent', () => {
  let component: CompAgregarTarjetasComponent;
  let fixture: ComponentFixture<CompAgregarTarjetasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompAgregarTarjetasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompAgregarTarjetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
