import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-comp-tarjetas',
  templateUrl: './comp-tarjetas.component.html',
  styleUrls: ['./comp-tarjetas.component.scss'],
})
export class CompTarjetasComponent  implements OnInit {

  @Input() itemTarjetas: { icon: string, card: string }[] = [];

  constructor(private router: Router) { }

  ngOnInit() {}

  mover(){
    this.router.navigate(['/agregar-tarjetas']);
 }
}
