import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VariablesGlobalesService } from 'src/app/servicios/variables-globales.service';

@Component({
  selector: 'app-lista-busqueda',
  templateUrl: './lista-busqueda.page.html',
  styleUrls: ['./lista-busqueda.page.scss'],
})
export class ListaBusquedaPage implements OnInit {

  dataFromService: [] = [];
  contenidoCategoria: any;
  titulo: any;
  paramValue: any;
  resultadoCompleto: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,public variables: VariablesGlobalesService) { }

  ngOnInit() {
  }


  ionViewDidEnter() {

    this.obtenerParametro();

    
  }


  obtenerParametro() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.paramValue = params.get('busqueda');
      // console.log(this.paramValue);

      this.verBusqueda(this.paramValue);

      // Llama a la función para obtener los detalles usando el parámetro recibido
    });

  }


  verDetalles(id: any) {
    const idString = id.toString().trim();

    if (idString !== '') {
      this.router.navigate(['/detalles', idString]);
    } else {
      console.error('El ID del producto es inválido.');
    }





  }


  verBusqueda(word : string) {

    const busqueda = 'word=' + word;

    this.variables.buscarProductosCompletosPDX(busqueda).subscribe(
      (dataReturnFromService: any) => {
        this.contenidoCategoria = dataReturnFromService;
        // Vuelve a asignar el valor filtrado después de recibir los datos actualizados
        
      }
    );
  }


}
