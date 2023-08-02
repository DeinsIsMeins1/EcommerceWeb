import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CarrouselCategoriasComponent } from 'src/app/components/carrousel-categorias/carrousel-categorias.component';
import { ItemCarrouselComponent } from 'src/app/components/item-carrousel/item-carrousel.component';
import { VariablesGlobalesService } from 'src/app/servicios/variables-globales.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  @ViewChildren(ItemCarrouselComponent) itemCarrouselComponents!: QueryList<ItemCarrouselComponent>;

  @ViewChildren(CarrouselCategoriasComponent) CarrouselCategoriasComponent!: QueryList<CarrouselCategoriasComponent>;

  dataFromService: [] = [];

  contenidoCategoria: any;
  paramValue: any;
  loaded: any;
  titulo: any;
  productosResponse: any;
  categorias: any;
  categoriasAgrupadas: any;
  categoriaSeleccionada: any;
  contenidoPDX: any;
  productosAgrupados: any;
  

  constructor(
    public variables: VariablesGlobalesService,
    private appComponent: AppComponent,
    private router: Router) { }

  ngOnInit() {
    // this.obtenerProductos();
    this.obtenerUbicacion();
  }
  obtenerUbicacion() {
    this.titulo = localStorage.getItem('ubicacion');
  }


  itemCarrouselCategorias = [
    { icono: 'heart-outline', nombre: 'Favoritos' },
    { icono: 'heart-outline', nombre: 'Favoritos' },
    { icono: 'heart-outline', nombre: 'Favoritos' },
    { icono: 'heart-outline', nombre: 'Favoritos' },
    { icono: 'heart-outline', nombre: 'Favoritos' },
    { icono: 'heart-outline', nombre: 'Favoritos' }
  ];

  itemTituloProductos = [
    { titulo: 'Titulo generico' }
  ]

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      this.itemCarrouselComponents.forEach(itemCarrouselComponent => {
        itemCarrouselComponent.obtenerCategoriasEvent.emit();
      });
    }, 1000);

    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      this.CarrouselCategoriasComponent.forEach(CarrouselCategoriasComponent => {
        CarrouselCategoriasComponent.obtenerNombresCategoriasEvent.emit();
      });
    }, 1000);

    
  }


  ionViewDidLeave() {
    localStorage.removeItem('ubicacion');
  }

  verDetalles(id: any) {
    const idString = id.toString().trim();

    if (idString !== '') {
      this.router.navigate(['/detalles', idString]);
    } else {
      console.error('El ID del producto es inválido.');
    }
  }



  ionViewDidEnter() {
    this.appComponent.cargarBadge();
    this.obenerProductos();
    this.obtenerProductosPDX();

    this.titulo = 'Ofertas';
  }

  obtenerProductosPDX() {
    this.loaded = false;
  
    this.variables.obtenerProductosPDX().subscribe(
      async (dataReturnFromService: any) => {
        this.contenidoPDX = dataReturnFromService;
        this.productosAgrupados = this.agruparProductosPorCategoria();
        this.loaded = true;
      }
    );
  }


  mostrarCategoria(categoria: any){

    this.productosResponse = null;


    this.titulo = categoria;
    this.variables.obtenerCategoria(categoria).subscribe(
      async (dataReturnFromService: any) => {
        this.productosResponse = (dataReturnFromService);
        // console.log(this.contenidoCategoria);  
      }
    );
  }



  obenerProductos() {
    this.variables.obtenerProductosPDX().subscribe(
      async (dataReturnFromService: any) => {
        this.productosResponse = dataReturnFromService;
      }
    );

  }

  obtenerCategoria(categoria: any) {
    this.variables.obtenerCategoria(categoria).subscribe(
      async (dataReturnFromService: any) => {
        this.contenidoCategoria = (dataReturnFromService);
        this.loaded = true;
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



}
