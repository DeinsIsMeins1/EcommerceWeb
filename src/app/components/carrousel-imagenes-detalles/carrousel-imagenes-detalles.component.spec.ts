import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarrouselImagenesDetallesComponent } from './carrousel-imagenes-detalles.component';

describe('CarrouselImagenesDetallesComponent', () => {
  let component: CarrouselImagenesDetallesComponent;
  let fixture: ComponentFixture<CarrouselImagenesDetallesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrouselImagenesDetallesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarrouselImagenesDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
