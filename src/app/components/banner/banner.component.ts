import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VariablesGlobalesService } from 'src/app/servicios/variables-globales.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {

  @Output() obtenerBannerEvent: EventEmitter<void> = new EventEmitter<void>();

  @Input() itemBanner: { ruta: string }[] = [];
  datosPDX: any;
  previewImage: any;

  constructor(public variables: VariablesGlobalesService) { }

  ngOnInit() {
    this.obtenerConfiguracion();

    this.obtenerBannerEvent.subscribe(() => {
      this.obtenerConfiguracion();
    });
  }

  ionViewDidEnter() {
    this.obtenerConfiguracion();
  }


  obtenerConfiguracion() {


    this.variables.obtenerConfiguracion().subscribe(
      async (dataReturnFromService: any) => {
        this.datosPDX = (dataReturnFromService);

        const randomValue = Math.floor(Math.random() * 2) + 1;

        if (randomValue == 1) {
          this.previewImage = this.datosPDX.banners.banner1 + '?timestamp=' + Date.now();
        } else {
          this.previewImage = this.datosPDX.banners.banner2 + '?timestamp=' + Date.now();
        }

      }
    );


  }
}
