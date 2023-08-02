import { Component, OnInit, NgZone } from '@angular/core';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { ActivatedRoute, Router } from '@angular/router';
import { VariablesGlobalesService } from 'src/app/servicios/variables-globales.service';
import { AppComponent } from 'src/app/app.component';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {
  producto: any;
  dataFromService: any;
  cantidad = 1;
  userID: any;
  lorem = ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero saepe possimus beatae quidem   laborum,   necessitatibus voluptatum obcaecati quis ab optio ipsam iure totam aspernatur praesentium nemorepellat, rem  recusandae a.';


  mostrarTodosLosComentarios: boolean = false;

  isLoading: boolean = true;


  favoritoAgregado = false;
  favoritoAgregadoText = '';
  paramValue: any;
  dataFromServiceFavorite: any;
  comentarios: any;
  mostrarComentario: any;
  comentario: any;
  calificacion: any;
  itemsLengthComentario: any;


  constructor(
    public variables: VariablesGlobalesService,
    private router: Router,
    private zone: NgZone,
    private appComponent: AppComponent,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.producto = localStorage.getItem('producto');


    this.initializeApp();


    this.cantidad = 1;




  }




  



  isModalOpen = false;

  setOpen(isOpen: boolean) {

    
    if (this.variables.checkLogin()) {
      this.isModalOpen = isOpen;
    }
    else {
      this.iniciarSesionPrimero();
    }




    
  }

  onRatingChange(rating: number) {

    this.calificacion = rating;

    // Aquí puedes realizar cualquier acción adicional con la calificación seleccionada
  }

  obtenerParametro() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.paramValue = params.get('id');
      // console.log(this.paramValue);

      // Llama a la función para obtener los detalles usando el parámetro recibido
      this.obenerDetalles(this.paramValue);

      // this.obtenerComentario(this.paramValue);
    });

  }

  initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.zone.run(() => {
        // Example url: https://beerswift.app/tabs/tab2
        // slug = /tabs/tab2
        const slug = event.url.split(".app").pop();
        if (slug) {
          this.router.navigateByUrl(slug);
        }
        // If no match, do nothing - let regular routing
        // logic take over
      });
    });
  }




  ionViewDidEnter() {

    this.cantidad = 1;


    this.obtenerParametro();



  }


  obenerDetalles(id: any) {

    this.variables.obtenerProductoPDX(id).subscribe(
      async (dataReturnFromService: any) => {
        this.dataFromService = (dataReturnFromService);
        this.variables.log(dataReturnFromService);

        this.obtenerIsFavoritos(id);

        this.obtenerComentario(id);

        setTimeout(() => {
          // Una vez que los componentes se han cargado por completo, cambia el estado de isLoading
          this.isLoading = false;
        }, 1000); // Tiempo de espera simulado de 5 segundos
      }
    );

  }

  selectedSegment: string = 'default';

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  onSelectNumber() {
    // this.variables.log(this.cantidad); // Accede al valor seleccionado aquí
  }


  moverCarrito() {
    this.router.navigate(['/carrito']);
  }


  agregarFavoritos(titulo: string, id: any, imagen: string) {


    if (this.variables.checkLogin()) {

      this.favoritoAgregado = true;
      this.favoritoAgregadoText = 'Agregado a favoritos';

      // // Reiniciar el estado después de 1 segundo (puedes ajustar el tiempo si lo deseas)
      // setTimeout(() => {
      //   this.favoritoAgregado = false;
      // }, 1000);


      // console.log('Agregar favorito');

      const idUsuario = localStorage.getItem('id');

      const datos = "userid=" + idUsuario + '&itemname=' + titulo + '&itemcode=' + id + '&imgurl=' + imagen;


      this.variables.agregarFavorito(datos).subscribe((response: any) => {
        // this.variables.log('Registro exitoso:', response);
        // Accede al mensaje en la variable "response" directamente
        // Realiza las acciones necesarias después de un registro exitoso
        this.variables.hideLoader();
        this.variables.presentToast('¡Producto agregado a favoritos!')

      },
        (error: any) => {
          console.error('Error al registrar:', error);
          // Realiza las acciones necesarias en caso de error
        }
      );
    }
    else {
      this.iniciarSesionPrimero();
    }


  }

  compartir() {
    const enlaceCompartir = 'https://www.ejemplo.com'; // Reemplaza con tu enlace real

    if (navigator.share) {
      // Si el navegador admite `navigator.share()`, utiliza esa función
      navigator.share({
        title: 'Título del enlace',
        text: 'Texto del enlace',
        url: enlaceCompartir,
      })
        .then(() => console.log('Enlace compartido exitosamente'))
        .catch((error) => console.log('Error al compartir:', error));
    } else {
      // Si `navigator.share()` no está disponible, utiliza esquemas de URL específicos de WhatsApp y Facebook
      const mensaje = encodeURIComponent('Texto del enlace: ' + enlaceCompartir);
      let urlWhatsApp = '';
      let urlFacebook = '';

      if (window.open) {
        urlWhatsApp = 'whatsapp://send?text=' + mensaje;
        urlFacebook = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(enlaceCompartir);

        try {
          // Intenta abrir la aplicación de WhatsApp si está instalada
          window.open(urlWhatsApp, '_blank');
        } catch {
          // Si no se pudo abrir la aplicación de WhatsApp, abre el enlace de Facebook en una nueva pestaña
          window.open(urlFacebook, '_blank');
        }
      }
    }
  }


  async iniciarSesionPrimero() {
    const alert = await this.alertController.create({
      header: '¡Inicia sesion primero!',
      buttons: [
        {
          text: 'Iniciar sesion',
          handler: () => {
            this.router.navigate(['/login']);
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





  /**
  *  Registro direcciones
  *
  * @param
  */
  agregarCarrito(id: any, name: any, price: any, image: any, carrito: any) {

    if (this.variables.checkLogin()) {


      const idUsuario = localStorage.getItem('id');


      // this.variables.log(idUsuario, name, id, price, image, this.cantidad);

      // id = (id.toString());


      const datos =
        "userid=" + idUsuario
        + "&itemname=" + name
        + "&itemcode=" + id
        + "&quantity=" + this.cantidad
        + "&price=" + price
        + "&imgurl=" + this.dataFromService.image;


      this.variables.showLoader('Agregando al carrito...');



      this.variables.agregarCarrito(datos).subscribe(
        (response: any) => {
          // this.variables.log('Registro exitoso:', response);
          // Accede al mensaje en la variable "response" directamente
          // Realiza las acciones necesarias después de un registro exitoso

          this.variables.hideLoader();

          this.variables.presentToast('Producto agregado con exito!')

          this.appComponent.cargarBadge();


          if (carrito) {
            this.router.navigate(['/carrito']);

          }



        },
        (error: any) => {
          console.error('Error al registrar:', error);
          // Realiza las acciones necesarias en caso de error
        }
      );
    }
    else {
      this.iniciarSesionPrimero();
    }


  }


  obtenerIsFavoritos(id: any) {

    if (this.variables.checkLogin()) {




      const idUsuario = localStorage.getItem('id');

      const datos = "userid=" + idUsuario + "&itemcode=" + id;

      // this.variables.showLoader('Cargando contenido...');



      this.variables.obtenerIsFavorite(datos).subscribe(
        async (dataReturnFromService: any) => {

          //Obtenemos la respuesta del API en dataReturnFromService
          //Guardamos la variable del api dentro de this.dataFromService
          this.dataFromServiceFavorite = (dataReturnFromService);

          this.variables.log('-------------', this.dataFromServiceFavorite);

          if (this.dataFromServiceFavorite) {
            this.favoritoAgregado = true;
          }

        },
      );

    }


  }

  obtenerComentario(id: any) {
    //Guardamos el usuario y la contraseña en una variable para mandarla a LoginEmpleado en proveedor
    const datos = "iditem=" + id;

    this.variables.obtenerComentario(datos).subscribe(
      async (dataReturnFromService: any) => {

        //Obtenemos la respuesta del API en dataReturnFromService
        //Guardamos la variable del api dentro de this.dataFromService
        this.comentarios = (dataReturnFromService);

        this.itemsLengthComentario = this.comentarios.length;

        if (this.itemsLengthComentario == 0) {
          this.mostrarComentario = false;
        }
        else {
          this.mostrarComentario = true;
        }

        this.variables.log('---------CONTENIDO COMENTARIO', this.mostrarComentario,this.comentarios);



      },
    );
  }


  handleRefresh(event: any) {
    setTimeout(() => {
      this.ngOnInit();
      this.ionViewDidEnter();
      // Any calls to load data go here
      event.target.complete();
      
    }, 1000);
  }

  enviarComentario() {

    if (!this.calificacion) {
      this.variables.mensaje('La calificacion no puede ir vacía');
      return
    }

    if (!this.comentario) {
      this.comentario = '';
    }

    this.variables.showLoader('Insertando comentario...');

    const idUsuario = localStorage.getItem('id');

    const datos = "comment=" + this.comentario + '&rating=' + this.calificacion + '&iditem=' + this.paramValue + '&userid=' + idUsuario;


    this.variables.insertarComentario(datos).subscribe((response: any) => {
      // this.variables.log('Registro exitoso:', response);
      // Accede al mensaje en la variable "response" directamente
      // Realiza las acciones necesarias después de un registro exitoso
      this.variables.hideLoader();
      this.variables.presentToast('¡Comentario realizado con exito!')

      this.obtenerComentario(this.paramValue);
      this.obenerDetalles(this.paramValue);
    },
      (error: any) => {
        console.error('Error al registrar:', error);
        // Realiza las acciones necesarias en caso de error
      }
    );


    this.isModalOpen = false;

  }

  cerrarModal(){
    this.isModalOpen = false;
  }


}
