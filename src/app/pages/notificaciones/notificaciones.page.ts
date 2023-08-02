import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  itemDireccion = [
    { icon: 'notifications-outline', direccion: 'Notificacion general acerca de alguna oferta', titulo: 'Notificacion bonita'},
    { icon: 'notifications-outline', direccion: 'Notificacion general acerca de alguna oferta', titulo: 'Notificacion bonita'},
    { icon: 'notifications-outline', direccion: 'Notificacion general acerca de alguna oferta', titulo: 'Notificacion bonita'}
  
  ];

  constructor(private appComponent: AppComponent) { }

  ngOnInit() {
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      this.ionViewDidEnter();
    }, 1000);
  }

  ionViewDidEnter(){
    this.appComponent.cargarBadge();
  };

}
