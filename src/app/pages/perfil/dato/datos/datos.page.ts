import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { VariablesGlobalesService } from 'src/app/servicios/variables-globales.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {



  dataFromService: any;
  datosPersonales: any;
  idUsuario: any;

  constructor(private alertController: AlertController, 
    public variables: VariablesGlobalesService,
    private appComponent: AppComponent) { }

  ngOnInit() {
    this.obtenerInfoUser();
  }


  async actualizarUsuario() {
    const alert = await this.alertController.create({
      header: 'Actualizar usuario',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          // this.variables.log('Cancel');
        },
      },
      {
        text: 'Ok',
        handler: (data: any) => {

          const dato = data[0];

          if (typeof dato !== "string" || !/^[a-zA-Z0-9\s]+$/.test(dato.trim())) {
            // La variable no es un texto válido o contiene caracteres no permitidos
            this.variables.presentToast('La variable debe contener solo letras y números');
            return;
          }

          if(!this.dataFromService.telefono){
            this.dataFromService.telefono = '0';
          }

          // console.log(data);


          this.datosPersonales = "userid=" + this.idUsuario + "&username=" + data[0]+ "&nombre=" + this.dataFromService.nombre + "&telefono=" + this.dataFromService.telefono;

          // console.log(this.datosPersonales);

          this.actualizarInfoUser(this.datosPersonales)
          this.appComponent.obtenerInfoUser();
        },
      }],
      inputs: [
        {
          placeholder: 'Usuario',
          attributes: {
            maxlength: 20,
          },
        }
      ],
    });

    await alert.present();
  }

  async actualizarNombre() {
    const alert = await this.alertController.create({
      header: 'Actualizar nombre',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          // this.variables.log('Cancel');
        },
      },
      {
        text: 'Ok',
        handler: (data: any) => {

          const dato = data[0];

          if (typeof dato !== "string" || !/^[a-zA-Z\s]+$/.test(dato)) {
            // La variable no es un texto válido o contiene caracteres no permitidos
            this.variables.presentToast('La variable debe contener solo letras');
            return
          }

          if(!this.dataFromService.telefono){
            console.log('No trae nada',this.dataFromService.telefono);
            this.dataFromService.telefono = '0';
          }
          
          // console.log(data);
          
          
          this.datosPersonales = "userid=" + this.idUsuario + "&username=" + this.dataFromService.usuario + "&nombre=" + data[0] + "&telefono=" + this.dataFromService.telefono;
          
          
          console.log('datos personales', this.datosPersonales);

         


          // console.log('datos personales', this.dataFromService.telefono);
          

          this.actualizarInfoUser(this.datosPersonales)
        },
      }],
      inputs: [
        {
          placeholder: 'Nombre',
          attributes: {
            maxlength: 20,
          },
        }
      ],
    });

    await alert.present();
  }



  async actualizarTelefono() {
    const alert = await this.alertController.create({
      header: 'Actualizar telefono',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler() {
          // console.log('Cancel');

        },
      },
      {
        text: 'Ok',
        handler: (data: any) => {

          const telefonoLenght = data[0].length;

          console.log('---------tamaño telefono',telefonoLenght);
          

          if (telefonoLenght != 10) {
            this.variables.presentToast('Ingresa un total de 10 digitos');
            
            return
          }

          if (typeof data !== "number") {
            // La variable no es un número
            this.variables.presentToast('Solo puexactoedes ingresar numeros');
          }

          if(!this.dataFromService.telefono){
            this.dataFromService.telefono = '0';
          }
      

          // console.log(data);


          this.datosPersonales = "userid=" + this.idUsuario + "&username=" + this.dataFromService.usuario+ "&nombre=" + this.dataFromService.nombre + "&telefono=" + data[0];

          // console.log(this.datosPersonales);




          this.actualizarInfoUser(this.datosPersonales)
        },
      }],
      inputs: [
        {
          type: 'number',
          placeholder: 'Telefono',
          attributes: {
            maxlength: 10,
          },
        }
      ],
    });

    await alert.present();
  }







  obtenerInfoUser() {

    if (this.variables.checkLogin()) {

      this.idUsuario = localStorage.getItem('id');
      //Guardamos el usuario y la contraseña en una variable para mandarla a LoginEmpleado en proveedor
      const datos = "userid=" + this.idUsuario;

      // this.variables.showLoader('Conectando...');



      this.variables.obtenerInfoUser(datos).subscribe(
        async (dataReturnFromService: any) => {

          //Obtenemos la respuesta del API en dataReturnFromService
          //Guardamos la variable del api dentro de this.dataFromService
          this.dataFromService = (dataReturnFromService);

          if(this.dataFromService.telefono == '0'){
            this.dataFromService.telefono = '';
          }

          this.variables.hideLoader();

          this.variables.log(dataReturnFromService);



        },
      );
    }




  }



  actualizarInfoUser(data: any) {

    this.variables.showLoader('Actualizando datos...');



    this.variables.actualizarInfoUser(data).subscribe(
      (response: any) => {
        // this.variables.log('Registro exitoso:', response);

        this.obtenerInfoUser();

        this.variables.presentToast('¡Informacion actualizada!')
        // Accede al mensaje en la variable "response" directamente
        // Realiza las acciones necesarias después de un registro exitoso
      },
      (error: any) => {
        console.error('Error al registrar:', error);
        // Realiza las acciones necesarias en caso de error
      }
    );

  }

}
