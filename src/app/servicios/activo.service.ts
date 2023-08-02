import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivoService {

  private cardVisibleSubject = new Subject<boolean>();
  cardVisible$ = this.cardVisibleSubject.asObservable();

  setCardVisible(visible: boolean) {
    this.cardVisibleSubject.next(visible);
  }
}
