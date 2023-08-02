import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VariablesGlobalesService } from 'src/app/servicios/variables-globales.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  dataFromService: any;


  email: string = '';

  constructor(
    public variables: VariablesGlobalesService,
    private router: Router) { }

  ngOnInit() {
  }

     /**
   *  Login del empleado
   *
   * @param
   */
     onSubmit(){
      //Valido que no esté vacio los campos
      if(this.email==='' ){
        this.variables.mensaje('Falta información');
        return;
      }


      const datos = "correo=" + this.email;

    this.variables.showLoader('Solicitando codigo...');



    this.variables.obtenerCodigo(datos).subscribe(
      async (dataReturnFromService: any)=>{

        //Obtenemos la respuesta del API en dataReturnFromService
        //Guardamos la variable del api dentro de this.dataFromService
        this.dataFromService = (dataReturnFromService);

        this.variables.mensaje('Revisa tu bandeja de correo');

        localStorage.setItem('correo', this.email);

        this.router.navigate(['/actualizar-contra']);

        this.variables.hideLoader();


      
      },
    );
  
  
  
    }



    volver(){

      this.router.navigate(['/login']);

    }
}
