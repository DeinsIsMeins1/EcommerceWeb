import { Component, EventEmitter, Output } from '@angular/core';
import { VariablesGlobalesService } from './servicios/variables-globales.service';
import { ActivoService } from './servicios/activo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @Output() checkUserEvent: EventEmitter<void> = new EventEmitter<void>();


  dataFromService: any;
  idUsuario: any;
  contenidoCarrito: any;
  datosPDX: any;
  infouser: any;

  cargado = false;



  itemsLength: any;

  constructor(
    public variables: VariablesGlobalesService,
    public visibilidadService: ActivoService,
    private router: Router) { }


  navegar(ruta: string, ubicacion: string) {

    switch (ubicacion) {
      case 'Login':
        localStorage.clear();

        this.obtenerInfoUser();
        //Aqui vas a cerrar sesión cuando de click en log out
        break;
      case 'Ofertas':
        localStorage.setItem('ubicacion', ubicacion);
        break;

      default:
        break;
    }
    this.router.navigate([ruta]);
  }


  ngOnInit() {
    this.obtenerConfiguracion();
    this.obtenerInfoUser();

    this.checkUserEvent.subscribe(() => {
      this.obtenerInfoUser();
    });

    // console.log('---------Entra');
  }

  public cargarBadge() {

    // console.log('----------Carga badged');

    if (this.variables.checkLogin()) {
      const idUsuario = localStorage.getItem('id');
      //Guardamos el usuario y la contraseña en una variable para mandarla a LoginEmpleado en proveedor
      const datos = "userid=" + idUsuario;

      this.variables.obtenerCarrito(datos).subscribe(
        async (dataReturnFromService: any) => {

          //Obtenemos la respuesta del API en dataReturnFromService
          //Guardamos la variable del api dentro de this.dataFromService
          this.contenidoCarrito = (dataReturnFromService);

          // this.variables.log(this.dataFromService);

          this.itemsLength = this.contenidoCarrito.length;

        },
      );
    }


  }

  public obtenerInfoUser() {

    


    // const isLoggedIn = this.variables.checkLogin();
    // console.log('isLoggedIn', isLoggedIn);

    if (this.variables.checkLogin()) {
      this.idUsuario = localStorage.getItem('id');
      const datos = "userid=" + this.idUsuario;

      this.variables.obtenerInfoUser(datos).subscribe(
        async (dataReturnFromService: any) => {
          this.infouser = dataReturnFromService;
          // this.variables.hideLoader();
          this.cargado = true;

        }
      );
    } else {

      this.cargado = false;
    }

  }


  ionViewDidEnter() {
    console.log('---------Entra');

    this.obtenerConfiguracion();
    this.obtenerInfoUser();
  }


  obtenerConfiguracion() {



    this.variables.obtenerConfiguracion().subscribe(
      async (dataReturnFromService: any) => {
        this.datosPDX = (dataReturnFromService);

        document.documentElement.style.setProperty('--primary', this.datosPDX.primarycolor);
        document.documentElement.style.setProperty('--secondary', this.datosPDX.secondarycolor);

        this.visibilidadService.setCardVisible(true);

      }
    );


  }






}
