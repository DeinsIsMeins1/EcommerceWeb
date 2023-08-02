import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  itemPerfil = [
    { icono: 'person-circle-outline',         titulo: 'Mis Datos',          ruta: '/datos'},
    { icono: 'map-outline',                   titulo: 'Direcciones',        ruta: '/direcciones'},
    { icono: 'chatbubble-ellipses-outline',   titulo: 'Mis comentarios',        ruta: '/comentarios'},
  ];

  constructor(
    private router: Router,
    private appComponent: AppComponent
  ) { }

  ngOnInit() {
  }


  mover(ruta: string){

    this.router.navigate([ruta]);
  }

  ionViewDidEnter(){
    this.appComponent.cargarBadge();
  };

}
