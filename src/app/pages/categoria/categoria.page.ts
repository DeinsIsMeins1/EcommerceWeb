import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { VariablesGlobalesService } from 'src/app/servicios/variables-globales.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

  dataFromService: [] = [];
  contenidoCategoria: any;
  titulo: any;
  paramValue: any;

  constructor(
    public variables: VariablesGlobalesService,
    private appComponent: AppComponent,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.obtenerUbicacion();
  }
  obtenerUbicacion() {
    this.titulo = localStorage.getItem('ubicacion');
  }

  ionViewDidLeave() {
    localStorage.removeItem('ubicacion');
  }

  ionViewDidEnter() {
    this.appComponent.cargarBadge();
    this.obtenerParametro();
  }

  obtenerParametro(){
    this.activatedRoute.paramMap.subscribe(params => {
      this.paramValue = params.get('categoria');
      // console.log(this.paramValue);
  
      // Llama a la función para obtener los detalles usando el parámetro recibido
      this.obenerCategoria(this.paramValue);
    });

  }

  obenerCategoria(categoria: any) {
    this.variables.obtenerCategoria(categoria).subscribe(
      async (dataReturnFromService: any) => {
        this.contenidoCategoria = (dataReturnFromService);
        // console.log(this.contenidoCategoria);
        
      }
    );

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
