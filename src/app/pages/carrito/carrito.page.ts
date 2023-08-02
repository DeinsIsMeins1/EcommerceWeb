import { Component, OnInit, ViewChild } from '@angular/core';
import { VariablesGlobalesService } from 'src/app/servicios/variables-globales.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { MatStepper } from '@angular/material/stepper';
import { CompDireccionesComponent } from 'src/app/components/direccion/comp-direcciones/comp-direcciones.component';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  @ViewChild(CompDireccionesComponent) componenteDirecciones: CompDireccionesComponent | undefined;


  @ViewChild('stepper') stepper: MatStepper | any;

  componentesCargados: boolean = false;

  contenidoCarrito: any;


  paypalCargado = false;

  cantidad: any;

  dataFromService: any;


  itemCarrito = [
    { ruta: 'assets/productos/tomate.jpeg', nombre: 'Tomate italiano', descuento: '50', precioAnterior: '30', precioFinal: '60' },
    { ruta: 'assets/productos/taza.jpeg', nombre: 'Taza', descuento: '50', precioAnterior: '300', precioFinal: '150' },
    { ruta: 'assets/productos/bateria.jpeg', nombre: 'Bateria', descuento: '20', precioAnterior: '5000', precioFinal: '4500' },
    { ruta: 'assets/productos/bateria.jpeg', nombre: 'Bateria', descuento: '20', precioAnterior: '5000', precioFinal: '4500' },
    { ruta: 'assets/productos/bateria.jpeg', nombre: 'Bateria', descuento: '20', precioAnterior: '5000', precioFinal: '4500' },
    { ruta: 'assets/productos/bateria.jpeg', nombre: 'Bateria', descuento: '20', precioAnterior: '5000', precioFinal: '4500' },
    { ruta: 'assets/productos/bateria.jpeg', nombre: 'Bateria', descuento: '20', precioAnterior: '5000', precioFinal: '4500' },
    { ruta: 'assets/productos/bateria.jpeg', nombre: 'Bateria', descuento: '20', precioAnterior: '5000', precioFinal: '4500' }
  ];



  itemTarjetas = [
    { icon: 'card-outline', card: 'BBVA Debito **** 3123' },
    { icon: 'card-outline', card: 'BBVA Credito **** 4342' },
    { icon: 'card-outline', card: 'BBVA Debito **** 1223' },
  ];

  duracion: number | any;

  counter: any;
  mostrarCarrito: any;

  isLinear = false;
  direccionLocalStorage: any;
  stepperDos: any;
  totalCompra: any;
  arregloFinCarrito: any;
  datoFinalEnvio: any;
  idAddress: any;
  direccionCompleta: any;


  constructor(
    public variables: VariablesGlobalesService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private appComponent: AppComponent

  ) { }

  firstFormGroup: FormGroup = this._formBuilder.group({ firstCtrl: [''] });
  secondFormGroup: FormGroup = this._formBuilder.group({ secondCtrl: [''] });
  thirdFormGroup: FormGroup = this._formBuilder.group({ thirdCtrl: [''] })

  ngOnInit() {
    this.duracion = 500;

    // this.obtenerCarrito();

    this.stepperDos = false;



    // 


  }

  mostrarCompraRealizada() {
    this.contenidoCarrito = localStorage.getItem('contenidoCarrito');
    this.contenidoCarrito = JSON.parse(this.contenidoCarrito);
    // this.variables.log(this.contenidoCarrito);




    this.direccionCompleta = localStorage.getItem('direccionCompleta');



    this.direccionCompleta = JSON.parse(this.direccionCompleta);


    // this.variables.log(this.direccionCompleta);


  }


  guardarContenidoCarrito() {

    const itemCarritoArreglo = JSON.stringify(this.dataFromService);
    localStorage.setItem('contenidoCarrito', itemCarritoArreglo);

  }



  public llamarMetodoEnHijo() {
    if (this.componenteDirecciones) {
      this.componenteDirecciones.obtenerDirecciones();
    } else {
      // Manejar el caso cuando componenteDirecciones es undefined
    }
  }






  obtenerTotalCarrito() {


    if (this.variables.checkLogin()) {
      const idUsuario = localStorage.getItem('id');
      //Guardamos el usuario y la contraseña en una variable para mandarla a LoginEmpleado en proveedor
      const datos = "userid=" + idUsuario;

      this.variables.obtenerTotalCompras(datos).subscribe(
        (response: any) => {



          this.totalCompra = response;

          // this.variables.log('Total de la compra', this.totalCompra);
          // this.variables.hideLoader();

          this.paypalCargado = true;

        },
        (error: any) => {
          console.error('Error al registrar:', error);
          // Realiza las acciones necesarias en caso de error
        }
      );
    }



  }

  moverAlSegundoPaso(idAddres: number) {

    // console.log('IDADDRESSS--------', idAddres);

    this.idAddress = idAddres;

    this.stepperDos = true;
    // Mover el stepper al segundo paso
    // Puedes usar la referencia del stepper para establecer el índice en 1
    this.stepper.selectedIndex = 2;



    this.direccionLocalStorage = localStorage.getItem('direccion');



    this.direccionLocalStorage = JSON.parse(this.direccionLocalStorage);


    // this.variables.log(this.direccionLocalStorage);

  }

  ionViewDidEnter() {
    this.obtenerCarrito();
    this.obtenerTotalCarrito();
    this.llamarMetodoEnHijo();
    this.appComponent.cargarBadge();
  }

  obtenerCarrito() {

    if (this.variables.checkLogin()) {
      const idUsuario = localStorage.getItem('id');
      //Guardamos el usuario y la contraseña en una variable para mandarla a LoginEmpleado en proveedor
      const datos = "userid=" + idUsuario;

      this.variables.showLoader('Cargando contenido...');



      this.variables.obtenerCarrito(datos).subscribe(
        async (dataReturnFromService: any) => {

          //Obtenemos la respuesta del API en dataReturnFromService
          //Guardamos la variable del api dentro de this.dataFromService
          this.dataFromService = (dataReturnFromService);

          this.variables.log(this.dataFromService);

          this.variables.hideLoader('', 1000);


          const itemsLength = this.dataFromService.length;

          if (itemsLength == 0) {
            this.mostrarCarrito = false;
          }
          else {
            this.mostrarCarrito = true;
          }


        },
      );

    }



  }


  vaciarCarrito() {

    if (this.variables.checkLogin()) {
      const idUsuario = localStorage.getItem('id');
      //Guardamos el usuario y la contraseña en una variable para mandarla a LoginEmpleado en proveedor
      const datos = "userid=" + idUsuario;

      this.variables.eliminarCarrito(datos).subscribe(
        (response: any) => {
          // this.variables.log('Registro exitoso:', response);

          this.appComponent.cargarBadge();


          this.variables.presentAlert('Aviso', response);
          this.obtenerCarrito();

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
      header: 'Limpiar carrito?',
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






  /**
   *  Registro direcciones
   *
   * @param
   */
  compraRealizada() {

    // Obtener la cadena JSON del localStorage
    const arregloJSON = localStorage.getItem('contenidoCarrito');

    // Convertir la cadena JSON en un objeto
    if (arregloJSON) { this.arregloFinCarrito = JSON.parse(arregloJSON); }



    // this.variables.log('-----------CONTENIDO CARRITO', this.arregloFinCarrito);



    this.variables.agregarCompraRealizada(this.arregloFinCarrito, this.idAddress).subscribe(
      (response: any) => {
        // this.variables.log('Registro exitoso:', response);
        // Accede al mensaje en la variable "response" directamente
        // Realiza las acciones necesarias después de un registro exitoso

        this.variables.hideLoader();

        this.mostrarCompraRealizada();

        this.moverAlUltimoPaso();
      },
      (error: any) => {
        console.error('Error al registrar:', error);
        // Realiza las acciones necesarias en caso de error
      }
    );
  }






  moverSiguientePunto() {
    this.stepper.selectedIndex = 1;

    this.guardarContenidoCarrito();
  }

  moverSiguientePunto2() {
    this.stepper.selectedIndex = 2;

    this.guardarContenidoCarrito();
  }

  moverAlUltimoPaso() {
    this.stepper.selectedIndex = 3;
  }

  onSelectNumber(event: any, id: any) {

    if (this.variables.checkLogin()) {
      const cantidad: number = event.target.value;
      // this.variables.log(cantidad);




      const idUsuario = localStorage.getItem('id');
      //Guardamos el usuario y la contraseña en una variable para mandarla a LoginEmpleado en proveedor
      const datos = "userid=" + idUsuario + "&itemcode=" + id + "&quantity=" + cantidad;

      // this.variables.log(datos);


      this.variables.showLoader('Actualizando producto');

      this.variables.actualizarItemCarrito(datos).subscribe(
        (response: any) => {
          // this.variables.log('Registro exitoso:', response);

          this.variables.hideLoader();

          this.variables.presentAlert('Aviso', response);
          this.obtenerCarrito();
          this.obtenerTotalCarrito();

        },
        (error: any) => {
          console.error('Error al registrar:', error);
          // Realiza las acciones necesarias en caso de error
        }
      );

    }



  }

  eliminarProducto(id: any) {

    if (this.variables.checkLogin()) {

      const idUsuario = localStorage.getItem('id');
      //Guardamos el usuario y la contraseña en una variable para mandarla a LoginEmpleado en proveedor
      const datos = "userid=" + idUsuario + "&itemcode=" + id;

      this.variables.showLoader('Eliminando producto');

      this.variables.eliminarItemCarrito(datos).subscribe(
        (response: any) => {
          // this.variables.log('Registro exitoso:', response);

          this.appComponent.cargarBadge();

          this.variables.hideLoader();

          this.variables.presentAlert('Aviso', response);
          this.obtenerCarrito();

        },
        (error: any) => {
          console.error('Error al registrar:', error);
          // Realiza las acciones necesarias en caso de error
        }
      );


    }


  }




  mover() {
    localStorage.setItem('ubicacion', '/carrito');

    this.router.navigate(['/agregar-direcciones']);

  }

  ngAfterViewInit() {
    // Los componentes han terminado de cargar
    this.componentesCargados = true;

    // Llamar al método en el componente hijo
    this.llamarMetodoEnHijo();

    // this.stepper.selectedIndex = 0;
  }


  increment(item: any) {
    item.quantity++;
  }

  decrement(item: any) {
    if (item.quantity > 0) {
      item.quantity--;
    }
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
