import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { VariablesGlobalesService } from 'src/app/servicios/variables-globales.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {
  comentarios: any;
  itemsLengthComentario: any;
  mostrarComentario: any;
  datos: any;
  calificacion: any;
  comentario: any;

  constructor(
    public variables: VariablesGlobalesService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    // this.obtenerComentario();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.ngOnInit();
      this.ionViewDidEnter();
      // Any calls to load data go here
      event.target.complete();
      
    }, 1000);
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  cerrarModal(){
    this.isModalOpen = false;
  }

  onRatingChange(rating: number) {

    this.calificacion = rating;

    // Aquí puedes realizar cualquier acción adicional con la calificación seleccionada
  }

  
  ionViewDidEnter() {

    this.obtenerComentario();



  }


  obtenerComentario() {



    //Guardamos el usuario y la contraseña en una variable para mandarla a LoginEmpleado en proveedor

    // this.producto = localStorage.getItem('producto');
    const datos = "userid=" + localStorage.getItem('id');

    // console.log('-------DATOS ENVIADOS',datos);
    

    this.variables.obtenerComentarioEspecifico(datos).subscribe(
      async (dataReturnFromService: any) => {



        //Obtenemos la respuesta del API en dataReturnFromService
        //Guardamos la variable del api dentro de this.dataFromService
        this.comentarios = (dataReturnFromService);

        // console.log('----------CONTENIDO COMENTARIOS',this.comentarios);
        

        this.itemsLengthComentario = this.comentarios.length;

        if (this.itemsLengthComentario == 0) {
          this.mostrarComentario = false;
        }
        else {
          this.mostrarComentario = true;
        }

        // this.variables.log('---------TAMAÑO COMENTARIO', this.mostrarComentario,this.comentarios);



      },
    );
  }


  async confirmDelete(id: any) {
    const alert = await this.alertController.create({
      header: '¿Eliminar comentario?',
      buttons: [
        {
          text: 'Eliminar',
          cssClass: 'rojo',
          handler: () => {
            this.eliminarComentario(id);
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





  actualizarComentario(id: any) {

    console.log(this.comentario);
    

    if(!this.calificacion){
      this.variables.presentAlert('Aviso','Hace falta ingresar calificacion');
      return;
    }
    
    this.datos = "comment=" + this.comentario + "&rate=" + this.calificacion + "&idComment=" + id;


    this.variables.showLoader('Actualizando comentario...');



    this.variables.actualizarComentario(this.datos).subscribe(
      (response: any) => {
        this.variables.hideLoader();

        

        this.obtenerComentario();
        // Accede al mensaje en la variable "response" directamente
        // Realiza las acciones necesarias después de un registro exitoso
      },
      (error: any) => {
        console.error('Error al registrar:', error);
        // Realiza las acciones necesarias en caso de error
      }
    );

    this.isModalOpen = false;
  }


  eliminarComentario(id: any) {
    const datos = "idComment=" + id;





    this.variables.eliminarComentario(datos).subscribe((response: any) => {
      // this.variables.log('Registro exitoso:', response);
      // Accede al mensaje en la variable "response" directamente
      // Realiza las acciones necesarias después de un registro exitoso

      this.variables.presentToast('¡Comentario eliminado!')

      this.obtenerComentario();
    },
      (error: any) => {
        console.error('Error al registrar:', error);
        // Realiza las acciones necesarias en caso de error
      }
    );

  }

}
