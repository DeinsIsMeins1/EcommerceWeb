import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { VariablesGlobalesService } from 'src/app/servicios/variables-globales.service';

@Component({
  selector: 'app-comp-direcciones',
  templateUrl: './comp-direcciones.component.html',
  styleUrls: ['./comp-direcciones.component.scss'],
})
export class CompDireccionesComponent implements OnInit {

  @Output() itemClickeado: EventEmitter<number> = new EventEmitter<number>();

  @Output() actualizarDire: EventEmitter<void> = new EventEmitter<void>();


  dataFromService: any;


  constructor(private router: Router,
    public variables: VariablesGlobalesService,
    private alertController: AlertController) { }

  ngOnInit() {

    this.obtenerDirecciones();
  }


  ionViewDidEnter() {
    this.obtenerDirecciones();


  }


  public obtenerDirecciones() {


    if (this.variables.checkLogin()) {
      const idUsuario = localStorage.getItem('id');
      //Guardamos el usuario y la contraseña en una variable para mandarla a LoginEmpleado en proveedor
      const datos = "userid=" + idUsuario;

      // this.variables.showLoader('Conectando...');



      this.variables.obtenerDirecciones(datos).subscribe(
        async (dataReturnFromService: any) => {

          //Obtenemos la respuesta del API en dataReturnFromService
          //Guardamos la variable del api dentro de this.dataFromService
          this.dataFromService = (dataReturnFromService);

          this.variables.hideLoader();

          // this.variables.log(dataReturnFromService);



        },
      );

    }




  }

  async confirmDelete(id: any) {
    const alert = await this.alertController.create({
      header: '¿Eliminar direccion?',
      buttons: [
        {
          text: 'Eliminar',
          cssClass: 'rojo',
          handler: () => {
            this.eliminarDireccion(id);
          },
        },
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {

          },
        },
      ],
    });

    await alert.present();

  }

  eliminarDireccion(id: any) {
    const datos = "IdDomicilio=" + id;

    this.variables.showLoader('Eliminando direccion...');



    this.variables.eliminarDireccion(datos).subscribe((response: any) => {
      // this.variables.log('Registro exitoso:', response);
      // Accede al mensaje en la variable "response" directamente
      // Realiza las acciones necesarias después de un registro exitoso
      this.variables.hideLoader();
      this.variables.mensaje('Direccion eliminada');

      this.obtenerDirecciones();
    },
      (error: any) => {
        console.error('Error al registrar:', error);
        // Realiza las acciones necesarias en caso de error
      }
    );

  }


  seleccionarDireccion(item: any, direccionCompleta: any) {
    // this.variables.log('Direccion agregada', item);
    // item = JSON.stringify(item);
    localStorage.setItem('direccion', item);


    const itemCarritoCompleto = JSON.stringify(direccionCompleta);
    localStorage.setItem('direccionCompleta', itemCarritoCompleto);


    // localStorage.setItem('direccionCompleta',   direccionCompleta);


    this.itemClickeado.emit(item);
  }

  mover() {

    this.router.navigate(['/agregar-direcciones']);

  }
}
