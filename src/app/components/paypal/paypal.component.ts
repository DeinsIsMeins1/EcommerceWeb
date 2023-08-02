import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { VariablesGlobalesService } from 'src/app/servicios/variables-globales.service';

declare var paypal : any;


@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss'],
})
export class PaypalComponent  implements OnInit {

  @Input() totalCompra: number | any;

  @Output() pagoFinalizado: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef | any;

  paidFor = false;

  constructor(public variables: VariablesGlobalesService) { }

  ngOnInit() {

    this.prueba();


    paypal
      .Buttons({
        createOrder: (data : any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'MXN',
                  value: this.totalCompra
                }
              }
            ]
          });
        },
        onApprove: async (data : any, actions: any) => {
          const order = await actions.order.capture();
          this.paidFor = true;
          this.pagoFinalizado.emit();
          // this.variables.log(order);
        },
        onError: (err: any) => {
          // this.variables.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);
  }
  prueba() {
    // this.variables.log('-----PAYPAL-----', this.totalCompra);
    
  }

}
