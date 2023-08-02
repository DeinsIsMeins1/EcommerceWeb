import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { VariablesGlobalesService } from 'src/app/servicios/variables-globales.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  dataFromService: any;
  mostrarFavorito: any;

  constructor(
    public variables: VariablesGlobalesService,
    private router: Router,
    private alertController: AlertController,
    private appComponent: AppComponent
) { }

  ngOnInit() {
    // this.obtenerFavoritos();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      this.ionViewDidEnter();
    }, 1000);
  }


  ionViewDidEnter(){
    this.obtenerFavoritos();
    this.appComponent.cargarBadge();
  }


  eliminar(id: any){

    if (this.variables.checkLogin()) {
      
      const idUsuario = localStorage.getItem('id');
      //Guardamos el usuario y la contraseña en una variable para mandarla a LoginEmpleado en proveedor
      const datos = "userid=" + idUsuario + "&itemcode=" + id;
  
      this.variables.showLoader('Eliminando favorito');
  
      this.variables.eliminarItemFavorito(datos).subscribe(
        (response: any) => {
          // this.variables.log('Registro exitoso:', response);
  
          this.variables.hideLoader();
  
          this.variables.presentAlert('Aviso', response);
          this.obtenerFavoritos();
  
        },
        (error: any) => {
          console.error('Error al registrar:', error);
          // Realiza las acciones necesarias en caso de error
        }
      );
    }



  
  
  
    



  }


  vaciarCarrito(){

    if (this.variables.checkLogin()) {
      const idUsuario = localStorage.getItem('id');
      //Guardamos el usuario y la contraseña en una variable para mandarla a LoginEmpleado en proveedor
      const datos = "userid=" + idUsuario ;
  
      this.variables.eliminarFavoritos(datos).subscribe(
        (response: any) => {
          // this.variables.log('Registro exitoso:', response);
  
  
          this.variables.presentAlert('Aviso', response);
          this.obtenerFavoritos();
  
        },
        (error: any) => {
          console.error('Error al registrar:', error);
          // Realiza las acciones necesarias en caso de error
        }
      );
    }

   
  }


  async vaciarCarritoConfirm() {
    const alert = await this.alertController.create({
      header: 'Limpiar lista?',
      buttons: [
        {
          text: 'Eliminar',
          cssClass: 'rojo',
          handler: () => {
            this.vaciarCarrito();
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

  verDetalles(id: any) {
    const idString = id.toString().trim();
  
    if (idString !== '') {
      this.router.navigate(['/detalles', idString]);
    } else {
      console.error('El ID del producto es inválido.');
    }
  }


    obtenerFavoritos() {

      if (this.variables.checkLogin()) {
        

      const idUsuario = localStorage.getItem('id');
      //Guardamos el usuario y la contraseña en una variable para mandarla a LoginEmpleado en proveedor
      const datos = "userid=" + idUsuario ;
  
      this.variables.showLoader('Cargando contenido...');
  
  
  
      this.variables.obtenerFavoritos(datos).subscribe(
        async (dataReturnFromService: any)=>{
  
          //Obtenemos la respuesta del API en dataReturnFromService
          //Guardamos la variable del api dentro de this.dataFromService
          this.dataFromService = (dataReturnFromService);
  
          this.variables.hideLoader('',1000);
  
          this.variables.log(dataReturnFromService);

          const itemsLength = this.dataFromService.length;

          if (itemsLength == 0) {
            this.mostrarFavorito = false;
          }
          else {
            this.mostrarFavorito = true;
          }
          
  
  
        },
      );
    
      }

    
  }

}
