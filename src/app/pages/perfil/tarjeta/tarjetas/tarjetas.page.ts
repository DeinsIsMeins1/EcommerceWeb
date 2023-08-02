import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.page.html',
  styleUrls: ['./tarjetas.page.scss'],
})
export class TarjetasPage implements OnInit {

  itemTarjetas= [
    { icon: 'card-outline', card: 'BBVA Debito **** 3123'},   
    { icon: 'card-outline', card: 'BBVA Credito **** 4342'},
    { icon: 'card-outline', card: 'BBVA Debito **** 1223'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
