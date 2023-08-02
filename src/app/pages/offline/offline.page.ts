import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
import { VariablesGlobalesService } from 'src/app/servicios/variables-globales.service';

@Component({
  selector: 'app-offline',
  templateUrl: './offline.page.html',
  styleUrls: ['./offline.page.scss'],
})
export class OfflinePage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    public platform: Platform,
    public variables: VariablesGlobalesService) { }

    ngOnInit() {
      if(navigator.onLine) { // true|false
       this.regresaInternet();
      }
    }

    regresaInternet(){
      this.loadingCtrl.create({
        message: 'Reconectando...',
        duration: 2000
      }).then((res) => {
        res.present();
        res.onDidDismiss().then((dis) => {
          window.location.href = 'inicio';
        });
      });
    }


        /**
   * Recargar pestaña para regresar a la app
   *
   * @param 
   */
  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      this.ngOnInit();

    }, 1000);
  };

}
