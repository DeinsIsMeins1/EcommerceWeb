import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VariablesGlobalesService } from 'src/app/servicios/variables-globales.service';

@Component({
  selector: 'app-actualizar-contra',
  templateUrl: './actualizar-contra.page.html',
  styleUrls: ['./actualizar-contra.page.scss'],
})
export class ActualizarContraPage implements OnInit {

  
  dataFromService: any;




  email: string = '';
  contra: string = '';
  codigo: string = '';
  correo: any;



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

        this.correo = localStorage.getItem('correo');

        //Valido que no esté vacio los campos
        if(this.contra === '' || this.codigo === '' ){
          this.variables.mensaje('Falta información');
          return;
        }
  
  
        const datos = "password=" + this.contra + "&correo=" + this.correo + "&codigo=" + this.codigo;
  
      this.variables.showLoader('Actualizando contraseña...');
  
  
  
      this.variables.actualizarContra(datos).subscribe(
        async (dataReturnFromService: any)=>{
  
          //Obtenemos la respuesta del API en dataReturnFromService
          //Guardamos la variable del api dentro de this.dataFromService
          this.dataFromService = (dataReturnFromService);
  
          this.variables.mensaje('Contraseña actualizada');

          this.router.navigate(['/login']);
  
          this.variables.hideLoader();
  
  
        
        },
      );
    
    
    
      }

}
