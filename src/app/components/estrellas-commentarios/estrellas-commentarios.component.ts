import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-estrellas-commentarios',
  templateUrl: './estrellas-commentarios.component.html',
  styleUrls: ['./estrellas-commentarios.component.scss'],
})
export class EstrellasCommentariosComponent  implements OnInit {

  
  @Input() rating: number = 0;
  @Input() editable: boolean = false;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {}

  
  onStarClick(index: number) {
    if (this.editable) {
      this.rating = index + 1;
      // console.log(this.rating);
      
      this.ratingChange.emit(this.rating);
    }
  }

  get fullStars(): number[] {
    return new Array(Math.floor(this.rating));
  }

  get hasHalfStar(): boolean {
    return this.rating % 1 !== 0;
  }

  get emptyStars(): number[] {
    return new Array(Math.floor(5 - this.rating));
  }

}
