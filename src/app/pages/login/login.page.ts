import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ActivoService } from 'src/app/servicios/activo.service';
import { AppComponent } from 'src/app/app.component';
import { VariablesGlobalesService } from 'src/app/servicios/variables-globales.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // @ViewChildren(AppComponent) AppComponent!: QueryList<AppComponent>;

  usuario = {
    email: '',
    password: ''
  };
  dataFromService: any;

  passwordType = 'password';
  passwordShown = false;
  passwordIcon = 'eye';

  cardVisible = false;


  constructor(
    public variables: VariablesGlobalesService,
    private router: Router,
    public visibilidadService: ActivoService,
    public AppComponent: AppComponent) { }

  ngOnInit() {
    // window.addEventListener('online', (e) => this.variables.log(e, "Si internet"));
    // window.addEventListener('offline', (e) => this.variables.log(e, "No internet"));

    this.datosCargados();

  }

  datosCargados() {
    this.visibilidadService.cardVisible$.subscribe(visible => {
      this.cardVisible = visible;

      // this.variables.log(this.cardVisible);

    });
  }



  ionViewDidEnter() {
    this.datosCargados();

  }


  moverRegistro() {
    this.router.navigate(['/registro']);
  }

  tooglePassword() {

  }


  /**
  *  Login del empleado
  *
  * @param
  */
  onSubmit() {
    //Valido que no esté vacio los campos
    if (this.usuario.email === '' || this.usuario.password === '') {
      this.variables.mensaje('Falta información');
      return;
    }

    //Hacemos un encodeURI para poder recibir simbolos diferentes dentro de la contraseña
    this.usuario.password = encodeURIComponent(this.usuario.password);

    //Guardamos el usuario y la contraseña en una variable para mandarla a LoginEmpleado en proveedor
    const datosPersonales = "usuario=" + this.usuario.email + "&password=" + this.usuario.password;

    this.variables.showLoader('Conectando...');



    this.variables.login(datosPersonales).subscribe(
      async (dataReturnFromService: any) => {

        //Obtenemos la respuesta del API en dataReturnFromService
        //Guardamos la variable del api dentro de this.dataFromService
        this.dataFromService = (dataReturnFromService);

        this.variables.hideLoader('', 2000);


        console.log('--------------Respuesta',this.dataFromService);
        

        if (this.dataFromService.rol == 'Admin' || this.dataFromService.rol == 'admin') {
          this.router.navigate(['/admin']);
        }
        else {
          console.log('Admin');
          this.router.navigate(['/inicio']);
        }





        localStorage.setItem('id', this.dataFromService.id);


        this.AppComponent.obtenerInfoUser();



      },
    );
  }



  moverRecuperar() {

    this.router.navigate(['/recuperar']);
  }


}
