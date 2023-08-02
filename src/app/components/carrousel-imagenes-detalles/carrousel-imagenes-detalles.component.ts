import { Component, Input, OnInit } from '@angular/core';
import SwiperCore, { SwiperOptions,Navigation,Pagination,  Scrollbar,  A11y,  Autoplay,  EffectCoverflow, } from 'swiper';

SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCoverflow,
]);


@Component({
  selector: 'app-carrousel-imagenes-detalles',
  templateUrl: './carrousel-imagenes-detalles.component.html',
  styleUrls: ['./carrousel-imagenes-detalles.component.scss'],
})
export class CarrouselImagenesDetallesComponent  implements OnInit {
  @Input() dataFromService: { image: string }[] = [];

  
  config: SwiperOptions = {
    slidesPerView: 3,
    // navigation: true,
    pagination: true,
    // spaceBetween: 10,
    loop: true,
    autoplay: true
  };

  constructor() { }

  ngOnInit() {}

}
