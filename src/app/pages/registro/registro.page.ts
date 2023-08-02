import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VariablesGlobalesService } from 'src/app/servicios/variables-globales.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuario = {
    usuario: '',
    email: '',
    password: '',
    password2: ''
  };

  dataFromService: any;

  passwordType  = 'password';
  passwordShown = false;
  passwordIcon  = 'eye';

  constructor(
    public variables: VariablesGlobalesService,
    private router: Router) { }

  ngOnInit() {
  }

     /**
   *  Registro del usuario
   *
   * @param
   */
     onSubmit(){
      //Valido que no esté vacio los campos
      if(this.usuario.email==='' ||  this.usuario.password===''){
        this.variables.mensaje('Falta información');
        return;
      }

      if(this.usuario.password !== this.usuario.password2 ){
        this.variables.mensaje('Las contraseñas no coinciden');
        return;
      }
  
      //Hacemos un encodeURI para poder recibir simbolos diferentes dentro de la contraseña
      this.usuario.password = encodeURIComponent(this.usuario.password);
  
      //https://richpdx.bsite.net/api/client/Register?user=prueba&mail=prueba123%40gmail.com&password=12345
      //Guardamos el usuario y la contraseña en una variable para mandarla a LoginEmpleado en proveedor
      const datosPersonales = "user=" + this.usuario.usuario+ "&mail=" + this.usuario.email + "&password=" + this.usuario.password;
  
      this.variables.showLoader('Conectando...');
  
  
  
      this.variables.registro(datosPersonales).subscribe(
        (response: any) => {
          // this.variables.log('Registro exitoso:', response);
          // Accede al mensaje en la variable "response" directamente
          // Realiza las acciones necesarias después de un registro exitoso
          this.variables.hideLoader();

          this.router.navigate(['/login']);

        },
        (error: any) => {
          console.error('Error al registrar:', error);
          // Realiza las acciones necesarias en caso de error
        }
      );
      
    }
  

  moverLogin(){
    this.router.navigate(['/login']);
  }

  tooglePassword(){

  }


}
