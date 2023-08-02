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
  selector: 'app-carrousel-categorias',
  templateUrl: './carrousel-categorias.component.html',
  styleUrls: ['./carrousel-categorias.component.scss'],
})
export class CarrouselCategoriasComponent implements OnInit {


  @Output() obtenerNombresCategoriasEvent: EventEmitter<void> = new EventEmitter<void>();

  dataFromService: any;

  config: SwiperOptions = {
    slidesPerView: 3,

  };


  loaded: any;
  contenidoPDX: any;
  productosAgrupados: any;

  constructor(
    public variables: VariablesGlobalesService,
    private router: Router
  ) { }

  ngOnInit() {

    this.obtenerNombresCategoriasEvent.subscribe(() => {
      this.obtenerProductosPDX();
    });

    this.obtenerProductosPDX();

  }


  obtenerProductosPDX() {
    this.loaded = false;
  
    this.variables.obtenerProductosPDX().subscribe(
      async (dataReturnFromService: any) => {
        this.contenidoPDX = dataReturnFromService;
        this.productosAgrupados = this.agruparProductosPorCategoria();
        this.loaded = true;
        // console.log('------------------', this.contenidoPDX);
      }
    );
  }

  agruparProductosPorCategoria() {
    const productosAgrupados: any = {};
  
    for (const item of this.contenidoPDX) {
      const categoria = item.category;
  
      if (productosAgrupados[categoria]) {
        productosAgrupados[categoria].push(item);
      } else {
        productosAgrupados[categoria] = [item];
      }
    }
  
    return productosAgrupados;
  }
  


  moverCategoria(categoria: any) {
    const idString = categoria.toString().trim();

    if (idString !== '') {
      this.router.navigate(['/categoria', categoria]);
    } else {
      console.error('El ID del producto es inválido.');
    }
  }
}
