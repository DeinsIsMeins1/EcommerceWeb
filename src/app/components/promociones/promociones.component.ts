import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.scss'],
})
export class PromocionesComponent  implements OnInit {

  @Input() itemPromo: { ruta: string, titulo: string }[] = [];
  @Input() titulo: string | undefined;

  constructor() { }

  ngOnInit() {}

}
