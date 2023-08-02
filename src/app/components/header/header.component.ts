import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable, map, startWith } from 'rxjs';
import { VariablesGlobalesService } from 'src/app/servicios/variables-globales.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() titulo: string = '';
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger | any;

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: any;

  mostrarBarra: boolean = false;
  busqueda: any[] = []; // Cambia 'any' por el tipo de datos adecuado si lo conoces
  target: any;
  busquedaCompleta: any;
  idUsuario: any;
  infouser: any;

  cargado = false;

  constructor(private menuCtrl: MenuController,
    public variables: VariablesGlobalesService,
    private router: Router) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.obtenerInfoUser();
  }

  ionViewDidEnter(){
    this.obtenerInfoUser();
  }

  obtenerInfoUser() {


    console.log('Cargando Datos....');
    
    


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

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.busqueda.filter(option => option.title.toLowerCase().includes(filterValue));
  }






  mostrarLista: boolean = false;

  mostrarDiv() {
    if (this.mostrarLista) {
      this.cerrarDiv();
    } else {
      this.mostrarLista = true;
    }
  }

  cerrarDiv() {
    this.mostrarLista = false;
  }

  mostrarMenu() {
    this.menuCtrl.open('first'); // Abre el menú con menuId="first"
  }



  mostrarBarraBusqueda() {
    this.mostrarBarra = true;

  }


  buscarProducto(event: Event) {
    this.target = event.target as HTMLInputElement;

    if (!this.target.value) {

      this.busqueda = [];
      this.filteredOptions = null;
      return
    }


    const busqueda = 'word=' + this.target.value;

    this.variables.buscarProductosPDX(busqueda).subscribe(
      (dataReturnFromService: any) => {
        this.busqueda = dataReturnFromService;
        // Vuelve a asignar el valor filtrado después de recibir los datos actualizados
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || ''))
        );
      }
    );
  }




  elegirItem(id: number) {
    const idString = id.toString().trim();

    if (idString !== '') {
      this.router.navigate(['/detalles', idString]);
    } else {
      console.error('El ID del producto es inválido.');
    }
  }




  teclaEnterPresionada() {

    if (!this.target.value) {

      this.busqueda = [];
      this.filteredOptions = null;
      return
    }


    this.router.navigate(['/lista-busqueda', this.target.value]);
    this.filteredOptions = null;
    this.autocompleteTrigger.closePanel();


    // const busqueda = 'word=' + this.target.value;

    // this.variables.buscarProductosCompletosPDX(busqueda).subscribe(
    //   (dataReturnFromService: any) => {
    //     this.busquedaCompleta = dataReturnFromService;
    //     // Vuelve a asignar el valor filtrado después de recibir los datos actualizados
    //     console.log('Lista compelta', this.busquedaCompleta);

    //   }
    // );


  }

  moverInicio(){
    this.router.navigate(['/inicio']);
  }

  moverCarrito(){
    this.router.navigate(['/carrito']);
  }


}
