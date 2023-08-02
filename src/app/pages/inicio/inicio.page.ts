import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { BannerComponent } from 'src/app/components/banner/banner.component';
import { CarrouselComponent } from 'src/app/components/carrousel/carrousel.component';
import { ItemCarrouselComponent } from 'src/app/components/item-carrousel/item-carrousel.component';
import { VariablesGlobalesService } from 'src/app/servicios/variables-globales.service';
import SwiperCore, { SwiperOptions, Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCoverflow, } from 'swiper';

SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCoverflow,
]);


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  @ViewChildren(ItemCarrouselComponent) itemCarrouselComponents!: QueryList<ItemCarrouselComponent>;

  @ViewChildren(CarrouselComponent) carrouselComponents!: QueryList<CarrouselComponent>;

  @ViewChildren(BannerComponent) bannerComponents!: QueryList<BannerComponent>;

  config: SwiperOptions = {
    slidesPerView: 5,
    // navigation: true,
    // spaceBetween: 5,


    loop: true,
    autoplay: true
  };

  titulo: string = '';

  dataFromService: any;
  datosPDX: any;

  itemCarrousel = [
    { ruta: 'assets/banner/car1.jpeg' },
    { ruta: 'assets/banner/car2.jpeg' },
    { ruta: 'assets/banner/car3.jpeg' },
  ];

  itemPromo = [
    { ruta: 'assets/banner/banner.jpg', titulo: 'Promocion' }
  ];

  itemBanner = [
    { ruta: 'assets/banner/banner2.png' }
  ];


  itemTituloProductos = [
    { titulo: 'Titulo generico' }
  ]
    ;
  isLoading: boolean = true;



  constructor(public variables: VariablesGlobalesService, private appComponent: AppComponent) { }

  ngOnInit() {


    //this.obtenerConfiguracion();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      this.itemCarrouselComponents.forEach(itemCarrouselComponent => {
        itemCarrouselComponent.obtenerCategoriasEvent.emit();
      });



      this.carrouselComponents.forEach(CarrouselComponent => {
        CarrouselComponent.obtenerCarrouselEvent.emit();
      });




      this.bannerComponents.forEach(BannerComponent => {
        BannerComponent.obtenerBannerEvent.emit();
      });



    }, 1000);



  }


  onComponenteCargado() {
    // Acciones a realizar cuando el componente hijo se haya cargado
    console.log('El componente hijo se ha cargado.');
  }

  ionViewDidEnter() {
    this.appComponent.cargarBadge();

    setTimeout(() => {
      // Una vez que los componentes se han cargado por completo, cambia el estado de isLoading
      this.isLoading = false;
    }, 2000); // Tiempo de espera simulado de 5 segundos

  }









}
