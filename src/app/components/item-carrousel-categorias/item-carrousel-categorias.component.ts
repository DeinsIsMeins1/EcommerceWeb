import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
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
  selector: 'app-item-carrousel-categorias',
  templateUrl: './item-carrousel-categorias.component.html',
  styleUrls: ['./item-carrousel-categorias.component.scss'],
})
export class ItemCarrouselCategoriasComponent implements OnInit {

  @Output() obtenerCategoriasEvent: EventEmitter<void> = new EventEmitter<void>();

  @Output() componenteCargado = new EventEmitter<void>();

  config: SwiperOptions = {
    slidesPerView: 5,
    navigation: true,
  };

  dataFromService: any;
  loaded: any;
  contenidoCategoria: any;
  categorias: any;
  categoriaSeleccionada: any;
  contenidoPDX: any;
  categoriasAgrupadas: any;

  constructor(
    public variables: VariablesGlobalesService,
    private router: Router) { }

  ngOnInit() {

    // this.obtenerProductos();
    this.obtenerCategorias();

    this.obtenerCategoriasEvent.subscribe(() => {
      this.obtenerCategorias();
    });


    // this.obtenerProductosPDX();
  }

  ngOnChanges() {

  }

  obtenerCategorias() {

    this.loaded = false;


    this.variables.obtenerProductosPDX().subscribe(
      async (dataReturnFromService: any) => {
        this.categorias = dataReturnFromService;

        this.categoriasAgrupadas = this.agruparProductosPorCategoria();
        // console.log(Object.keys(this.categoriasAgrupadas));
        this.categoriasAgrupadas = Object.keys(this.categoriasAgrupadas)

        // Obtener un índice aleatorio basado en la longitud de la matriz de categorías
        const indiceAleatorio = Math.floor(Math.random() * this.categoriasAgrupadas.length);

        // Obtener la categoría seleccionada al azar
        this.categoriaSeleccionada = this.categoriasAgrupadas[indiceAleatorio];

        // Llamar al método obtenerCategoria() con la categoría seleccionada al azar
        this.obtenerCategoria(this.categoriaSeleccionada);
      }
    );
  }

  ngAfterViewInit() {
    // console.log('Ya se cargó');

  }

  obtenerCategoria(categoria: any) {
    this.variables.obtenerCategoria(categoria).subscribe(
      async (dataReturnFromService: any) => {
        this.contenidoCategoria = (dataReturnFromService);
        console.log(this.contenidoCategoria);
        this.loaded = true;
      }
    );

  }


  agruparProductosPorCategoria() {
    const productosAgrupados: any = {};

    for (const item of this.categorias) {
      const categoria = item.category;

      if (productosAgrupados[categoria]) {
        productosAgrupados[categoria].push(item);
      } else {
        productosAgrupados[categoria] = [item];
      }
    }

    return productosAgrupados;
  }

  verDetalles(id: any) {
    const idString = id.toString().trim();

    if (idString !== '') {
      this.router.navigate(['/detalles', idString]);
    } else {
      console.error('El ID del producto es inválido.');
    }
  }

}
