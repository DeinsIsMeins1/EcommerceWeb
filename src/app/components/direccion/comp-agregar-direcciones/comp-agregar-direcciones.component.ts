import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { VariablesGlobalesService } from 'src/app/servicios/variables-globales.service';

@Component({
  selector: 'app-comp-agregar-direcciones',
  templateUrl: './comp-agregar-direcciones.component.html',
  styleUrls: ['./comp-agregar-direcciones.component.scss'],
})
export class CompAgregarDireccionesComponent  implements OnInit {

  formulario: FormGroup;

  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;

  // direccion = {
  //   userID: '',
  //   nombre: '',
  //   calle: '',
  //   colonia: '',
  //   estado: '',
  //   municipio: '',
  //   cp: '',
  //   numExt: '',
  //   numInt: '',
  //   referencia: '',
  //   telefono: ''
  // };
  ubicacion: any;




  constructor(
    public variables: VariablesGlobalesService, 
    private formBuilder: FormBuilder,
    private router: Router) {
    this.formulario = this.formBuilder.group({
      userID : localStorage.getItem('id'),
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      calle: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      colonia: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      estado: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      municipio: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      cp: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      numExt: ['',  [Validators.required, Validators.pattern('^[0-9]*')]],
      numInt: ['',  [Validators.required, Validators.pattern('^[0-9]*')]],
      referencia: [''],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
   }

  ngOnInit() {

  }


    /**
   *  Registro direcciones
   *
   * @param
   */
    onSubmit(){

      if (this.formulario.valid) {
        // this.variables.log(this.formulario.value);
      }

  
      this.variables.showLoader('Agregando direccion...');
  
  
  
      this.variables.agregarDireccion(this.formulario.value).subscribe(
        (response: any) => {
          // this.variables.log('Registro exitoso:', response);
          // Accede al mensaje en la variable "response" directamente
          // Realiza las acciones necesarias después de un registro exitoso
          this.variables.hideLoader();

          this.variables.presentToast('Direccion agregada')

          this.ubicacion = localStorage.getItem('ubicacion');

          this.router.navigate([this.ubicacion]);

        },
        (error: any) => {
          console.error('Error al registrar:', error);
          // Realiza las acciones necesarias en caso de error
        }
      );
      
    }


    onInput(ev : any) {
      const value = ev.target!.value;
  
      // Removes non alphanumeric characters
      const filteredValue = value.replace(/[^a-zA-Z]+/g, '');
  
      /**
       * Update both the state variable and
       * the component to keep them in sync.
       */
      // this.ionInputEl.value = this.direccion.nombre = filteredValue;
    }


}
