import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VariablesGlobalesService } from 'src/app/servicios/variables-globales.service';

@Component({
  selector: 'app-contenido-categoria',
  templateUrl: './contenido-categoria.component.html',
  styleUrls: ['./contenido-categoria.component.scss'],
})
export class ContenidoCategoriaComponent  implements OnInit {

  @Input() dataFromService: { id: string, image: string, title: string, description: string, price: string }[] = [];


  constructor(    
    public variables: VariablesGlobalesService,
    private router: Router) { }

  ngOnInit() {}

  verDetalles(id: any) {
    const idString = id.toString().trim();
  
    if (idString !== '') {
      this.router.navigate(['/detalles', idString]);
    } else {
      console.error('El ID del producto es inválido.');
    }
  }

}
