import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItemCarrouselCategoriasComponent } from './item-carrousel-categorias.component';

describe('ItemCarrouselCategoriasComponent', () => {
  let component: ItemCarrouselCategoriasComponent;
  let fixture: ComponentFixture<ItemCarrouselCategoriasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCarrouselCategoriasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemCarrouselCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
