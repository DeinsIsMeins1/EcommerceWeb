import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CompDireccionesComponent } from 'src/app/components/direccion/comp-direcciones/comp-direcciones.component';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.page.html',
  styleUrls: ['./direcciones.page.scss'],
})
export class DireccionesPage implements OnInit {

  @ViewChild(CompDireccionesComponent) componenteDirecciones: CompDireccionesComponent | undefined;



  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  mover(){
    localStorage.setItem('ubicacion',   '/direcciones');

    this.router.navigate(['/agregar-direcciones']);

  }
  


  ionViewDidEnter(){
    this.llamarMetodoEnHijo();
    
  }

  ngAfterViewInit() {
  
    // Llamar al método en el componente hijo
    this.llamarMetodoEnHijo();
  }
  
  public llamarMetodoEnHijo() {
    if (this.componenteDirecciones) {
      this.componenteDirecciones.obtenerDirecciones();
    } else {
      // Manejar el caso cuando componenteDirecciones es undefined
    }
  }

}
