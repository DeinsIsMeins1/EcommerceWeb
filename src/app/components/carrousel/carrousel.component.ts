import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss'],
})
export class CarrouselComponent implements OnInit {

  @Output() obtenerCarrouselEvent: EventEmitter<void> = new EventEmitter<void>();

  @Input() itemCarrousel: { ruta: string }[] = [];

  config: SwiperOptions = {
    slidesPerView: 1,
    pagination: true,
    // navigation: true,
    spaceBetween: 20,
    loop: true,
    autoplay: true
  };
  datosPDX: any;

  mostrarNombre1: string | undefined;
  mostrarNombre2: string | undefined;
  mostrarNombre3: string | undefined;
  mostrarNombre4: string | undefined;
  mostrarNombre5: string | undefined;

  previewImage: string | ArrayBuffer | null = null;
  bannerArray: any;




  constructor(private router: Router, public variables: VariablesGlobalesService) { }

  ngOnInit() {
    this.obtenerConfiguracion();

    this.obtenerCarrouselEvent.subscribe(() => {
      this.obtenerConfiguracion();
    });
  }

  ionViewDidEnter() {
    this.obtenerConfiguracion();
  }


  mover() {
    this.router.navigate(['/categorias']);
  }


  obtenerConfiguracion() {


    this.variables.obtenerConfiguracion().subscribe(
      async (dataReturnFromService: any) => {
        this.datosPDX = (dataReturnFromService);
        this.previewImage = this.datosPDX.slider + '?timestamp=' + Date.now();
        this.bannerArray = Object.values(this.datosPDX.slider);

      }
    );


  }

}
