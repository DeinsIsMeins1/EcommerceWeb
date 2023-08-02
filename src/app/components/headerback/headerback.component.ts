import { Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { VariablesGlobalesService } from 'src/app/servicios/variables-globales.service';

@Component({
  selector: 'app-headerback',
  templateUrl: './headerback.component.html',
  styleUrls: ['./headerback.component.scss'],
})
export class HeaderbackComponent  implements OnInit {

  @Input() titulo : string = '';

  mostrarBarra: boolean = false;
  busqueda: any

  constructor(
    private menuCtrl: MenuController,
    public variables: VariablesGlobalesService) { }

  ngOnInit() {}


  
  mostrarMenu(){
    this.menuCtrl.open('first');
  }



  mostrarBarraBusqueda() {
      this.mostrarBarra = true;
    
  }


}
