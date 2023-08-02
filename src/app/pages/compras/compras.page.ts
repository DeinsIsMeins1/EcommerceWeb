import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { VariablesGlobalesService } from 'src/app/servicios/variables-globales.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {

  dataFromService: any;
  mostrarFavorito: any;

  constructor(
    public variables: VariablesGlobalesService,
    private router: Router,
    private appComponent: AppComponent
  ) { }

  ngOnInit() {
    this.obtenerCompras();
  }

  obtenerCompras() {

    if (this.variables.checkLogin()) {
      const idUsuario = localStorage.getItem('id');
      //Guardamos el usuario y la contraseña en una variable para mandarla a LoginEmpleado en proveedor
      const datos = "userid=" + idUsuario;

      this.variables.showLoader('Cargando contenido...');



      this.variables.obtenerCompras(datos).subscribe(
        async (dataReturnFromService: any) => {

          //Obtenemos la respuesta del API en dataReturnFromService
          //Guardamos la variable del api dentro de this.dataFromService
          this.dataFromService = (dataReturnFromService);

          const itemsLength = this.dataFromService.length;

          if (itemsLength == 0) {
            this.mostrarFavorito = false;
          }
          else {
            this.mostrarFavorito = true;
          }

          // this.variables.log(this.dataFromService);

          this.variables.hideLoader('', 1000);

        },
      );

    }


  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();

      this.ngOnInit();
      this.ionViewDidEnter();
    }, 1000);
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
  };

}
